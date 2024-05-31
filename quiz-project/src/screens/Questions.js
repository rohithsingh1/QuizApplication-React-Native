import {
  Pressable,
  StyleSheet,
  Text,
  View,
  Alert,
  TouchableOpacity,
} from "react-native";
import React, { useState, useRef, useEffect, useContext } from "react";
import tw from "twrnc";
import * as Progress from "react-native-progress";
import { UserContext, actionTypes } from "../context/useContext";

const Questions = ({ navigation }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [points, setPoints] = useState(10);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);
  const [quizProgress, setQuizProgress] = useState(1);
  const [quizQuestions, setQuizQuestions] = useState([]);
  const [timer, setTimer] = useState(120);
  const [count, setCount] = useState(timer);
  let interval = useRef(null);

  const context = useContext(UserContext);

  useEffect(() => {
    const quizDetails = context.quizCurrState.quiz;
    const questions = quizDetails.questions;
    setQuizQuestions(
      questions.map((ele) => {
        return { ...ele };
      })
    );
    setPoints(Number(quizDetails.points));
    setQuizProgress(quizDetails.questions.length);
    setCount(Number(quizDetails.timer));
  }, []);

  const progress = (currentQuestionIndex + 1) / quizProgress;

  const handleOptionPress = (pressedOption) => {
    setSelectedOption(pressedOption);

    const isAnswerCorrect =
      quizQuestions[currentQuestionIndex].correctAnswer == pressedOption;

    setIsCorrect(isAnswerCorrect);

    if (isAnswerCorrect) {
      setScore((prevScore) => prevScore + points);
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex === quizQuestions.length - 1) {
      clearInterval(interval.current);
      navigation.navigate("Score", { score: score });
    } else {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedOption(null);
      setIsCorrect(null);
    }
  };

  useEffect(() => {
    const timer1 = setInterval(() => {
      if (count >= 1) {
        setCount(count - 1);
      } else {
        clearInterval(timer1);
        Alert.alert("Time Up", "Time up....", [
          {
            text: "Ok",
            onPress: () => navigation.navigate("Score", { score: score }),
            style: "cancel",
          },
        ]);
      }
    }, 1000);
    interval.current = timer1;

    return () => {
      clearInterval(timer1);
    };
  }, [count]);

  return (
    <View style={tw`mt-5 p-4`}>
      <View style={tw`flex-row mb-2`}>
        <View style={tw`flex-5`}>
          <Progress.Bar
            progress={progress}
            width={null}
            height={20}
            color={"rgb(168, 85, 247)"}
          />
        </View>
        <Text style={styles.timer}>{count}</Text>
      </View>
      <Text style={tw`text-2xl mb-4`}>
        {quizQuestions.length > 0 &&
          quizQuestions[currentQuestionIndex].question}
      </Text>
      {quizQuestions.length > 0 &&
        quizQuestions[currentQuestionIndex].options.map((options, index) => {
          return (
            <Pressable
              style={tw`border-2 p-4 my-2 rounded-md ${
                selectedOption == index
                  ? isCorrect
                    ? " bg-green-200 border-blue-500"
                    : " bg-red-200 border-red-500"
                  : " border-purple-500"
              }`}
              key={index}
              onPress={() => handleOptionPress(index)}
              disabled={selectedOption ? true : false}
            >
              <Text style={tw`text-lg`}>{options}</Text>
            </Pressable>
          );
        })}

      <TouchableOpacity
        activeOpacity={0.8}
        style={[styles.submitButton]}
        disabled={selectedOption ? false : true}
        onPress={() => handleNext()}
      >
        <Text style={styles.submitButtonText}>
          {currentQuestionIndex === quizQuestions.length - 1
            ? "Finish"
            : "Next"}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Questions;

const styles = StyleSheet.create({
  timer: {
    marginHorizontal: 6,
    backgroundColor: "rgb(168, 85, 247)",
    width: 50,
    fontSize: 20,
    color: "white",
    borderRadius: 100,
  },
  submitButton: {
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
    backgroundColor: "rgb(168, 85, 247)",
  },
  submitButtonText: {
    textAlign: "center",
    fontSize: 20,
    color: "white",
  },
  disabledStyle: {
    opacity: 0.5,
  },
});
