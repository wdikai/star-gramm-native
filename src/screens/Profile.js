/** @format */

import React, { Component } from 'react';
import { View, TouchableHighlight, Text, StyleSheet } from 'react-native';
import { inject, observer } from 'mobx-react/native';

import UserDetail from '../components/UserDetail';
import styles from '../styles/styles';

const innerStyles = StyleSheet.create({
    editButton: {
        width: 150,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#c0c0c0',
        borderRadius: 5,
        borderWidth: 1,
    },
});

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
        const { profileStore } = this.props;
        return (
            <View style={styles.container}>
                {profileStore.user && (
                    <UserDetail
                        user={profileStore.user}
                        renderAction={() => this.renderAction()}
                    />
                )}
            </View>
        );
    }

    renderAction() {
        return (
            <TouchableHighlight
                style={innerStyles.editButton}
                onPress={() => this.navigateToEdit()}>
                <Text>Edit profile</Text>
            </TouchableHighlight>
        );
    }

    navigateToEdit() {
        const { profileStore, navigation } = this.props;
        profileStore.resetForm();
        navigation.navigate('EditProfile');
    }
}
