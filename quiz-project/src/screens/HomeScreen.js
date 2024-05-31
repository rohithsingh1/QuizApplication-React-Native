import { Image, Pressable, StyleSheet, Text, View, Alert } from "react-native";
import React, { useEffect, useContext } from "react";
import tw from "twrnc";
import { UserContext, actionTypes } from "../context/useContext";
import { GetCurrentUser } from "../apicalls/users";

const HomeScreen = ({ navigation }) => {
  const context = useContext(UserContext);

  const GetCurrentUserFun = async () => {
    try {
      const token = context.currState.token;
      const response = await GetCurrentUser(token);
      if (response.success) {
        context.dispatchFn({
          type: actionTypes.setUser,
          payload: response.data,
        });
      } else {
        context.dispatchFn({
          type: actionTypes.setToken,
          payload: null,
        });
      }
    } catch (error) {
      context.dispatchFn({
        type: actionTypes.setToken,
        payload: null,
      });
      console.log("error = ", error);
      throw error;
    }
  };

  useEffect(() => {
    try {
      if (context.currState.token) {
        GetCurrentUserFun();
      } else {
        context.dispatchFn({ type: actionTypes.setToken, payload: null });
      }
    } catch (error) {
      console.log("error = ", error);
      Alert.alert("Error", error);
    }
  }, []);

  return (
    <View style={tw`flex-1 items-center`}>
      <Image
        source={require("../../assets/images/splash.jpg")}
        style={tw.style(tw`h-3/6 `, { aspectRatio: 1 })}
      />
      <View style={styles.buttonGroup}>
        <Pressable
          style={tw` bg-purple-500 mt-8 px-6 mr-8 py-1 rounded`}
          onPress={() => navigation.navigate("ListQuizzes")}
        >
          <Text style={tw`text-white text-lg`}>Select Quiz</Text>
        </Pressable>
        <Pressable
          style={tw`bg-purple-500 mt-8 px-6 py-1 rounded`}
          onPress={() => navigation.navigate("CreateQuiz")}
        >
          <Text style={tw`text-white text-lg`}>Create Quiz</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  buttonGroup: {
    display: "flex",
    justifyContent: "space-around",
    flexDirection: "row",
    alignItems: "center",
  },
});
