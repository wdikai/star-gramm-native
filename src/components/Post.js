import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { withNavigation } from "react-navigation";

import styles from "../styles/styles";
import FitImage from "./FitImage";
import openProfile from "../actions/openProfile";

const localStyles = StyleSheet.create({
  card: {
    borderBottomColor: "lightgray",
    borderBottomWidth: 1
  },
  avatar: {
    marginRight: 5,
    borderRadius: 25,
    width: 50,
    height: 50
  },
  cardHeader: {
    fontSize: 16,
    alignItems: "center",
    padding: 5,

    //ios
    shadowOpacity: 0.3,
    shadowRadius: 3,
    shadowOffset: {
      height: 0,
      width: 0
    },
    //android
    elevation: 1
  },
  cardFooter: {
    padding: 5,
    flexWrap: "wrap"
  },
  cardDescription: {
    fontWeight: "bold"
  }
});

function Post(props) {
  const description = !props.post.description ? null : (
    <View style={[localStyles.cardFooter, styles.row]}>
      <Text> {props.post.description} </Text>
    </View>
  );

  const onPress = openProfile(props.navigation, props.post.creator);

  return (
    <View style={[localStyles.card, styles.column]}>
      <View style={[styles.row, localStyles.cardHeader]}>
        <TouchableOpacity onPress={onPress}>
          <FitImage
            style={[styles.col4, localStyles.avatar]}
            source={{ uri: props.post.creator.avatar }}
          />
        </TouchableOpacity>
        <Text style={[styles.col8]} onPress={onPress}>
          {props.post.creator.name}
        </Text>
      </View>
      <FitImage source={{ uri: props.post.image }} />
      {description}
    </View>
  );
}

export default withNavigation(Post);
