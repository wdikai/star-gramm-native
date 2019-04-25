/** @format */

import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { withNavigation } from 'react-navigation';

import styles from '../styles/styles';
import FitImage from './FitImage';
import FollowButton from './FollowButton';
import openProfile from '../actions/openProfile';

const localStyles = StyleSheet.create({
    avatar: {
        marginRight: 5,
        borderRadius: 25,
        width: 50,
        height: 50,
        overflow: 'hidden',
    },
    line: {
        fontSize: 16,
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 5,

        //ios
        shadowOpacity: 0.3,
        shadowRadius: 3,
        shadowOffset: {
            height: 0,
            width: 0,
        },
        //android
        elevation: 1,

        borderBottomColor: 'lightgray',
    },
    data: {
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
});

function UserListItem({ navigation, user }) {
    const onPress = openProfile(navigation, user);

    return (
        <View style={[styles.row, localStyles.line]}>
            <TouchableOpacity onPress={onPress} style={styles.col8}>
                <View style={[styles.row, localStyles.data]}>
                    <FitImage
                        style={[styles.col4, localStyles.avatar]}
                        source={{ uri: user.avatar }}
                    />
                    <Text style={styles.col8} onPress={onPress}>
                        {user.name}
                    </Text>
                </View>
            </TouchableOpacity>
            <View style={styles.col4}>
                <FollowButton user={user} />
            </View>
        </View>
    );
}

export default withNavigation(UserListItem);
