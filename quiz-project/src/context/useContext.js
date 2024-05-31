import React from "react";

export const UserContext = React.createContext();

export const actionTypes = {
  setToken: "setToken",
  setUser: "setUser",
  setQuizQuestion: "setQuizQuestion",
  setListQuizQuestions: "setListQuizQuestions",
  deleteQuizQuestion: "deleteQuizQuestion",
  editQuizQuestion: "editQuizQuestion",
  editListQuizQuestions: "editListQuizQuestions",
  setQuiz: "setQuiz",
  setListQuizzes: "setListQuizzes",
};

export const initialValues = {
  user: null,
  token: null,
  quizQuestion: null,
  listQuizQuestions: [],
  editQuizQuestion: null,
  quiz: null,
  listQuizzes: [],
};

export function reducerFn(currState, action) {
  switch (action.type) {
    case actionTypes.setToken: {
      return {
        ...currState,
        token: action.payload,
        user: null,
      };
    }
    case actionTypes.setUser: {
      return {
        ...currState,
        user: action.payload,
      };
    }
    default: {
      return currState;
    }
  }
}

export function quizReducerFun(currState, action) {
  switch (action.type) {
    case actionTypes.setQuizQuestion: {
      return {
        ...currState,
        quizQuestion: action.payload,
        editQuizQuestion: null,
      };
    }
    case actionTypes.setListQuizQuestions: {
      return {
        ...currState,
        listQuizQuestions: [action.payload, ...currState.listQuizQuestions],
        quizQuestion: null,
        editQuizQuestion: null,
      };
    }
    case actionTypes.deleteQuizQuestion: {
      return {
        ...currState,
        listQuizQuestions: currState.listQuizQuestions.filter((ele, index) => {
          return (
            index !== action.payload.index &&
            ele.question !== action.payload.question.question
          );
        }),
      };
    }
    case actionTypes.editQuizQuestion: {
      return {
        ...currState,
        editQuizQuestion: action.payload,
      };
    }
    case actionTypes.editListQuizQuestions: {
      return {
        ...currState,
        listQuizQuestions: [...action.payload],
        quizQuestion: null,
        quizQuestion: null,
      };
    }
    case actionTypes.setQuiz: {
      return {
        ...currState,
        quiz: action.payload,
        quizQuestion: null,
        listQuizQuestions: [],
        editQuizQuestion: null,
      };
    }
    case actionTypes.setListQuizzes: {
      return {
        ...currState,
        listQuizzes: [...action.payload, ...currState.listQuizzes],
        quizQuestion: null,
        listQuizQuestions: [],
        editQuizQuestion: null,
        quiz: null,
      };
    }
    default: {
      return currState;
    }
  }
}
