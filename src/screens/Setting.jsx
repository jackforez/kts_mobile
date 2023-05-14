import { View, Text, SafeAreaView } from "react-native";
import React from "react";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { logout } from "../redux/userSlice";

const Setting = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  return (
    <SafeAreaView className="flex-1 items-center justify-center">
      <TouchableOpacity
        className="p-3 rounded-md border border-indigo-900"
        onPress={() => {
          dispatch(logout());
        }}
      >
        <Text className="">Đăng xuất</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Setting;
