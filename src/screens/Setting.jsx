import { View, Text, SafeAreaView } from "react-native";
import React, { useEffect, useState } from "react";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { logout } from "../redux/userSlice";
import { ktsRequest } from "../ultis/connections";
import { Modal, MyButton } from "../components";
import LottieView from "lottie-react-native";
const Setting = () => {
  const [cities, setCities] = useState([]);
  const [cityCode, setCityCode] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
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
    <SafeAreaView className="flex-1 items-center justify-center bg-black/30">
      <TouchableOpacity
        className="p-3 rounded-md bg-white"
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
