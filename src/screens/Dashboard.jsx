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
import { ktsRequest } from "../ultis/connections";
import { logout } from "../redux/userSlice";
import { Myslider } from "../components";
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
  const [post, setPost] = useState({});
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
            alert.alert("Phiên làm việc hết hạn", " vui lòng đăng nhập lại!");
            dispatch(logout());
          }
        } else {
          alert("Network Error!");
        }
      }
    };
    checkToken();
  }, []);
  // useEffect(() => {
  //   const fetchPost = async () => {
  //     try {
  //       const res = await ktsRequest.get("/posts/64bb56f78197f230d267d848");
  //       setPost(res.data);
  //     } catch (err) {
  //       console.log(err);
  //       alert("Network Error!");
  //     }
  //   };
  //   fetchPost();
  // }, []);

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
                <Text className="text-indigo-900 font-bold">V</Text>
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
          <View>
            <Ionicons name="notifications" size={28} color="white" />
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
              return navigation.navigate("Bills");
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
              return navigation.navigate("Bills");
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
              return navigation.navigate("Bills");
            }}
          >
            <View className="rounded-2xl bg-cyan-500 w-full h-full items-center justify-center">
              <AntDesign name="addfile" size={24} color="white" />
            </View>
            <Text className="text-xs mt-2 text-white font-semibold">
              Tra cứu
            </Text>
          </TouchableOpacity>
        </View>
        <View className="bg-black/40 rounded-xl p-2">
          <Text className="p-2 font-semibold text-white">Tiện ích</Text>
          <View className="flex-row flex-wrap w-full rounded-md">
            <TouchableOpacity
              className="w-1/3 aspect-square items-center justify-start rounded-2xl"
              onPress={() => {
                return navigation.navigate("Bills");
              }}
            >
              <View className="w-full p-8">
                <View className="rounded-2xl bg-white/30 w-full h-full items-center justify-center">
                  <Ionicons name="md-documents" size={24} color="white" />
                </View>
              </View>
              <Text className="text-xs mt-2 text-white font-semibold absolute top-20">
                Đơn hàng
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="w-1/3 aspect-square items-center justify-start rounded-2xl"
              onPress={() => {
                return navigation.navigate("Bills");
              }}
            >
              <View className="w-full p-8">
                <View className="rounded-2xl bg-white/30 w-full h-full items-center justify-center">
                  <AntDesign name="contacts" size={28} color="white" />
                </View>
              </View>
              <Text className="text-xs mt-2 text-white font-semibold absolute top-20">
                Danh bạ
              </Text>
            </TouchableOpacity>
            {/* <TouchableOpacity
              className="w-1/3 aspect-square items-center justify-start rounded-2xl"
              onPress={() => {
                return navigation.navigate("Bills");
              }}
            >
              <View className="w-full p-8">
                <View className="rounded-2xl bg-cyan-500 w-full h-full items-center justify-center">
                  <Ionicons name="md-documents" size={24} color="white" />
                </View>
              </View>
              <Text className="text-xs mt-2 text-white font-semibold absolute top-20">
                Đơn hàng
              </Text>
            </TouchableOpacity>

            <View className="w-1/5 aspect-square items-center justify-center p-2">
              <TouchableOpacity
                className="w-full aspect-square items-center justify-center bg-white/30 rounded-2xl"
                onPress={() => {
                  return navigation.navigate("Bills");
                }}
              >
                <Ionicons name="md-documents" size={24} color="white" />

                <Text className="text-xs mt-2 text-white">Đơn hàng</Text>
              </TouchableOpacity>
            </View>
            <View className="w-1/4 aspect-square items-center justify-center p-2">
              <TouchableOpacity
                className="w-full aspect-square items-center justify-center bg-cyan-600  rounded-2xl"
                onPress={() => {
                  return navigation.navigate("Customers");
                }}
              >
                <AntDesign name="contacts" size={28} color="white" />
                <Text className="text-xs mt-2 text-white">Danh bạ</Text>
              </TouchableOpacity>
            </View> */}
          </View>
          {currentUser.role !== "shop" && (
            <View>
              <Text className="p-2 font-semibold text-white">Quản trị</Text>
              <View className="flex-row flex-wrap">
                <TouchableOpacity
                  className="w-1/3 aspect-square items-center justify-start rounded-2xl"
                  onPress={() => {
                    return navigation.navigate("Bills");
                  }}
                >
                  <View className="w-full p-8">
                    <View className="rounded-2xl bg-white/30 w-full h-full items-center justify-center">
                      <FontAwesome name="users" size={24} color="white" />
                    </View>
                  </View>
                  <Text className="text-xs mt-2 text-white font-semibold absolute top-20">
                    shop
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  className="w-1/3 aspect-square items-center justify-start rounded-2xl"
                  onPress={() => {
                    return navigation.navigate("Bills");
                  }}
                >
                  <View className="w-full p-8">
                    <View className="rounded-2xl bg-white/30 w-full h-full items-center justify-center">
                      <Foundation name="list" size={24} color="white" />
                    </View>
                  </View>
                  <Text className="text-xs mt-2 text-white font-semibold absolute top-20">
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
                Linking.openURL(`https://dichoho.top/products`);
              }}
            />
          </View>
          <ScrollView
            className="px-1 py-2 w-full bg-white/20 rounded-md"
            pagingEnabled
            horizontal
            showsHorizontalScrollIndicator={false}
          >
            <TouchableOpacity
            // onPress={() => {
            //   Linking.openURL(`https://dichoho.top/products/${d._id}`);
            // }}
            >
              <View className="w-[94vw] px-1 h-48 rounded-md">
                <Image
                  source={{
                    uri: "https://firebasestorage.googleapis.com/v0/b/dichoho-4e879.appspot.com/o/images%2Fposts%2F647acc18c4cae99ae44509f2%2F1689998945964647acc18c4cae99ae44509f2_Promotion.4350a3e2360fec3b8741.png?alt=media&token=2953c431-929a-428d-ab23-07a7300e28a0",
                  }}
                  className="w-full h-32 object-cover rounded-md"
                />
                <View className="flex-row mt-3 justify-center items-center px-2">
                  <Text className="text-white mt-3 w-4/5">
                    Khởi động chương trình " Mua hàng ngay - Quà liền tay"
                  </Text>
                  <Pressable className="p-4 rounded-md bg-sky-600">
                    <Text className="text-white">Chi tiết</Text>
                  </Pressable>
                </View>
              </View>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Dashboard;
