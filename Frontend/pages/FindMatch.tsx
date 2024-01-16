import React from "react";
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { FaEdit } from "react-icons/fa";

const FindMatch = () => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Image style={styles.background} source={require("../assets/bg2.png")} />
      <View>
        <TouchableOpacity
          style={styles.buttonClose}
          // onPress={toggleModalDiamond}
        >
          <FontAwesome
            style={styles.buttonCloseText}
            name="times"
            size={24}
            color="black"
            width={100}
          />
        </TouchableOpacity>
      </View>
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center", marginBottom: 100 }}>
        <Text style={{ fontSize: 30, fontWeight: "bold", color: "white" }}>
          00 : 20
        </Text>
        <Text style={{ fontSize: 30, fontWeight: "bold", color: "white" }}>
          Finding Oppenent
        </Text>
        <Text style={{ fontSize: 30, fontWeight: "bold", color: "white" }}>
          4/5
        </Text>

        <TouchableOpacity style={styles.button}>
          <Image
            style={styles.logo2}
            source={require("../assets/avatar1.png")}
          />

          <Text style={styles.input}>Guru Besar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Image
            style={styles.logo2}
            source={require("../assets/avatar2.png")}
          />

          <Text style={styles.input}>Maell lee</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Image
            style={styles.logo2}
            source={require("../assets/avatar3.png")}
          />

          <Text style={styles.input}>Yuda Prasetio</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Image
            style={styles.logo2}
            source={require("../assets/avatar4.png")}
          />

          <Text style={styles.input}>Bambang</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default FindMatch;

const styles = StyleSheet.create({
  background: {
    position: "absolute",
    width: "100%",
    height: "100%",
  },

  editIcon: {
    marginLeft: 10,
    marginRight: 5,
    color: "black",
  },
  input: {
    flex: 1,
    fontSize: 16,
    height: 40,
    padding: 10,
    textAlign: "center",
    fontWeight: "bold",
  },
  button: {
    backgroundColor: "#FFFFFF",
    padding: 10,
    width: 300,
    height: 50,
    borderRadius: 10,
    marginTop: 17,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  logo2: {
    width: 40,
    height: 40,
    marginLeft: 10,
    backgroundColor: "white",
  },
  buttonClose: {
    padding: 1,
    backgroundColor: "red",
    borderRadius: 10,
    alignItems: "center",
    height: 30,
    width: 30,
    marginTop: 10,
    marginLeft: 350,
  },
  buttonCloseText: {
    color: "black",
    fontWeight: "bold",
    fontSize: 26,
  },
});
