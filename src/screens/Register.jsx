import {
  ImageBackground,
  KeyboardAvoidingView,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import img1 from "../constant/logo.jpg";
import { Picker } from "@react-native-picker/picker";
import MyPicker from "./MyPicker";
import { ktsRequest } from "../constant/connection";

const Register = () => {
  const [inputs, setInputs] = useState({});
  const [cities, setCities] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const [cityCode, setCityCode] = useState("");
  const [districtCode, setDistrictCode] = useState("");
  const [wardCode, setWardCode] = useState("");
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
  useEffect(() => {
    const getDistricts = async () => {
      try {
        const cName = cities.find((city) => city.name_with_type == cityCode);
        const resd = await ktsRequest.get(`/cities/districts/${cName.code}`);
        const data = Object.values(resd.data);
        setDistricts(data);
        setInputs((prev) => {
          return {
            ...prev,
            cityCode: cName.code,
            cityName: cName.name,
            cityFullName: cName.name_with_type,
          };
        });
      } catch (error) {
        console.log(error);
      }
    };
    getDistricts();
  }, [cityCode]);
  useEffect(() => {
    const getWards = async () => {
      try {
        const dName = districts.find((d) => d.name_with_type == districtCode);
        const resw = await ktsRequest.get(`cities/wards/${dName.code}`);
        const data = Object.values(resw.data);
        setWards(data);
        setInputs((prev) => {
          return {
            ...prev,
            districtCode: dName.code,
            districtName: dName.name,
            districtFullName: dName.name_with_type,
          };
        });
      } catch (error) {
        console.log(error);
      }
    };
    getWards();
  }, [districtCode]);
  useEffect(() => {
    const getWard = () => {
      try {
        const wName = wards.find((w) => w.name_with_type === wardCode);
        setInputs((prev) => {
          return {
            ...prev,
            wardCode: wName?.code,
            wardName: wName?.name,
            wardFullName: wName?.name_with_type,
          };
        });
      } catch (error) {
        console.log(error);
      }
    };
    wardCode && getWard();
  }, [wardCode]);

  const handleCreate = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!inputs.phone || inputs.phone.length !== 10) {
      alert("Số điện thoại không hợp lệ");
      setLoading(false);
      return;
    }
    if (!inputs.displayName) {
      alert("Tên shop không được để trống!");
      setLoading(false);
      return;
    }
    if (!inputs.address) {
      alert("Vui lòng nhập địa chỉ, tên đường!");
      setLoading(false);
      return;
    }
    if (!inputs.cityCode) {
      alert("Vui lòng chọn Tỉnh/Thành!");
      setLoading(false);
      return;
    }
    if (!inputs.districtCode) {
      alert("Vui lòng chọn Quận/Huyện!");
      setLoading(false);
      return;
    }
    if (!inputs.wardCode) {
      alert("Vui lòng chọn Phường/Xã!");
      setLoading(false);
      return;
    }
    try {
      const res = await ktsRequest.post("/auth/signup", inputs);
      alert(res.data);
      setLoading(false);
    } catch (er) {
      setLoading(false);
      alert(er.response ? er.response.data : "Network Error");
    }
  };
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1 justify-between items-center w-full bg-white dark:bg-red-600"
    >
      <SafeAreaView className="flex-1 w-full">
        <ScrollView
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
        >
          <View className="w-full">
            <ImageBackground
              source={img1}
              resizeMode="contain"
              className="h-[200px] w-full"
            />
            <View className="w-[90%] mx-auto">
              <View classNamew="w-3/4 bg-red-300 py-1 px-3 rounded-md">
                <View className="items-center justify-center rounded-md space-y-4 w-full flex text-white mx-auto">
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
                      Số điện thoại
                    </Text>
                    <TextInput
                      className="w-full bg-white p-3 rounded-md border border-gray-200"
                      placeholder="0123456789"
                      onChangeText={(text) => {
                        setPassword(text);
                      }}
                    />
                    <Text className="text-indigo-900 text-start w-full font-semibold">
                      Tên shop
                    </Text>
                    <TextInput
                      className="w-full bg-white p-3 rounded-md border border-gray-200"
                      placeholder="Sẽ hiển thị khi tạo bill"
                      onChangeText={(text) => {
                        setPassword(text);
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
                    <Text className="text-indigo-900 text-start w-full font-semibold">
                      Xác nhận khẩu
                    </Text>
                    <TextInput
                      className="w-full bg-white p-3 rounded-md border border-gray-200"
                      placeholder="password"
                      secureTextEntry={true}
                      onChangeText={(text) => {
                        setPassword(text);
                      }}
                    />
                    <Text className="text-indigo-900 text-start w-full font-semibold">
                      Email
                    </Text>
                    <TextInput
                      className="w-full bg-white p-3 rounded-md border border-gray-200"
                      placeholder="example@ktscorp.vn"
                      onChangeText={(text) => {
                        setPassword(text);
                      }}
                    />
                    <Text className="text-indigo-900 text-start w-full font-semibold">
                      Địa chỉ
                    </Text>
                    <TextInput
                      className="w-full bg-white p-3 rounded-md border border-gray-200"
                      placeholder="766 Nguyễn Văn Linh"
                      onChangeText={(text) => {
                        setPassword(text);
                      }}
                    />
                    <View className="space-y-2">
                      <MyPicker
                        placehoder={"Tỉnh/Thành"}
                        data={cities}
                        field={["name_with_type"]}
                        toShow="name_with_type"
                        size={"md"}
                        output={setCityCode}
                      />
                    </View>
                    <View className="space-y-2">
                      <MyPicker
                        placehoder={"Quận/Huyện"}
                        data={districts}
                        field={["name_with_type"]}
                        toShow="name_with_type"
                        size={"md"}
                        output={setDistrictCode}
                      />
                    </View>
                    <View className="space-y-2">
                      <MyPicker
                        placehoder={"Phường/Xã"}
                        data={wards}
                        field={["name_with_type"]}
                        toShow="name_with_type"
                        size={"md"}
                        output={setWardCode}
                      />
                    </View>
                  </View>
                  <View className="w-full mt-6">
                    <TouchableOpacity
                      // onPress={() => navigation.navigate("Login")}
                      onPress={() => alert("Chức năng đang được xây dựng")}
                      className="p-3.5 rounded-md bg-indigo-900 w-full justify-center items-center"
                    >
                      <Text className="text-white  font-semibold">Đăng ký</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default Register;
