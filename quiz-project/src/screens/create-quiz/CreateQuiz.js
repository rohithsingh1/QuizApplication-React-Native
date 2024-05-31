// src/components/MyForm.js
import React, { useState, useEffect, useContext, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
} from 'react-native'; // Import Button from React Native
import { UserContext, actionTypes } from '../../context/useContext';

const initialState = {
  title: "",
  description: "",
  timer: "60",
  points: "10",
};

const CreateQuiz = ({ navigation }) => {
  const [quiz, setQuiz] = useState(initialState);
  const [isDisabled, setIsDisabled] = useState(true);

  const context = useContext(UserContext);

  //refs
  const descriptionRef = useRef(null);
  const timerRef = useRef(null);
  const pointsRef = useRef(null);

  const shouldDisableButton = (quizObj) => {
    if (
      !quizObj.title ||
      !quizObj.description ||
      !quizObj.timer ||
      !quizObj.points
    ) {
      return true;
    }
    return false;
  };

  const onChangeText = (fieldKey, fieldValue) => {
    const updatedObj = { ...quiz, [fieldKey]: fieldValue };
    if (shouldDisableButton(updatedObj)) {
      setIsDisabled(true);
    } else {
      setIsDisabled(false);
    }
    setQuiz(updatedObj);
  };

  return (
    <View style={styles.screen}>
      <Text style={styles.fieldText}>Title</Text>
      <TextInput
        enterKeyHint="next"
        style={styles.inputField}
        placeholder="Enter Quiz title"
        value={quiz.title}
        onChangeText={(e) => onChangeText("title", e)}
        onSubmitEditing={() => descriptionRef.current.focus()}
      />

      <Text style={styles.fieldText}>Description</Text>
      <TextInput
        enterKeyHint="next"
        ref={descriptionRef}
        style={styles.inputField}
        placeholder="Describe about the quiz"
        value={quiz.description}
        onChangeText={(e) => onChangeText("description", e)}
        onSubmitEditing={() => timerRef.current.focus()}
      />

      <Text style={styles.fieldText}>Timer</Text>
      <TextInput
        enterKeyHint="next"
        ref={timerRef}
        style={styles.inputField}
        placeholder="Timer"
        keyboardType="numeric"
        value={quiz.timer}
        onChangeText={(e) => onChangeText("timer", e)}
        onSubmitEditing={() => pointsRef.current.focus()}
      />

      <Text style={styles.fieldText}>Points to each Question</Text>
      <TextInput
        enterKeyHint="next"
        ref={pointsRef}
        style={styles.inputField}
        placeholder="Points"
        keyboardType="numeric"
        value={quiz.points}
        onChangeText={(e) => onChangeText("points", e)}
      />

      {/* Add the submit button */}

      <TouchableOpacity
        activeOpacity={0.8}
        style={[styles.submitButton, isDisabled ? styles.disabledStyle : null]}
        disabled={isDisabled}
        onPress={() => {
          context.quizDispatchFn({
            type: actionTypes.setQuiz,
            payload: { ...quiz },
          });
          navigation.navigate("ListQuestions");
        }}
      >
        <Text style={styles.submitButtonText}>Next</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
  },
  fieldText: {
    fontSize: 20,
    marginBottom: 5,
  },
  inputField: {
    borderWidth: 1,
    borderRadius: 2,
    marginBottom: 10,
    fontSize: 18,
    padding: 10,
  },
  submitButton: {
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
    backgroundColor: 'rgb(168, 85, 247)',
  },
  submitButtonText: {
    textAlign: 'center',
    fontSize: 20,
    color: 'white',
  },
  disabledStyle: {
    opacity: 0.5,
  },
});

export default CreateQuiz;
