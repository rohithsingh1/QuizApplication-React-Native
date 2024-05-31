import {
  Button,
  StyleSheet,
  Text,
  View,
  Pressable,
  Alert,
  ScrollView,
} from "react-native";
import React, { useEffect, useContext, useState } from "react";
import { UserContext, actionTypes } from "../context/useContext";
import tw from "twrnc";
import { ListAllQuizzes } from "../apicalls/quizzes";

const ListQuizzes = ({ navigation }) => {
  const context = useContext(UserContext);
  const [quizzes, setQuizzes] = useState([]);

  const getQuizList = async () => {
    try {
      const token = context.currState.token;
      // API to list all the Quizzes
      const response = await ListAllQuizzes(token);
      if (response.success) {
        context.quizDispatchFn({
          type: actionTypes.setListQuizzes,
          payload: response.data,
        });
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      console.log("error = ", error);
      Alert.alert("Error", error);
    }
  };

  useEffect(() => {
    setQuizzes([...context.quizCurrState.listQuizzes]);
  }, [context.quizCurrState.listQuizzes]);

  useEffect(() => {
    if (context.quizCurrState.listQuizzes.length === 0) {
      getQuizList();
    }
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>ListQuizzes</Text>
      <ScrollView>
        {quizzes.map((quiz, index) => {
          return (
            <View key={index} style={styles.listContainer}>
              <Text style={styles.listContainerText}>
                {quiz.title.substring(0, 20)}...
              </Text>
              <Pressable
                style={tw`bg-purple-500 px-3 py-1 mr-2 rounded`}
                onPress={() => {
                  context.quizDispatchFn({
                    type: actionTypes.setQuiz,
                    payload: { ...quiz },
                  });
                  navigation.navigate("Splash");
                }}
              >
                <Text style={tw`text-white text-lg`}>Play Quiz</Text>
              </Pressable>
            </View>
          );
        })}

        <View style={styles.bottonButtonGroup}>
          <Pressable
            style={tw`bg-purple-500 px-6 py-1 rounded`}
            onPress={() => navigation.navigate("HomePage")}
          >
            <Text style={tw`text-white text-lg`}>Go Back</Text>
          </Pressable>
        </View>
      </ScrollView>
    </View>
  );
};

export default ListQuizzes;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    margin: "6px",
    justifyContent: "space-between",
    alignContent: "space-between",
  },
  listContainer: {
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "row",
    margin: 10,
  },
  buttonGroup: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    flexGrow: 1,
  },
  listContainerText: {
    flexGrow: 1,
    alignSelf: "center",
    fontSize: 20,
    fontWeight: "400",
  },
  header: {
    fontSize: 25,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 10,
  },
  bottonButtonGroup: {
    marginTop: 15,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    flexGrow: 1,
  },
  button: {
    backgroundColor: "rgb(168, 85, 247)",
  },
});
