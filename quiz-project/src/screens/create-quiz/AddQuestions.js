import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Alert,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React, { useState, useContext, useEffect, useRef } from 'react';
import { UserContext, actionTypes } from '../../context/useContext';

const initialState = {
  question: '',
  option1: '',
  option2: '',
  option3: '',
  option4: '',
  correctAnswer: 0,
};

const AddQuestions = ({ navigation }) => {
  const [question, setQuestion] = useState(initialState);
  const [isDisabled, setIsDisabled] = useState(true);
  const context = useContext(UserContext);


  // Here Iam setting the Quiz question in the question state with the existing question to
  // make changes to the created quiz question 
  useEffect(() => {
    if (context.quizCurrState.editQuizQuestion) {
      const obj = { ...context.quizCurrState.editQuizQuestion };
      const questionObj = {
        question: obj.question,
        option1: obj.options[0],
        option2: obj.options[1],
        option3: obj.options[2],
        option4: obj.options[3],
        correctAnswer: obj.correctAnswer,
      };
      if (shouldDisableButton(questionObj)) {
        setIsDisabled(true);
      } else {
        setIsDisabled(false);
      }
      setQuestion(questionObj);
    }
  }, [context.quizCurrState.editQuizQuestion]);

  const handleSubmit = () => {
    try {
      const options = Object.entries(question)
        .map((ele) => {
          if (
            ele[0] === 'option1' ||
            ele[0] === 'option2' ||
            ele[0] === 'option3' ||
            ele[0] === 'option4'
          ) {
            return ele[1];
          }
        })
        .filter((ele) => {
          return typeof ele !== 'undefined';
        });

      if (context.quizCurrState.editQuizQuestion) {
        context.quizDispatchFn({
          type: actionTypes.deleteQuizQuestion,
          payload: {
            question: context.quizCurrState.editQuizQuestion,
            index: context.quizCurrState.editQuizQuestion.index,
          },
        });
      }
      // Updating the QuizQuestions List with the edited Question Object. 
      context.quizDispatchFn({
        type: actionTypes.setQuizQuestion,
        payload: {
          question: question.question,
          options: options,
          correctAnswer: question.correctAnswer,
        },
      });
      navigation.navigate('ListQuestions');
    } catch (error) {
      console.log('error = ', error);
      Alert.alert('Error', error.message);
    }
  };

  // Below Function Disables the Submit Button untill all Feilds are filled with data
  const shouldDisableButton = (questionObj) => {
    if (
      !questionObj.question ||
      !questionObj.option1 ||
      !questionObj.option2 ||
      !questionObj.option3 ||
      !questionObj.option4 ||
      !questionObj.correctAnswer
    ) {
      return true;
    }
    return false;
  };

  const onChangeText = (fieldKey, fieldValue) => {
    const updatedObj = { ...question, [fieldKey]: fieldValue };
    if (shouldDisableButton(updatedObj)) {
      setIsDisabled(true);
    } else {
      setIsDisabled(false);
    }
    setQuestion(updatedObj);
  };

  //refs
  const option1Ref = useRef(null);
  const option2Ref = useRef(null);
  const option3Ref = useRef(null);
  const option4Ref = useRef(null);
  const correctAnswerRef = useRef(null);

  return (
    <View style={styles.container}>
      <ScrollView>
        <Text style={styles.fieldText}>Question:</Text>
        <TextInput
          enterKeyHint="next"
          style={styles.input}
          placeholder="Add Question text"
          value={question.question}
          onChangeText={(e) => onChangeText("question", e)}
          onSubmitEditing={() => {
            option1Ref.current.focus();
          }}
        />
        <Text style={styles.fieldText}>Option1:</Text>
        <TextInput
          enterKeyHint="next"
          ref={option1Ref}
          style={styles.input}
          placeholder="Add Option 1"
          value={question.option1}
          onChangeText={(e) => onChangeText("option1", e)}
          onSubmitEditing={() => {
            option2Ref.current.focus();
          }}
        />
        <Text style={styles.fieldText}>Option2:</Text>
        <TextInput
          enterKeyHint="next"
          ref={option2Ref}
          style={styles.input}
          placeholder="Add Option 2"
          value={question.option2}
          onChangeText={(e) => onChangeText("option2", e)}
          onSubmitEditing={() => {
            option3Ref.current.focus();
          }}
        />
        <Text style={styles.fieldText}>Option3:</Text>
        <TextInput
          enterKeyHint="next"
          ref={option3Ref}
          style={styles.input}
          placeholder="Add Option 3"
          value={question.option3}
          onChangeText={(e) => onChangeText("option3", e)}
          onSubmitEditing={() => {
            option4Ref.current.focus();
          }}
        />
        <Text style={styles.fieldText}>Option4:</Text>
        <TextInput
          enterKeyHint="next"
          ref={option4Ref}
          style={styles.input}
          placeholder="Add Option 4"
          value={question.option4}
          onChangeText={(e) => onChangeText("option4", e)}
          onSubmitEditing={() => {
            correctAnswerRef.current.focus();
          }}
        />
        <Text style={styles.fieldText}>Correct Answer:</Text>
        <TextInput
          enterKeyHint="next"
          ref={correctAnswerRef}
          style={styles.input}
          placeholder="Enter Answer Option index i.e 0,1,2,3"
          keyboardType="numeric"
          value={question.correctAnswer}
          onChangeText={(e) => {
            let value = Number(e);
            if (value >= 0 && value <= 3) {
              onChangeText("correctAnswer", e);
            }
          }}
        />
        <TouchableOpacity
          activeOpacity={0.8}
          style={[
            styles.submitButton,
            isDisabled ? styles.disabledStyle : null,
          ]}
          disabled={isDisabled}
          onPress={() => {
            handleSubmit();
          }}
        >
          <Text style={styles.submitButtonText}>Next</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default AddQuestions;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  input: {
    margin: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 2,
    fontSize: 18,
    padding: 10,
  },
  buttonGroup: {
    display: 'flex',
    justifyContent: 'space-around',
    flexDirection: 'row',
  },
  fieldText: {
    fontSize: 16,
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
