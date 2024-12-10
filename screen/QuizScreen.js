import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Button, StyleSheet } from "react-native";

const API_BASE_URL = "http://10.0.2.2:5000"; // Replace with your backend API base URL

const QuizScreen = ({ navigation }) => {
  const [timeLeft, setTimeLeft] = useState(15); // 15 seconds per question
  const [answers, setAnswers] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [score, setScore] = useState(0);

  // Fetch the quiz data when the component mounts
  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/quizzes`);
        const data = await response.json();
        if (data.length > 0) {
          setSelectedQuiz(data[0]); // Selecting the first quiz for simplicity
          setQuestions(data[0].questions);
          setAnswers(new Array(data[0].questions.length).fill(null)); // Initialize answers array
        }
      } catch (error) {
        console.error("Error fetching quiz: ", error);
      }
    };

    fetchQuiz();
  }, []);

  // Timer countdown
  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
      return () => clearInterval(timer);
    } else {
      handleTimeout();
    }
  }, [timeLeft]);

  // Handle what happens when the timer runs out
  const handleTimeout = () => {
    if (currentQuestionIndex < questions.length - 1) {
      nextQuestion();
    } else {
      calculateScore();
    }
  };

  // Handle user selecting an answer
  const handleAnswer = (selectedOption) => {
    const updatedAnswers = [...answers];
    updatedAnswers[currentQuestionIndex] = selectedOption;
    setAnswers(updatedAnswers);
  };

  // Calculate the score for correct answers
  const calculateScore = () => {
    let totalScore = 0;

    answers.forEach((answer, index) => {
      if (answer === questions[index].correctAnswer) {
        totalScore += 1;
      }
    });

    setScore(totalScore);
    navigation.navigate("Results", { score: totalScore, questions, quizId: selectedQuiz._id });
  };

  // Navigate to the next question and reset timer
  const nextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setTimeLeft(15); // Reset timer for the next question
    }
  };

  // Navigate to the previous question
  const prevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      setTimeLeft(15); // Reset timer for the previous question
    }
  };

  if (!questions.length) {
    return <Text>Loading questions...</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.timer}>{`Time Left: ${timeLeft}s`}</Text>

      <View style={styles.questionContainer}>
        <Text style={styles.question}>{questions[currentQuestionIndex].question}</Text>
        {questions[currentQuestionIndex].options.map((option, i) => (
          <TouchableOpacity
            key={i}
            onPress={() => handleAnswer(option)}
            style={[
              styles.option,
              answers[currentQuestionIndex] === option && styles.selectedOption,
            ]}
          >
            <Text>{option}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.buttonContainer}>
        <View style={styles.buttonWrapper}>
          <Button title="Previous" onPress={prevQuestion} disabled={currentQuestionIndex === 0} />
        </View>
        {currentQuestionIndex < questions.length - 1 ? (
          <View style={styles.buttonWrapper}>
            <Button title="Next" onPress={nextQuestion} />
          </View>
        ) : (
          <View style={styles.buttonWrapper}>
            <Button title="Submit" onPress={calculateScore} />
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "skyblue",
  },
  timer: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  questionContainer: {
    marginBottom: 20,
    padding: 10,
    borderRadius: 5,
    backgroundColor: "#f0f0f0",
  },
  question: {
    fontSize: 18,
    marginBottom: 10,
    fontWeight: "bold",
  },
  option: {
    padding: 10,
    marginVertical: 5,
    backgroundColor: "#e0e0e0",
    borderRadius: 5,
  },
  selectedOption: {
    backgroundColor: "#d0e6f7",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  buttonWrapper: {
    flex: 1,
    marginHorizontal: 5, // Add spacing between buttons
  },
});

export default QuizScreen;