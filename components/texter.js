import React from "react";
import { StyleSheet, Text, TouchableOpacity, View, Image } from "react-native";

const texter=(props)=> {
    return(
      <View>
          <Text style={styles.text}>{props.name}</Text>
      </View>
    )
    
  }

export default texter;
const styles = StyleSheet.create({
    text: {
      fontSize: 43,
      color:'white'
    }
})