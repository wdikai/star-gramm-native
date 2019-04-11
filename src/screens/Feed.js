/** @format */

import React, { Component } from 'react';
import { View, FlatList } from 'react-native';
import { inject, observer } from 'mobx-react/native';

import styles from '../styles/styles';
import Post from '../components/Post';

type Props = {};

@inject(stores => ({ feedStore: stores.root.feedStore }))
@observer
export default class Feed extends Component<Props> {
    componentWillMount() {
        this.props.feedStore.fetchPosts();
    }

    render() {
        return (
            <View style={styles.container}>
                <FlatList
                    data={this.props.feedStore.posts}
                    refreshing={this.props.feedStore.isLoading}
                    onRefresh={() => this.props.feedStore.fetchPosts(true)}
                    onEndReached={() => this.props.feedStore.fetchPosts()}
                    onEndReachedThreshold={1}
                    keyExtractor={item => item.id.toString()}
                    renderItem={({ item }) => <Post post={item} />}
                />
            </View>
        );
    }
}
