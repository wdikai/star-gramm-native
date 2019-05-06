/** @format */

import React, { Component } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { withNavigation } from 'react-navigation';
import { observer } from 'mobx-react/native';

import FitImage from './FitImage';
import Grid from './Grid';

import styles from '../styles/styles';

@withNavigation
@observer
class UserPostsGrid extends Component {
    render() {
        const { user, navigation, onScroll, nestedScrollEnabled } = this.props;

        return (
            <View style={[styles.container]}>
                <Grid
                    data={user.posts}
                    itemsPerRow={3}
                    refreshing={user.isPostsLoading}
                    onRefresh={() => user.fetchPosts()}
                    onEndReached={() => user.fetchPosts(user.offset)}
                    onEndReachedThreshold={0.5}
                    onScroll={onScroll}
                    keyExtractor={item => item.id.toString()}
                    nestedScrollEnabled={nestedScrollEnabled}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            onPress={() =>
                                navigation.navigate('Post', { postId: item.id })
                            }>
                            <FitImage source={{ uri: item.image }} />
                        </TouchableOpacity>
                    )}
                />
            </View>
        );
    }
}

export default UserPostsGrid;
