import { View, Text, TextInput, Animated } from "react-native";
import React, { useEffect, useRef, useState } from "react";

const InputWithLabel = ({ label = "", onChangeText }) => {
  const [focus, setFocus] = useState(false);
  const moveAnim = useRef(new Animated.Value(0)).current;
  const moveUp = () => {
    setFocus(true);
    Animated.timing(moveAnim, {
      toValue: -30,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  const moveDown = (text) => {
    if (!text) {
      setFocus(false);
      Animated.timing(moveAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
      }).start();
    }
  };

  return (
    <View className="w-full mx-auto mt-6 bg-white rounded-lg border border-ktsPrimary">
      {label && (
        <Animated.Text
          className={`absolute px-2 left-3  top-5 ${
            focus ? "z-10 bg-white" : "text-gray-500"
          }`}
          style={{
            marginTop: moveAnim,
          }}
        >
          {label}
        </Animated.Text>
      )}
      <TextInput
        onFocus={moveUp}
        onBlur={(e) => moveDown(e.nativeEvent.text)}
        onChangeText={onChangeText}
        className="p-5 rounded-lg w-full"
      />
    </View>
  );
};

export default InputWithLabel;
