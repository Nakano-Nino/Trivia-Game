import LottieView from "lottie-react-native";
import React, { useRef } from "react";
import { View, StyleSheet, Image, Text, TouchableOpacity } from "react-native";

const Podium = () => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Image style={styles.background} source={require("../assets/bg2.png")} />

      <View style={{ alignItems: "center", position: "relative", top: 80 }}>
        <Image
          style={{ width: 425, height: 400, position: "relative" }}
          source={require("../assets/image/awards.png")}
        />
      </View>

      <View
        style={{ alignItems: "center", marginTop: -100, position: "relative" }}
      >
        <View style={{ alignItems: "center", position: "relative", top: -100 }}>
          <View
            style={{
              alignItems: "center",
              top: 44,
              marginLeft: -285,
            }}
          >
            <View
              style={{
                alignItems: "center",
                width: 120,
                height: 120,
                top: 10,
              }}
            >
              <Image
                style={{
                  top: 10,
                  width: 120,
                  height: 120,
                }}
                source={require("../assets/avatar2.png")}
              />
            </View>
            <View style={{ margin: -100, top: 130 }}>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "bold",
                  textAlign: "center",
                  color: "white",
                }}
              >
                Bambang
              </Text>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "bold",
                  textAlign: "center",
                  color: "white",
                }}
              >
                1220
              </Text>
            </View>
          </View>
          <View
            style={{
              alignItems: "center",
              top: 6,
              marginLeft: 2,
            }}
          >
            <View
              style={{
                alignItems: "center",
                width: 120,
                height: 120,
                top: 10,
              }}
            >
              <Image
                style={{
                  top: 10,
                  width: 140,
                  height: 140,
                }}
                source={require("../assets/avatar1.png")}
              />
            </View>
            <View style={{ margin: 0, top: 70 }}>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "bold",
                  textAlign: "center",
                  color: "white",
                }}
              >
                Ucok (You)
              </Text>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "bold",
                  textAlign: "center",
                  color: "white",
                }}
              >
                1800
              </Text>
            </View>
          </View>
          <View
            style={{
              alignItems: "center",
              top: -130,
              marginLeft: 290,
            }}
          >
            <View
              style={{
                alignItems: "center",
                width: 120,
                height: 120,
                top: 10,
              }}
            >
              <Image
                style={{
                  top: 10,
                  width: 120,
                  height: 120,
                }}
                source={require("../assets/avatar3.png")}
              />
            </View>
            <View style={{ margin: 0, top: 30 }}>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "bold",
                  textAlign: "center",
                  color: "white",
                }}
              >
                Putri
              </Text>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "bold",
                  textAlign: "center",
                  color: "white",
                }}
              >
                1020
              </Text>
            </View>
          </View>
        </View>
      </View>
      <View>
        <TouchableOpacity>
          <Text
            style={{
              fontSize: 20,
              fontWeight: "bold",
              textAlign: "center",
              color: "white",
              top: -100,
            }}
          >
            Play Again
          </Text>
        </TouchableOpacity>
        <View style={styles.backButton}>
          <TouchableOpacity>
            <LottieView
              source={require("../assets/lottivew/back.json")}
              autoPlay
              loop
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Podium;
const styles = StyleSheet.create({
  background: {
    position: "absolute",
    width: "100%",
    height: "100%",
  },

  backButton: {
    position: "absolute",
    top: -50,
    // left: -100,
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
  input: {
    flex: 1,
    fontSize: 16,
    height: 40,
    padding: 10,
    textAlign: "center",
    fontWeight: "bold",
  },
  buttonFungsional: {
    backgroundColor: "#FFFFFF",
    padding: 10,
    width: 150,
    height: 50,
    borderRadius: 10,
    marginTop: 17,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  inputFungsional: {
    flex: 1,
    fontSize: 16,
    height: 40,
    padding: 10,
    textAlign: "center",
    fontWeight: "bold",
  },
  diamond: {
    width: 80,
    height: 80,
    top: 10,
    marginLeft: -18,
  },
});
