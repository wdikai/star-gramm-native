/** @format */

import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { inject, observer } from 'mobx-react/native';

import styles from '../styles/styles';
import openProfile from '../actions/openProfile';
import FitImage from '../components/FitImage';

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

@inject(stores => ({ feedStore: stores.root.feedStore }))
@observer
export default class Post extends Component {
    static navigationOptions({ navigation }) {
        return {
            title: 'Photo',
        };
    }

    componentWillMount() {
        const postId = this.props.navigation.getParam('postId');
        this.props.feedStore.fetchPost(postId);
    }

    render() {
        const feedStore = this.props.feedStore;
        let onPress;
        if (!this.props.feedStore.currentPost) return null;

        onPress = openProfile(
            this.props.navigation,
            feedStore.currentPost.creator
        );

        return (
            <View style={styles.container}>
                <View style={[localStyles.card, styles.column]}>
                    <View style={[styles.row, localStyles.cardHeader]}>
                        <TouchableOpacity onPress={onPress}>
                            <FitImage
                                style={[localStyles.avatar]}
                                source={{
                                    uri: feedStore.currentPost.creator.avatar,
                                }}
                            />
                        </TouchableOpacity>
                        <Text style={[styles.col8]} onPress={onPress}>
                            {feedStore.currentPost.creator.name}
                        </Text>
                    </View>

                    <FitImage
                        source={{ uri: feedStore.currentPost.image }}
                        style={{ minHeight: 310 }}
                    />
                    {feedStore.currentPost.description && (
                        <View style={[localStyles.cardFooter, styles.row]}>
                            <Text> {feedStore.currentPost.description} </Text>
                        </View>
                    )}
                </View>
            </View>
        );
    }
}
