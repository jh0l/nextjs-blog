import React from 'react';
import {Box, TextInput, Button, CheckBox} from 'grommet';
import {Close} from 'grommet-icons';
import {useRecoilState} from 'recoil';
import {todoListState, TodoListItem} from '../state';

export function TodoItem({item}: {item: TodoListItem}) {
    const [todoList, setTodoList] = useRecoilState(todoListState);
    const index = todoList.findIndex((listItem) => listItem === item);

    const editItemText = ({
        target: {value},
    }: React.ChangeEvent<HTMLInputElement>) => {
        const newList = replaceItemAtIndex(todoList, index, {
            ...item,
            text: value,
        });
        setTodoList(newList);
    };

    const toggleItemCompletion = () => {
        const newList = replaceItemAtIndex(todoList, index, {
            ...item,
            isComplete: !item.isComplete,
        });

        setTodoList(newList);
    };

    const deleteItem = () => {
        const newList = removeItemAtIndex(todoList, index);
        setTodoList(newList);
    };

    return (
        <Box
            fill="horizontal"
            direction="row"
            margin={{vertical: 'xsmall'}}
            pad="small"
            align="center"
            border
        >
            <Button
                plain
                hoverIndicator={item.isComplete ? 'completed' : 'uncompleted'}
                margin={{left: '12px', right: '9px'}}
            >
                <CheckBox
                    checked={item.isComplete}
                    onChange={toggleItemCompletion}
                />
            </Button>
            <TextInput
                plain
                value={item.text}
                size="medium"
                onChange={editItemText}
            />
            <Button
                icon={<Close size="12px" />}
                onClick={deleteItem}
                margin={{left: '12px', right: '9px'}}
            />
        </Box>
    );
}
function replaceItemAtIndex<T>(arr: Array<T>, index: number, newValue: T) {
    return [...arr.slice(0, index), newValue, ...arr.slice(index + 1)];
}

function removeItemAtIndex<T>(arr: Array<T>, index: number) {
    return [...arr.slice(0, index), ...arr.slice(index + 1)];
}
