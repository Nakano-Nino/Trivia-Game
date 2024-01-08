import React from "react"
import { Image, StyleSheet, View } from "react-native"

export default function BackgroundOpen() {
  return (
    <View>
      <Image style={styles.background} source={require("../assets/bg1.png")} />
    </View>
  )
}

const styles = StyleSheet.create({
  background: {
    position: "absolute",
    width: "100%",
    height: "100%",
  },
})
