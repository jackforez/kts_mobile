import {
  View,
  Text,
  KeyboardAvoidingView,
  SafeAreaView,
  ScrollView,
  ImageBackground,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React from "react";
import img1 from "../constant/logo.jpg";

const Resetpwd = () => {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1 justify-center items-center w-full bg-white"
    >
      <SafeAreaView className="flex-1 w-full">
        <ScrollView
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
        >
          <View className="w-full">
            <ImageBackground
              source={img1}
              resizeMode="contain"
              className="h-[200px] w-full"
            />
            <View className="w-[90%] mx-auto">
              <View classNamew="w-3/4 bg-red-300 py-1 px-3 rounded-md">
                <View className="space-y-4">
                  <Text className="font-semibold">Khôi phục mật khẩu</Text>
                  <Text className="text-justify text-gray-500">
                    Hãy nhập email đã đăng ký với hệ thống, chúng tôi sẽ gửi mật
                    khẩu mới về địa chỉ email này.
                  </Text>
                  <Text className="font-semibold">Email khôi phục</Text>
                  <TextInput
                    className="w-full bg-white p-3 rounded-md border border-gray-200"
                    placeholder="email"
                    onChangeText={(text) => {
                      setUsername(text);
                    }}
                  />
                  <TouchableOpacity
                    // onPress={() => navigation.navigate("Login")}
                    onPress={() => alert("Chức năng đang được xây dựng")}
                    className="p-3.5 rounded-md bg-indigo-900 w-full justify-center items-center"
                  >
                    <Text className="text-white  font-semibold">
                      Khôi phục mật khẩu
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default Resetpwd;
