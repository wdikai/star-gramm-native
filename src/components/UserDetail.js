/** @format */

import React, { Component } from 'react';
import { View, Text, TouchableHighlight, StyleSheet } from 'react-native';
import { withNavigation } from 'react-navigation';
import { observer } from 'mobx-react/native';

import styles from '../styles/styles';
import logout from '../actions/logout';
import FitImage from './FitImage';
import FollowButton from './FollowButton';

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
        overflow: 'hidden',
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
@withNavigation
class UserDetail extends Component {
    render() {
        let actions = null;
        const { user, isMe } = this.props;

        if (isMe) {
            actions = (
                <TouchableHighlight
                    style={innerStyles.editButton}
                    onPress={() =>
                        this.props.navigation.navigate('EditProfile')
                    }>
                    <Text>Edit profile</Text>
                </TouchableHighlight>
            );
        } else {
            actions = <FollowButton user={user} />;
        }

        return (
            <View style={[innerStyles.userSection]}>
                <View style={[styles.row, styles.spaceBetween]}>
                    <FitImage
                        style={innerStyles.avatar}
                        source={{ uri: user.avatar }}
                    />
                    <View style={[styles.column, styles.center]}>
                        <View style={[styles.row]}>
                            <View
                                style={[
                                    styles.column,
                                    styles.center,
                                    innerStyles.counter,
                                ]}>
                                <Text>{user.countFollowers}</Text>
                                <Text>Followers</Text>
                            </View>

                            <View
                                style={[
                                    styles.column,
                                    styles.center,
                                    innerStyles.counter,
                                ]}>
                                <Text>{user.countFollowings}</Text>
                                <Text>Followings</Text>
                            </View>
                        </View>

                        <View style={[styles.row]}>{actions}</View>
                    </View>
                </View>

                <View style={[styles.column]}>
                    <Text>{user.name}</Text>
                    <Text>{user.bio}</Text>
                </View>
            </View>
        );
    }
}

export default UserDetail;
