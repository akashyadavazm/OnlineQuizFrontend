import { useState, useEffect } from "react";
import { FlatList, View, Text, StyleSheet, ActivityIndicator } from "react-native";

const API_BASE_URL = "http://10.0.2.2:5000"; // Replace with your backend API URL

const LeaderboardScreen = ({ route }) => {
  const { quizId } = route.params || {};
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch leaderboard data when quizId changes
  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/quizzes`);
        const data = await response.json();
        if (data.length > 0) {
          setLeaderboard(data[0].scores);
          setLoading(false); // Stop loading
        }
      } catch (error) {
        console.error("Error fetching leaderboard:", error);
        setLoading(false); // Stop loading even on error      
      }
    };

    fetchLeaderboard();
  }, []);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Leaderboard</Text>

      {loading ? (
        <ActivityIndicator size="large" color="#007bff" />
      ) : leaderboard.length === 0 ? (
        <Text style={styles.noDataText}>No leaderboard data available.</Text>
      ) : (
        <FlatList
          data={leaderboard}
          renderItem={({ item, index }) => (
            <View style={styles.itemContainer}>
              <Text style={styles.rank}>{`#${index + 1}`}</Text>
              <Text style={styles.user}>{item.user || "Anonymous"}</Text>
              <Text style={styles.score}>{`Score: ${item.score}`}</Text>
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "skyblue",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  noDataText: {
    fontSize: 16,
    color: "#6c757d",
    textAlign: "center",
  },
  itemContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 15,
    backgroundColor: "#f8f9fa",
    borderRadius: 100,
  },
  rank: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#007bff",
  },
  user: {
    fontSize: 16,
    flex: 1,
    marginLeft: 10,
  },
  score: {
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default LeaderboardScreen;