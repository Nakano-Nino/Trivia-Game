import React, { useEffect } from "react"
import { StatusBar } from "expo-status-bar"
import { Image, Pressable, StyleSheet, Text, View } from "react-native"
import { TouchableOpacity } from "react-native-gesture-handler"
import * as WebBrowser from "expo-web-browser"
import * as Google from "expo-auth-session/providers/google"
import { useNavigation } from "@react-navigation/native"
import { useState } from "react"
import AsyncStorage from "@react-native-async-storage/async-storage"
import axios from "axios"
import { jwtDecode } from "jwt-decode"

WebBrowser.maybeCompleteAuthSession()
interface UserInfo {
  avatar?: string;
  email: string;
  name: string;
}

const LandingPage = () => {
  const [authInProgress, setAuthInProgress] = useState(false);
  const navigate = useNavigation();
  const config = {
    webClientId:
      "864096410384-9kj4i25qqqsr2vkhpkhg8m0qmurk9ah7.apps.googleusercontent.com",
    iosClientId:
      "864096410384-pthhacedloa46b2u2b6da9qq8lkmbvr7.apps.googleusercontent.com",
    androidClientId:
      "864096410384-ikomdd616qrka0phht2co23k0jgpbu7q.apps.googleusercontent.com",
  }
  const [request, response, promptAsync] = Google.useAuthRequest(config)

  const getLocalUser = async () => {
    try {
      const data = await AsyncStorage.getItem("user")
      if (data != null) {
        const newData = jwtDecode(data)
        return newData as UserInfo
      }

      if (!data) return null
    } catch (error) {
      console.log("Error getting local user:", error);
      return null;
    }
  };

  const handlePress = async () => {
    const user = await getLocalUser();

    if (!user) {
      setAuthInProgress(true);
      const result = await promptAsync();
      if (result.type == "success") {
        const user = await getUserInfo(
          result?.authentication?.accessToken || ""
        );

        const email = user?.email;

        axios
          .get(
            "https://wondrous-moth-complete.ngrok-free.app/api/v1/get-user",
            {
              params: { email },
              headers: { "ngrok-skip-browser-warning": "true" },
            }
          )
          .then((res) => {
            if (res.data.code == 404) {
              axios
                .post(
                  "https://wondrous-moth-complete.ngrok-free.app/api/v1/signup",
                  user
                )
                .then((res) => {
                  console.log(res);

                  if (res.data.code == 200) {
                    localStorage.setItem(
                      "user",
                      JSON.stringify(res?.data?.data.token)
                    )
                    AsyncStorage.setItem(
                      "user",
                      JSON.stringify(res?.data?.data.token)
                    )
                    navigate.navigate("Profile" as never)
                  }
                });
            } else {
              axios
                .post(
                  "https://wondrous-moth-complete.ngrok-free.app/api/v1/login",
                  { email: res.data.data.email },
                  { headers: { "ngrok-skip-browser-warning": "true" } }
                )

                .then((res) => {
                  console.log(res.data.data.token)

                  localStorage.setItem("user", res.data.data.token)
                  navigate.navigate("StartGame" as never)
                })
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
    } else {
      console.log(user)
      console.log("loaded locally")
      navigate.navigate("StartGame" as never)
    }
  };

  const getUserInfo = async (token: string) => {
    if (!token) return;
    try {
      const response = await fetch(
        "https://www.googleapis.com/userinfo/v2/me",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const user = await response.json();

      return user;

      // await AsyncStorage.setItem("user", JSON.stringify(user));
      // setAuthInProgress(false);
    } catch (error) {
      console.log("Error fetching user info:", error);
      setAuthInProgress(false);
    }
  };

  // useEffect(() => {
  //   AsyncStorage.getItem("user")
  // }, [])
  useEffect(() => {
    const checkUserSession = async () => {
      const user = await getLocalUser()
      if (user) {
        navigate.navigate("StartGame" as never)
      }
    }

    checkUserSession()
  }, [])
  return (
    <View style={styles.container}>
      <Image style={styles.background} source={require("../assets/bg1.png")} />
      <Image style={styles.logo1} source={require("../assets/logo1.png")} />
      <StatusBar style="auto" />
      <View style={{ flex: 1 }}>
        <TouchableOpacity onPress={handlePress} style={styles.button}>
          <Image style={styles.logo2} source={require("../assets/logo2.png")} />
          <Text style={styles.text}>Continue with Google</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default LandingPage;

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
    width: 400,
    height: 400,
    position: "relative",
    marginTop: 180,
    marginRight: 20,
  },
  logo2: {
    width: 30,
    height: 30,
    marginLeft: 10,
    backgroundColor: "white",
  },
  button: {
    backgroundColor: "#3081D0",
    padding: 10,
    width: 300,
    height: 50,
    borderRadius: 5,
    marginTop: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  text: {
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 20,
    alignItems: "center",
    marginLeft: 10,
  },
});
