import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Switch,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import { Entypo } from "@expo/vector-icons";
import { TextInput } from "react-native";
const Bill = () => {
  const [shopPay, setShopPay] = useState(false);
  const [isBroken, setIsBroken] = useState(false);
  return (
    <SafeAreaView className="flex-1 items-center bg-white justify-between">
      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      >
        <View className="w-full space-y-1 h-full">
          <View className="w-full px-2 rounded-md">
            <View className="flex-row justify-between py-1 items-center">
              <Text className="uppercase font-semibold text-indigo-900">
                Người gửi
              </Text>
              <TouchableOpacity className="rounded-md p-2 border border-blue-500">
                <Entypo name="pencil" size={18} color="rgb(59 130 246)" />
              </TouchableOpacity>
            </View>
            <View className="flex-row flex-wrap rounded-md bg-gray-100 p-1">
              <Text className="font-semibold text-gray-700">Anh Văn</Text>
              <Entypo name="dot-single" size={16} color="black" />
              <Text className="text-gray-700">0814800579</Text>
              <Entypo name="dot-single" size={16} color="black" />
              <Text className="text-gray-700">
                766 Nguyễn Văn Linh, An Đồng, An Dương, TP. Hải Phòng
              </Text>
            </View>
          </View>
          <View className="w-full px-2 rounded-md">
            <View className="flex-row justify-between py-1 items-center">
              <Text className="uppercase font-semibold text-indigo-900">
                Người nhận
              </Text>
              <TouchableOpacity className="rounded-md p-2 border border-blue-500">
                <Entypo name="pencil" size={18} color="rgb(59 130 246)" />
              </TouchableOpacity>
            </View>
            <View className="flex-row flex-wrap rounded-md bg-gray-100 p-1">
              <Text className="font-semibold text-gray-700">Anh Văn</Text>
              <Entypo name="dot-single" size={16} color="black" />
              <Text className="text-gray-700">0814800579</Text>
              <Entypo name="dot-single" size={16} color="black" />
              <Text className="text-gray-700">
                766 Nguyễn Văn Linh, An Đồng, An Dương, TP. Hải Phòng
              </Text>
            </View>
          </View>
          <View className="w-full bg-white p-2 rounded-md space-y-2">
            {/* <View className="flex-row justify-between py-2 items-center">
              <Text className="uppercase font-semibold">Hàng hóa</Text>
            </View> */}
            <Text className="text-indigo-900 text-start w-full font-semibold">
              Nội dung hàng hóa
            </Text>

            <TextInput
              className="w-full bg-white p-3 rounded-md border border-gray-200 focus:border-indigo-800"
              placeholder="Nội dung hàng hóa"
              onChangeText={(text) => {
                setUsername(text);
              }}
            />
            <View className="flex-row pt-2">
              <View className="w-1/2 pr-1 space-y-2">
                <Text className="text-indigo-900 text-start w-full font-semibold">
                  Trọng lượng
                </Text>
                <TextInput
                  className="w-full bg-white p-3 rounded-md border border-gray-200 focus:border-indigo-800"
                  placeholder="gram"
                  onChangeText={(text) => {
                    setUsername(text);
                  }}
                />
              </View>
              <View className="w-1/2 pl-1 space-y-2">
                <Text className="text-indigo-900 text-start w-full font-semibold">
                  Số lượng
                </Text>
                <TextInput
                  className="w-full bg-white p-3 rounded-md border border-gray-200 focus:border-indigo-800"
                  placeholder="1"
                  onChangeText={(text) => {
                    setUsername(text);
                  }}
                />
              </View>
            </View>
            <Text className="text-indigo-900 pt-2 text-start w-full font-semibold">
              Số tiền cần thu hộ
            </Text>
            <TextInput
              className="w-full bg-white p-3 rounded-md border border-gray-200 focus:border-indigo-800"
              placeholder="0"
              onChangeText={(text) => {
                setUsername(text);
              }}
            />
            <Text className="text-indigo-900 pt-2 text-start w-full font-semibold">
              Ghi chú
            </Text>
            <TextInput
              className="w-full bg-white p-3 rounded-md border border-gray-200 focus:border-indigo-800"
              placeholder="Ghi chú của shop"
              onChangeText={(text) => {
                setUsername(text);
              }}
            />
            <View className="w-full flex-row py-2">
              <View className="flex-row items-center w-1/2">
                <Switch
                  onValueChange={() => setShopPay(!shopPay)}
                  value={shopPay}
                  className="scale-75"
                />
                <Text className="text-xs">
                  {shopPay ? "Người gửi trả cước" : "Người nhận trả cước"}
                </Text>
              </View>
              <View className="flex-row items-center w-1/2">
                <Switch
                  onValueChange={() => setIsBroken(!isBroken)}
                  value={isBroken}
                  className="scale-75"
                />
                <Text className="text-xs">
                  {isBroken ? "Hàng dễ vỡ" : "Hàng thường"}
                </Text>
              </View>
            </View>
            <View className="w-full flex-row">
              <View className="w-1/2 pr-1">
                <TouchableOpacity
                  // onPress={() => navigation.navigate("Login")}

                  className="p-3.5 rounded-md border border-indigo-900 w-full justify-center items-center "
                >
                  <Text className="text-indigo-900 font-semibold">Hủy</Text>
                </TouchableOpacity>
              </View>
              <View className="w-1/2 pl-1">
                <TouchableOpacity
                  // onPress={() => navigation.navigate("Login")}

                  className="p-3.5 rounded-md bg-indigo-900 w-full justify-center items-center"
                >
                  <Text className="text-white font-semibold">Tạo đơn</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Bill;
