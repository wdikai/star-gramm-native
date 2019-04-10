import React, { Component } from "react";
import { View, Text, TouchableHighlight, StyleSheet } from "react-native";
import { inject, observer } from "mobx-react/native";

import styles from "../styles/styles";
import FitImage from "../components/FitImage";
import logout from "../actions/logout";

const innerStyles = StyleSheet.create({
  userSection: {
    padding: 10,

    borderColor: "lightgray",
    borderBottomWidth: 0.5
  },
  counter: {
    padding: 5
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50
  },
  editButton: {
    width: 150,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#c0c0c0",
    borderRadius: 5,
    borderWidth: 1
  }
});

@observer
@inject(stores => ({ usersStore: stores.root.users }))
export default class User extends Component {
  static navigationOptions({ navigation }) {
    return {
      title: navigation.getParam("stackTitle", "Profile")
    };
  }

  async componentWillMount() {
    const userId = this.props.navigation.getParam("userId");
    await this.props.usersStore.fetchUser(userId);
    if (userId) {
      this.props.navigation.setParams({
        stackTitle: this.props.usersStore.currentUser.name
      });
    }
  }

  render() {
    const usersStore = this.props.usersStore;
    return (
      <View style={styles.container}>
        {usersStore.currentUser && (
          <View style={[innerStyles.userSection]}>
            <View style={[styles.row, styles.spaceBetween]}>
              <FitImage
                style={innerStyles.avatar}
                source={{ uri: usersStore.currentUser.avatar }}
              />
              <View style={[styles.column, styles.center]}>
                <View style={[styles.row]}>
                  <View
                    style={[styles.column, styles.center, innerStyles.counter]}
                  >
                    <Text>{usersStore.currentUser.countFollowers}</Text>
                    <Text>Followers</Text>
                  </View>

                  <View
                    style={[styles.column, styles.center, innerStyles.counter]}
                  >
                    <Text>{usersStore.currentUser.countFollowings}</Text>
                    <Text>Followings</Text>
                  </View>
                </View>

                <View style={[styles.row]}>
                  <TouchableHighlight
                    style={innerStyles.editButton}
                    onPress={() => logout(this.props.navigator)}
                  >
                    <Text>Logout</Text>
                  </TouchableHighlight>
                </View>
              </View>
            </View>

            <View style={[styles.column]}>
              <Text>{usersStore.currentUser.name}</Text>
              <Text>{usersStore.currentUser.bio}</Text>
            </View>
          </View>
        )}
      </View>
    );
  }
}
