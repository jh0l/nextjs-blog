import React from 'react';
import {RecoilRoot} from 'recoil';
// import logo from './logo.svg';
import {Grommet} from 'grommet';
import {theme} from '../theme';

import {TodoList} from '../components/TodoList';
import {NavBar} from '../components/NavBar';

import AppStatePersister from '../state/AppStatePersister';

function App() {
    return (
        <RecoilRoot>
            <AppStatePersister />
            <Grommet theme={theme}>
                <div style={{textAlign: 'center'}}>
                    <NavBar />
                    <TodoList />
                </div>
            </Grommet>
        </RecoilRoot>
    );
}

export default App;
