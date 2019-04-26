/** @format */

import React, { Component } from 'react';
import { View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-community/async-storage';
import { LoginButton, AccessToken } from 'react-native-fbsdk';
import { inject, observer } from 'mobx-react/native';

import styles from '../styles/styles';

@inject(stores => ({ rootStore: stores.root }))
@observer
export default class Login extends Component {
    async componentDidMount() {
        await this.setupAuth();
    }

    async loggedIn(error, result) {
        if (error || !result || result.isCancelled) {
            console.log('login has error: ' + error);
        } else {
            console.log('login');
            console.log(result);
            await this.setupAuth();
        }
    }

    async setupAuth() {
        const data = await AccessToken.getCurrentAccessToken();
        if (data) {
            await AsyncStorage.setItem('userToken', data.accessToken);
            await this.props.rootStore.init();
            this.props.navigation.navigate('App');
        }
    }

    render() {
        return (
            <View style={[styles.container, styles.center]}>
                <Icon name="star" size={64}>
                    Gramm
                </Icon>
                <LoginButton
                    onLoginFinished={(...args) => this.loggedIn(...args)}
                />
            </View>
        );
    }
}
