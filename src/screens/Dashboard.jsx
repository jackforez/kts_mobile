import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Switch,
  ScrollView,
  Dimensions,
  Linking,
  ImageBackground,
  Pressable,
  Button,
  Alert,
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
  Entypo,
} from "@expo/vector-icons";
import { Image } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { ktsRequest, sale168Request } from "../ultis/connections";
import { logout } from "../redux/userSlice";
import { Myslider } from "../components";
import { textAvatarOne } from "../ultis/functions";
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
  const [posts, setPosts] = useState([]);
  const dispatch = useDispatch();
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
            Alert.alert("Phiên làm việc hết hạn", " vui lòng đăng nhập lại!");
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
    const fetchPost = async () => {
      try {
        const res = await sale168Request.get("/posts/latest/2");
        setPosts(res.data);
      } catch (err) {
        console.log(err);
        alert("Network Error!");
      }
    };
    fetchPost();
  }, []);

  return (
    <SafeAreaView className="flex-1 items-center justify-between bg-black/30">
      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        className="w-full mx-auto py-1"
      >
        {/* header */}
        <View className="flex-row justify-between w-full items-center px-4">
          <TouchableOpacity onPress={() => navigation.navigate("Setting")}>
            <View className="flex-row items-center gap-2">
              <View className="h-12 w-12 bg-white rounded-full justify-center items-center">
                <Text className="text-indigo-900 font-bold">
                  {textAvatarOne(currentUser?.displayName || "Ktscorp.vn")}
                </Text>
              </View>
              <View>
                <Text className="text-base text-white">
                  {currentUser?.displayName || "Ktscorp.vn"}
                </Text>
                <Text className="text-xs text-white">
                  {currentUser?.phone || "0123456789"}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              dispatch(logout());
            }}
          >
            <View className="bg-white/30 rounded-full">
              <Text className="text-white px-4 py-2 font-semibold">
                Đăng xuất
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        {/* end header */}
        {/* slider */}
        <ScrollView
          className="py-2 w-full"
          pagingEnabled
          horizontal
          showsHorizontalScrollIndicator={false}
        >
          {/* {imgs.map((img, i) => {
              return (
                <View key={i} className="w-[90vw] px-1">
                  <Image
                    key={i}
                    source={{ uri: img }}
                    className="w-full h-48 object-cover rounded-md"
                  />
                </View>
              );
            })} */}
        </ScrollView>
        {/* end slider */}

        {/* apps */}
        <View className="p-3 mb-6 flex-row justify-around">
          <TouchableOpacity
            className="w-1/5 aspect-square items-center justify-start rounded-2xl p-2"
            onPress={() => {
              return navigation.navigate("NewBill");
            }}
          >
            <View className="rounded-2xl bg-cyan-500 w-full h-full items-center justify-center">
              <AntDesign name="addfile" size={24} color="white" />
            </View>
            <Text className="text-xs mt-2 text-white font-semibold">
              Tạo đơn
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="w-1/5 aspect-square items-center justify-start rounded-2xl p-2"
            onPress={() => {
              return navigation.navigate("Analytic");
            }}
          >
            <View className="rounded-2xl bg-cyan-500 w-full h-full items-center justify-center">
              <MaterialCommunityIcons
                name="google-analytics"
                size={24}
                color="white"
              />
            </View>
            <Text className="text-xs mt-2 text-white font-semibold">
              Thống kê
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="w-1/5 aspect-square items-center justify-start rounded-2xl p-2"
            onPress={() => {
              return navigation.navigate("Tracking");
            }}
          >
            <View className="rounded-2xl bg-cyan-500 w-full h-full items-center justify-center">
              <Entypo name="location-pin" size={24} color="white" />
            </View>
            <Text className="text-xs mt-2 text-white font-semibold">
              Tra cứu
            </Text>
          </TouchableOpacity>
        </View>
        <View className="bg-black/40 rounded-xl p-2">
          <Text className="mt-4 px-2 font-semibold text-white">Tiện ích</Text>
          <View className="flex-row flex-wrap w-full rounded-md -mt-4">
            <TouchableOpacity
              className="w-1/3 h-32 items-center justify-start rounded-2xl"
              onPress={() => {
                return navigation.navigate("Bills");
              }}
            >
              <View className="w-full p-8">
                <View className="rounded-2xl bg-white/30 w-full h-full items-center justify-center">
                  <Ionicons name="md-documents" size={24} color="white" />
                </View>
              </View>
              <Text className="text-xs mt-5 text-white font-semibold absolute top-20">
                Đơn hàng
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="w-1/3 h-32 items-center justify-start rounded-2xl"
              onPress={() => {
                return navigation.navigate("Customers");
              }}
            >
              <View className="w-full p-8">
                <View className="rounded-2xl bg-white/30 w-full h-full items-center justify-center">
                  <AntDesign name="contacts" size={28} color="white" />
                </View>
              </View>
              <Text className="text-xs mt-5 text-white font-semibold absolute top-20">
                Danh bạ
              </Text>
            </TouchableOpacity>
          </View>
          {currentUser.role !== "shop" && (
            <View className="mt-4">
              <Text className="px-2 font-semibold text-white">Quản trị</Text>
              <View className="flex-row flex-wrap -mt-4">
                <TouchableOpacity
                  className="w-1/3 aspect-square items-center justify-start rounded-2xl"
                  onPress={() => {
                    return navigation.navigate("Shops");
                  }}
                >
                  <View className="w-full p-8">
                    <View className="rounded-2xl bg-white/30 w-full h-full items-center justify-center">
                      <FontAwesome name="users" size={24} color="white" />
                    </View>
                  </View>
                  <Text className="text-xs mt-5 text-white font-semibold absolute top-20">
                    shop
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  className="w-1/3 aspect-square items-center justify-start rounded-2xl"
                  onPress={() => {
                    return navigation.navigate("Cost");
                  }}
                >
                  <View className="w-full p-8">
                    <View className="rounded-2xl bg-white/30 w-full h-full items-center justify-center">
                      <Foundation name="list" size={24} color="white" />
                    </View>
                  </View>
                  <Text className="text-xs mt-5 text-white font-semibold absolute top-20">
                    Đơn giá
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
          <View className="mt-4 flex-row items-center justify-between">
            <Text className="py-2 font-semibold text-white">
              Sản phẩm cung cấp bởi Dichoho.top
            </Text>
            <Feather
              name="chevron-right"
              size={24}
              color="white"
              onPress={() => {
                Linking.openURL(`https://dichoho.top/products`);
              }}
            />
          </View>
          <Myslider />
          <View className="mt-4 flex-row items-center justify-between">
            <Text className="py-2 font-semibold text-white">
              Tin tức từ đối tác
            </Text>
            <Feather
              name="chevron-right"
              size={24}
              color="white"
              onPress={() => {
                Linking.openURL("https://dichoho.top/news");
              }}
            />
          </View>
          <ScrollView
            className="bg-white/20 rounded-md"
            pagingEnabled
            horizontal
            showsHorizontalScrollIndicator={false}
          >
            {posts &&
              posts.map((post, i) => {
                return (
                  <View className="w-[95vw] py-2 px-1 h-52 rounded-md " key={i}>
                    <Image
                      resizeMode="cover"
                      source={{
                        uri: post.thumbnail,
                      }}
                      className="w-full h-32 rounded-md"
                    />
                    <View className="flex-row justify-center items-center px-2">
                      <View className="px-2 flex-1">
                        <Text className="text-white mt-3 font-semibold ">
                          {post.title}
                        </Text>
                        <View className="py-1 flex-row items-center">
                          <AntDesign name="calendar" size={20} color="white" />
                          <Text className="px-2 text-white">
                            {new Date(post.createdAt).toLocaleDateString()}
                          </Text>
                        </View>
                      </View>
                      <TouchableOpacity
                        className="py-3 px-4 rounded-md bg-orange-500"
                        onPress={() =>
                          Linking.openURL(
                            `https://dichoho.top/news/${post._id}`
                          )
                        }
                      >
                        <Text className="text-white font-semibold">
                          Chi tiết
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                );
              })}
          </ScrollView>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Dashboard;
