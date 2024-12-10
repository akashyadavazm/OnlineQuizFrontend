import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import QuizList from './screen/QuizList';
import QuizScreen from './screen/QuizScreen';
import ResultsScreen from './screen/ResultsScreen';
import LeaderboardScreen from './screen/LeaderboardScreen';

const Stack = createStackNavigator();

const App = () => {

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="QuizList"
          component={QuizList}
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen
          name="Quiz"
          component={QuizScreen}
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen
          name="Results"
          component={ResultsScreen}
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen
          name="Leaderboard"
          component={LeaderboardScreen}
          options={{
            headerShown: false
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App;
