/** @format */

import React, { Component } from 'react';
import { View, FlatList } from 'react-native';
import { inject, observer } from 'mobx-react/native';

import styles from '../styles/styles';
import UserListItem from '../components/UserListItem';

@inject(stores => ({ userStore: stores.root.userStore }))
@observer
export default class Users extends Component<Props> {
    componentWillMount() {
        this.props.userStore.fetchUsers(0);
    }

    render() {
        const store = this.props.userStore;
        return (
            <View style={styles.container}>
                <FlatList
                    data={store.users}
                    refreshing={store.isLoading}
                    onRefresh={() => store.fetchUsers(0)}
                    onEndReached={() => store.fetchUsers(store.offset)}
                    onEndReachedThreshold={1}
                    keyExtractor={item => item.id.toString()}
                    renderItem={({ item }) => <UserListItem user={item} />}
                />
            </View>
        );
    }
}
