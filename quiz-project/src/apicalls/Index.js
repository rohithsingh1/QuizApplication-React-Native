import axios from "axios";

const AxiosFun = (token = "") => {
  const axiosInstance = axios.create({
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  });
  return axiosInstance;
};

// change the ipAddress of your local Machine to make API calls
export const ipAddress = "192.168.1.7";

export default AxiosFun;
