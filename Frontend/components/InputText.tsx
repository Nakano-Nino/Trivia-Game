import React from "react"
import { StyleSheet, View } from "react-native"
import { TextInput } from "react-native-gesture-handler"

export default function InputText() {
  return (
    <View>
      <TextInput
        style={styles.input}
        placeholder="Your Name"
        placeholderTextColor="gray"
      />
    </View>
  )
}
const styles = StyleSheet.create({
  input: {
    backgroundColor: "white",
    padding: 10,
    width: 300,
    height: 50,
    borderRadius: 17,
    marginTop: 250,
    color: "black",
    fontSize: 18,
  },
})
