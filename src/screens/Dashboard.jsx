import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Switch,
  ScrollView,
  Dimensions,
} from "react-native";
import React from "react";
import { Ionicons, Entypo, AntDesign, FontAwesome } from "@expo/vector-icons";
import { Image } from "react-native";
const imgs = [
  "https://firebasestorage.googleapis.com/v0/b/dichoho-4e879.appspot.com/o/images%2Fbanners%2Fbanner1.jpg?alt=media&token=ab56333f-e2b4-4bcd-80f5-1defaf4adc9f",
  "https://firebasestorage.googleapis.com/v0/b/dichoho-4e879.appspot.com/o/images%2Fbanners%2Fbanner2.jpg?alt=media&token=e16e39fd-1209-4e7b-896a-903d55ce3899",
  "https://firebasestorage.googleapis.com/v0/b/dichoho-4e879.appspot.com/o/images%2Fbanners%2Fbanner3.jpg?alt=media&token=4a3aceec-f665-4862-bdba-62b8803cdec6",
];
const { width } = Dimensions.get("screen");
const _h = width * 0.25;
const Dashboard = () => {
  return (
    <SafeAreaView className="flex-1 items-center bg-white justify-between">
      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        className="w-[90vw] mx-auto py-1"
      >
        {/* header */}
        <View className="flex-row justify-between w-full items-center">
          <View className="flex-row items-center gap-2">
            <View className="h-12 w-12 bg-indigo-900 rounded-full justify-center items-center">
              <Text className="text-white font-bold">V</Text>
            </View>
            <View>
              <Text className="text-base text-indigo-900">Jackforez</Text>
              <Text className="text-xs text-indigo-900">0814800579</Text>
            </View>
          </View>
          <View>
            <Ionicons name="notifications" size={28} color="rgb(49 46 129)" />
          </View>
        </View>
        {/* end header */}
        {/* slider */}
        <ScrollView
          className="py-2 w-full"
          pagingEnabled
          horizontal
          showsHorizontalScrollIndicator={false}
        >
          {imgs.map((img, i) => {
            return (
              <Image
                key={i}
                source={{ uri: img }}
                className="w-[90vw] h-48 object-cover rounded-md"
              />
            );
          })}
        </ScrollView>
        <Text className="p-2 font-semibold text-indigo-900">Tiện ích</Text>
        <View className="flex-row flex-wrap w-full bg-indigo-100 rounded-md p-1">
          <TouchableOpacity className="w-1/4 justify-center items-center">
            <View className="w-full justify-center items-center bg-white rounded-md p-2">
              <Ionicons name="document-text" size={28} color="rgb(49 46 129)" />
              <Text className="pt-3">Đơn hàng</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity className="w-1/4">
            <View className="w-full justify-center items-center bg-white rounded-md">
              <Entypo name="shop" size={30} color="rgb(49 46 129)" />
              <Text className="pt-3">Shop</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity className="w-1/4">
            <View className="w-full justify-center items-center bg-white rounded-md">
              <AntDesign name="user" size={30} color="rgb(49 46 129)" />
              <Text className="py-3">Khách hàng</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity className="w-1/4">
            <View className="w-full justify-center items-center bg-white rounded-md">
              <FontAwesome name="dollar" size={30} color="rgb(49 46 129)" />
              <Text className="p-3 text-xs">Đơn hàng</Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Dashboard;
