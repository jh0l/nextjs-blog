import {Box, List, Button, Menu} from 'grommet';
import {useRecoilState, useRecoilValue} from 'recoil';
import {
    filteredTodoListState,
    todoListFilterState,
    TodoListItem,
    todoListStatsState,
    filterOptions,
    TODOLISTSTATEKEY,
} from '../state';
import {TodoItemCreator} from './TodoItemCreator';
import {TodoItem} from './TodoItem';
import {More} from 'grommet-icons';
import {saveState} from '../state/localStorage';

function TodoListFilters() {
    const {statFilterMap} = useRecoilValue(todoListStatsState);
    const [filter, setFilter] = useRecoilState(todoListFilterState);
    return (
        <Box direction="row" margin={{bottom: 'small'}}>
            {filterOptions.map((op) => (
                <Button
                    size="small"
                    style={{borderRadius: '10px'}}
                    margin="small"
                    color={op === filter ? 'control' : 'white'}
                    key={op}
                    label={`${op} | ${statFilterMap[op]}`}
                    onClick={() => setFilter(op)}
                />
            ))}
        </Box>
    );
}

function TodoListStats() {
    const {
        totalNum,
        totalCompletedNum,
        totalUncompletedNum,
        percentCompleted,
    } = useRecoilValue(todoListStatsState);

    const formattedPercentCompleted = Math.round(percentCompleted * 100);

    return (
        <Box direction="column" align="start">
            <li>Total items: {totalNum}</li>
            <li>Items completed: {totalCompletedNum}</li>
            <li>Items not completed: {totalUncompletedNum}</li>
            <li>Percent completed: {formattedPercentCompleted}</li>
        </Box>
    );
}

function TodoListMenu() {
    const resetTodos = () => {
        saveState(TODOLISTSTATEKEY, null);
        window.location.reload();
    };
    return (
        <Box
            fill="horizontal"
            align="start"
            width={{max: '445px'}}
            style={{paddingLeft: '20px'}}
        >
            <Menu
                label={<More />}
                items={[{label: 'Reset Todos', onClick: resetTodos}]}
            />
        </Box>
    );
}

export function TodoList() {
    const todoList = useRecoilValue(filteredTodoListState);
    return (
        <Box height="100%" align="center">
            <TodoItemCreator />
            <TodoListFilters />
            <List data={todoList}>
                {(item: TodoListItem) => <TodoItem item={item} />}
            </List>
            <TodoListMenu />
            <TodoListStats />
        </Box>
    );
}
