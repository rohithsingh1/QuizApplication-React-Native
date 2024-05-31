// In App.js in a new project

import * as React from "react";
import { View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Splash from "../screens/Splash";
import Questions from "../screens/Questions";
import Score from "../screens/Score";
import Login from "../screens/Login";
import Register from "../screens/Register";
import {
  UserContext,
  initialValues,
  reducerFn,
  quizReducerFun,
} from "../context/useContext";
import HomeScreen from "../screens/HomeScreen";
import CreateQuiz from "../screens/create-quiz/CreateQuiz";
import ListQuestions from "../screens/create-quiz/ListQuestions";
import AddQuestions from "../screens/create-quiz/AddQuestions";
import ListQuizzes from "../screens/ListQuizzes";

const Stack = createNativeStackNavigator();

function AppNavigator() {
  const [currState, dispatchFn] = React.useReducer(reducerFn, initialValues);
  const [quizCurrState, quizDispatchFn] = React.useReducer(
    quizReducerFun,
    initialValues
  );
  //currState.token

  return (
    <UserContext.Provider
      value={{ currState, dispatchFn, quizCurrState, quizDispatchFn }}
    >
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{ contentStyle: { backgroundColor: "white" } }}
        >
          {currState.token ? (
            <Stack.Group>
              <Stack.Screen name="HomePage" component={HomeScreen} />
              <Stack.Screen name="Splash" component={Splash} />
              <Stack.Screen name="CreateQuiz" component={CreateQuiz} />
              <Stack.Screen name="ListQuestions" component={ListQuestions} />
              <Stack.Screen name="AddQuestions" component={AddQuestions} />
              <Stack.Screen name="Questions" component={Questions} />
              <Stack.Screen name="Score" component={Score} />
              <Stack.Screen name="ListQuizzes" component={ListQuizzes} />
            </Stack.Group>
          ) : (
            <Stack.Group>
              <Stack.Screen name="Login" component={Login} />
              <Stack.Screen name="Register" component={Register} />
            </Stack.Group>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </UserContext.Provider>
  );
}

export default AppNavigator;
