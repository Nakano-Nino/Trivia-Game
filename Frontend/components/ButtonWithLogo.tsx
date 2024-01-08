import React from "react"
import { Image, Pressable, StyleSheet, Text, View } from "react-native"
import { TouchableOpacity } from "react-native-gesture-handler"

export default function Button() {
  return (
    <View>
      <TouchableOpacity style={styles.button}>
        <Image style={styles.logo2} source={require("../assets/logo2.png")} />
        <Text style={styles.text}>Continue with Google</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  logo2: {
    width: 20,
    height: 20,
    marginLeft: 20,
  },
  button: {
    backgroundColor: "white",
    padding: 10,
    width: 300,
    height: 50,
    borderRadius: 40,
    marginTop: 200,
    flexDirection: "row",
    alignItems: "center",
  },
  text: {
    color: "black",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 20,
    alignItems: "center",
    marginLeft: 10,
  },
})
