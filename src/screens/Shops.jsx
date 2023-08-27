import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Platform,
  KeyboardAvoidingView,
  TouchableOpacity,
  RefreshControl,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { TextInput } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { search, textAvatar, toVND } from "../ultis/functions";
import { ktsRequest } from "../ultis/connections";
import { useDispatch, useSelector } from "react-redux";
import {
  loaded,
  onCloseModal,
  onLoading,
  onOpenModal,
  onRefreh,
} from "../redux/systemSlice";
import { AntDesign, Feather, Entypo } from "@expo/vector-icons";
import Modal from "./Modal";
import { Header } from "../components";
const Card = ({ data, setData, showEdit }) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  return (
    <View className="rounded-md bg-white mt-1 border border-gray-200 px-2 py-3">
      <View className="flex-row justify-center items-center">
        <View className="w-2/12 justify-center">
          <View className="h-12 w-12 bg-orange-500 rounded-full justify-center items-center">
            <Text className="text-white font-bold">
              {textAvatar(data.name)}
            </Text>
          </View>
        </View>
        <View className="w-9/12 px-2">
          <Text className="text-sm font-semibold">{data.displayName}</Text>
          <Text className="text-xs">{data.phone}</Text>
        </View>
        <TouchableOpacity
          className="w-1/12"
          onPress={() => {
            navigation.navigate("Profile", { userId: data._id });
          }}
        >
          <Entypo name="chevron-right" size={24} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
};
const Shops = () => {
  const { currentUser } = useSelector((state) => state.user);
  const { loading, refresh, openModal } = useSelector((state) => state.system);
  const dispatch = useDispatch();
  const { token } = currentUser;
  const navigation = useNavigation();
  const [refreshing, setRefreshing] = useState(false);
  const [customers, setCustomers] = useState([]);
  const [query, setQuery] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      dispatch(onLoading());
      try {
        const res = await ktsRequest.get("/users/children", {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        setCustomers(res.data);
        dispatch(loaded());
      } catch (error) {
        dispatch(loaded());
        alert(error.response ? error.response.data : "Network Error!");
      }
    };
    fetchData();
  }, [refresh, refreshing]);
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1 justify-between items-center w-full"
    >
      <SafeAreaView className="flex-1 items-center w-full justify-between relative bg-black/30">
        {/* header */}
        <Header title="danh sách shop" />
        <View className="relative pb-2 w-full px-2">
          <TextInput
            className="px-2 py-3 bg-white border border-gray-200 rounded-md"
            placeholder="Tên shop, số điện thoại..."
            onChangeText={(text) => {
              setQuery(text);
            }}
          />
          <View className="absolute top-2 right-4">
            <Feather name="search" size={24} color="rgb(156 163 175)" />
          </View>
        </View>
        <ScrollView
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          className="w-full"
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          <View className="w-full h-full flex-1 px-2">
            {/* content */}
            <View>
              {search(customers, query, ["phone"]).length > 0 ? (
                search(customers, query, ["phone"]).map((b, i) => {
                  return <Card key={i} data={b} />;
                })
              ) : (
                <View className="py-3 text-center">
                  {loading ? (
                    <View className="flex h-full w-full items-center justify-center flex-col">
                      <Text>Đang tải dữ liệu ...</Text>
                    </View>
                  ) : (
                    <Text>Không có dữ liệu</Text>
                  )}
                </View>
              )}
            </View>
          </View>
        </ScrollView>
        <TouchableOpacity
          className="absolute bottom-6 right-6"
          onPress={() => {
            navigation.navigate("NewShop");
          }}
        >
          <AntDesign name="pluscircle" size={52} color="#312e81" />
        </TouchableOpacity>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default Shops;
