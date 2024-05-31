import {
  Button,
  Pressable,
  StyleSheet,
  Text,
  View,
  Alert,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useContext, useState } from "react";
import { UserContext, actionTypes } from "../../context/useContext";
import tw from "twrnc";
import { CreateNewQuiz } from "../../apicalls/quizzes";

const ListQuestions = ({ navigation }) => {
  const context = useContext(UserContext);
  const [quizQuestions, setQuizQuestions] = useState([]);

  useEffect(() => {
    if (context.quizCurrState.quizQuestion) {
      context.quizDispatchFn({
        type: actionTypes.setListQuizQuestions,
        payload: context.quizCurrState.quizQuestion,
      });
    }
    setQuizQuestions([...context.quizCurrState.listQuizQuestions]);
  }, [context.quizCurrState.quizQuestion]);

  useEffect(() => {
    setQuizQuestions(context.quizCurrState.listQuizQuestions);
  }, [context.quizCurrState.listQuizQuestions]);


  const submitFun = async () => {
    try {
      let quizObj = { ...context.quizCurrState.quiz };
      quizObj.questions = [...quizQuestions];
      const token = context.currState.token;
      // API to create a new Quiz
      const response = await CreateNewQuiz(quizObj, token);
      if (response.success) {
        context.quizDispatchFn({
          type: actionTypes.setListQuizzes,
          payload: [quizObj],
        });
        navigation.navigate("HomePage");
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      console.log("error = ", error);
      Alert.alert("error", error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>ListQuestions</Text>
      <ScrollView>
        <View>
          {quizQuestions.map((question, index) => {
            return (
              <View key={index} style={styles.listContainer}>
                <Text style={styles.listContainerText}>
                  {question.question.substring(0, 16)}...
                </Text>
                <View style={styles.buttonGroup}>
                  <Pressable
                    style={tw`bg-purple-500 px-3 py-1 rounded`}
                    onPress={() => {
                      context.quizDispatchFn({
                        type: actionTypes.editQuizQuestion,
                        payload: { ...question, index },
                      });
                      navigation.navigate("AddQuestions");
                    }}
                  >
                    <Text style={tw`text-white text-lg`}>Edit</Text>
                  </Pressable>
                  <Pressable
                    style={tw`bg-purple-500 px-3 py-1 rounded`}
                    onPress={() =>
                      context.quizDispatchFn({
                        type: actionTypes.deleteQuizQuestion,
                        payload: { index, question },
                      })
                    }
                  >
                    <Text style={tw`text-white text-lg`}>Delete</Text>
                  </Pressable>
                </View>
              </View>
            );
          })}
        </View>
        <View style={styles.bottonButtonGroup}>
          <TouchableOpacity
            activeOpacity={0.8}
            style={[styles.submitButton]}
            onPress={() => navigation.navigate("AddQuestions")}
          >
            <Text style={styles.submitButtonText}>Add Question</Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.8}
            style={[
              styles.submitButton,
              quizQuestions.length === 0 ? styles.disabledStyle : null,
            ]}
            disabled={quizQuestions.length === 0 ? true : false}
            onPress={() => submitFun()}
          >
            <Text style={styles.submitButtonText}>Save</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default ListQuestions;

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
  submitButton: {
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
    backgroundColor: "rgb(168, 85, 247)",
  },
  disabledStyle: {
    opacity: 0.5,
  },
  submitButtonText: {
    textAlign: "center",
    fontSize: 20,
    color: "white",
  },
});
