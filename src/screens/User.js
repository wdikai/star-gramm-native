/** @format */

import React, { Component } from 'react';
import { View, Text, TouchableHighlight, StyleSheet } from 'react-native';
import { inject, observer } from 'mobx-react/native';

import styles from '../styles/styles';
import FitImage from '../components/FitImage';
import logout from '../actions/logout';

const innerStyles = StyleSheet.create({
    userSection: {
        padding: 10,

        borderColor: 'lightgray',
        borderBottomWidth: 0.5,
    },
    counter: {
        padding: 5,
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
    },
    editButton: {
        width: 150,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#c0c0c0',
        borderRadius: 5,
        borderWidth: 1,
    },
});

@observer
@inject(stores => ({ userStore: stores.root.userStore }))
export default class User extends Component {
    static navigationOptions({ navigation }) {
        console.log('User navigationOptions');
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
        this.forceUpdate();
    }

    render() {
        const userStore = this.props.userStore;
        return (
            <View style={styles.container}>
                {userStore.currentUser && (
                    <View style={[innerStyles.userSection]}>
                        <View style={[styles.row, styles.spaceBetween]}>
                            <FitImage
                                style={innerStyles.avatar}
                                source={{ uri: userStore.currentUser.avatar }}
                            />
                            <View style={[styles.column, styles.center]}>
                                <View style={[styles.row]}>
                                    <View
                                        style={[
                                            styles.column,
                                            styles.center,
                                            innerStyles.counter,
                                        ]}>
                                        <Text>
                                            {
                                                userStore.currentUser
                                                    .countFollowers
                                            }
                                        </Text>
                                        <Text>Followers</Text>
                                    </View>

                                    <View
                                        style={[
                                            styles.column,
                                            styles.center,
                                            innerStyles.counter,
                                        ]}>
                                        <Text>
                                            {
                                                userStore.currentUser
                                                    .countFollowings
                                            }
                                        </Text>
                                        <Text>Followings</Text>
                                    </View>
                                </View>

                                <View style={[styles.row]}>
                                    <TouchableHighlight
                                        style={innerStyles.editButton}
                                        onPress={() =>
                                            logout(this.props.navigation)
                                        }>
                                        <Text>Logout</Text>
                                    </TouchableHighlight>
                                </View>
                            </View>
                        </View>

                        <View style={[styles.column]}>
                            <Text>{userStore.currentUser.name}</Text>
                            <Text>{userStore.currentUser.bio}</Text>
                        </View>
                    </View>
                )}
            </View>
        );
    }
}
