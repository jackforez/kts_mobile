import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Switch,
  ScrollView,
  Dimensions,
  Linking,
} from "react-native";
import React, { useEffect, useState } from "react";
import {
  Ionicons,
  Foundation,
  AntDesign,
  FontAwesome,
  FontAwesome5,
  Feather,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { Image } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { ktsRequest } from "../ultis/connections";
import { logout } from "../redux/userSlice";
const imgs = [
  "https://firebasestorage.googleapis.com/v0/b/dichoho-4e879.appspot.com/o/images%2Fbanners%2Fbanner1.jpg?alt=media&token=ab56333f-e2b4-4bcd-80f5-1defaf4adc9f",
  "https://firebasestorage.googleapis.com/v0/b/dichoho-4e879.appspot.com/o/images%2Fbanners%2Fbanner2.jpg?alt=media&token=e16e39fd-1209-4e7b-896a-903d55ce3899",
  "https://firebasestorage.googleapis.com/v0/b/dichoho-4e879.appspot.com/o/images%2Fbanners%2Fbanner3.jpg?alt=media&token=4a3aceec-f665-4862-bdba-62b8803cdec6",
];
const { width } = Dimensions.get("screen");
const _h = width * 0.25;
const Dashboard = () => {
  const navigation = useNavigation();
  const { currentUser } = useSelector((state) => state.user);
  const { token } = currentUser;
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  useEffect(() => {
    const checkToken = async () => {
      try {
        await ktsRequest.get(`/users/find/${currentUser?.phone}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      } catch (err) {
        if (err.response) {
          if (err.response.data.status === 403) {
            alert("Phiên làm việc hết hạn, vui lòng đăng nhập lại!");
            dispatch(logout());
          }
        } else {
          alert("Network Error!");
        }
      }
    };
    checkToken();
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          "https://api.sale168.vn/api/products/hotest/10"
        );
        setData(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);
  return (
    <SafeAreaView className="flex-1 items-center bg-white justify-between">
      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        className="w-[90vw] mx-auto py-1"
      >
        {/* header */}
        <View className="flex-row justify-between w-full items-center">
          <TouchableOpacity onPress={() => navigation.navigate("Cài đặt")}>
            <View className="flex-row items-center gap-2">
              <View className="h-12 w-12 bg-indigo-900 rounded-full justify-center items-center">
                <Text className="text-white font-bold">V</Text>
              </View>
              <View>
                <Text className="text-base text-indigo-900">
                  {currentUser?.displayName || "Ktscorp.vn"}
                </Text>
                <Text className="text-xs text-indigo-900">
                  {currentUser?.phone || "0123456789"}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
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
              <View key={i} className="w-[90vw] px-1">
                <Image
                  key={i}
                  source={{ uri: img }}
                  className="w-full h-48 object-cover rounded-md overflow-hidden"
                />
              </View>
            );
          })}
        </ScrollView>
        {/* end slider */}

        {/* apps */}
        {/* <Text className="px-2 pt-6 pb-2 font-semibold text-indigo-900">
          Đơn hàng
        </Text> */}
        {/* <View className="flex-row flex-wrap w-full rounded-md">
          <TouchableOpacity
            className="w-1/4 justify-center items-center px-1"
            onPress={() => {
              return navigation.navigate("Bills");
            }}
          >
            <View className="w-full justify-center items-center bg-indigo-50 rounded-md p-2">
              <Ionicons name="md-documents" size={28} color="rgb(49 46 129)" />
              <Text className="text-xs pt-3">Danh sách</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity className="w-1/4 justify-center items-center px-1">
            <View className="w-full justify-center items-center bg-indigo-50 rounded-md p-2">
              <Ionicons name="document-text" size={28} color="rgb(49 46 129)" />
              <Text className="text-xs pt-3">Chi tiết</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity className="w-1/4 justify-center items-center px-1">
            <View className="w-full justify-center items-center bg-indigo-50 rounded-md p-2">
              <MaterialCommunityIcons
                name="file-document-edit"
                size={28}
                color="rgb(49 46 129)"
              />
              <Text className="text-xs pt-3">Tạo mới</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity className="w-1/4 justify-center items-center px-1">
            <View className="w-full justify-center items-center bg-indigo-50 rounded-md p-2">
              <FontAwesome5
                name="map-marker-alt"
                size={28}
                color="rgb(49 46 129)"
              />
              <Text className="text-xs pt-3">Track</Text>
            </View>
          </TouchableOpacity>
        </View> */}
        {/* customers */}
        {/* <Text className="px-2 pt-6 pb-2 font-semibold text-indigo-900">
          Khách hàng
        </Text> */}
        {/* <View className="flex-row flex-wrap w-full rounded-md">
          <TouchableOpacity className="w-1/4 justify-center items-center px-1">
            <View className="w-full justify-center items-center bg-indigo-50 rounded-md p-2">
              <AntDesign name="contacts" size={28} color="rgb(49 46 129)" />
              <Text className="text-xs pt-3">Danh bạ</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity className="w-1/4 justify-center items-center px-1">
            <View className="w-full justify-center items-center bg-indigo-50 rounded-md p-2">
              <Feather name="user-check" size={28} color="rgb(49 46 129)" />
              <Text className="text-xs pt-3">Chỉnh sửa</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity className="w-1/4 justify-center items-center px-1">
            <View className="w-full justify-center items-center bg-indigo-50 rounded-md p-2">
              <Feather name="user-plus" size={28} color="rgb(49 46 129)" />
              <Text className="text-xs pt-3">Thêm mới</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity className="w-1/4 justify-center items-center px-1">
            <View className="w-full justify-center items-center bg-indigo-50 rounded-md p-2">
              <Feather name="user-minus" size={28} color="rgb(49 46 129)" />
              <Text className="text-xs pt-3">Xóa</Text>
            </View>
          </TouchableOpacity>
        </View> */}
        {/* partners */}
        {/* <Text className="px-2 pt-6 pb-2 font-semibold text-indigo-900">
          Shop
        </Text> */}
        {/* <View className="flex-row flex-wrap w-full rounded-md">
          <TouchableOpacity className="w-1/4 justify-center items-center px-1">
            <View className="w-full justify-center items-center bg-indigo-50 rounded-md p-2">
              <FontAwesome name="users" size={28} color="rgb(49 46 129)" />
              <Text className="text-xs pt-3">Danh sách</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity className="w-1/4 justify-center items-center px-1">
            <View className="w-full justify-center items-center bg-indigo-50 rounded-md p-2">
              <FontAwesome5 name="user-edit" size={28} color="rgb(49 46 129)" />
              <Text className="text-xs pt-3">Chỉnh sửa</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity className="w-1/4 justify-center items-center px-1">
            <View className="w-full justify-center items-center bg-indigo-50 rounded-md p-2">
              <FontAwesome5 name="user-plus" size={28} color="rgb(49 46 129)" />
              <Text className="text-xs pt-3">Thêm mới</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity className="w-1/4 justify-center items-center px-1">
            <View className="w-full justify-center items-center bg-indigo-50 rounded-md p-2">
              <FontAwesome5
                name="user-minus"
                size={28}
                color="rgb(49 46 129)"
              />
              <Text className="text-xs pt-3">Xóa</Text>
            </View>
          </TouchableOpacity>
        </View> */}
        {/* Cost */}
        {/* <Text className="px-2 pt-6 pb-2 font-semibold text-indigo-900">
          Đơn giá
        </Text> */}
        {/* <View className="flex-row flex-wrap w-full rounded-md">
          <TouchableOpacity className="w-1/4 justify-center items-center px-1">
            <View className="w-full justify-center items-center bg-indigo-50 rounded-md p-2">
              <Foundation name="list" size={28} color="rgb(49 46 129)" />
              <Text className="text-xs pt-3">Danh sách</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity className="w-1/4 justify-center items-center px-1">
            <View className="w-full justify-center items-center bg-indigo-50 rounded-md p-2">
              <MaterialCommunityIcons
                name="playlist-edit"
                size={28}
                color="rgb(49 46 129)"
              />
              <Text className="text-xs pt-3">Chỉnh sửa</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity className="w-1/4 justify-center items-center px-1">
            <View className="w-full justify-center items-center bg-indigo-50 rounded-md p-2">
              <MaterialCommunityIcons
                name="playlist-plus"
                size={28}
                color="rgb(49 46 129)"
              />
              <Text className="text-xs pt-3">Thêm mới</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity className="w-1/4 justify-center items-center px-1">
            <View className="w-full justify-center items-center bg-indigo-50 rounded-md p-2">
              <MaterialCommunityIcons
                name="playlist-minus"
                size={28}
                color="rgb(49 46 129)"
              />
              <Text className="text-xs pt-3">Xóa</Text>
            </View>
          </TouchableOpacity>
        </View> */}
        <Text className="px-2 pt-6 pb-2 font-semibold text-indigo-900">
          Tiện ích
        </Text>
        <View className="flex-row flex-wrap w-full rounded-md">
          <TouchableOpacity
            className="w-1/4 justify-center items-center px-1"
            onPress={() => {
              return navigation.navigate("Bills");
            }}
          >
            <View className="w-full justify-center items-center bg-indigo-50 rounded-md p-2">
              <Ionicons name="md-documents" size={28} color="rgb(49 46 129)" />
              <Text className="text-xs pt-3">Đơn hàng</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            className="w-1/4 justify-center items-center px-1"
            onPress={() => {
              return navigation.navigate("Customers");
            }}
          >
            <View className="w-full justify-center items-center bg-indigo-50 rounded-md p-2">
              <AntDesign name="contacts" size={28} color="rgb(49 46 129)" />
              <Text className="text-xs pt-3">Danh bạ</Text>
            </View>
          </TouchableOpacity>
          {currentUser.role !== "shop" && (
            <TouchableOpacity
              className="w-1/4 justify-center items-center px-1"
              onPress={() => {
                return navigation.navigate("Shops");
              }}
            >
              <View className="w-full justify-center items-center bg-indigo-50 rounded-md p-2">
                <FontAwesome name="users" size={28} color="rgb(49 46 129)" />
                <Text className="text-xs pt-3">Shop</Text>
              </View>
            </TouchableOpacity>
          )}
          {currentUser.role !== "shop" && (
            <TouchableOpacity
              className="w-1/4 justify-center items-center px-1"
              onPress={() => {
                return navigation.navigate("Cost");
              }}
            >
              <View className="w-full justify-center items-center bg-indigo-50 rounded-md p-2">
                <Foundation name="list" size={28} color="rgb(49 46 129)" />
                <Text className="text-xs pt-3">Đơn giá</Text>
              </View>
            </TouchableOpacity>
          )}
        </View>
        <Text className="px-2 pt-6 pb-2 font-semibold text-indigo-900">
          dichoho.top
        </Text>
        <ScrollView
          className="py-2 w-full"
          pagingEnabled
          horizontal
          showsHorizontalScrollIndicator={false}
        >
          {data.map((d, i) => {
            return (
              <TouchableOpacity
                onPress={() => {
                  Linking.openURL(`https://dichoho.top/products/${d._id}`);
                }}
                key={i}
              >
                <View className="w-[45vw] px-1">
                  <Image
                    key={i}
                    source={{ uri: d.imgs[0] }}
                    className="w-full aspect-square object-cover rounded-md overflow-hidden"
                  />
                </View>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Dashboard;
