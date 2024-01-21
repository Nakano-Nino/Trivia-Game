import React, { useState, useEffect } from "react"
import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
<<<<<<< HEAD
} from "react-native"
import { FontAwesome } from "@expo/vector-icons"
import { FaEdit } from "react-icons/fa"
import { useNavigation, NavigationProp } from "@react-navigation/native"
import { StackNavigationProp } from "@react-navigation/stack"
import { jwtDecode } from "jwt-decode"

interface Player {
  id: string
  name: string
  score: number
  diamonds?: number
}

interface DecodedToken {
  id: string
  name: string
}
interface Question {
  id: string
  image_question: string
  A: string
  B: string
  C: string
  D: string
  answer: string
}
const dummyData = [
  { id: 1, avatar: require("../assets/avatar1.png"), name: "Guru Besar" },
  { id: 2, avatar: require("../assets/avatar2.png"), name: "Maell Lee" },
  { id: 3, avatar: require("../assets/avatar3.png"), name: "Yuda Prasetio" },
  { id: 4, avatar: require("../assets/avatar4.png"), name: "Bambang" },
]
type YourNavWigatorProps = {
  FindMatch: undefined
  Question: undefined
}
const FindMatch = () => {
  const token = localStorage.getItem("user") + ""
  const { id, name } = jwtDecode<DecodedToken>(token)
  const [socket, setSocket] = useState<any>(null)
  const [players, setPlayers] = useState<Player[]>([])
  const navigation = useNavigation<StackNavigationProp<YourNavWigatorProps>>()
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null)
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  const [isAnswerCorrect, setIsAnswerCorrect] = useState<boolean | null>(null)
=======
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { useNavigation, NavigationProp  } from "@react-navigation/native";
import { jwtDecode } from "jwt-decode";

// socket client
import { initializeSocket } from "../utils/socket";
import { FlatList } from "react-native-gesture-handler";

interface DecodedToken {
  avatar: string
  name: string
  diamond: string
  email: string
}

const FindMatch = () => {
  const navigate = useNavigation();

  // get user info
  const token = localStorage.getItem("user") + "";
  const { avatar, name } = jwtDecode<DecodedToken>(token);

// socket options
const [data, setData] = useState<{name: string, avatar:string, id: string}[]>([])
const [time, setTime] = useState(10)
const socket = initializeSocket();

useEffect(() => {
  socket.connect();
  return () => {
    socket.disconnect();
  };
}, [socket]);

useEffect(() => {
  if (name !== '') {
    socket.emit('joinLobby', {
      name: name,
      avatar: avatar
    })

    socket.on('joinLobby', (user, timeout) => {
      setTime(timeout)

      if (user === 'start') {
        setTimeout(() => {
          navigate.navigate("Question" as never)
        }, 3000)
        return;
      }
      setData(user)
    })
  }
}, [name])

  const renderItem = ({item} : any) => (
    <View style={styles.table}>
      <View style={styles.avatarContainer}>
        <Image source={item.avatar} style={styles.avatarImage} />
        <Text style={styles.avatarName}>{item.name}</Text>
      </View>
    </View>
  )
>>>>>>> 2c8de2f172ad2fd0f7c1ad6b9a83139fe0c2dd8e

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Image style={styles.background} source={require("../assets/bg2.png")} />
      <View>
        <TouchableOpacity
          style={styles.buttonClose}
          // onPress={toggleModalDiamond}
        >
          <FontAwesome
            style={styles.buttonCloseText}
            name="times"
            size={24}
            color="black"
            width={100}
          />
        </TouchableOpacity>
      </View>
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          marginBottom: 100,
        }}
      >
        <Text style={{ fontSize: 30, fontWeight: "bold", color: "white" }}>
          {time} s
        </Text>
        <Text style={{ fontSize: 30, fontWeight: "bold", color: "white" }}>
          Finding Oppenent
        </Text>
        <Text style={{ fontSize: 30, fontWeight: "bold", color: "white" }}>
          {data.length} / 4
        </Text>
        <FlatList
              data={data}
              horizontal={false}
              renderItem={renderItem}
              keyExtractor={(item) => item.id.toString()}
              contentContainerStyle={{ marginTop: 30 }}
            />
      </View>
    </View>
  )
}

export default FindMatch

const styles = StyleSheet.create({
  background: {
    position: "absolute",
    width: "100%",
    height: "100%",
  },

  editIcon: {
    marginLeft: 10,
    marginRight: 5,
    color: "black",
  },
  input: {
    flex: 1,
    fontSize: 16,
    height: 40,
    padding: 10,
    textAlign: "center",
    fontWeight: "bold",
  },
  button: {
    backgroundColor: "#FFFFFF",
    padding: 10,
    width: 300,
    height: 50,
    borderRadius: 10,
    marginTop: 17,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  logo2: {
    width: 40,
    height: 40,
    marginLeft: 10,
    backgroundColor: "white",
  },
  buttonClose: {
    padding: 1,
    backgroundColor: "red",
    borderRadius: 10,
    alignItems: "center",
    height: 30,
    width: 30,
    marginTop: 10,
    marginLeft: 350,
  },
  buttonCloseText: {
    color: "black",
    fontWeight: "bold",
    fontSize: 26,
  },
  table : {
    alignItems: "center",
    margin: 10,
    marginTop: 20,
  },
  avatarContainer: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center"
  },
  avatarImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10
  },
  avatarName: {
    color: "white",
  }
});
