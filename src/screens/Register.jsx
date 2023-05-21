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
import MyPicker from "./MyPicker";
import { ktsRequest } from "../ultis/connections";
import { useDispatch, useSelector } from "react-redux";
import { onLoading, loaded } from "../redux/systemSlice";

const Register = () => {
  const { loading } = useSelector((state) => state.system);
  const dispatch = useDispatch();
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

  const handleCreate = async () => {
    dispatch(onLoading());
    if (!inputs.name) {
      alert("Tên đăng nhập là bắt buộc!");
      dispatch(loaded());
      return;
    }
    if (!inputs.password) {
      alert("Mật khẩu là bắt buộc!");
      dispatch(loaded());
      return;
    }
    if (inputs.password !== inputs.repassword) {
      alert("Xác nhận mật khẩu không khớp!");
      dispatch(loaded());
      return;
    }
    if (!inputs.phone || inputs.phone.length !== 10) {
      alert("Số điện thoại không hợp lệ");
      dispatch(loaded());
      return;
    }
    if (!inputs.displayName) {
      alert("Tên shop không được để trống!");
      dispatch(loaded());
      return;
    }
    if (!inputs.address) {
      alert("Vui lòng nhập địa chỉ, tên đường!");
      dispatch(loaded());
      return;
    }
    if (!inputs.cityCode) {
      alert("Vui lòng chọn Tỉnh/Thành!");
      dispatch(loaded());
      return;
    }
    if (!inputs.districtCode) {
      alert("Vui lòng chọn Quận/Huyện!");
      dispatch(loaded());
      return;
    }
    if (!inputs.wardCode) {
      alert("Vui lòng chọn Phường/Xã!");
      dispatch(loaded());
      return;
    }
    try {
      const res = await ktsRequest.post("/auth/signup", inputs);
      alert(res.data);
      dispatch(loaded());
    } catch (er) {
      dispatch(loaded());
      alert(er.response ? er.response.data : "Network Error");
    }
  };
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1 justify-between items-center w-full bg-white"
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
                        setInputs((prev) => {
                          return {
                            ...prev,
                            name: text.replace(/[^a-zA-Z0-9]/g, ""),
                          };
                        });
                      }}
                    />
                    <Text className="text-indigo-900 text-start w-full font-semibold">
                      Số điện thoại
                    </Text>
                    <TextInput
                      className="w-full bg-white p-3 rounded-md border border-gray-200"
                      placeholder="0123456789"
                      onChangeText={(text) => {
                        setInputs((prev) => {
                          return { ...prev, phone: text };
                        });
                      }}
                    />
                    <Text className="text-indigo-900 text-start w-full font-semibold">
                      Tên shop
                    </Text>
                    <TextInput
                      className="w-full bg-white p-3 rounded-md border border-gray-200"
                      placeholder="Sẽ hiển thị khi tạo bill"
                      onChangeText={(text) => {
                        setInputs((prev) => {
                          return { ...prev, displayName: text };
                        });
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
                        setInputs((prev) => {
                          return { ...prev, password: text };
                        });
                      }}
                    />
                    <Text className="text-indigo-900 text-start w-full font-semibold">
                      Xác nhận khẩu
                    </Text>
                    <TextInput
                      className="w-full bg-white p-3 rounded-md border border-gray-200"
                      placeholder="xác nhận password"
                      secureTextEntry={true}
                      onChangeText={(text) => {
                        setInputs((prev) => {
                          return { ...prev, repassword: text };
                        });
                      }}
                    />
                    <Text className="text-indigo-900 text-start w-full font-semibold">
                      Email
                    </Text>
                    <TextInput
                      className="w-full bg-white p-3 rounded-md border border-gray-200"
                      placeholder="example@ktscorp.vn"
                      onChangeText={(text) => {
                        setInputs((prev) => {
                          return { ...prev, email: text };
                        });
                      }}
                    />
                    <Text className="text-indigo-900 text-start w-full font-semibold">
                      Địa chỉ
                    </Text>
                    <TextInput
                      className="w-full bg-white p-3 rounded-md border border-gray-200"
                      placeholder="766 Nguyễn Văn Linh"
                      onChangeText={(text) => {
                        setInputs((prev) => {
                          return { ...prev, address: text };
                        });
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
                      onPress={handleCreate}
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
