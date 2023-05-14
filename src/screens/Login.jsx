import React, { useEffect, useState } from "react";
import {
  Alert,
  Image,
  ImageBackground,
  KeyboardAvoidingView,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  View,
} from "react-native";
import logo from "../constant/logo.jpg";
import { ktsRequest } from "../ultis/connections";
//redux
import { useDispatch, useSelector } from "react-redux";
import { onLoading, loaded } from "../redux/systemSlice";
import { loginSuccess } from "../redux/userSlice";
import { useNavigation } from "@react-navigation/native";

//navigation

const Login = () => {
  const { loading, refresh } = useSelector((state) => state.system);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginTab, setLoginTab] = useState(true);
  const [orderDetails, setOrderDetails] = useState({});
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
    dispatch(onLoading());
    if (!orderId) {
      alert("Mã vận đơn không được để trống");
      dispatch(loaded());
      return;
    }
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
        dispatch(onLoading());
      })
      .catch(function (error) {
        dispatch(loaded());
        console.log(error);
        alert("Network Error!");
      });
  };
  const handleLogin = async () => {
    dispatch(onLoading());
    if (!username) {
      alert("Tên đăng nhập không được để trống");
      dispatch(loaded());
      return;
    }
    try {
      const res = await ktsRequest.post("/auth/signin", {
        name: username,
        password: password,
      });
      dispatch(loaded());
      dispatch(loginSuccess(res.data));
      return navigation.navigate("Layout");
    } catch (error) {
      dispatch(loaded());
      alert("Sai tên đăng nhập hoặc mật khẩu");
    }
  };
  //for test
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1 justify-center items-center w-full bg-white"
    >
      <SafeAreaView className="flex-1 w-full">
        <ScrollView
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
        >
          <View className="w-full">
            <ImageBackground
              source={logo}
              resizeMode="contain"
              className="h-[200px] w-full"
            />
            <View className="w-[90%] mx-auto">
              <View classNamew="w-3/4 bg-red-300 py-1 px-3 rounded-md">
                <View className="flex-row bg-gray-100 w-full mx-auto rounded-md p-1">
                  <TouchableOpacity
                    onPress={() => setLoginTab(true)}
                    className={`p-3 rounded-md ${
                      loginTab && "bg-white"
                    } w-1/2 justify-center items-center`}
                  >
                    <Text
                      className={`${
                        !loginTab ? "text-indigo-900/60" : "text-indigo-900"
                      } font-bold`}
                    >
                      Đăng nhập
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => setLoginTab(false)}
                    className={`p-3 rounded-md ${
                      !loginTab && "bg-white"
                    } w-1/2 justify-center items-center`}
                  >
                    <Text
                      className={`${
                        loginTab ? "text-indigo-900/60" : "text-indigo-900"
                      } font-bold`}
                    >
                      Tra cứu đơn hàng
                    </Text>
                  </TouchableOpacity>
                </View>
                {loginTab ? (
                  <View className="items-center justify-center rounded-md space-y-4 mt-6 w-full flex text-white mx-auto">
                    <View className="w-full space-y-2">
                      <Text className="text-indigo-900 text-start w-full font-semibold">
                        Tài khoản
                      </Text>
                      <TextInput
                        className="w-full bg-white p-3 rounded-md border border-gray-200"
                        placeholder="Username"
                        onChangeText={(text) => {
                          setUsername(text);
                        }}
                      />
                      <Text className="text-indigo-900 text-start w-full font-semibold">
                        Mật khẩu
                      </Text>
                      <TextInput
                        className="w-full bg-white p-3 rounded-md border border-gray-200"
                        placeholder="password"
                        secureTextEntry={true}
                        onChangeText={(text) => {
                          setPassword(text);
                        }}
                      />
                    </View>
                    <View className="w-full justify-center items-end">
                      <TouchableOpacity
                        onPress={() => navigation.navigate("Resetpwd")}
                      >
                        {/* <Link to={{ screen: "Tracking" }}> */}
                        <Text className="text-blue-600 font-semibold underline text-xs">
                          Quên mật khẩu
                        </Text>
                        {/* </Link> */}
                      </TouchableOpacity>
                    </View>
                    <View className="w-full mt-6">
                      <TouchableOpacity
                        // onPress={() => navigation.navigate("Login")}
                        onPress={handleLogin}
                        className="p-3.5 rounded-md bg-indigo-900 w-full justify-center items-center"
                      >
                        {loading ? (
                          <Text className="text-white  font-semibold">
                            Loading...
                          </Text>
                        ) : (
                          <Text className="text-white  font-semibold">
                            Đăng nhập
                          </Text>
                        )}
                      </TouchableOpacity>
                    </View>
                    <View className="w-full justify-center items-center flex-row space-x-2 py-4">
                      <Text>Bạn chưa có tài khoản?</Text>
                      <TouchableOpacity
                        onPress={() => navigation.navigate("Register")}
                      >
                        {/* <Link to={{ screen: "Tracking" }}> */}
                        <Text className="text-blue-600 font-semibold underline text-xs">
                          Đăng ký ngay
                        </Text>
                        {/* </Link> */}
                      </TouchableOpacity>
                    </View>
                  </View>
                ) : (
                  <View className="items-center justify-center rounded-md space-y-4 w-full bg-white/50 text-white mx-auto mt-8">
                    <Text className="text-indigo-900 font-semibold">
                      Mã vận đơn
                    </Text>
                    <TextInput
                      className="w-full bg-white p-3 rounded-md border border-indigo-900"
                      placeholder="Nhập mã vận đơn, ví dụ KTS123456789"
                      onChangeText={(text) => setOrderId(text)}
                    />

                    <TouchableOpacity
                      className="p-3.5 rounded-md bg-indigo-900 w-full justify-center items-center"
                      onPress={handleTracking}
                    >
                      {loading ? (
                        <Text className="text-white  font-semibold">
                          Loading...
                        </Text>
                      ) : (
                        <Text className="text-white  font-semibold">
                          Tra cứu
                        </Text>
                      )}
                    </TouchableOpacity>

                    <View className="w-full">
                      {orderDetails.TBL_DELIVERY?.length > 0 ? (
                        <View
                          className={`bg-white 
                        border ${
                          getStatus(orderDetails.TBL_DELIVERY[0].STATUSTEXT)
                            .bcolor
                        }
                      p-3 rounded-md`}
                        >
                          <Text
                            className={`${
                              getStatus(orderDetails.TBL_DELIVERY[0].STATUSTEXT)
                                .tcolor
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
                              orderDetails.TBL_DINH_VI[
                                orderDetails.TBL_DINH_VI.length - 1
                              ].StatusText
                            }
                          </Text>
                        </View>
                      ) : (
                        orderDetails.TBL_DELIVERY && (
                          <Text>Chưa có dữ liệu trạng thái</Text>
                        )
                      )}
                    </View>
                    <View className="w-full">
                      {orderDetails.TBL_DINH_VI
                        ? orderDetails.TBL_DINH_VI.map((i, index) => {
                            return (
                              <View
                                className="mt-2 rounded border-l-4 border-red-500 p-2"
                                key={index}
                              >
                                <Text className="font-semibold tracking-wide">
                                  {i.StatusText}
                                </Text>
                                <Text className="text-xs  tracking-wide ">
                                  {i.TraceDate}
                                </Text>
                                <Text>{i.DiaChiBuuCuc}</Text>
                              </View>
                            );
                          })
                        : orderDetails.TBL_DINH_VI && (
                            <Text>Không có dữ liệu chi tiết</Text>
                          )}
                    </View>
                  </View>
                )}
              </View>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};
export default Login;
