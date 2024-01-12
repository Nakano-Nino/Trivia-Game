import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import { FontAwesome } from "@expo/vector-icons";

const FindMatch = ( ) => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Image style={styles.background} source={require("../assets/bg2.png")} />
      <Text>FindMatch</Text>
    </View>
  )
}

export default FindMatch

const styles = StyleSheet.create({
  background: {
    position: "absolute",
    width: "100%",
    height: "100%",
  },
})