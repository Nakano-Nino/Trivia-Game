

import React from "react"
import { Image, View, StyleSheet, TouchableOpacity, Text } from "react-native"
import LottieView from "lottie-react-native"
import usePlay from "../hooks/usePlay"
import { ProgressBar, MD3Colors } from "react-native-paper"
import { jwtDecode } from "jwt-decode"

const TestQuestion = () => {
  const { user, selectOption, question, choices, handleAnswer, index } = usePlay()
  const token = localStorage.getItem("user") + ""
  const { avatar } = jwtDecode<any>(token)

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Image style={styles.background} source={require("../assets/bg2.png")} />
      <View
        style={{
          width: 40,
          height: 40,
          top: 100,
          position: "relative",
          marginTop: -90,
          marginLeft: 345,
        }}
      >
        <LottieView
          source={require("../assets/lottivew/trophy.json")}
          autoPlay
          loop
        />
        <Text
          style={{
            color: "white",
            fontSize: 15,
            fontWeight: "bold",
            textAlign: "center",
            marginTop: -5,
          }}
        >
          {user.score}
        </Text>
      </View>
      <Text
        style={{
          fontSize: 30,
          marginTop: 120,
          fontWeight: "bold",
          color: "white",
        }}
      >
        {/* {timer < 10 ? `0${timer}` : timer} */}
       12 second

      </Text>
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          top: -100,
        }}
      >
        <Image
          style={styles.imageQuestion}
          source={require("../assets/content11.jpeg")}
        />
        <View style={styles.optionsContainer}>
        {choices.map((option) => (
          <TouchableOpacity
            key={option}
            style={[
              styles.optionButton,
              selectOption == question[option] && styles.selectedAnswer,

              selectOption == question[option] && question.time == 0
                ? selectOption == question.answer
                  ? {
                    backgroundColor: "lime",
                    borderColor: "green",
                  }
                  : {
                    backgroundColor: "tomato",
                    borderColor: "red",
                  }
                : {
                  backgroundColor: "gray"
                },
            ]}
            disabled={question.time === 0}
            // onPress={() => handleAnswer(question[option])}
          >
            <Text style={[
              styles.optionText,
              selectOption == question[option] && { fontWeight: "bold" },
            ]}
            >
              {option.toUpperCase()} {question[option]}
            </Text>
            {selectOption == question[option] && (
              <Image
            //   source={{ uri: avatar }}
              style={styles.optionImage}
              source={require("../assets/content11.jpeg")}
              />
            )}
            {selectOption == question[option] && question.time === 0 && (
              <Image
            //   source={{ uri: user.avatar }}
              style={styles.optionImage}
              source={require("../assets/content11.jpeg")}
              />
            )}
          </TouchableOpacity>
        ))}

        {/* {question.time === 0 && (
          <Text style={{ fontSize: 24, fontWeight: "bold", color: "whitesmoke" }}>
          Jawaban Benar:{" "}
          <Text style={{ display: "flex", color: "white" }}>{question.answer}</Text>
        </Text>
        )} */}
         <ProgressBar
            progress={index / 5}
            color={MD3Colors.primary50}
            style={{ 
              height: 10, 
              width: "100%",
              marginHorizontal: "auto",
              marginTop: 30,}}
          />
        </View>
      </View>
    </View>
  )
}

export default TestQuestion
const styles = StyleSheet.create({
  background: {
    position: "absolute",
    width: "100%",
    height: "100%",
  },
//   listQuestion: {
//     backgroundColor: "#FFFFFF",
//     padding: 10,
//     width: 250,
//     height: 40,
//     borderRadius: 10,
//     marginTop: 10,
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "center",
//     position: "relative",
//   },
  // nameQuestion: {
  //   flex: 1,
  //   fontSize: 16,
  //   height: 40,
  //   padding: 10,
  //   textAlign: "center",
  //   fontWeight: "bold",
  // },
  imageQuestion: {
    position: "absolute",
    top: 120,
    width: 250,
    height: 250,
    borderRadius: 10,
  },
  optionsContainer: {
    position: "absolute",
    bottom: 50,
    top: 400,
  },
  optionButton: {
    backgroundColor: "#FFFFFF",
    padding: 10,
    width: 250,
    height: 40,
    borderRadius: 10,
    marginTop: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
   

  },
  selectedAnswer: {
    backgroundColor: "blue",
    borderColor: "blue",
  },
  optionText: {
    flex: 1,
    fontSize: 16,
    height: 40,
    padding: 10,
    textAlign: "left",
    fontWeight: "bold",
  },
  optionImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginLeft: 10,
  },
})
