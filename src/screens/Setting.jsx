import { View, Text, SafeAreaView } from "react-native";
import React, { useEffect, useState } from "react";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/userSlice";
import { ktsRequest } from "../ultis/connections";
import { Header, Modal, MyButton } from "../components";
import LottieView from "lottie-react-native";
import { ScrollView } from "react-native";
import { Image } from "react-native";
const Setting = () => {
  const [cities, setCities] = useState([]);
  const [cityCode, setCityCode] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const { currentUser } = useSelector((state) => state.user);
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
  const navigation = useNavigation();
  const dispatch = useDispatch();
  return (
    <SafeAreaView className="bg-black/50 flex-1 items-center">
      <Header title={"Thông tin tài khoản"} />
      <ScrollView className="w-full px-4" showsVerticalScrollIndicator={false}>
        <View className="bg-black/30 relative mt-16 rounded-xl">
          <View className="h-48 w-full rounded-xl -top-16">
            <Image
              source={{
                uri:
                  currentUser.img ||
                  "https://firebasestorage.googleapis.com/v0/b/dichoho-4e879.appspot.com/o/images%2Fbanners%2Fbanner1.jpg?alt=media&token=ab56333f-e2b4-4bcd-80f5-1defaf4adc9f",
              }}
              resizeMode="cover"
              className="w-28 h-28 rounded-full mx-auto"
            />
            <Text className="mx-auto font-bold mt-8 text-white">
              {currentUser.displayName} ({currentUser.role})
            </Text>

            <TouchableOpacity
              onPress={() => {
                dispatch(logout());
              }}
              className="top-8 mx-auto justify-center items-center"
            >
              <View className="bg-white/30 rounded-full">
                <Text className="text-white px-4 py-2 font-semibold">
                  Đăng xuất
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Setting;
