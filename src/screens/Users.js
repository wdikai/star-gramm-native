/** @format */

import React, { Component } from 'react';
import { View, FlatList } from 'react-native';
import { inject, observer } from 'mobx-react/native';

import styles from '../styles/styles';
import UserListItem from '../components/UserListItem';
import UsersHeader from '../components/UsersHeader';

@inject(stores => ({ userStore: stores.root.userStore }))
@observer
export default class Users extends Component {
    static navigationOptions({ navigation }) {
        return {
            headerTitle: (
                <UsersHeader userStore={navigation.getParam('userStore')} />
            ),
        };
    }
    componentWillMount() {
        const { navigation, userStore } = this.props;
        navigation.setParams({ userStore });
        userStore.fetchUsers();
    }

    render() {
        const store = this.props.userStore;
        return (
            <View style={styles.container}>
                <FlatList
                    data={store.users}
                    refreshing={store.isLoading}
                    onRefresh={() => store.fetchUsers()}
                    onEndReached={() => store.fetchUsers(store.offset)}
                    onEndReachedThreshold={1}
                    keyExtractor={item => item.id.toString()}
                    renderItem={({ item }) => <UserListItem user={item} />}
                />
            </View>
        );
    }
}
