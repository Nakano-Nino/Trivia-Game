import React, { useState } from "react";
import { Image, View, StyleSheet, TouchableOpacity, Text } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { GrTrophy } from "react-icons/gr";
import LottieView from "lottie-react-native";
const Question = () => {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);

  const handlePress = (option: number) => {
    setSelectedOption(option);
  };
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Image style={styles.background} source={require("../assets/bg2.png")} />
      <View
        style={{
          width: 30,
          height: 30,
          top: 100,
          position: "relative",
          marginTop: -90,
          marginLeft: 352,
        }}
      >
        <LottieView
          source={require("../assets/lottivew/trophy.json")}
          autoPlay
          loop
        />
        <Text
          style={{
            color: "white",
            fontSize: 11,
            fontWeight: "bold",
            textAlign: "center",
          }}
        >
          1220
        </Text>
      </View>
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Image
          style={styles.imageQuestion}
          source={require("../assets/content1.jpeg")}
        />
        <TouchableOpacity onPress={() => handlePress(1)}>
          <View
            style={[
              styles.listQuestion,
              selectedOption === 1 ? { backgroundColor: "yellow" } : null,
            ]}
          >
            <Text style={styles.nameQuestion}>lee min gooo</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handlePress(2)}>
          <View
            style={[
              styles.listQuestion,
              selectedOption === 2 ? { backgroundColor: "yellow" } : null,
            ]}
          >
            <Text style={styles.nameQuestion}>lee min gooo</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handlePress(3)}>
          <View
            style={[
              styles.listQuestion,
              selectedOption === 3 ? { backgroundColor: "yellow" } : null,
            ]}
          >
            <Text style={styles.nameQuestion}>lee min gooo</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handlePress(4)}>
          <View
            style={[
              styles.listQuestion,
              selectedOption === 4 ? { backgroundColor: "yellow" } : null,
            ]}
          >
            <Text style={styles.nameQuestion}>lee min gooo</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handlePress(5)}>
          <View
            style={[
              styles.listQuestion,
              selectedOption === 5 ? { backgroundColor: "yellow" } : null,
            ]}
          >
            <Text style={styles.nameQuestion}>lee min gooo</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Question;
const styles = StyleSheet.create({
  background: {
    position: "absolute",
    width: "100%",
    height: "100%",
  },
  listQuestion: {
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
  nameQuestion: {
    flex: 1,
    fontSize: 16,
    height: 40,
    padding: 10,
    textAlign: "center",
    fontWeight: "bold",
  },
  imageQuestion: {
    // position: "absolute",
    marginTop: 100,
    width: 300,
    height: 300,
    borderRadius: 10,
  },
});
