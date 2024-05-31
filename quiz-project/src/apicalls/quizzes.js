import AxiosFun from "./Index";
import { ipAddress } from "./Index";

// Create a new Quiz
export const CreateNewQuiz = async (payload, token) => {
  try {
    const axiosInstance = AxiosFun(token);
    const response = await axiosInstance.post(
      `http://${ipAddress}:5000/api/quizzes/create-quiz`,
      payload
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

// List all quizzes
export const ListAllQuizzes = async (token, payload = {}) => {
  try {
    const axiosInstance = AxiosFun(token);
    const response = await axiosInstance.post(
      `http://${ipAddress}:5000/api/quizzes/all-quizzes`,
      payload
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
