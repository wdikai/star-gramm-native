/** @format */

import React, { Component } from 'react';
import { View, FlatList } from 'react-native';
import { inject, observer } from 'mobx-react/native';

import styles from '../styles/styles';
import PostListItem from '../components/PostListItem';
import FeedHeader from '../components/FeedHeader';

@inject(stores => ({ feedStore: stores.root.feedStore }))
@observer
export default class Feed extends Component {
    static navigationOptions() {
        return {
            headerTitle: <FeedHeader />,
        };
    }

    componentWillMount() {
        if (!this.props.feedStore.offset && !this.props.feedStore.isLoading) {
            this.props.feedStore.fetchPosts();
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <FlatList
                    data={this.props.feedStore.posts}
                    refreshing={this.props.feedStore.isLoading}
                    onRefresh={() => this.props.feedStore.fetchPosts()}
                    onEndReached={() =>
                        this.props.feedStore.fetchPosts(
                            this.props.feedStore.offset
                        )
                    }
                    onEndReachedThreshold={1}
                    keyExtractor={item => item.id.toString()}
                    renderItem={({ item }) => <PostListItem post={item} />}
                />
            </View>
        );
    }
}
