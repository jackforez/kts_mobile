import {
  ImageBackground,
  KeyboardAvoidingView,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  View,
} from "react-native";
import React from "react";
import img1 from "../constant/logo.jpg";
import { Picker } from "@react-native-picker/picker";

const Register = () => {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1 justify-center items-center w-full bg-white dark:bg-red-600"
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
                <View className="items-center justify-center rounded-md space-y-4 w-full flex text-white mx-auto">
                  <View className="w-full space-y-2">
                    <Text className="text-indigo-900 text-start w-full font-semibold">
                      Tài khoản
                    </Text>
                    <TextInput
                      className="w-full bg-white p-3 rounded-md border border-gray-200"
                      placeholder="Username"
                      onChangeText={(text) => {
                        setUsername(text);
                      }}
                    />
                    <Text className="text-indigo-900 text-start w-full font-semibold">
                      Số điện thoại
                    </Text>
                    <TextInput
                      className="w-full bg-white p-3 rounded-md border border-gray-200"
                      placeholder="0123456789"
                      onChangeText={(text) => {
                        setPassword(text);
                      }}
                    />
                    <Text className="text-indigo-900 text-start w-full font-semibold">
                      Mật khẩu
                    </Text>
                    <TextInput
                      className="w-full bg-white p-3 rounded-md border border-gray-200"
                      placeholder="password"
                      secureTextEntry={true}
                      onChangeText={(text) => {
                        setPassword(text);
                      }}
                    />
                    <Text className="text-indigo-900 text-start w-full font-semibold">
                      Xác nhận khẩu
                    </Text>
                    <TextInput
                      className="w-full bg-white p-3 rounded-md border border-gray-200"
                      placeholder="password"
                      secureTextEntry={true}
                      onChangeText={(text) => {
                        setPassword(text);
                      }}
                    />
                    <Text className="text-indigo-900 text-start w-full font-semibold">
                      Email
                    </Text>
                    <TextInput
                      className="w-full bg-white p-3 rounded-md border border-gray-200"
                      placeholder="example@ktscorp.vn"
                      onChangeText={(text) => {
                        setPassword(text);
                      }}
                    />
                    <Text className="text-indigo-900 text-start w-full font-semibold">
                      Địa chỉ
                    </Text>
                    <TextInput
                      className="w-full bg-white p-3 rounded-md border border-gray-200"
                      placeholder="766 Nguyễn Văn Linh"
                      onChangeText={(text) => {
                        setPassword(text);
                      }}
                    />
                    <Text className="text-indigo-900 text-start w-full font-semibold">
                      Tỉnh/Thành
                    </Text>
                    <TextInput
                      className="w-full bg-white p-3 rounded-md border border-gray-200"
                      placeholder="Thành phố Hải Phòng"
                      onChangeText={(text) => {
                        setPassword(text);
                      }}
                    />
                    <Text className="text-indigo-900 text-start w-full font-semibold">
                      Quận/Huyện
                    </Text>
                    <TextInput
                      className="w-full bg-white p-3 rounded-md border border-gray-200"
                      placeholder="Huyện An Dương"
                      onChangeText={(text) => {
                        setPassword(text);
                      }}
                    />
                    <Text className="text-indigo-900 text-start w-full font-semibold">
                      Phường/Xã
                    </Text>
                    <TextInput
                      className="w-full bg-white p-3 rounded-md border border-gray-200"
                      placeholder="Xã An Đồng"
                      onChangeText={(text) => {
                        setPassword(text);
                      }}
                    />
                  </View>
                  <View className="w-full mt-6">
                    <TouchableOpacity
                      // onPress={() => navigation.navigate("Login")}
                      onPress={() => alert("Chức năng đang được xây dựng")}
                      className="p-3.5 rounded-md bg-indigo-900 w-full justify-center items-center"
                    >
                      <Text className="text-white  font-semibold">Đăng ký</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default Register;
