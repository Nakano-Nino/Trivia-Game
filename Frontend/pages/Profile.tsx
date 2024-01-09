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
import axios from "axios"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { useNavigation } from "@react-navigation/native"

interface DataAvatar {
  id: string
  name: string
  imageUrl: string
}
const Profile = () => {
  const data: DataAvatar[] = [
    {
      id: "1",
      name: "John",
      imageUrl:
        "https://res.cloudinary.com/dsbrglrly/image/upload/f_auto,q_auto/v1/User%20Avatar/yehzdlmsq8zni6r2avyw",
    },
    {
      id: "2",
      name: "Jane",
      imageUrl:
        "https://res.cloudinary.com/dsbrglrly/image/upload/f_auto,q_auto/v1/User%20Avatar/jhfhkp00tysoyfirstgv",
    },
    {
      id: "3",
      name: "Bob",
      imageUrl:
        "https://res.cloudinary.com/dsbrglrly/image/upload/f_auto,q_auto/v1/User%20Avatar/in7gudtnpbh3ucgarocb",
    },
    {
      id: "4",
      name: "Alice",
      imageUrl:
        "https://res.cloudinary.com/dsbrglrly/image/upload/f_auto,q_auto/v1/User%20Avatar/swhikj7jcrxtsztnsxm1",
    },
    {
      id: "5",
      name: "Bob",
      imageUrl:
        "https://res.cloudinary.com/dsbrglrly/image/upload/f_auto,q_auto/v1/User%20Avatar/ehjgvkthssavhudq7fz3",
    },
    {
      id: "6",
      name: "Bob",
      imageUrl:
        "https://res.cloudinary.com/dsbrglrly/image/upload/f_auto,q_auto/v1/User%20Avatar/eghrmfdgmuqcvnsebzbq",
    },
    {
      id: "7",
      name: "Bob",
      imageUrl:
        "https://res.cloudinary.com/dsbrglrly/image/upload/f_auto,q_auto/v1/User%20Avatar/dxhjxxux57ugnqpdvnlc",
    },
    {
      id: "8",
      name: "Bob",
      imageUrl:
        "https://res.cloudinary.com/dsbrglrly/image/upload/f_auto,q_auto/v1/User%20Avatar/aa3darcpdkbp6jiclt7b",
    },
    {
      id: "9",
      name: "Bob",
      imageUrl:
        "https://res.cloudinary.com/dsbrglrly/image/upload/f_auto,q_auto/v1/User%20Avatar/qxf1nihaueiuu9cnbuzb",
    },
    {
      id: "10",
      name: "Bob",
      imageUrl:
        "https://res.cloudinary.com/dsbrglrly/image/upload/f_auto,q_auto/v1/User%20Avatar/bau5xru0wnsn8n4geiow",
    },
    {
      id: "11",
      name: "Bob",
      imageUrl:
        "https://res.cloudinary.com/dsbrglrly/image/upload/f_auto,q_auto/v1/User%20Avatar/pkmvxy44mwbr47zq1j3v",
    },
    {
      id: "12",
      name: "Bob",
      imageUrl:
        "https://res.cloudinary.com/dsbrglrly/image/upload/f_auto,q_auto/v1/User%20Avatar/kvj9hbzge1kcqeg9gkih",
    },
  ]
  const [userInput, setUserInput] = useState("")
  const [selectedAvatar, setSelectedAvatar] = useState<DataAvatar | null>(null)
  const navigation = useNavigation()

  const handleUpdate = async () => {
    try {
      const userDataString = await AsyncStorage.getItem("user")
      console.log(userDataString)

      if (!userDataString) {
        console.error("User data not found")
        return
      }
      const userData = JSON.parse(userDataString)
      console.log("User data:", userData)

      const userToken = userData.token

      console.log("User token:", userToken)

      if (selectedAvatar) {
        const imageUrl = selectedAvatar.imageUrl
        const formData = new FormData()
        formData.append("name", userInput)
        formData.append("avatar", imageUrl)
        const response = await axios.patch(
          "http://localhost:8000/api/v1/updateUser",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${userData}`,
            },
          }
        )
        // Check if the server response contains the updated user information
        const updatedUserData = response.data.data
        if (updatedUserData) {
          console.log("Update successful", updatedUserData)
          const newToken = updatedUserData.token
          await AsyncStorage.setItem("user", newToken)
          navigation.navigate("StartGame" as never)
          // If you want to update the UI with the new user data, use a state or any other appropriate mechanism
          // Example: setUserName(updatedUserData.name);
        } else {
          console.error("Update failed - No updated user data in the response")
        }
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
            value={userInput}
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
