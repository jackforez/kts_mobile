import { View, Text, SafeAreaView } from "react-native";
import React from "react";
import { TouchableOpacity } from "react-native";

const Setting = () => {
  return (
    <SafeAreaView className="flex-1 items-center justify-center">
      <TouchableOpacity className="p-3 rounded-md border border-indigo-900">
        <Text className="">Đăng xuất</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Setting;
