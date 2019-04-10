import React, { Component } from "react";
import { ActivityIndicator, StatusBar, View } from "react-native";
import AsyncStorage from "@react-native-community/async-storage";

export default class Splash extends Component {
  constructor(props) {
    super(props);
    this.checkAuth();
  }

  async checkAuth() {
    const userToken = await AsyncStorage.getItem("userToken");
    this.props.navigation.navigate(userToken ? "Main" : "Login");
  }

  render() {
    return (
      <View>
        <ActivityIndicator />
        <StatusBar barStyle="default" />
      </View>
    );
  }
}
