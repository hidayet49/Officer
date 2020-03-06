import React from "react";
import { StyleSheet, Text, TouchableOpacity, View, Image } from "react-native";
import { Ionicons, FontAwesome } from "@expo/vector-icons";
const TextWithIcon = props => {
  return (
    <View style={styles.container}>
      <View>
        <FontAwesome name={props.iconname} size={45} color="white" />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.text}>
          {props.label} : {props.value}
        </Text>
      </View>
    </View>
  );
};

export default TextWithIcon;
const styles = StyleSheet.create({
  container: {
    margin: 15,
    padding: 5,
    flexDirection: "row",
    alignItems: "center"
  },
  text: {
    fontSize: 22,
    color: "white"
  },
  textContainer: {
    margin: 20
  }
});
