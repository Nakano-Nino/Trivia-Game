<<<<<<< HEAD
import React from "react"
import { NavigationContainer } from "@react-navigation/native"
import { createStackNavigator } from "@react-navigation/stack"
import { StatusBar } from "expo-status-bar"
import { StyleSheet, Text, View } from "react-native"
import LandingPage from "./pages/LandingPage"
import "react-native-gesture-handler"
import Profile from "./pages/Profile"
import SplashScreen from "./pages/SplashScreen"
import StartGame from "./pages/StartGame"
=======
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import LandingPage from "./pages/LandingPage";
import "react-native-gesture-handler";
import Profile from "./pages/Profile";
import SplashScreen from "./pages/SplashScreen";
import StartGame from "./pages/StartGame";
// import ModalDiamond from "./components/ModalDiamond";
>>>>>>> b88226528a710d41138f634b1fff127abb1ca7a2

const Stack = createStackNavigator();
const App = () => {
  return (
    <>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="StartGame">
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
          {/* <Stack.Screen
            name="ModalDiamond"
            component={ModalDiamond}
            options={{ headerShown: false }}
          /> */}
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
export default App;
