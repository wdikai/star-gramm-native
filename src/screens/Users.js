/** @format */

import React, { Component } from 'react';
import { View, FlatList } from 'react-native';
import { inject, observer } from 'mobx-react/native';

import styles from '../styles/styles';
import UserListItem from '../components/UserListItem';

@inject(stores => ({ usersStore: stores.root.users }))
@observer
export default class Users extends Component<Props> {
    componentWillMount() {
        this.props.usersStore.fetchUsers();
    }

    render() {
        return (
            <View style={styles.container}>
                <FlatList
                    data={this.props.usersStore.users}
                    refreshing={this.props.usersStore.isLoading}
                    onRefresh={() => this.props.usersStore.fetchUsers(true)}
                    onEndReached={() => this.props.usersStore.fetchUsers()}
                    onEndReachedThreshold={1}
                    keyExtractor={item => item.id.toString()}
                    renderItem={({ item }) => <UserListItem user={item} />}
                />
            </View>
        );
    }
}
