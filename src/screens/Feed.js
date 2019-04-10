import React, { Component } from "react";
import { View, FlatList, StyleSheet, ActivityIndicator } from "react-native";
import { inject, observer } from "mobx-react/native";

import styles from "../styles/styles";
import Post from "../components/Post";

type Props = {};

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

@inject(stores => ({ feedStore: stores.root.feed }))
@observer
export default class Feed extends Component<Props> {
  componentWillMount() {
    this.props.feedStore.fetchPosts();
  }

  render() {
    return (
      <View style={styles.container}>
        {this.props.feedStore.isLoading && (
          <View style={innerStyle.loading}>
            <ActivityIndicator size="large" />
          </View>
        )}
        <FlatList
          data={this.props.feedStore.posts}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) => <Post post={item} />}
        />
      </View>
    );
  }
}
