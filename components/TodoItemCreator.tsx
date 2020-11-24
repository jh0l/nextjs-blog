import {Box, Button, Form, TextInput} from 'grommet';
import React, {useState} from 'react';
import {useSetRecoilState} from 'recoil';
import {todoListState} from '../state';

// const addButtonTheme = {
//     button: {
//         border: {
//             radius: '0',
//         },
//     },
// };

// function TodoItem({item}) {}
function getId() {
    return Math.random().toString(36).slice(2);
}

export function TodoItemCreator() {
    const [inputValue, setInputValue] = useState('');
    const setTodoList = useSetRecoilState(todoListState);

    const addItem = () => {
        if (inputValue.length === 0) return;
        setTodoList((oldTodoList) => [
            {
                id: getId(),
                text: inputValue,
                isComplete: false,
            },
            ...oldTodoList,
        ]);
        setInputValue('');
    };

    const onChange = ({
        target: {value},
    }: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(value);
    };

    return (
        <Form>
            <Box
                direction="row"
                margin={{vertical: 'large', horizontal: 'large'}}
                pad="small"
                align="center"
                round="small"
                border
            >
                <TextInput
                    placeholder="Create New Todo"
                    plain
                    size="medium"
                    value={inputValue}
                    onChange={onChange}
                />
                <Button
                    style={{borderRadius: '5px'}}
                    type="submit"
                    label="Add"
                    primary={inputValue.length > 0}
                    onClick={addItem}
                    margin="small"
                />
            </Box>
        </Form>
    );
}
