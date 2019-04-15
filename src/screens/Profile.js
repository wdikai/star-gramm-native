/** @format */

import React, { Component } from 'react';
import { View } from 'react-native';
import { inject, observer } from 'mobx-react/native';

import UserDetail from '../components/UserDetail';
import styles from '../styles/styles';

@inject(stores => ({ profileStore: stores.root.profileStore }))
@observer
export default class Profile extends Component {
    static navigationOptions({ navigation }) {
        return {
            title: 'Profile',
        };
    }

    async componentWillMount() {
        await this.props.profileStore.fetchProfile();
    }

    render() {
        const profileStore = this.props.profileStore;
        return (
            <View style={styles.container}>
                {profileStore.user && (
                    <UserDetail user={profileStore.user} isMe />
                )}
            </View>
        );
    }
}
