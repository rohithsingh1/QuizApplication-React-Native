import { StyleSheet, Text, View, Image, Pressable } from "react-native";
import React, { useContext } from "react";
import tw from "twrnc";
import { useRoute } from "@react-navigation/native";
import { UserContext, actionTypes } from "../context/useContext";

const Score = ({ navigation }) => {
  const route = useRoute();
  const { score } = route.params;
  const context = useContext(UserContext);
  return (
    <View style={tw`flex-1 items-center`}>
      <Image
        source={require("../../assets/images/score_image.jpg")}
        style={tw.style(tw`h-3/6 `, { aspectRatio: 1 })}
      />
      <Text>Congartulations!! You Scored {score} points</Text>
      <View style={styles.buttonGroup}>
        <Pressable
          style={tw` bg-purple-500 mt-8 px-6 mr-8 py-1 rounded`}
          onPress={() => navigation.navigate("Splash")}
        >
          <Text style={tw`text-white text-lg`}>Play Again</Text>
        </Pressable>
        <Pressable
          style={tw`bg-purple-500 mt-8 px-6 py-1 rounded`}
          onPress={() => {
            context.quizDispatchFn({
              type: actionTypes.setQuiz,
              payload: null,
            });
            navigation.navigate("HomePage");
          }}
        >
          <Text style={tw`text-white text-lg`}>Go Home</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default Score;

const styles = StyleSheet.create({
  buttonGroup: {
    display: "flex",
    justifyContent: "space-around",
    flexDirection: "row",
    alignItems: "center",
  },
});
