import { View } from "react-native";
import React from "react";
const Modal = ({ children }) => {
  return (
    <View className="justify-between items-center h-screen w-screen absolute top-0 bg-black/30">
      <View className="bg-white rounded-lg mx-auto my-auto w-3/4 px-3 pb-6">
        {children}
      </View>
    </View>
  );
};

export default Modal;
