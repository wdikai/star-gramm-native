/** @format */

import React, { Component } from 'react';
import { View } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { LoginButton, AccessToken } from 'react-native-fbsdk';
import styles from '../styles/styles';

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
            this.props.navigation.navigate('App');
        }
    }

    render() {
        return (
            <View style={[styles.container, styles.center]}>
                <LoginButton
                    onLoginFinished={(...args) => this.loggedIn(...args)}
                />
            </View>
        );
    }
}
