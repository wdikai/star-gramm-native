/** @format */

import React, { Component } from 'react';
import { View, FlatList } from 'react-native';
import { observer } from 'mobx-react/native';

import PostListItem from './PostListItem';

import styles from '../styles/styles';

@observer
class UserPostsList extends Component {
    render() {
        const { user } = this.props;
        return (
            <View style={[styles.container]}>
                <FlatList
                    data={user.posts}
                    refreshing={user.isPostsLoading}
                    onRefresh={() => user.fetchPosts()}
                    onEndReached={() => user.fetchPosts(user.offset)}
                    onEndReachedThreshold={1}
                    keyExtractor={item => item.id.toString()}
                    renderItem={({ item }) => <PostListItem post={item} />}
                />
            </View>
        );
    }
}

export default UserPostsList;
