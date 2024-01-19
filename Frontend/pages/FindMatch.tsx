import React, { useState, useEffect } from "react";
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { useNavigation, NavigationProp  } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { jwtDecode } from "jwt-decode";

// socket client
import { socket } from "../utils/socket";
import { FlatList } from "react-native-gesture-handler";

type YourNavWigatorProps = {
  // Define your navigation stack properties here
  // For example:
  FindMatch: undefined;
  Question: undefined;
};

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


  //timer for the question start
  // const [timer, setTimer] = useState(15); 
  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setTimer((prevTimer) => {
  //       if (prevTimer > 0) {
  //         return prevTimer - 1;
  //       } else {
  //         clearInterval(interval); // Stop the interval when the timer reaches 0
  //         return 0;
  //       }
  //     });
  //   }, 1000);

  //   return () => clearInterval(interval);
  // }, []);
 //timer for the question end

//  useEffect(() => {
//   if (timer === 0) {
//     navigation.navigate("Question");
//   }
// }, [timer, navigation]);

// socket options
const [data, setData] = useState<{name: string, avatar:string, id: string}[]>([])
const [time, setTime] = useState(10)

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


// const [timer, setTimer] = useState(15)
  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setTimer((prevTimer) => {
  //       if (prevTimer > 0) {
  //         return prevTimer - 1
  //       } else {
  //         clearInterval(interval)
  //         return 0
  //       }
  //     })
  //   }, 1000)
  //   return () => clearInterval(interval)
  // }, [])

  const renderItem = ({item} : any) => (
    <View>
      <View>
        <Image source={{uri: item.avatar}} />
        <Text>{item.name}</Text>
      </View>
    </View>
  )

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
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center", marginBottom: 100 }}>
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
  );
};

export default FindMatch;

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
});
