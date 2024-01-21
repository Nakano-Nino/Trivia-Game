import React, { useState, useEffect } from "react";
import { View, StyleSheet, Image, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { initializeSocket } from "../utils/socket";
import Button from "../components/ButtonWithLogo";

const Podium = () => {
  const socket = initializeSocket();
  const navigate = useNavigation();
  const [data, setData] = useState([]);

  useEffect(() => {
    socket.emit("user", {score: 0});
    socket.on("user", (user) => {
      setData(user.sort((a:any, b:any) => b.score - a.score));
    })

    socket.emit('gameEnd');
    socket.on('gameEnd', () => {
    })

    return () => {
      socket.on('disconnect', () => {
        socket.off('gameEnd');
        socket.off('getQuest');
        socket.off('user');
        socket.off('joinLobby');
        socket.off('disconnect');
      })
    }
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Image style={styles.background} source={require("../assets/bg2.png")} />

      <View style={{ alignItems: "center" }}>
          <Text style={{ color: "white", fontSize: 35, fontWeight: "bold", marginTop: 30 }}>Congratulations!</Text>

          {data.length !== 0 &&
            data.map((user:any, index) => (
              <>
                {index == 0 && (
                  <View
                    style={{
                      marginTop: 20,
                      backgroundColor: "#F4CE14",
                      paddingHorizontal: 40,
                      paddingVertical: 20,
                      borderRadius: 10,
                      marginBottom: 13,
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 20,
                    }}
                  >
                    <Image
                      source={user.avatar}
                      style={{
                        width: 130,
                        height: 130,
                        borderRadius: 65,
                        borderColor: "white",
                        borderWidth: 2,
                      }}
                    />
                    <Text style={styles.nameText}>{user.name}</Text>
                  </View>
                )}

                {index !== 0 && (
                  <View style={[styles.optionButton]}>
                    <Image
                      source={user.avatar}
                      style={{
                        width: 50,
                        height: 50,
                        borderRadius: 100,
                        marginRight: 20,
                        borderColor: "white",
                        borderWidth: 2,
                      }}
                    />
                    <View style={{ marginLeft: 5 }}>
                      <Text style={styles.optionText}>{user.name}</Text>
                      <Text style={styles.scoreText}>Score: {user.score}</Text>
                    </View>
                  </View>
                )}
              </>
            ))}
            <View>
              <TouchableOpacity
                onPress={() => navigate.navigate("StartGame" as never)}
              >
                <Text>Back to Home</Text>
              </TouchableOpacity>
            </View>
        </View>

      {/* <View style={{ alignItems: "center" }}>
        <View
          style={{
            // marginBottom: 10,
            alignItems: "center",
            top: 370,
            marginLeft: -240,
          }}
        >
          <Image
            style={{
              alignItems: "center",
              top: 44,
              marginLeft: -285,
            }}
          >
            <View
              style={{
                alignItems: "center",
                width: 120,
                height: 120,
                top: 10,
              }}
            >
              <Image
                style={{
                  top: 10,
                  width: 120,
                  height: 120,
                }}
                source={require("../assets/avatar2.png")}
              />
            </View>
            <View style={{ margin: -100, top: 130 }}>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "bold",
                  textAlign: "center",
                  color: "white",
                }}
              >
                Bambang
              </Text>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "bold",
                  textAlign: "center",
                  color: "white",
                }}
              >
                1220
              </Text>
            </View>
          </View>
          <View
            style={{
              alignItems: "center",
              top: 6,
              marginLeft: 2,
            }}
          >
            <View
              style={{
                alignItems: "center",
                width: 120,
                height: 120,
                top: 10,
              }}
            >
              <Image
                style={{
                  top: 10,
                  width: 140,
                  height: 140,
                }}
                source={require("../assets/avatar1.png")}
              />
            </View>
            <View style={{ margin: 0, top: 70 }}>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "bold",
                  textAlign: "center",
                  color: "white",
                }}
              >
                Ucok (You)
              </Text>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "bold",
                  textAlign: "center",
                  color: "white",
                }}
              >
                1800
              </Text>
            </View>
          </View>
          <View
            style={{
              alignItems: "center",
              top: -130,
              marginLeft: 290,
            }}
          >
            <View
              style={{
                alignItems: "center",
                width: 120,
                height: 120,
                top: 10,
              }}
            >
              <Image
                style={{
                  top: 10,
                  width: 120,
                  height: 120,
                }}
                source={require("../assets/avatar3.png")}
              />
            </View>
            <View style={{ margin: 0, top: 30 }}>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "bold",
                  textAlign: "center",
                  color: "white",
                }}
              >
                Putri
              </Text>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "bold",
                  textAlign: "center",
                  color: "white",
                }}
              >
                1020
              </Text>
            </View>
          </View>
        </View>
      </View>
        <View style={{ alignItems: "center", position: "relative" }}>
          <Image
            style={{ width: 460, height: 180, top: 122, position: "relative" }}
            source={require("../assets/image/podium.png")}
          />
        </View> */}
    </View>
  );
};

export default Podium;
const styles = StyleSheet.create({
  background: {
    position: "absolute",
    width: "100%",
    height: "100%",
  },
  optionButton: {
    flexDirection: "row",
    backgroundColor: "#bbb",
    textShadowColor: "black",
    padding: 15,
    borderRadius: 20,
    marginVertical: 10,
    width: 300,
    alignItems: "center",
  },

  optionText: {
    color: "black",
    fontSize: 20,
    fontWeight: "bold",
    textShadowColor: "black",
    textShadowRadius: 2,
    textShadowOffset: { width: 1, height: 1 },
  },

  iconText: {
    width: 180,
    height: 180,
    marginRight: 5,
    position: "absolute",
    top: -55,
    left: -30,
    zIndex: 1,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
  },

  nameText: {
    color: "white",
    fontSize: 25,
    fontWeight: "bold",
    textAlign: "center",
    textShadowColor: "black",
    textShadowRadius: 2,
    textShadowOffset: { width: 1, height: 1 },
  },

  scoreText: {
    color: "#000",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },

  score: {
    marginRight: 5,
    position: "absolute",
    top: 10,
    left: 150,
    zIndex: 1,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
  },
});
