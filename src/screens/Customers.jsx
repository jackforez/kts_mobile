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
import { search, toVND } from "../ultis/functions";
import { ktsRequest } from "../ultis/connections";
import { useDispatch, useSelector } from "react-redux";
import { loaded, onLoading } from "../redux/systemSlice";
import { Feather } from "@expo/vector-icons";
const Card = ({ data }) => {
  return (
    <TouchableOpacity>
      <View className="rounded-md bg-white mt-1">
        <View
          className={`bg-blue-500 justify-between flex-row p-2  rounded-t-md`}
        >
          <Text className="text-white font-semibold">{data.orderNumber}</Text>
          <Text className="text-white">
            {new Date(data.createdAt).toLocaleDateString()}
          </Text>
        </View>
        <View className="p-2 flex-row border-b border-x rounded-b-md border-gray-200">
          <View className="w-full">
            <Text className="font-semibold">{data.name}</Text>
            <Text className="text-xs">{data.phone}</Text>
            <Text className="text-xs">
              {data.address +
                ", " +
                data.wardFullName +
                ", " +
                data.districtFullName +
                ", " +
                data.cityFullName}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};
const Customers = () => {
  const { currentUser } = useSelector((state) => state.user);
  const { loading, refresh } = useSelector((state) => state.system);
  const dispatch = useDispatch();
  const { token } = currentUser;
  const navigation = useNavigation();
  const [refreshing, setRefreshing] = useState(false);
  const [customers, setCustomers] = useState([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const res = await ktsRequest.get(`/v2/customers/my`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setCustomers(res.data);
      } catch (error) {
        alert.error(error);
      }
    };
    fetchCustomers();
  }, [refresh, refreshing]);
  const handleClick = async () => {};
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);
  console.log(customers);
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1 justify-between items-center w-full bg-white"
    >
      <SafeAreaView className="flex-1 items-center bg-gray-50 w-full justify-between">
        {/* header */}
        <Text className="p-2 mx-auto">Danh bạ khách hàng</Text>
        <View className="relative pb-2 w-full px-2">
          <TextInput
            className="px-2 py-3 bg-white border border-gray-200 rounded-md"
            placeholder="mã vận đơn, tên người nhận, số điện thoại..."
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
              {search(customers, query, ["phone", "name"]).length > 0 ? (
                search(customers, query, ["phone", "name"]).map((b, i) => {
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
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default Customers;
