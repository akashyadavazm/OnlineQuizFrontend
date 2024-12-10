import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';

const API_BASE_URL = "http://10.0.2.2:5000"; // Replace with your backend API base URL

const QuizList = ({ navigation }) => {
  const [quizzes, setQuizzes] = useState([]);  // State to store quizzes
  const [loading, setLoading] = useState(true); // State for loading indicator

  // Fetch quizzes from the backend API
  useEffect(() => {
    fetch(`${API_BASE_URL}/quizzes`)
      .then((response) => {
        console.log("Response status:", response.status);
        return response.json();
      })
      .then((data) => {
        console.log("Fetched quizzes:", data);
        setQuizzes(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching quizzes: ", error);
        setLoading(false);
      });
  }, []);

  // Render quiz list or loading spinner
  if (loading) {
    return (
      <View style={styles.centered}>
        <Text>Loading quizzes...</Text>
      </View>
    );
  }

  // Render quiz list
  return (
    <ImageBackground 
    source={require('../components/BackgroundImage.png')} // Replace with your image URL or local image
      style={styles.container}
    >
      <Text style={styles.textItem}>Quizzes</Text>
      <FlatList
        data={quizzes}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.quizItem}
            onPress={() => navigation.navigate('Quiz', { quizId: item._id, quizTitle: item.title })}
          >
            <Text style={styles.quizText}>{item.title}</Text>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item._id}
      />
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    // No need to define backgroundColor here, as it's now handled by the ImageBackground
  },
  textItem: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    alignSelf: 'center',
    paddingVertical: 5,
    paddingHorizontal: 20,
    borderRadius: 100,
    marginBottom: 20,
    shadowColor: '#fff',
    elevation: 5,
  },
  quizItem: {
    padding: 15,
    marginVertical: 10,
    backgroundColor: 'rgba(173, 216, 230, 0.9)',
    borderRadius: 20,
  },
  quizText: {
    fontSize: 18,
    textAlign: 'center',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default QuizList;
