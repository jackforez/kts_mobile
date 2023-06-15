import { View, Text, Pressable } from "react-native";
import { Entypo } from "@expo/vector-icons";

import React from "react";
import { useNavigation } from "@react-navigation/native";

const Header = ({ title, fallBack }) => {
  const navigation = useNavigation();

  return (
    <View className="flex-row items-center justify-between w-full p-3">
      <Pressable onPress={() => navigation.navigate(fallBack)}>
        <Entypo name="chevron-left" size={24} color="black" />
      </Pressable>
      <Text className="p-2 text-lg font-semibold uppercase ">{title}</Text>
    </View>
  );
};

export default Header;
