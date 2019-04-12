/** @format */

import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { inject, observer } from 'mobx-react/native';
import { reaction } from 'mobx';

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

@observer
@inject(stores => ({ feedStore: stores.root.feedStore }))
export default class Post extends Component {
    static navigationOptions({ navigation }) {
        return {
            title: 'Photo',
        };
    }

    async componentWillMount() {
        const postId = this.props.navigation.getParam('postId');
        this.props.feedStore.fetchPost(postId);
    }

    render() {
        const post = this.props.feedStore.currentPost;
        let description, onPress;

        if (!post) return null;

        onPress = openProfile(this.props.navigation, post.creator);
        description = !post.description ? null : (
            <View style={[localStyles.cardFooter, styles.row]}>
                <Text> {post.description} </Text>
            </View>
        );

        return (
            <View style={styles.container}>
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

                    <FitImage
                        source={{ uri: post.image }}
                        style={{ minHeight: 310 }}
                    />
                    {description}
                </View>
            </View>
        );
    }
}
