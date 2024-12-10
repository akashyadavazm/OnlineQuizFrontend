import React from "react";
import { View, Text, FlatList, Button, StyleSheet } from "react-native";

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
      <Button
        title="View Leaderboard"
        onPress={() => navigation.navigate('Leaderboard', { quizId })}
      />
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
});

export default ResultsScreen;
