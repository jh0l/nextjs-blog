import {RecoilState, useRecoilValue} from 'recoil';

let localStorage: null | Storage = null;
try {
    localStorage = window.localStorage;
} catch (_) {}

export function loadState<T>(stateKey: string, defaultState: T): T {
    if (!localStorage) return defaultState;
    try {
        const serializedState = localStorage.getItem(stateKey);
        if (serializedState === null) {
            return defaultState;
        }
        return JSON.parse(serializedState);
    } catch (err) {
        console.log(err);
        return defaultState;
    }
}

export function saveState<T>(stateKey: string, state: T) {
    if (!localStorage) return;
    try {
        if (state === null) {
            localStorage.removeItem(stateKey);
        } else {
            const serializedState = JSON.stringify(state);
            localStorage.setItem(stateKey, serializedState);
        }
    } catch (err) {
        console.log(err);
    }
}

type PersistDebounceType = {[stateKey: string]: NodeJS.Timeout[]};

const persistDebounce = {} as PersistDebounceType;

const DELAY = 300;

function debounceSaveState<T>(
    stateKey: string,
    newValueState: T,
    delay = DELAY
) {
    if (Array.isArray(persistDebounce[stateKey])) {
        persistDebounce[stateKey].forEach((id) => clearTimeout(id));
    }
    persistDebounce[stateKey] = [];
    const id = setTimeout(
        (k, state) => {
            saveState(k, state);
        },
        delay,
        stateKey,
        newValueState
    );
    persistDebounce[stateKey].push(id);
}

export function PersistState<T>({
    stateKey,
    recoilValue,
}: {
    stateKey: string;
    recoilValue: RecoilState<T>;
}) {
    const newValueState = useRecoilValue(recoilValue);
    debounceSaveState(stateKey, newValueState);
    return null;
}
