import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native";
import { ktsRequest } from "../constant/connection";

const Tracking = () => {
  const [loading, setLoading] = useState(false);
  const [orderDetails, setOrderDetails] = useState({});
  const [lastStatus, setLastStatus] = useState("");
  const [orderId, setOrderId] = useState("");
  const status = [
    {
      title: "thành công",
      tcolor: "text-green-500",
      bcolor: "border-green-500",
    },
    { title: "hủy", tcolor: "text-red-500", bcolor: "border-red-500" },
    {
      title: "đang giao",
      tcolor: "text-indigo-500",
      bcolor: "border-indigo-500",
    },
  ];
  const getStatus = (text) => {
    const t = text || "đang giao";
    return (
      status.find((el) => t.toLowerCase().includes(el.title)) || {
        title: "đang giao",
        tcolor: "text-indigo-500",
        bcolor: "border-indigo-500",
      }
    );
  };
  const handleTracking = async () => {
    setLoading(true);
    const config = {
      method: "get",
      url: `tracking/${orderId}}`,
      params: {
        id: orderId,
      },
    };

    await ktsRequest(config)
      .then(function (response) {
        setOrderDetails(response.data.data);
        setLoading(false);
      })
      .catch(function (error) {
        setLoading(false);
        alert("Network Error!");
      });
  };
  return (
    <SafeAreaView className="flex-1 bg-white items-center">
      <View className="items-center p-4 justify-center rounded-md space-y-4 w-[95%] bg-white/50 flex text-white backdrop-blur drop-shadow-lg bg-opacity-10">
        <Text className="text-indigo-900">Mã vận đơn</Text>
        <TextInput
          className="w-full bg-white p-4 rounded-md border border-indigo-900"
          placeholder="Nhập mã vận đơn, ví dụ KTS123456789"
          onChangeText={(text) => setOrderId(text)}
        />
        <TouchableOpacity
          className="p-4 rounded-md bg-indigo-900 w-full justify-center items-center"
          onPress={handleTracking}
        >
          {loading ? (
            <Text className="text-white uppercase">Loading...</Text>
          ) : (
            <Text className="text-white uppercase">tra cứu</Text>
          )}
        </TouchableOpacity>
        <View className="w-full">
          {orderDetails.TBL_DELIVERY?.length > 0 ? (
            <View
              className={`bg-white 
                border ${
                  getStatus(orderDetails.TBL_DELIVERY[0].STATUSTEXT).bcolor
                }
              p-3 rounded-md`}
            >
              <Text
                className={`${
                  getStatus(orderDetails.TBL_DELIVERY[0].STATUSTEXT).tcolor
                } font-semibold`}
              >
                {orderDetails.TBL_DELIVERY[0].STATUSTEXT}
              </Text>
            </View>
          ) : orderDetails.TBL_DINH_VI ? (
            <View
              className={`bg-white
                border ${
                  getStatus(
                    orderDetails.TBL_DINH_VI[
                      orderDetails.TBL_DINH_VI.length - 1
                    ].StatusText
                  ).bcolor
                }
              p-3 rounded-md`}
            >
              <Text
                className={`${
                  getStatus(
                    orderDetails.TBL_DINH_VI[
                      orderDetails.TBL_DINH_VI.length - 1
                    ].StatusText
                  ).tcolor
                } font-semibold`}
              >
                {
                  orderDetails.TBL_DINH_VI[orderDetails.TBL_DINH_VI.length - 1]
                    .StatusText
                }
              </Text>
            </View>
          ) : (
            <Text>Chưa có dữ liệu trạng thái</Text>
          )}
        </View>
        <ScrollView
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          className="w-full"
        >
          {orderDetails.TBL_DINH_VI ? (
            orderDetails.TBL_DINH_VI.map((i, index) => {
              return (
                <View
                  className="mt-2 rounded border-l-4 border-red-500 p-2"
                  key={index}
                >
                  <Text className="font-semibold tracking-wide">
                    {i.StatusText}
                  </Text>
                  <Text className="text-xs uppercase tracking-wide ">
                    {i.TraceDate}
                  </Text>
                  <Text>{i.DiaChiBuuCuc}</Text>
                </View>
              );
            })
          ) : (
            <Text>Không có dữ liệu chi tiết</Text>
          )}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default Tracking;
