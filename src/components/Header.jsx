import { View, Text, Pressable } from "react-native";
import { Feather, Entypo } from "@expo/vector-icons";

import React from "react";
import { useNavigation } from "@react-navigation/native";

const Header = ({ title, fallBack }) => {
  const navigation = useNavigation();

  return (
    <View className="flex-row items-center relative w-full py-3">
      <Pressable
        className="absolute left-3"
        onPress={() => navigation.navigate(fallBack)}
      >
        <Entypo name="chevron-left" size={24} color="black" />
      </Pressable>
      <Text className="p-2 mx-auto uppercase">{title}</Text>
    </View>
  );
};

export default Header;
