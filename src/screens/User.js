/** @format */

import React, { Component } from 'react';
import { View } from 'react-native';
import { inject, observer } from 'mobx-react/native';

import styles from '../styles/styles';
import UserDetail from '../components/UserDetail';

@inject(stores => ({ userStore: stores.root.userStore }))
@observer
export default class User extends Component {
    static navigationOptions({ navigation }) {
        return {
            title: navigation.getParam('stackTitle', 'Profile'),
        };
    }

    async componentWillMount() {
        const userId = this.props.navigation.getParam('userId');
        await this.props.userStore.fetchUser(userId);
        this.props.navigation.setParams({
            stackTitle: this.props.userStore.currentUser
                ? this.props.userStore.currentUser.name
                : null,
        });
    }

    render() {
        const userStore = this.props.userStore;
        return (
            <View style={styles.container}>
                {userStore.currentUser && (
                    <UserDetail user={userStore.currentUser} />
                )}
            </View>
        );
    }
}
