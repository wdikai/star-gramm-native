/** @format */

import React, { Component } from 'react';
import { observer, Provider } from 'mobx-react/native';

import Screens from './screens';
import Store from './stores';

const store = new Store();

@observer
export default class App extends Component {
    render() {
        return (
            <Provider root={store}>
                <Screens />
            </Provider>
        );
    }
}
