import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  StyleSheet,
  View,
  Text,
  Button,
  Platform,
  TouchableOpacity
} from "react-native";
import * as Calendar from "expo-calendar";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import myCalendar from "./calendar";
import { FontAwesome } from "@expo/vector-icons";
import TextWithIcon from "./textWithIcon";
var moment = require("moment");
import * as Print from "expo-print";

function Info({ route, navigation }) {
  const { base64 } = route.params;
  const [name, setName] = useState();
  const [surname, setSurname] = useState();
  const [expiryDate, setExpiryDate] = useState();
  const [sex, setSex] = useState();
  const [dateOfBirth, setDateOfBirth] = useState();
  const [load, setLoad] = useState(false);

  useEffect(() => {
    getGoogle();
  }, []);
  useEffect(() => {
    if (load) {
      theCalFunc();
      alert("Your Calendar is arranged");
    }
  }, [load]);

  const theCalFunc = async () => {
    const { status } = await Calendar.requestCalendarPermissionsAsync();
    if (status === "granted") {
      console.log(expiryDate);
      myCalendar(expiryDate);
    }
  };
  const getGoogle = async () => {
    try {
      let body = JSON.stringify({
        requests: [
          {
            features: [{ type: "TEXT_DETECTION" }],
            image: {
              content: base64
            }
          }
        ]
      });
      let response = await fetch(
        "https://vision.googleapis.com/v1/images:annotate?key=AIzaSyASB0YF0GI8z43Rc2NS5LRrpzZu_1NV49U",
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          },
          method: "POST",
          body: body
        }
      );
      let result = await response.json();
      const str2 = result.responses[0].textAnnotations[0].description;
      const str = str2.replace(/\s+/g, "");
      const nameBegin = str.indexOf("D<<") + 3;
      const nameEnd = str.indexOf("<", nameBegin);
      setName(str.substring(nameBegin, nameEnd));
      const surnameBegin = str.indexOf("<", str.indexOf("D<<") + 3) + 2;
      const surnameEnd = str.indexOf("<", surnameBegin);
      setSurname(str.substring(surnameBegin, surnameEnd));
      //console.log(name + " " + surname);
      const beginDate = str.indexOf("D<", nameEnd) + 3;
      //const beginDate = str.indexOf("SYR", nameEnd) + 3;
      setDateOfBirth(str.substr(beginDate, 6));
      setSex(str.substr(beginDate + 7, 1));
      setExpiryDate(str.substr(beginDate + 8, 6));
      //console.log(dateOfBirth + " " + sex + " " + expiryDate);
      setLoad(true);
    } catch (error) {
      console.log("ERROR", error);
    }
  };
  const createAppForm = async () => {
    let filePath = await Print.printToFileAsync({
      html: `<h1>APP FORM</h1>
     
      `,
      width: 612,
      height: 792,
      base64: false
    });
    console.log(filePath);

    alert("PDF Generated", filePath.uri);
  };

  const fetchData = async () => {
    await getGoogle();
    await theCalFunc();
  };

  if (!load) {
    return (
      <View style={[styles.container, styles.horizontal]}>
        <View style={{ flex:1,alignItems: "center", justifyContent: "center", alignContent: 'center', }}>
          <Text style={styles.text2}>JUST A MOMENT!!</Text>
          <Text style={styles.text2}> WE ARE PREPARING</Text>
          <Text style={styles.text2}>YOUR DATA..</Text>
          <ActivityIndicator size="large" color="white" />
        </View>
      </View>
    );
  } else {
    return (
      <ScrollView style={styles.container}>
        <SafeAreaView>
          <TextWithIcon iconname="user-o" label="Name " value={name} />
          <TextWithIcon iconname="user" label="Surname " value={surname} />
          <TextWithIcon iconname="transgender" label="Sex " value={sex} />
          <TextWithIcon
            iconname="birthday-cake"
            label="Birthdate "
            value={moment(dateOfBirth, "YYMMDD").format("DD-MM-YYYY")}
          />
          <TextWithIcon
            iconname="calendar"
            label="Expiry Date "
            value={moment(expiryDate, "YYMMDD").toString()}
          />
          <TouchableOpacity style={styles.button} onPress={createAppForm}>
            <View style={styles.row}>
              <FontAwesome name="download" size={40} color="white" />
              <Text style={styles.text}>CREATE APPLICATION FORM</Text>
            </View>
          </TouchableOpacity>
        </SafeAreaView>
      </ScrollView>
    );
  }
}

export default Info;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#005FFD"
  },
  button: {
    justifyContent: "center",
    alignItems: "center"
  },
  row: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  text: {
    fontSize: 22,
    color: "white",
    alignItems: "center",
    padding: 5
  },
  text2: {
    fontSize: 25,
    color: "white",
    justifyContent:"center",
    alignItems: "center",
    padding: 5
  },
  general: {
    alignItems: "center",
    justifyContent: "space-around"
  }
});
