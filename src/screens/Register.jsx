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
import React, { useEffect, useState } from "react";
import img1 from "../constant/logo.jpg";
import { Picker } from "@react-native-picker/picker";
import MyPicker from "./MyPicker";
import { ktsRequest } from "../constant/connection";

const Register = () => {
  const [city, setCity] = useState("");
  const [cities, setCities] = useState([]);
  useEffect(() => {
    const getCities = async () => {
      try {
        const res = await ktsRequest.get("/cities");
        const data = Object.values(res.data);
        setCities(data);
      } catch (error) {
        console.log(error);
      }
    };
    getCities();
  }, []);
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1 justify-between items-center w-full bg-white dark:bg-red-600"
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
                      Tên shop
                    </Text>
                    <TextInput
                      className="w-full bg-white p-3 rounded-md border border-gray-200"
                      placeholder="Sẽ hiển thị khi tạo bill"
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
                    <View className="space-y-2">
                      <MyPicker
                        placehoder={"Tỉnh/Thành"}
                        data={cities}
                        field={["name_with_type"]}
                        toShow="name_with_type"
                        size={"md"}
                        output={setCity}
                      />
                    </View>
                    <View className="space-y-2">
                      <MyPicker
                        placehoder={"Quận/Huyện"}
                        data={cities}
                        field={["name_with_type"]}
                        toShow="name_with_type"
                        size={"md"}
                        output={setCity}
                      />
                    </View>
                    <View className="space-y-2">
                      <MyPicker
                        placehoder={"Phường/Xã"}
                        data={cities}
                        field={["name_with_type"]}
                        toShow="name_with_type"
                        size={"md"}
                        output={setCity}
                      />
                    </View>
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
