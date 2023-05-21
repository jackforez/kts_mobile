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
  const [newPass, setNewPass] = useState("");
  const [rePass, setRePass] = useState("");
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
        console.log(error);
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
        console.log(`getCities ${error}`);
      }
    };
    getCities();
  }, []);

  // useEffect(() => {
  //   const getDistricts = async () => {
  //     try {
  //       const cName = cities.find((city) => city.name_with_type == cityCode);
  //       const resd = await ktsRequest.get(`/cities/districts/${cName.code}`);
  //       const data = Object.values(resd.data);
  //       setDistricts(data);
  //       setCityCode(cName.name_with_type);

  //       data.findIndex((el) => el.name_with_type.includes(districtCode)) < 0 &&
  //         setDistrictCode(data[0].name_with_type);
  //       setUser((prev) => {
  //         return {
  //           ...prev,
  //           cityCode: cName.code,
  //           cityName: cName.name,
  //           cityFullName: cName.name_with_type,
  //         };
  //       });
  //     } catch (error) {
  //       console.log(`getDistricts ${error}`);
  //     }
  //   };
  //   getDistricts();
  // }, [cityCode]);
  // useEffect(() => {
  //   const getWards = async () => {
  //     try {
  //       const dName = districts.find((d) => d.name_with_type == districtCode);
  //       const resw = await ktsRequest.get(`cities/wards/${dName.code}`);
  //       const data = Object.values(resw.data);
  //       setWards(data);
  //       setDistrictCode(dName?.name_with_type);
  //       data.findIndex((el) => el.name_with_type.includes(wardCode)) < 0 &&
  //         setWardCode(data[0].name_with_type);
  //       setUser((prev) => {
  //         return {
  //           ...prev,
  //           districtCode: dName.code,
  //           districtName: dName.name,
  //           districtFullName: dName.name_with_type,
  //         };
  //       });
  //     } catch (error) {
  //       console.log(`getWards ${error}`);
  //     }
  //   };
  //   getWards();
  // }, [districtCode]);
  // useEffect(() => {
  //   const getWard = () => {
  //     try {
  //       const wName = wards.find((w) => w.name_with_type === wardCode);
  //       setWardCode(wName.name_with_type);
  //       setUser((prev) => {
  //         return {
  //           ...prev,
  //           wardCode: wName.code,
  //           wardName: wName.name,
  //           wardFullName: wName.name_with_type,
  //         };
  //       });
  //     } catch (error) {
  //       console.log(`getWard ${error}`);
  //     }
  //   };
  //   getWard();
  // }, [wardCode]);
  useEffect(() => {
    const getFullAddress = async () => {
      try {
        const cName = cities.find((c) => c.name_with_type == cityCode);
        const resd = await ktsRequest.get(`/cities/districts/${cName.code}`);
        const datad = Object.values(resd.data);
        setCityCode(cName.name_with_type);
        setDistricts(datad);
        datad.findIndex((el) => el.name_with_type.includes(districtCode)) < 0 &&
          setDistrictCode(datad[0].name_with_type);
        const dName = districts.find((d) => d.name_with_type == districtCode);
        const resw = await ktsRequest.get(`cities/wards/${dName.code}`);
        const dataw = Object.values(resw.data);
        setDistrictCode(dName.name_with_type);
        setWards(dataw);
        dataw.findIndex((el) => el.name_with_type.includes(wardCode)) < 0 &&
          setWardCode(dataw[0].name_with_type);
        const wName = wards.find((w) => w.name_with_type == wardCode);
        setWardCode(wName.name_with_type);
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
  const handleAddCost = async () => {
    const config = {
      method: "post",
      url: "/users/addcost",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      data: {
        partnerID: userId,
        cost_name: costName,
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
  const handleChangePwd = async () => {
    dispatch(onLoading());
    if (!newPass) {
      alert("Mật khẩu mới không được để trống");
      dispatch(loaded());
      return;
    }
    if (newPass !== rePass) {
      alert("Mật khẩu mới / xác nhận mật khẩu mới không trùng khớp");
      dispatch(loaded());
      return;
    }
    try {
      await ktsRequest.post(
        `v2/users/changepwd/${user?._id}`,
        { password: "ktscorp.vn", newpwd: newPass },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("Thay đổi mật khẩu đối tác thành công");
      setOpenChangePwd(false);
      dispatch(loaded());
    } catch (error) {
      alert(error.response ? error.response.data : "Network Error!");
      setOpenChangePwd(false);
      dispatch(loaded());
    }
  };
  const handleChangeInfo = async () => {
    dispatch(onLoading());
    try {
      const res = await ktsRequest.put(
        `users/${user._id}`,
        { ...user, updatedBy: currentUser._id },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("Cập nhật thông tin đối tác thành công");
      dispatch(loaded());
      dispatch(onRefreh());
    } catch (error) {
      dispatch(loaded());
      alert(error.response ? error.response.data : "Network Error!");
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
                {openAddCost ? (
                  <View className="flex-row gap-2">
                    <TouchableOpacity
                      className="rounded-md p-2 border border-red-500 "
                      onPress={() => setOpenAddCost(false)}
                    >
                      <AntDesign name="close" size={18} color="#ef4444" />
                    </TouchableOpacity>
                    <TouchableOpacity
                      className="rounded-md p-2 border border-green-500 "
                      onPress={handleAddCost}
                    >
                      <AntDesign name="check" size={18} color="#22c55e" />
                    </TouchableOpacity>
                  </View>
                ) : (
                  <TouchableOpacity
                    className="rounded-md p-2 border border-blue-500"
                    onPress={() => setOpenAddCost(true)}
                  >
                    <Entypo name="pencil" size={18} color="rgb(59 130 246)" />
                  </TouchableOpacity>
                )}
              </View>
              <View>
                {user.cost?.length > 0 ? (
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
                ) : (
                  <View className="bg-slate-100 rounded py-3 px-2">
                    <Text className="text-red-500">
                      Shop chưa được áp dụng mức giá nào, hệ thống sẽ không thể
                      lên đơn. Hãy thêm ít nhất một mức giá cho Shop.
                    </Text>
                  </View>
                )}
                {openAddCost && (
                  <View className="mt-2">
                    <MyPicker
                      placehoder="Chọn mức giá"
                      data={cost}
                      field={["costName"]}
                      toShow="costName"
                      size={"md"}
                      output={setCostName}
                    />
                  </View>
                )}
              </View>
            </View>
            <View className="space-y-2 mb-2">
              <View className="flex-row justify-between items-center">
                <Text className="font-semibold uppercase">Bảo mật</Text>

                {openChangePwd ? (
                  <View className="flex-row gap-2">
                    <TouchableOpacity
                      className="rounded-md p-2 border border-red-500 "
                      onPress={() => setOpenChangePwd(false)}
                    >
                      <AntDesign name="close" size={18} color="#ef4444" />
                    </TouchableOpacity>
                    <TouchableOpacity
                      className="rounded-md p-2 border border-green-500 "
                      onPress={handleChangePwd}
                    >
                      <AntDesign name="check" size={18} color="#22c55e" />
                    </TouchableOpacity>
                  </View>
                ) : (
                  <TouchableOpacity
                    className="rounded-md p-2 border border-blue-500"
                    onPress={() => setOpenChangePwd(true)}
                  >
                    <Entypo name="pencil" size={18} color="rgb(59 130 246)" />
                  </TouchableOpacity>
                )}
              </View>

              {openChangePwd ? (
                <View className="space-y-2">
                  <TextInput
                    className="w-full bg-white p-3 rounded-md border border-gray-200"
                    placeholder="Mật khẩu mới"
                    onChangeText={(text) => {
                      setNewPass(text);
                    }}
                    secureTextEntry={true}
                  />
                  <TextInput
                    className="w-full bg-white p-3 rounded-md border border-gray-200"
                    placeholder="Xác nhận mật khẩu mới"
                    onChangeText={(text) => {
                      setRePass(text);
                    }}
                    secureTextEntry={true}
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
                {openChangeInfo ? (
                  <View className="flex-row gap-2">
                    <TouchableOpacity
                      className="rounded-md p-2 border border-red-500 "
                      onPress={() => {
                        setOpenChangeInfo(false);
                        dispatch(onRefreh());
                      }}
                    >
                      <AntDesign name="close" size={18} color="#ef4444" />
                    </TouchableOpacity>
                    <TouchableOpacity
                      className="rounded-md p-2 border border-green-500 "
                      onPress={handleChangeInfo}
                    >
                      <AntDesign name="check" size={18} color="#22c55e" />
                    </TouchableOpacity>
                  </View>
                ) : (
                  <TouchableOpacity
                    className="rounded-md p-2 border border-blue-500"
                    onPress={() => setOpenChangeInfo(true)}
                  >
                    <Entypo name="pencil" size={18} color="rgb(59 130 246)" />
                  </TouchableOpacity>
                )}
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
                value={user.phone?.toString()}
                keyboardType="numeric"
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
