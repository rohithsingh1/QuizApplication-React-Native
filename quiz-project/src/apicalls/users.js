import AxiosFun from "./Index";
import { ipAddress } from "./Index";

// Register a new User API
export const RegisterNewUser = async (payload) => {
  try {
    const axiosInstance = AxiosFun();
    const response = await axiosInstance.post(
      `http://${ipAddress}:5000/api/users/register`,
      payload
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Login a user API
export const LoginUser = async (payload) => {
  try {
    const axiosInstance = AxiosFun();
    const response = await axiosInstance.post(
      `http://${ipAddress}:5000/api/users/login`,
      payload
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Get current user

export const GetCurrentUser = async (token) => {
  try {
    const axiosInstance = AxiosFun(token);
    const response = await axiosInstance.get(
      `http://${ipAddress}:5000/api/users/get-current-user`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
