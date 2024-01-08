import React from "react"
import { StatusBar } from "expo-status-bar"
import { Image, Pressable, StyleSheet, Text, View } from "react-native"
import { TouchableOpacity } from "react-native-gesture-handler"
import * as WebBrowser from "expo-web-browser"
import * as Google from "expo-auth-session/providers/google"
import { useNavigation } from "@react-navigation/native"
import { useState } from "react"
import AsyncStorage from "@react-native-async-storage/async-storage"
import axios from "axios"

WebBrowser.maybeCompleteAuthSession()
interface UserInfo {
  picture?: string
  email: string
  verified_email: boolean
  name: string
}

const LandingPage = () => {
  const [authInProgress, setAuthInProgress] = useState(false)
  const navigate = useNavigation()
  const config = {
    webClientId:
      "864096410384-9kj4i25qqqsr2vkhpkhg8m0qmurk9ah7.apps.googleusercontent.com",
  }
  const [request, response, promptAsync] = Google.useIdTokenAuthRequest(config)

  const getLocalUser = async () => {
    try {
      const data = await AsyncStorage.getItem("user")
      if (!data) return null
      return JSON.parse(data) as UserInfo
    } catch (error) {
      console.log("Error getting local user:", error)
      return null
    }
  }

  const handlePress = async () => {
    const user = await getLocalUser()

    if (!user) {
      setAuthInProgress(true)
      const result = await promptAsync()
      if (result.type == "success") {
        const { params } = result
        axios.post("http://localhost:8000/api/v1/user", {
          idToken: params?.id_token,
        })
        console.log("ini params", params)

        navigate.navigate("Profile" as never)
      }
    } else {
      console.log(user)
      console.log("loaded locally")
    }
  }
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
  )
}
export default LandingPage

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
    marginTop: 40,
    marginRight: 20,
  },
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
