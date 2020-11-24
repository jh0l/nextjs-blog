import {atom, RecoilState, selector} from 'recoil';
import {loadState} from './localStorage';
export type TodoListItem = {id: string; text: string; isComplete: boolean};

export const persistedStateKeys: {
    key: string;
    recoilValue: RecoilState<any>;
}[] = [];

export const TODOLISTSTATEKEY = 'todoListState';

export const todoListState = atom({
    key: TODOLISTSTATEKEY,
    default: loadState('todoListState', [
        {
            text: 'dank memes',
            isComplete: false,
            id: Math.random().toString(36).slice(2),
        },
        {
            text: 'Bingus bongus',
            isComplete: true,
            id: Math.random().toString(36).slice(2),
        },
        {
            text: 'dank memes',
            isComplete: false,
            id: Math.random().toString(36).slice(2),
        },
        {
            text: 'Bingus bongus',
            isComplete: true,
            id: Math.random().toString(36).slice(2),
        },
        {
            text: 'dank memes',
            isComplete: false,
            id: Math.random().toString(36).slice(2),
        },
        {
            text: 'Bingus bongus',
            isComplete: true,
            id: Math.random().toString(36).slice(2),
        },
    ] as Array<TodoListItem>),
});
persistedStateKeys.push({key: 'todoListState', recoilValue: todoListState});

type todoListFilterType = 'All' | 'Active' | 'Completed';

export const filterOptions = [
    'All',
    'Completed',
    'Active',
] as todoListFilterType[];

export const todoListFilterState = atom({
    key: 'todoListFilterState',
    default: 'All' as todoListFilterType,
});

export const filteredTodoListState = selector({
    key: 'filteredTodoListState',
    get: ({get}) => {
        const filter = get(todoListFilterState);
        const list = get(todoListState);

        switch (filter) {
            case 'Completed':
                return list.filter((item) => item.isComplete);
            case 'Active':
                return list.filter((item) => !item.isComplete);
            case 'All':
                return list;
            default:
                return list;
        }
    },
});

export const todoListStatsState = selector({
    key: 'todoListStatsState',
    get: ({get}) => {
        const todoList = get(todoListState);
        const totalNum = todoList.length;
        const totalCompletedNum = todoList.filter((item) => item.isComplete)
            .length;
        const totalUncompletedNum = totalNum - totalCompletedNum;
        const percentCompleted =
            totalNum === 0 ? 0 : totalCompletedNum / totalNum;

        const statFilterMap = {
            All: totalNum,
            Completed: totalCompletedNum,
            Active: totalUncompletedNum,
        };

        return {
            statFilterMap,
            totalNum,
            totalUncompletedNum,
            totalCompletedNum,
            percentCompleted,
        };
    },
});
