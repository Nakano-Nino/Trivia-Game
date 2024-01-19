import React, { useEffect, useState } from "react"
import { StatusBar } from "expo-status-bar"
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

import { MaterialIcons } from "@expo/vector-icons";
import Avatar from "../components/Avatar";
import { FaEdit } from "react-icons/fa";
import { jwtDecode } from "jwt-decode";
import LottieView from "lottie-react-native";

interface DataAvatar {
  id: string
  name: string
  price: number
  secureurl: string
}
const Profile = () => {
  const [userInput, setUserInput] = useState("")
  const [selectedAvatar, setSelectedAvatar] = useState<DataAvatar | null>(null)
  const [avatars, setAvatars] = useState<DataAvatar[]>([])
  const navigation = useNavigation()

  useEffect(() => {
    const fetchAvatars = async () => {
      try {
        const response = await axios.get(
          "https://wondrous-moth-complete.ngrok-free.app/api/v1/get-avatars",
          { headers: { "ngrok-skip-browser-warning": "true" } }
        )
        const avatarsData = response.data.data
        setAvatars(avatarsData)
        console.log("Avatars data:", avatarsData)
      } catch (error) {
        console.error("Error fetching avatars:", error)
      }
    }

    fetchAvatars()
  }, [])

  const handleUpdate = async () => {
    try {
      const userDataString = await AsyncStorage.getItem("user");
      console.log("User data string:", userDataString);
      const token = JSON.parse(userDataString || "{}");
      if (userDataString !== null) {
        const userDecode = jwtDecode(userDataString);
        console.log("ININININI", userDecode);

        if (!userDecode) {
          console.error("User data not found");
          return;
        }
      }

      if (selectedAvatar) {
        const imageUrl = selectedAvatar.secureurl
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
        );
        const updatedUserData = response.data.data;
        if (updatedUserData) {
          console.log("Update successful", updatedUserData);
          const newToken = updatedUserData.token;
          await AsyncStorage.setItem("user", newToken);
          navigation.navigate("StartGame" as never);
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
      <Text style={styles.textup}>Select Your Avatar</Text>
      <View style={styles.grid}>
        {avatars
          .filter((avatar) => avatar.price === 0)
          .map((item) => (
            <TouchableOpacity
              key={item.id}
              onPress={() => {
                setSelectedAvatar(item)
                console.log("Selected Avatar:", item)
              }}
            >
              <Image
                style={[
                  styles.avatar,
                  selectedAvatar && selectedAvatar.id === item.id
                    ? styles.activeAvatar
                    : null,
                ]}
                source={{ uri: item.secureurl }}
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
        <View style={styles.button} >
        <TouchableOpacity onPress={handleUpdate} style={{width: 250}}>
          <LottieView
            source={require("../assets/lottivew/continuButton.json")}
            autoPlay
            loop
          />
        </TouchableOpacity>
        </View>
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
    marginTop: 10,

    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
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
