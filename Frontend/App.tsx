import React, { useEffect, useState } from "react"
import { NavigationContainer } from "@react-navigation/native"
import { createStackNavigator } from "@react-navigation/stack"
import { StatusBar } from "expo-status-bar"
import { StyleSheet, Text, View } from "react-native"
import LandingPage from "./pages/LandingPage"
import "react-native-gesture-handler"
import Profile from "./pages/Profile"
import SplashScreen from "./pages/SplashScreen"
import StartGame from "./pages/StartGame"
import FindMatch from "./pages/FindMatch"
import Question from "./pages/Question"
// import { store } from "./redux/store";
// import { Provider } from "react-redux";
const Stack = createStackNavigator()
const App = () => {
  return (
    <>
    {/* <Provider store={store}> */}
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Question">
          <Stack.Screen
            name="SplashScreen"
            component={SplashScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="LandingPage"
            component={LandingPage}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Profile"
            component={Profile}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="StartGame"
            component={StartGame}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="FindMatch"
            component={FindMatch}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Question"
            component={Question}
            options={{ headerShown: false }}
          />

        </Stack.Navigator>
      </NavigationContainer>
      {/* </Provider> */}
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
})
export default App
