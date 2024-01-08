import React from "react"
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
import { MaterialIcons } from "@expo/vector-icons"
import Avatar from "../components/Avatar"

interface DataAvatar {
  id: string
  name: string
  imageUrl: string
}
const Profile = () => {
  const data: DataAvatar[] = [
    { id: "1", name: "John", imageUrl: "../assets/avatar1.png" },
    { id: "2", name: "Jane", imageUrl: "../assets/avatar2.png" },
    { id: "3", name: "Bob", imageUrl: "../assets/avatar3.png" },
    { id: "4", name: "Alice", imageUrl: "../assets/avatar4.png" },
    { id: "5", name: "Mike", imageUrl: "../assets/avatar5.png" },
    { id: "6", name: "Emily", imageUrl: "../assets/avatar6.png" },
    { id: "7", name: "David", imageUrl: "../assets/avatar7.png" },
    { id: "8", name: "Sarah", imageUrl: "../assets/avatar8.png" },
    { id: "9", name: "Michael", imageUrl: "../assets/avatar9.png" },
    { id: "10", name: "Olivia", imageUrl: "../assets/avatar10.png" },
    { id: "11", name: "Daniel", imageUrl: "../assets/avatar11.png" },
    { id: "12", name: "Emma", imageUrl: "../assets/avatar12.png" },
  ]

  const renderAvatar = ({ item }: { item: DataAvatar }) => (
    <Avatar imageUrl={item.imageUrl} name={item.name} />
  )
  return (
    <View style={styles.container}>
      <Image style={styles.background} source={require("../assets/bg2.png")} />
      <Image style={styles.logo1} source={require("../assets/logo1.png")} />
      <StatusBar style="auto" />
      {/* <View style={styles.avatar}></View> */}
      <Text style={styles.textup}>Select Your Avatar</Text>
      <View style={styles.grid}>
        <TouchableOpacity>
          <Image
            style={styles.avatar}
            source={require("../assets/avatar1.png")}
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image
            style={styles.avatar}
            source={require("../assets/avatar2.png")}
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image
            style={styles.avatar}
            source={require("../assets/avatar3.png")}
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image
            style={styles.avatar}
            source={require("../assets/avatar4.png")}
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image
            style={styles.avatar}
            source={require("../assets/avatar5.png")}
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image
            style={styles.avatar}
            source={require("../assets/avatar6.png")}
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image
            style={styles.avatar}
            source={require("../assets/avatar7.png")}
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image
            style={styles.avatar}
            source={require("../assets/avatar8.png")}
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image
            style={styles.avatar}
            source={require("../assets/avatar9.png")}
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image
            style={styles.avatar}
            source={require("../assets/avatar10.png")}
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image
            style={styles.avatar}
            source={require("../assets/avatar11.png")}
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image
            style={styles.avatar}
            source={require("../assets/avatar12.png")}
          />
        </TouchableOpacity>
      </View>
      <View style={{ flex: 1, marginTop: -200 }}>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Your Name"
            placeholderTextColor="gray"
          />
          {/* <MaterialIcons
            name="drive-file-rename-outline"
            size={30}
            color="black"
            style={styles.icon}
          /> */}
        </View>
        <TouchableOpacity style={styles.button}>
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
