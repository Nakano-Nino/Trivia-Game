import React, { useState } from "react"
import { StatusBar } from "expo-status-bar"
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native"
import {
  FlatList,
  ScrollView,
  TouchableOpacity,
} from "react-native-gesture-handler"
import axios, { Axios } from "axios"

interface DataAvatar {
  id: string
  name: string
  imageUrl: string
}
const Profile = () => {
  const data: DataAvatar[] = [
    { id: "1", name: "John", imageUrl: require("../assets/avatar1.png") },
    { id: "2", name: "Jane", imageUrl: require("../assets/avatar2.png") },
    { id: "3", name: "Bob", imageUrl: require("../assets/avatar3.png") },
    { id: "4", name: "Alice", imageUrl: require("../assets/avatar4.png") },
    { id: "5", name: "Bob", imageUrl: require("../assets/avatar5.png") },
    { id: "6", name: "Bob", imageUrl: require("../assets/avatar6.png") },
    { id: "7", name: "Bob", imageUrl: require("../assets/avatar7.png") },
    { id: "8", name: "Bob", imageUrl: require("../assets/avatar8.png") },
    { id: "9", name: "Bob", imageUrl: require("../assets/avatar9.png") },
    { id: "10", name: "Bob", imageUrl: require("../assets/avatar10.png") },
    { id: "11", name: "Bob", imageUrl: require("../assets/avatar11.png") },
    { id: "12", name: "Bob", imageUrl: require("../assets/avatar12.png") },
  ]
  const [userInput, setUserInput] = useState("")
  const [selectedAvatar, setSelectedAvatar] = useState<DataAvatar | null>(null)
  // const renderAvatar = ({ item }: { item: DataAvatar }) => (
  //   <Avatar imageUrl={item.imageUrl} name={item.name} />
  // )

  const handleUpdate = async () => {
    try {
      if (selectedAvatar) {
        const { id, imageUrl } = selectedAvatar
        const response = await axios.patch(
          "http://localhost:8000/api/v1/updateUser",
          {
            name: userInput,
            avatar: { id, imageUrl },
          }
        )
        console.log("Update successful", response.data)
      } else {
        console.error("Please select an avatar")
      }
    } catch (error) {
      console.error("Update failed", error)
    }
  }

  const handleTextChange = (text: string) => {
    setUserInput(text)
    console.log("Input Text:", text)
  }
  return (
    <View style={styles.container}>
      <Image style={styles.background} source={require("../assets/bg2.png")} />
      <Image style={styles.logo1} source={require("../assets/logo1.png")} />
      <StatusBar style="auto" />
      {/* <View style={styles.avatar}></View> */}
      <Text style={styles.textup}>Select Your Avatar</Text>
      <View style={styles.grid}>
        {data.map((item) => (
          <TouchableOpacity
            key={item.id}
            onPress={() => {
              setSelectedAvatar(item)
              console.log("Selected Avatar:", item)
            }}
          >
            <Image style={styles.avatar} source={{ uri: item.imageUrl }} />
          </TouchableOpacity>
        ))}
      </View>
      <View style={{ flex: 1, marginTop: -200 }}>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Your Name"
            placeholderTextColor="gray"
            onChangeText={handleTextChange}
          />
        </View>
        <TouchableOpacity style={styles.button} onPress={handleUpdate}>
          <Text style={styles.text}>Continue</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}
export default Profile

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  background: {
    position: "absolute",
    width: "100%",
    height: "100%",
  },
  logo1: {
    width: 150,
    height: 150,
    position: "relative",
    marginTop: 5,
    marginRight: 20,
  },
  button: {
    backgroundColor: "#5ce1e6",
    padding: 10,
    width: 300,
    height: 50,
    borderRadius: 17,
    marginTop: 17,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    color: "#F2F2F2",
    position: "relative",
  },
  text: {
    color: "black",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 20,
    alignItems: "center",
    marginLeft: 10,
    alignContent: "center",
  },
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
  scrollView: {
    marginBottom: 150,
  },
  inputContainer: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 5,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    marginTop: 2,
  },
  textup: {
    fontSize: 20,
    marginBottom: 10,
    color: "white",
  },
})
