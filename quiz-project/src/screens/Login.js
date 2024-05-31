import React, { useState, useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  Alert,
  Image,
  Pressable,
  TouchableOpacity,
} from "react-native";
import { LoginUser } from "../apicalls/users";
import { UserContext, actionTypes } from "../context/useContext";
import tw from "twrnc";

const initialState = {
  email: "",
  password: "",
};

const Login = ({ navigation }) => {
  const [user, setUser] = useState(initialState);
  const context = useContext(UserContext);
  const [isDisabled, setIsDisabled] = useState(true);

  const shouldDisableButton = (userObj) => {
    if (!userObj.email || !userObj.password) {
      return true;
    }
    return false;
  };

  const onChangeText = (fieldKey, fieldValue) => {
    const updatedObj = { ...user, [fieldKey]: fieldValue };
    if (shouldDisableButton(updatedObj)) {
      setIsDisabled(true);
    } else {
      setIsDisabled(false);
    }
    setUser(updatedObj);
  };

  const handleLogin = async () => {
    try {
      const response = await LoginUser(user);

      if (response.success) {
        context.dispatchFn({
          type: actionTypes.setToken,
          payload: response.data,
        });
      } else {
        context.dispatchFn({
          type: actionTypes.setToken,
          payload: null,
        });
        throw new Error(response.message);
      }
    } catch (error) {
      context.dispatchFn({
        type: actionTypes.setToken,
        payload: null,
      });
      console.log("error = ", error);
      Alert.alert("Error Occured in Login", error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/images/login.jpg")}
        style={[tw.style(tw`h-2/5 `, { aspectRatio: 1 }), styles.image]}
      />
      <Text style={styles.fieldText}>Email</Text>
      <TextInput
        enterKeyHint="next"
        style={styles.inputField}
        placeholder="Email"
        value={user.email}
        onChangeText={(e) => onChangeText("email", e)}
      />
      <Text style={styles.fieldText}>Password</Text>
      <TextInput
        style={styles.inputField}
        placeholder="Password"
        value={user.password}
        onChangeText={(e) => onChangeText("password", e)}
        secureTextEntry
      />
      <View style={styles.buttonGroup}>
        <Pressable
          disabled={isDisabled}
          style={tw`bg-purple-500 px-6 py-1 rounded`}
          onPress={() => handleLogin()}
        >
          <Text style={tw`text-white text-lg`}>Login</Text>
        </Pressable>
        <Pressable
          style={[tw`bg-purple-500 px-6 py-1 rounded`]}
          onPress={() => navigation.navigate("Register")}
        >
          <Text style={tw`text-white text-lg`}>Register</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  fieldText: {
    fontSize: 20,
    marginBottom: 5,
  },
  buttonGroup: {
    display: "flex",
    justifyContent: "space-around",
    flexDirection: "row",
    marginTop: 10,
  },
  inputField: {
    borderWidth: 1,
    borderRadius: 2,
    marginBottom: 10,
    fontSize: 18,
    padding: 10,
    width: "100%",
  },
  buttons: {
    backgroundColor: "rgb(168, 85, 247)",
  },
  image: {
    marginHorizontal: "auto",
  },
  submitButton: {
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    marginTop: 16,
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

export default Login;
