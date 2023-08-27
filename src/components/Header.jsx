import { View, Text, Pressable } from "react-native";
import { Entypo } from "@expo/vector-icons";

import React from "react";
import { useNavigation } from "@react-navigation/native";

const Header = ({ title, dark }) => {
  const navigation = useNavigation();

  return (
    <View className="flex-row items-center justify-between w-full p-3">
      <Pressable onPress={() => navigation.goBack()}>
        <Entypo
          name="chevron-left"
          size={24}
          color={dark ? "black" : "white"}
        />
      </Pressable>
      <Text
        className={`p-2 text-lg font-semibold uppercase ${
          !dark && "text-white"
        }`}
      >
        {title}
      </Text>
    </View>
  );
};

export default Header;
