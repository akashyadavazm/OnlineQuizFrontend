import React from "react";
import { View, Text, FlatList, Button, StyleSheet, TouchableOpacity } from "react-native";

const ResultsScreen = ({ route, navigation }) => {
  const { score, questions, quizId } = route.params || { score: 0, questions: [], quizId: null };

  return (
    <View style={styles.container}>
      <Text style={styles.scoreText}>{`Your Score: ${score}`}</Text>
      <FlatList
        data={questions}
        renderItem={({ item, index }) => (
          <View style={styles.questionContainer}>
            <Text style={styles.questionText}>{`Q${index + 1}: ${item.question}`}</Text>
            <Text style={styles.answerText}>{`Correct Answer: ${item.correctAnswer}`}</Text>
            <Text style={styles.explanationText}>{`Explanation: ${item.explanation}`}</Text>
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
      <TouchableOpacity
        style={styles.buttonContainer}
        onPress={() => navigation.navigate('Leaderboard', { quizId })}
      >
        <Text style={styles.buttonText}>View Leaderboard</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "skyblue",
  },
  scoreText: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  questionContainer: {
    marginBottom: 15,
    padding: 10,
    backgroundColor: "#e9ecef",
    borderRadius: 8,
  },
  questionText: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  answerText: {
    fontSize: 16,
    color: '#28a745', // Green for correct answer
    marginBottom: 5,
  },
  explanationText: {
    fontSize: 14,
    color: '#007bff', // Blue for explanation
    fontStyle: 'italic',
  },
  buttonContainer: {
    backgroundColor: "#007bff", // Button background color
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 25, // Rounded corners
    alignItems: "center", // Center the text inside the button
    justifyContent: "center",
  },
  buttonText: {
    color: "#fff", // White text
    fontSize: 15,
    fontWeight: "bold",
  },
});

export default ResultsScreen;
