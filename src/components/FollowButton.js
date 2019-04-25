/** @format */

import React, { Component } from 'react';
import { observer } from 'mobx-react/native';

import { Text, TouchableHighlight, StyleSheet } from 'react-native';

const innerStyles = StyleSheet.create({
    followButton: {
        width: '100%',
        maxWidth: 150,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#c0c0c0',
        borderRadius: 5,
        borderWidth: 1,
    },
});

@observer
export default class FollowButton extends Component {
    render() {
        const { user } = this.props;
        return (
            <TouchableHighlight
                style={innerStyles.followButton}
                onPress={() => user.follow()}>
                <Text>{user.isFollow ? 'Unfollow' : 'Follow'}</Text>
            </TouchableHighlight>
        );
    }
}
