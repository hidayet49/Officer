// src/screens/Home.js

import React from "react";
import { StyleSheet, Text, TouchableOpacity, View, Image } from "react-native";
import * as ImagePicker from "expo-image-picker";
import Texter from "../components/texter";
import { Ionicons } from '@expo/vector-icons';

function Home({ navigation }) {
  const takePicture = async () => {
    await ImagePicker.requestCameraPermissionsAsync();
    const { base64 } = await ImagePicker.launchCameraAsync({
      allowsEditing: false,
      base64: true
    });
    navigation.navigate('Info',{base64:base64});
  };

  return (
    <View style={styles.container}>
      <View style={styles.general}>
        <Texter name="Just Take"></Texter>
        <Texter name="a photo of your"></Texter>
        <Texter name="PASSPORT"></Texter>
      </View>
      <View style={styles.general}>
        <Texter name="We will take"></Texter>
        <Texter name="care of the rest"></Texter>
      </View>

      <View>
        <TouchableOpacity
          style={styles.takePhoto}
          activeOpacity={0.5}
          onPress={takePicture}
        >
        <Ionicons name="md-camera" size={100} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 21
  },
  container: {
    flex: 1,
    backgroundColor: "#005FFD",
    alignItems: "center",
    justifyContent: "space-around"
  },
  general:{
    alignItems:"center",
    justifyContent:"space-around"
  }
});

export default Home;
