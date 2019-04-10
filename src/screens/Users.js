import React, { Component } from "react";
import { View, ActivityIndicator, FlatList, StyleSheet } from "react-native";
import { inject, observer } from "mobx-react/native";

import styles from "../styles/styles";
import UserListItem from "../components/UserListItem";

const innerStyle = StyleSheet.create({
  loading: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent"
  }
});

@inject(stores => ({ usersStore: stores.root.users }))
@observer
export default class Users extends Component<Props> {
  componentWillMount() {
    this.props.usersStore.fetchUsers(10);
  }

  render() {
    return (
      <View style={styles.container}>
        {this.props.usersStore.isLoading && (
          <View style={innerStyle.loading}>
            <ActivityIndicator size="large" />
          </View>
        )}
        <FlatList
          data={this.props.usersStore.users}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) => <UserListItem user={item} />}
        />
      </View>
    );
  }
}
