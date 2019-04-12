/** @format */

import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { withNavigation } from 'react-navigation';

import styles from '../styles/styles';
import FitImage from './FitImage';
import openProfile from '../actions/openProfile';

const localStyles = StyleSheet.create({
    card: {
        borderBottomColor: 'lightgray',
        borderBottomWidth: 1,
    },
    avatar: {
        marginRight: 5,
        borderRadius: 25,
        width: 50,
        height: 50,
        overflow: 'hidden',
    },
    cardHeader: {
        fontSize: 16,
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
    },
    cardFooter: {
        padding: 5,
        flexWrap: 'wrap',
    },
    cardDescription: {
        fontWeight: 'bold',
    },
});

function PostListItem({ navigation, post }) {
    const onPress = openProfile(navigation, post.creator);
    const description = !post.description ? null : (
        <View style={[localStyles.cardFooter, styles.row]}>
            <Text> {post.description} </Text>
        </View>
    );

    return (
        <View style={[localStyles.card, styles.column]}>
            <View style={[styles.row, localStyles.cardHeader]}>
                <TouchableOpacity onPress={onPress}>
                    <FitImage
                        style={[localStyles.avatar]}
                        source={{ uri: post.creator.avatar }}
                    />
                </TouchableOpacity>
                <Text style={[styles.col8]} onPress={onPress}>
                    {post.creator.name}
                </Text>
            </View>

            <TouchableOpacity
                onPress={() => navigation.navigate('Post', { postId: post.id })}
                style={{ minHeight: 310 }}>
                <FitImage source={{ uri: post.image }} />
            </TouchableOpacity>
            {description}
        </View>
    );
}

export default withNavigation(PostListItem);
