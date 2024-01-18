// App.tsx
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button, FlatList, Alert, Image } from 'react-native';
import io from 'socket.io-client';

interface Player {
  id: string;
  name: string;
  score: number;
  diamonds?: number;
}

interface Question {
  id: string;
  image_question: string;
  A: string;
  B: string;
  C: string;
  D: string;
  answer: string;
}

const Socket = () => {
  const [socket, setSocket] = useState<any>(null);
  const [players, setPlayers] = useState<Player[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isAnswerCorrect, setIsAnswerCorrect] = useState<boolean | null>(null);

  useEffect(() => {
    if (socket) {
      socket.on('startGame', (players: Player[]) => {
        setPlayers(players);
      });

      socket.on('question', (question: Question) => {
        setCurrentQuestion(question);
        setSelectedAnswer(null);
        setIsAnswerCorrect(null);
      });

      socket.on('revealAnswer', (data: { correctAnswer: string; playerChoices: any[] }) => {
        // Check if the selected answer is correct
        const isCorrect = selectedAnswer === data.correctAnswer;
        setIsAnswerCorrect(isCorrect);
  
        // Update the score for the current player
        if (isCorrect) {
          setPlayers((prevPlayers) =>
            prevPlayers.map((player) => {
              if (player.id === socket.id) { // Assuming the player's ID matches the socket ID
                return { ...player, score: player.score + 1 }; // Update score
              }
              console.log(player.score, "ini score")
              return player;
            })
          );
        }
      });

      socket.on('endGame', (data: { rankedPlayers: Player[] }) => {
        setPlayers(data.rankedPlayers);
        setCurrentQuestion(null);
        Alert.alert('Game Over', 'The game has ended. Check the final scores!');
      });

      socket.on('disconnect', () => {
        Alert.alert('Disconnected', 'You have been disconnected from the game.');
        setSocket(null);
        setCurrentQuestion(null);
        setPlayers([]);
      });

      return () => {
        socket.off('startGame');
        socket.off('question');
        socket.off('revealAnswer');
        socket.off('endGame');
        socket.off('disconnect');
      };
    }
  }, [socket, selectedAnswer]);

  const handleStartGame = () => {
    const newSocket = io('http://localhost:5000');
    setSocket(newSocket);
    // Emit an event to the server to join the game
    newSocket.emit('joinGame', { name: 'Nandy' }); // Replace with actual player name or ID
  };

  const handleAnswer = (answer: string) => {
    setSelectedAnswer(answer);
    socket?.emit('answerQuestion', { questionId: currentQuestion?.id, answer });
  };

  const renderQuestion = () => {
    if (!currentQuestion) {
        return (
            <View>
              <Text>Waiting for the next question...</Text>
            </View>
          );
    }

    return (
    <View>
      <Image
        source={{ uri: currentQuestion?.image_question }}
        style={styles.questionImage}
        resizeMode="contain"
      />
      {['A', 'B', 'C', 'D'].map((option) => (
        <Button
          key={option}
          title={currentQuestion[option as keyof Question]}
          onPress={() => handleAnswer(option)}
          color={selectedAnswer === option ? 'blue' : '#f0f0f0'}
          disabled={!!selectedAnswer}
        />
      ))}
    </View>
    )
  };

  const renderAnswerResult = () => {
    if (selectedAnswer === null) return null;

    return (
      <View style={styles.answerResult}>
        <Text>Your answer: {selectedAnswer}</Text>
        <Text>
          {isAnswerCorrect ? 'Correct!' : 'Wrong!'} The correct answer was: {currentQuestion?.answer}
        </Text>
      </View>
    );
  };

  const renderPlayerList = () => (
    <FlatList
      data={players}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <Text style={styles.player}>
          {item.name} - Score: {item.score} {item.diamonds ? '10 💎' : ''}
        </Text>
      )}
    />
  );

  return (
    <View style={styles.container}>
      {!socket && <Button title="Start Game" onPress={handleStartGame} />}
      {currentQuestion && renderQuestion()}
      {renderAnswerResult()}
      {!currentQuestion && renderPlayerList()}
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#F5FCFF',
    },
    player: {
      fontSize: 18,
      margin: 4,
    },
    // questionContainer: {
    //   borderColor: 'black', // Style for the question container
    // },
    questionImage: {
      width: '100%', // Adjust width as needed
      height: 300, // Adjust height as needed
      marginBottom: 20,
    },
    answerResult: {
      padding: 20,
      alignItems: 'center',
    },
  // Add more styles as needed
});

export default Socket;