import React from "react";
import { View, StyleSheet, Image, Text } from "react-native";

const Podium = () => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Image style={styles.background} source={require("../assets/bg2.png")} />

      <View style={{ alignItems: "center" }}>
        <View
          style={{
            // marginBottom: 10,
            alignItems: "center",
            top: 370,
            marginLeft: -240,
          }}
        >
          <Image
            style={{
              width: 70,
              height: 70,
              justifyContent: "center",
              alignContent: "center",
            }}
            source={require("../assets/avatar1.png")}
          />
          <Text
            style={{ fontWeight: "bold", fontSize: 15, textAlign: "center" }}
          >
            Lee Min Goo
          </Text>
          <Text
            style={{ fontWeight: "bold", fontSize: 15, textAlign: "center" }}
          >
            4700
          </Text>
        </View>
        <View
          style={{
            // marginBottom: 10,
            alignItems: "center",
            top: 210,
            marginLeft: 30,
          }}
        >
          <Image
            style={{
              width: 70,
              height: 70,
              justifyContent: "center",
              alignContent: "center",
            }}
            source={require("../assets/avatar2.png")}
          />
          <Text
            style={{ fontWeight: "bold", fontSize: 15, textAlign: "center" }}
          >
            Lee Min Goo
          </Text>
          <Text
            style={{ fontWeight: "bold", fontSize: 15, textAlign: "center" }}
          >
            2000
          </Text>
        </View>
        <View
          style={{
            // marginBottom: 10,
            alignItems: "center",
            top: 190,
            marginLeft: 300,
          }}
        >
          <Image
            style={{
              width: 70,
              height: 70,
              justifyContent: "center",
              alignContent: "center",
            }}
            source={require("../assets/avatar3.png")}
          />
          <Text
            style={{ fontWeight: "bold", fontSize: 15, textAlign: "center" }}
          >
            Lee Min Goo
          </Text>
          <Text
            style={{ fontWeight: "bold", fontSize: 15, textAlign: "center" }}
          >
            1222
          </Text>
        </View>
      </View>
        <View style={{ alignItems: "center", position: "relative" }}>
          <Image
            style={{ width: 460, height: 180, top: 122, position: "relative" }}
            source={require("../assets/image/podium.png")}
          />
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
});
