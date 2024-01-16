import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import {
  FlatList,
  ScrollView,
  TouchableOpacity,
} from "react-native-gesture-handler";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

import { MaterialIcons } from "@expo/vector-icons"
import Avatar from "../components/Avatar"
import { FaEdit } from "react-icons/fa"
import { jwtDecode } from "jwt-decode"

interface DataAvatar {
  id: string;
  name: string;
  imageUrl: string;
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
  ];
  const [userInput, setUserInput] = useState("");
  const [selectedAvatar, setSelectedAvatar] = useState<DataAvatar | null>(null);
  const navigation = useNavigation();

  const handleUpdate = async () => {
    try {
      const userDataString = await AsyncStorage.getItem("user")
      console.log("User data string:", userDataString)
      const token = JSON.parse(userDataString || "{}")
      if (userDataString !== null) {
        const userDecode = jwtDecode(userDataString)
        console.log("ININININI", userDecode)

        if (!userDecode) {
          console.error("User data not found")
          return
        }
        // const userToken = userData.token

        // console.log("User token:", userToken)\
      }

      if (selectedAvatar) {
        const imageUrl = selectedAvatar.imageUrl
        const formData = new FormData()
        formData.append("name", userInput)
        formData.append("avatar", imageUrl)
        formData.append("diamond", "0")
        const response = await axios.patch(
          "https://wondrous-moth-complete.ngrok-free.app/api/v1/update-user",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${token}`,
            },
          }
        )
        const updatedUserData = response.data.data
        if (updatedUserData) {
          console.log("Update successful", updatedUserData)
          const newToken = updatedUserData.token
          await AsyncStorage.setItem("user", newToken)
          navigation.navigate("StartGame" as never)
        } else {
          console.error("Update failed - No updated user data in the response");
        }
      } else {
        console.error("Please select an avatar");
      }
    } catch (error) {
      console.error("Update failed", error);
    }
  };

  const handleTextChange = (text: string) => {
    setUserInput(text);
    console.log("Input Text:", text);
  };
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
              setSelectedAvatar(item);
              console.log("Selected Avatar:", item);
            }}
          >
            <Image
              style={[
                styles.avatar,
                selectedAvatar && selectedAvatar.id === item.id
                  ? styles.activeAvatar
                  : null,
              ]}
              source={{ uri: item.imageUrl }}
            />
          </TouchableOpacity>
        ))}
      </View>
      <View style={{ flex: 1, marginTop: 50 }}>
        <View style={styles.inputContainer}>
          <FaEdit style={styles.editIcon} />
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
  );
};
export default Profile;

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

  scrollView: {
    marginBottom: 150,
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
    marginBottom: 30,
    color: "white",
    fontWeight: "bold",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderColor: "transparent",
    marginBottom: 20,
    borderRadius: 5,
    backgroundColor: "white",
  },
  input: {
    flex: 1,
    fontSize: 16,
    height: 40,
    padding: 10,
  },
  editIcon: {
    marginLeft: 10,
    marginRight: 5,
    color: "black",
  },
  button: {
    backgroundColor: "#5ce1e6",
    padding: 10,
    width: 300,
    height: 50,
    borderRadius: 10,
    marginTop: 17,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    color: "#F2F2F2",
    position: "relative",
  },
  text: {
    color: "#0F1035",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 20,
    alignItems: "center",
    marginLeft: 10,
    alignContent: "center",
  },
  activeAvatar: {
    borderWidth: 2, // You can customize the style for the active avatar
    borderColor: "#5ce1e6", // Border color for the active avatar
  },
});
