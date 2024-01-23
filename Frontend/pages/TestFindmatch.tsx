import React, { useState, useEffect } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { jwtDecode } from "jwt-decode";
import { initializeSocket } from "../utils/socket";
import { FlatList } from "react-native-gesture-handler";
import LottieView from "lottie-react-native";

const TestFindmatch = () => {
  const [data, setData] = useState<
    { name: string; avatar: string; id: string }[]
  >([]);
  const [time, setTime] = useState(10);
  const token = localStorage.getItem("user") + "";

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Image style={styles.background} source={require("../assets/bg2.png")} />
      <View style={styles.table}></View>
      <View>
        <TouchableOpacity
          style={styles.buttonClose}
          // onPress={toggleModalDiamond}
        >
          {/* <FontAwesome
            style={styles.buttonCloseText}
            name="times"
            size={24}
            color="black"
            width={100}
          /> */}
                  <LottieView
          source={require("../assets/lottivew/backArrow.json")}
          autoPlay
          loop
        />
        </TouchableOpacity>
      </View>

{/* image */}
      <View>
        <View
          style={{
            flexDirection: "row", // Set the direction to row
            alignItems: "center", // Center items vertically
            backgroundColor: "rgba(255, 255, 255, 0.5)",
            borderRadius: 10,
            width: 300,
            paddingBottom: 6,
            marginVertical: 10, // Add margin for spacing
          }}
        >
          <Image
            style={{
              width: 70,
              height: 70,
              top: 4,
              left: 4,
              borderRadius: 50,
            }}
            source={require("../assets/avatar1.png")}
          />
          <Text
            style={{
              color: "black",
              fontSize: 18,
              fontWeight: "bold",
              marginLeft: 13,
            }}
          >
            bangbang
          </Text>
        </View>
      </View>
      <View>
        <View
          style={{
            flexDirection: "row", // Set the direction to row
            alignItems: "center", // Center items vertically
            backgroundColor: "rgba(255, 255, 255, 0.5)",
            borderRadius: 10,
            width: 300,
            paddingBottom: 8,
            marginVertical: 10, // Add margin for spacing
          }}
        >
          <Image
            style={{
              width: 70,
              height: 70,
              top: 4,
              left: 4,
              borderRadius: 50,
            }}
            source={require("../assets/avatar1.png")}
          />

          <Text
            style={{
              color: "black",
              fontSize: 18,
              fontWeight: "bold",
              marginLeft: 13,
            }}
          >
            bangbang
          </Text>
        </View>
      </View>

      {/* image end */}

      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          marginBottom: 100,
        }}
      >
        <Text style={{ fontSize: 30, fontWeight: "bold", color: "white" }}>
          {time} s
        </Text>
        <Text style={{ fontSize: 30, fontWeight: "bold", color: "white" }}>
          Finding Opponent
        </Text>
        <Text style={{ fontSize: 30, fontWeight: "bold", color: "white" }}>
          {data.length} / 4
        </Text>
      </View>
    </View>
  );
};

export default TestFindmatch;

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
    backgroundColor: "white",
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
  table: {
    alignItems: "center",
    margin: 10,
    marginTop: 20,
  },
});
