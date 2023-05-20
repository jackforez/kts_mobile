import {
  View,
  Text,
  KeyboardAvoidingView,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loaded, onLoading, onRefreh } from "../redux/systemSlice";
import { ktsRequest } from "../ultis/connections";
import { textAvatar } from "../ultis/functions";
import { TextInput } from "react-native";
import { Entypo, AntDesign, FontAwesome } from "@expo/vector-icons";

import MyPicker from "./MyPicker";

const Profile = ({ route }) => {
  const { userId } = route.params;
  const { currentUser } = useSelector((state) => state.user);
  const { loading, refresh } = useSelector((state) => state.system);
  const { token } = currentUser;
  const dispatch = useDispatch();
  const [user, setUser] = useState({});
  const [cost, setCost] = useState([]);
  const [costName, setCostName] = useState();
  const [cities, setCities] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const [cityCode, setCityCode] = useState("");
  const [districtCode, setDistrictCode] = useState("");
  const [wardCode, setWardCode] = useState("");
  const [openAddCost, setOpenAddCost] = useState(false);
  const [openChangePwd, setOpenChangePwd] = useState(false);
  const [openChangeInfo, setOpenChangeInfo] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const resUser = await ktsRequest.get(`/users/find/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        setUser(resUser.data);
      } catch (error) {
        alert(error);
      }
    };
    fetchData();
  }, [refresh]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const resCost = await ktsRequest.get("/cost", {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        setCost(resCost.data.data);
      } catch (error) {
        alert(error);
      }
    };
    fetchData();
  }, []);
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
    const getFullAddress = async () => {
      try {
        const cName = cities.find((c) => c.name_with_type == cityCode);
        const resd = await ktsRequest.get(`/cities/districts/${cName.code}`);
        const datad = Object.values(resd.data);
        setDistricts(datad);
        const dName = districts.find((d) => d.name_with_type == districtCode);
        const resw = await ktsRequest.get(`cities/wards/${dName.code}`);
        const dataw = Object.values(resw.data);
        setWards(dataw);
        const wName = wards.find((w) => w.name_with_type == wardCode);
        setUser((prev) => {
          return {
            ...prev,
            cityCode: cName.code,
            cityName: cName.name,
            cityFullName: cName.name_with_type,
            districtCode: dName.code,
            districtName: dName.name,
            districtFullName: dName.name_with_type,
            wardCode: wName?.code,
            wardName: wName?.name,
            wardFullName: wName?.name_with_type,
          };
        });
      } catch (error) {
        console.log(error);
      }
    };
    getFullAddress();
  }, [cityCode, districtCode, wardCode]);

  const handleAddCost = async (userId, cost_name) => {
    const config = {
      method: "post",
      url: "/users/addcost",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      data: {
        partnerID: userId,
        cost_name,
      },
    };
    await ktsRequest(config)
      .then(function (res) {
        res.status === 200 ? alert(res.data) : alert(res.data);
        dispatch(onRefreh());
      })
      .catch(function (error) {
        error.response
          ? alert(error.response.data.message)
          : alert("Network Error!");
      });
  };
  // const handleRemoveCost = async (userId, cost_name) => {
  //   const config = {
  //     method: "post",
  //     url: "/users/removecost",
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: `Bearer ${token}`,
  //     },
  //     data: {
  //       partnerID: userId,
  //       cost_name,
  //     },
  //   };
  //   await ktsRequest(config)
  //     .then(function (res) {
  //       res.status === 200 ? alert(res.data) : alert(res.data);
  //       dispatch(onRefreh());
  //     })
  //     .catch(function (error) {
  //       error.response
  //         ? alert(error.response.data.message)
  //         : alert("Network Error!");
  //     });
  // };
  const handleRemoveCost = async (userId, cost_name) => {
    try {
      const res = await ktsRequest.post(
        "/users/removecost",
        {
          partnerID: userId,
          cost_name,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert(res.data);
      dispatch(onRefreh());
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1 w-full bg-white"
    >
      <SafeAreaView className="bg-white">
        <ScrollView
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          className="px-4 bg-white"
        >
          <View className="justify-center items-center py-6">
            {user.img ? (
              <Image
                source={{
                  uri: user.img,
                }}
              />
            ) : (
              <View>
                <View className="h-24 w-24 bg-orange-500 rounded-full justify-center items-center">
                  <Text className="text-white font-bold">
                    {textAvatar(user.displayName || "ktscorp.vn")}
                  </Text>
                </View>
                <View className="justify-center items-center">
                  <Text className="p-1 font-semibold text-base">
                    #{user.name}
                  </Text>
                  <View className="bg-orange-300 px-3 py-1.5 rounded-md">
                    <Text>{user.role}</Text>
                  </View>
                </View>
              </View>
            )}
          </View>
          <View>
            <View className="mb-2">
              <View className="flex-row justify-between items-center mb-2">
                <Text className="font-semibold uppercase">mức giá áp dụng</Text>
                <TouchableOpacity
                  className={`rounded-md p-2 border ${
                    openAddCost ? "border-red-500" : "border-blue-500"
                  }`}
                  onPress={() => setOpenAddCost(!openAddCost)}
                >
                  {openAddCost ? (
                    <AntDesign name="close" size={18} color="red" />
                  ) : (
                    <Entypo name="pencil" size={18} color="rgb(59 130 246)" />
                  )}
                </TouchableOpacity>
              </View>
              <View>
                {user.cost?.length > 0 ? (
                  <View>
                    <View className="flex-row gap-4 w-full flex-wrap">
                      {user.cost.map((c, i) => {
                        return (
                          <TouchableOpacity
                            disabled={!openAddCost}
                            className={`${
                              openAddCost ? "bg-red-500" : "bg-slate-100"
                            } rounded-md py-3 px-5`}
                            key={i}
                            onPress={() => handleRemoveCost(userId, c)}
                          >
                            <Text
                              className={`${
                                openAddCost ? "text-white" : "text-black"
                              }`}
                            >
                              {c}
                            </Text>
                          </TouchableOpacity>
                        );
                      })}
                    </View>
                    {openAddCost && (
                      <View className="mt-2 flex-row justify-between">
                        <View className="w-4/5">
                          <MyPicker
                            placehoder="Chọn mức giá"
                            data={cost}
                            field={["costName"]}
                            toShow="costName"
                            size={"md"}
                            output={setCostName}
                          />
                        </View>
                        <View className="justify-end">
                          <TouchableOpacity
                            className="rounded-md py-2.5 px-3 border border-green-500 "
                            onPress={() => handleAddCost(userId, costName)}
                          >
                            <FontAwesome
                              name="floppy-o"
                              size={20}
                              color="#22c55e"
                            />
                          </TouchableOpacity>
                        </View>
                      </View>
                    )}
                  </View>
                ) : (
                  <View className="bg-slate-100 rounded py-3 px-2">
                    <Text className="text-red-500">
                      Shop chưa được áp dụng mức giá nào, hệ thống sẽ không thể
                      lên đơn. Hãy thêm ít nhất một mức giá cho Shop.
                    </Text>
                  </View>
                )}
              </View>
            </View>
            <View className="space-y-2 mb-2">
              <View className="flex-row justify-between items-center">
                <Text className="font-semibold uppercase">Bảo mật</Text>
                <TouchableOpacity
                  className={`rounded-md p-2 border ${
                    openChangePwd ? "border-red-500" : "border-blue-500"
                  }`}
                  onPress={() => setOpenChangePwd(!openChangePwd)}
                >
                  {openChangePwd ? (
                    <AntDesign name="close" size={18} color="red" />
                  ) : (
                    <Entypo name="pencil" size={18} color="rgb(59 130 246)" />
                  )}
                </TouchableOpacity>
              </View>
              {openChangePwd ? (
                <View className="space-y-2">
                  <TextInput
                    className="w-full bg-white p-3 rounded-md border border-gray-200"
                    placeholder="Mật khẩu mới"
                    onChangeText={(text) => {
                      setUsername(text);
                    }}
                  />
                  <TextInput
                    className="w-full bg-white p-3 rounded-md border border-gray-200"
                    placeholder="Xác nhận mật khẩu mới"
                    onChangeText={(text) => {
                      setUsername(text);
                    }}
                  />
                </View>
              ) : (
                <TextInput
                  className="w-full p-3 rounded-md border border-gray-200 bg-slate-100"
                  placeholder="********"
                  editable={false}
                />
              )}
            </View>
            <View className="mb-2">
              <View className="flex-row justify-between items-center">
                <Text className="font-semibold uppercase">
                  Thông tin cơ bản
                </Text>
                <TouchableOpacity
                  className={`rounded-md p-2 border ${
                    openChangeInfo ? "border-red-500" : "border-blue-500"
                  }`}
                  onPress={() => setOpenChangeInfo(!openChangeInfo)}
                >
                  {openChangeInfo ? (
                    <AntDesign name="close" size={18} color="red" />
                  ) : (
                    <Entypo name="pencil" size={18} color="rgb(59 130 246)" />
                  )}
                </TouchableOpacity>
              </View>

              <TextInput
                editable={openChangeInfo}
                className={`w-full bg-white p-3 mt-2 rounded-md border border-gray-200 ${
                  !openChangeInfo && "bg-slate-100"
                }`}
                placeholder="Tên hiển thị"
                value={user.displayName}
                onChangeText={(text) => {
                  setUser((prev) => {
                    return { ...prev, displayName: text };
                  });
                }}
              />
              <TextInput
                editable={openChangeInfo}
                className={`w-full bg-white p-3 mt-2 rounded-md border border-gray-200 ${
                  !openChangeInfo && "bg-slate-100"
                }`}
                placeholder="Số điện thoại"
                value={user.phone}
                onChangeText={(text) => {
                  setUser((prev) => {
                    return { ...prev, phone: text };
                  });
                }}
              />
              <TextInput
                editable={openChangeInfo}
                className={`w-full bg-white p-3 mt-2 rounded-md border border-gray-200 ${
                  !openChangeInfo && "bg-slate-100"
                }`}
                placeholder="Email"
                value={user.email}
                onChangeText={(text) => {
                  setUser((prev) => {
                    return { ...prev, email: text };
                  });
                }}
              />
              <TextInput
                editable={openChangeInfo}
                className={`w-full bg-white p-3 mt-2 rounded-md border border-gray-200 ${
                  !openChangeInfo && "bg-slate-100"
                }`}
                placeholder="Số nhà, tên đường"
                value={user.address}
                onChangeText={(text) => {
                  setUser((prev) => {
                    return { ...prev, address: text };
                  });
                }}
              />
              <View className="mt-2">
                <MyPicker
                  disabled={!openChangeInfo}
                  placehoder={user.cityFullName || "Tỉnh/Thành"}
                  data={cities}
                  field={["name_with_type"]}
                  toShow="name_with_type"
                  size={"md"}
                  output={setCityCode}
                />
              </View>
              <View className="mt-2">
                <MyPicker
                  disabled={!openChangeInfo}
                  placehoder={user.districtFullName || "Quận/Huyện"}
                  data={districts}
                  field={["name_with_type"]}
                  toShow="name_with_type"
                  size={"md"}
                  output={setDistrictCode}
                />
              </View>
              <View className="mt-2">
                <MyPicker
                  disabled={!openChangeInfo}
                  placehoder={user.wardFullName || "Phường/Xã"}
                  data={wards}
                  field={["name_with_type"]}
                  toShow="name_with_type"
                  size={"md"}
                  output={setWardCode}
                />
              </View>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default Profile;
