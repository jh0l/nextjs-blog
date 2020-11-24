import {persistedStateKeys} from './index';
import {PersistState} from './localStorage';
export default function AppStatePersister() {
    return (
        <>
            {persistedStateKeys.map(({key, recoilValue}) => (
                <PersistState
                    key={key}
                    stateKey={key}
                    recoilValue={recoilValue}
                />
            ))}
        </>
    );
}
