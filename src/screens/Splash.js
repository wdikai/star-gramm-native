/** @format */

import React, { Component } from 'react';
import { StatusBar, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { inject, observer } from 'mobx-react/native';

import styles from '../styles/styles';

@inject(stores => ({ rootStore: stores.root }))
@observer
export default class Splash extends Component {
    async componentWillMount() {
        await this.props.rootStore.init();
        this.props.navigation.navigate(
            this.props.rootStore.isAuthorized ? 'App' : 'Login'
        );
    }

    render() {
        return (
            <View style={[styles.container, styles.center]}>
                <Icon name="star" size={64}>
                    Gramm
                </Icon>
                <StatusBar hidden={true} />
            </View>
        );
    }
}
