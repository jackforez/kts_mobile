import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Switch,
  ScrollView,
  Platform,
  KeyboardAvoidingView,
} from "react-native";
import React, { useState, useEffect } from "react";
import { Entypo, AntDesign } from "@expo/vector-icons";
import { TextInput } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { search } from "../ultis/functions";
import { data } from "../ultis/dummy";
import { ktsRequest } from "../ultis/connections";
import MyPicker from "./MyPicker";
import { useDispatch, useSelector } from "react-redux";
import { loaded, onLoading } from "../redux/systemSlice";
const Bill = () => {
  const { currentUser } = useSelector((state) => state.user);
  const { loading } = useSelector((state) => state.system);
  const dispatch = useDispatch();
  const { token } = currentUser;
  const navigation = useNavigation();
  const [shopPay, setShopPay] = useState(false);
  const [isBroken, setIsBroken] = useState(false);
  const [query, setQuery] = useState("");
  const [inputs, setInputs] = useState({});
  const [revievers, setRecievers] = useState([]);
  const [sender, setSender] = useState(currentUser || {});
  const [senders, setSenders] = useState([]);
  const [checker, setCheker] = useState({
    showSenderForm: false,
    showRecieverForm: false,
  });
  const [cities, setCities] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const [cityCode, setCityCode] = useState("");
  const [districtCode, setDistrictCode] = useState("");
  const [wardCode, setWardCode] = useState("");
  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const res = await ktsRequest.get(`/v2/customers/my`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setRecievers(res.data);
      } catch (error) {
        alert.error(error);
      }
    };
    checker.showRecieverForm && fetchCustomers();
  }, [checker.showRecieverForm]);
  useEffect(() => {
    const fetchShop = async () => {
      try {
        const res = await ktsRequest.get(`/users/children`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setSenders(res.data);
        console.log(res.data);
      } catch (error) {
        console.log(error);
        alert.error(error);
      }
    };
    checker.showSenderForm && fetchShop();
  }, [checker.showSenderForm]);
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
        setInputs((prev) => {
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
  const handleClick = async () => {
    dispatch(onLoading());
    if (!inputs.phone || inputs.phone.length != 10) {
      alert("Số điện thoại người nhận hàng không hợp lệ");
      dispatch(loaded());
      return;
    }
    if (!inputs.name) {
      alert("Chưa nhập tên người nhận hàng");
      dispatch(loaded());
      return;
    }

    if (!inputs.address) {
      alert("Chưa nhập địa chỉ người nhận hàng");
      dispatch(loaded());
      return;
    }
    if (!inputs.weight || inputs.weight <= 0) {
      alert("Trọng lượng không hợp lệ");
      dispatch(loaded());
      return;
    }
    if (!inputs.itemName) {
      alert("Cần nhập nội dung hàng hóa");
      dispatch(loaded());
      return;
    }
    if (inputs.itemQauntity < 1) {
      alert("Số lượng không hợp lệ!");
      dispatch(loaded());
    }
    try {
      const res = await ktsRequest.post(
        "/v2/bills",
        {
          userID: currentUser._id,
          shopID: sender._id,
          fromName: sender.displayName || "ktscorp.vn",
          fromPhone: sender.phone || "",
          fromAddress: sender.address || "",
          fromCity: sender.cityName || "",
          fromDistrict: sender.districtName || "",
          fromWard: sender.wardName || "",
          toName: inputs.name,
          toPhone: inputs.phone,
          toAddress: inputs.address,
          toCity: inputs.cityName || cityCode,
          toCityCode: inputs.cityCode || "",
          toCityFullName: inputs.cityFullName || "",
          toDistrict: inputs.districtName || districtCode,
          toDistrictCode: inputs.districtCode || "",
          toDistrictFullName: inputs.districtFullName || "",
          toWard: inputs.wardName || wardCode,
          toWardCode: inputs.wardCode || "",
          toWardFullName: inputs.wardFullName || "",
          itemName: inputs.itemName || "bưu phẩm",
          itemQauntity: inputs.itemQauntity || 1,
          weight: inputs.weight || 1,
          cod: inputs.cod || 0,
          note: inputs.note,
          partner: "VNP",
          shopPay,
          isBroken,
          platform: Platform.OS,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert(res.data);
      setInputs({});
      dispatch(loaded());
    } catch (err) {
      console.log(err);
      dispatch(loaded());
    }
  };
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1 justify-between items-center w-full bg-white"
    >
      <SafeAreaView className="flex-1 items-center bg-white justify-between">
        <ScrollView
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
        >
          <View className="w-full space-y-1 h-full">
            {checker.showSenderForm ? (
              <View className="w-full px-2 rounded-md">
                <View className="flex-row justify-between py-1 items-center">
                  <Text className="uppercase font-semibold text-indigo-900">
                    Danh sách người gửi
                  </Text>
                  <TouchableOpacity
                    className="rounded-md p-2 border border-red-500"
                    onPress={() =>
                      setCheker((prev) => {
                        return { ...prev, showSenderForm: false };
                      })
                    }
                  >
                    <AntDesign name="close" size={18} color="red" />
                  </TouchableOpacity>
                </View>
                <ScrollView className="rounded-md border border-gray-300 mt-1 max-h-72">
                  <TextInput
                    className="px-2 py-3 bg-white"
                    placeholder="Tìm kiếm..."
                    onChangeText={(text) => {
                      setQuery(text);
                    }}
                  />
                  {search(senders, query, ["phone", "name"]).length > 0 ? (
                    search(senders, query, ["phone", "name"]).map((el, i) => {
                      return (
                        <View
                          key={i}
                          className="bg-gray-50 p-2 flex-row w-full flex-wrap"
                        >
                          <View className="w-4/12">
                            <Text className="font-semibold text-xs">
                              {el.name}
                            </Text>
                            <Text className="text-xs">{el.phone}</Text>
                          </View>
                          <View className="w-6/12">
                            <Text className="text-xs">
                              {el.address +
                                ", " +
                                el.wardFullName +
                                ", " +
                                el.districtFullName +
                                ", " +
                                el.cityFullName}
                            </Text>
                          </View>
                          <View className="w-2/12">
                            <TouchableOpacity
                              className="border border-blue-500 rounded-md w p-2"
                              onPress={() =>
                                setCheker((prev) => {
                                  return { ...prev, showSenderForm: false };
                                })
                              }
                            >
                              <Text>Chọn</Text>
                            </TouchableOpacity>
                          </View>
                        </View>
                      );
                    })
                  ) : (
                    <View className="p-2">
                      <Text>Không có dữ liệu phù hợp</Text>
                    </View>
                  )}
                </ScrollView>
              </View>
            ) : (
              <View className="w-full px-2 rounded-md">
                <View className="flex-row justify-between py-1 items-center">
                  <Text className="uppercase font-semibold text-indigo-900">
                    Người gửi
                  </Text>
                  <TouchableOpacity
                    className="rounded-md p-2 border border-blue-500"
                    onPress={() =>
                      setCheker((prev) => {
                        return { ...prev, showSenderForm: true };
                      })
                    }
                  >
                    <Entypo name="pencil" size={18} color="rgb(59 130 246)" />
                  </TouchableOpacity>
                </View>
                <View className="rounded-md space-y-1  truncate overflow-hidden">
                  <TextInput
                    className="w-full bg-gray-50 p-3 rounded-md border border-gray-200 focus:border-indigo-800"
                    placeholder={currentUser?.displayName || "Tên người nhận"}
                    editable={false}
                    value={currentUser?.displayName}
                  />
                  <TextInput
                    className="w-full bg-gray-50 p-3 rounded-md border border-gray-200 focus:border-indigo-800"
                    placeholder={currentUser?.phone || "Số điện thoại"}
                    editable={false}
                    value={currentUser?.phone}
                  />
                  <TextInput
                    className="w-full bg-gray-50 p-3 rounded-md border border-gray-200 focus:border-indigo-800"
                    placeholder={currentUser?.address || "Số nhà, tên đường"}
                    editable={false}
                    value={currentUser?.address}
                  />
                </View>
              </View>
            )}

            {checker.showRecieverForm ? (
              <View className="w-full px-2 rounded-md">
                <View className="flex-row justify-between py-1 items-center">
                  <Text className="uppercase font-semibold text-indigo-900">
                    Danh danh bạ người nhận
                  </Text>
                  <TouchableOpacity
                    className="rounded-md p-2 border border-red-500"
                    onPress={() =>
                      setCheker((prev) => {
                        return { ...prev, showRecieverForm: false };
                      })
                    }
                  >
                    <AntDesign name="close" size={18} color="red" />
                  </TouchableOpacity>
                </View>
                <ScrollView className="rounded-md border border-gray-300 mt-1 max-h-72">
                  <TextInput
                    className="px-2 py-3 bg-white"
                    placeholder="Tìm kiếm..."
                    onChangeText={(text) => {
                      setQuery(text);
                    }}
                  />
                  {search(revievers, query, ["phone", "name"]).length > 0 ? (
                    search(revievers, query, ["phone", "name"]).map((el, i) => {
                      return (
                        <View
                          key={i}
                          className="bg-gray-50 p-2 flex-row w-full flex-wrap"
                        >
                          <View className="w-4/12">
                            <Text className="font-semibold text-xs">
                              {el.name}
                            </Text>
                            <Text className="text-xs">{el.phone}</Text>
                          </View>
                          <View className="w-6/12">
                            <Text className="text-xs">
                              {el.address +
                                ", " +
                                el.wardFullName +
                                ", " +
                                el.districtFullName +
                                ", " +
                                el.cityFullName}
                            </Text>
                          </View>
                          <View className="w-2/12">
                            <TouchableOpacity
                              className="border border-blue-500 rounded-md w p-2"
                              onPress={() => {
                                setInputs(el);
                                setCityCode(el.cityName);
                                setDistrictCode(el.districtName);
                                setWardCode(el.wardName);
                                setCheker((prev) => {
                                  return { ...prev, showRecieverForm: false };
                                });
                              }}
                            >
                              <Text>Chọn</Text>
                            </TouchableOpacity>
                          </View>
                        </View>
                      );
                    })
                  ) : (
                    <View className="p-2">
                      <Text>Không có dữ liệu phù hợp</Text>
                    </View>
                  )}
                </ScrollView>
              </View>
            ) : (
              <View className="w-full px-2 rounded-md">
                <View className="flex-row justify-between py-1 items-center">
                  <Text className="uppercase font-semibold text-indigo-900">
                    Người nhận
                  </Text>
                  <TouchableOpacity
                    className="rounded-md p-2 border border-blue-500"
                    onPress={() =>
                      setCheker((prev) => {
                        return { ...prev, showRecieverForm: true };
                      })
                    }
                  >
                    <AntDesign
                      name="search1"
                      size={16}
                      color="rgb(59 130 246)"
                    />
                  </TouchableOpacity>
                </View>
                <View className="rounded-md space-y-1">
                  <TextInput
                    className="w-full bg-white p-3 rounded-md border border-gray-200 focus:border-indigo-800"
                    placeholder="Tên người nhận"
                    value={inputs?.name}
                    onChangeText={(text) => {
                      setInputs((prev) => {
                        return { ...prev, name: text };
                      });
                    }}
                  />
                  <TextInput
                    className="w-full bg-white p-3 rounded-md border border-gray-200 focus:border-indigo-800"
                    placeholder="Số điện thoại"
                    value={inputs?.phone}
                    keyboardType="numeric"
                    onChangeText={(text) => {
                      setInputs((prev) => {
                        return { ...prev, phone: text };
                      });
                    }}
                  />
                  <TextInput
                    className="w-full bg-white p-3 rounded-md border border-gray-200 focus:border-indigo-800"
                    placeholder="Số nhà, tên đường"
                    value={inputs?.address}
                    onChangeText={(text) => {
                      setInputs((prev) => {
                        return { ...prev, address: text };
                      });
                    }}
                  />
                  <View className="space-y-2">
                    <MyPicker
                      placehoder={inputs?.cityFullName || "Tỉnh/Thành"}
                      data={cities}
                      field={["name_with_type"]}
                      toShow="name_with_type"
                      size={"md"}
                      output={setCityCode}
                    />
                  </View>
                  <View className="space-y-2">
                    <MyPicker
                      placehoder={inputs?.districtFullName || "Quận/Huyện"}
                      data={districts}
                      field={["name_with_type"]}
                      toShow="name_with_type"
                      size={"md"}
                      output={setDistrictCode}
                    />
                  </View>
                  <View className="space-y-2">
                    <MyPicker
                      placehoder={inputs?.wardFullName || "Phường/Xã"}
                      data={wards}
                      field={["name_with_type"]}
                      toShow="name_with_type"
                      size={"md"}
                      output={setWardCode}
                    />
                  </View>
                </View>
              </View>
            )}

            <View className="w-full bg-white p-2 rounded-md space-y-2">
              <Text className="text-indigo-900 text-start w-full font-semibold">
                Nội dung hàng hóa
              </Text>
              <TextInput
                className="w-full bg-white p-3 rounded-md border border-gray-200 focus:border-indigo-800"
                placeholder="Nội dung hàng hóa"
                onChangeText={(text) => {
                  setInputs((prev) => {
                    return { ...prev, itemName: text };
                  });
                }}
              />
              <View className="flex-row pt-2">
                <View className="w-1/2 pr-1 space-y-2">
                  <Text className="text-indigo-900 text-start w-full font-semibold">
                    Trọng lượng
                  </Text>
                  <TextInput
                    className="w-full bg-white p-3 rounded-md border border-gray-200 focus:border-indigo-800"
                    placeholder="(gram)"
                    keyboardType="numeric"
                    onChangeText={(text) => {
                      setInputs((prev) => {
                        return { ...prev, weight: text };
                      });
                    }}
                  />
                </View>
                <View className="w-1/2 pl-1 space-y-2">
                  <Text className="text-indigo-900 text-start w-full font-semibold">
                    Số lượng
                  </Text>
                  <TextInput
                    className="w-full bg-white p-3 rounded-md border border-gray-200 focus:border-indigo-800"
                    placeholder="1"
                    keyboardType="numeric"
                    onChangeText={(text) => {
                      setInputs((prev) => {
                        return { ...prev, itemQauntity: text };
                      });
                    }}
                  />
                </View>
              </View>
              <Text className="text-indigo-900 pt-2 text-start w-full font-semibold">
                Số tiền cần thu hộ (VND)
              </Text>
              <TextInput
                className="w-full bg-white p-3 rounded-md border border-gray-200 focus:border-indigo-800"
                placeholder="0"
                keyboardType="numeric"
                onChangeText={(text) => {
                  setInputs((prev) => {
                    return { ...prev, cod: text };
                  });
                }}
              />
              <Text className="text-indigo-900 pt-2 text-start w-full font-semibold">
                Ghi chú
              </Text>
              <TextInput
                className="w-full bg-white p-3 rounded-md border border-gray-200 focus:border-indigo-800"
                placeholder="Ghi chú của shop"
                onChangeText={(text) => {
                  setInputs((prev) => {
                    return { ...prev, note: text };
                  });
                }}
              />
              <View className="w-full flex-row py-2">
                <View className="flex-row items-center w-1/2">
                  <Switch
                    onValueChange={() => setShopPay(!shopPay)}
                    value={shopPay}
                    className="scale-75"
                  />
                  <Text className="text-xs">
                    {shopPay ? "Người gửi trả cước" : "Người nhận trả cước"}
                  </Text>
                </View>
                <View className="flex-row items-center w-1/2">
                  <Switch
                    onValueChange={() => setIsBroken(!isBroken)}
                    value={isBroken}
                    className="scale-75"
                  />
                  <Text className="text-xs">
                    {isBroken ? "Hàng dễ vỡ" : "Hàng thường"}
                  </Text>
                </View>
              </View>
              <View className="w-full flex-row">
                <View className="w-1/2 pr-1">
                  <TouchableOpacity
                    onPress={() => navigation.navigate("Home")}
                    className="p-3.5 rounded-md border border-indigo-900 w-full justify-center items-center "
                  >
                    <Text className="text-indigo-900 font-semibold">Hủy</Text>
                  </TouchableOpacity>
                </View>
                <View className="w-1/2 pl-1">
                  <TouchableOpacity
                    onPress={handleClick}
                    className="p-3.5 rounded-md bg-indigo-900 w-full justify-center items-center"
                  >
                    {loading ? (
                      <Text className="text-white  font-semibold">
                        Loading...
                      </Text>
                    ) : (
                      <Text className="text-white  font-semibold">Tạo đơn</Text>
                    )}
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default Bill;
