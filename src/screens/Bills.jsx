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
  const STATUS = [
    {
      id: 0,
      bgColor: "bg-blue-500",
      name: "Đơn mới",
    },
    {
      id: 1,
      bgColor: "bg-yellow-400",
      name: "Đang giao",
    },
    {
      id: 2,
      bgColor: "bg-green-500",
      name: "Giao xong",
    },
    {
      id: 3,
      bgColor: "bg-red-500",
      name: "Đã hủy",
    },
  ];
  const getStatus = (_status) => {
    return (
      STATUS.find((item) =>
        item.name.toLocaleLowerCase().includes(_status.toLocaleLowerCase())
      ) || STATUS[0]
    );
  };
  return (
    <TouchableOpacity>
      <View className="rounded-md bg-white mt-1">
        <View
          className={`${
            getStatus(data.status).bgColor
          } justify-between flex-row p-2  rounded-t-md`}
        >
          <Text className="text-white font-semibold">{data.orderNumber}</Text>
          <Text className="text-white">
            {new Date(data.createdAt).toLocaleDateString()}
          </Text>
        </View>
        <View className="p-2 flex-row border-b border-x rounded-b-md border-gray-200">
          <View className="w-3/4">
            <Text className="font-semibold">{data.toName}</Text>
            <Text className="text-xs">{data.toPhone}</Text>
            <Text className="text-xs">
              {data.toAddress +
                ", " +
                data.toWard +
                ", " +
                data.toDistrict +
                ", " +
                data.toCity}
            </Text>
          </View>
          <Text className="font-bold text-lg text-indigo-900 w-1/4 my-auto">
            {toVND(data.shopAmount)}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};
const Bills = () => {
  const { currentUser } = useSelector((state) => state.user);
  const { loading, refresh } = useSelector((state) => state.system);
  const dispatch = useDispatch();
  const { token } = currentUser;
  const navigation = useNavigation();
  const [refreshing, setRefreshing] = useState(false);
  const [bills, setBills] = useState([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    dispatch(onLoading());
    const fetch = async () => {
      try {
        const res = await ktsRequest.get("v2/bills", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setBills(res.data);
        dispatch(loaded());
      } catch (err) {
        dispatch(loaded());
        if (err.response) {
          if (err.response.data.status === 403) {
            dispatch(logout());
          }
        } else {
          alert("Network Error!");
        }
      }
    };
    fetch();
  }, [refresh, refreshing]);
  const handleClick = async () => {};
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1 justify-between items-center w-full bg-white"
    >
      <SafeAreaView className="flex-1 items-center bg-gray-50 w-full justify-between">
        {/* header */}
        <Text className="p-2 mx-auto">Danh sách đơn hàng</Text>
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
              {search(bills, query, ["toPhone", "toName", "status"]).length >
              0 ? (
                search(bills, query, ["toPhone", "toName", "status"]).map(
                  (b, i) => {
                    return <Card key={i} data={b} />;
                  }
                )
              ) : (
                <View className="py-3 text-center">
                  {loading ? (
                    <View className="flex h-full w-full items-center justify-center flex-col">
                      {/* <img src={logo} alt="" className="animate-bounce w-20" /> */}
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

export default Bills;
