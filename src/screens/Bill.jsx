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
import { search, toVND } from "../ultis/functions";
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
  const [inputs, setInputs] = useState({ weight: "1", cod: "0" });
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
  const [tmpCost, setTmpCost] = useState(0);

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
      } catch (error) {
        alert.error(error);
      }
    };
    checker.showSenderForm && fetchShop();
  }, [checker.showSenderForm]);
  useEffect(() => {
    const getCost = async () => {
      try {
        const res = await ktsRequest.post(
          "/cost/calculate",
          {
            shopId: sender?._id,
            weight: parseInt(inputs.weight || 1),
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setTmpCost(res.data);
        setCheker((prev) => {
          return { ...prev, cost: "" };
        });
      } catch (error) {
        setCheker((prev) => {
          return { ...prev, cost: "Cân nặng chưa có cước " };
        });
      }
    };
    inputs.weight > 0 && getCost();
  }, [inputs.weight, sender]);

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
      } catch (error) {}
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
  const total = () => {
    let t = 0;
    const _cod = parseInt(inputs.cod) || 0;
    if (shopPay) {
      t = _cod;
    } else {
      t = _cod + parseInt(tmpCost);
    }
    return t;
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
                              onPress={() => {
                                setSender(el);
                                setCheker((prev) => {
                                  return { ...prev, showSenderForm: false };
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
                    placeholder={sender?.displayName || "Tên người nhận"}
                    editable={false}
                    value={sender?.displayName}
                  />
                  <TextInput
                    className="w-full bg-gray-50 p-3 rounded-md border border-gray-200 focus:border-indigo-800"
                    placeholder={sender?.phone || "Số điện thoại"}
                    editable={false}
                    value={sender?.phone}
                  />
                  <TextInput
                    className="w-full bg-gray-50 p-3 rounded-md border border-gray-200 focus:border-indigo-800 truncate"
                    placeholder={sender?.address || "Số nhà, tên đường"}
                    editable={false}
                    value={sender?.address}
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
                      size={18}
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
                      nested={false}
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
                      required="Chọn Tỉnh/Thành trước"
                      nested={false}
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
                      nested={false}
                      required="Chọn Quận/Huyện trước"
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
                  <Text
                    className={`${
                      checker.cost ? "text-red-500" : "text-indigo-900"
                    } text-start w-full font-semibold`}
                  >
                    {checker.cost || "Trọng lượng (gram)"}
                  </Text>
                  <TextInput
                    className={`w-full bg-white p-3 rounded-md border ${
                      checker.cost ? "border-red-500" : "border-gray-200"
                    } focus:border-indigo-800`}
                    placeholder={inputs.weight || "1"}
                    value={inputs.weight}
                    onFocus={() =>
                      setCheker((prev) => {
                        return { ...prev, cost: "" };
                      })
                    }
                    onChangeText={(text) => {
                      setInputs((prev) => {
                        return { ...prev, weight: text.replace(/[^0-9]/g, "") };
                      });
                    }}
                  />
                </View>
                <View className="w-1/2 pl-1 space-y-2">
                  <Text className="text-indigo-900 text-start w-full font-semibold">
                    COD (VNĐ)
                  </Text>
                  <TextInput
                    className="w-full bg-white p-3 rounded-md border border-gray-200 focus:border-indigo-800"
                    placeholder="0"
                    // keyboardType="numeric"
                    value={inputs.cod}
                    onChangeText={(text) => {
                      setInputs((prev) => {
                        return { ...prev, cod: text.replace(/[^0-9]/g, "") };
                      });
                    }}
                  />
                </View>
              </View>

              <Text className="text-indigo-900 pt-2 text-start w-full font-semibold">
                Tổng tiền thu hộ tạm tính (VNĐ)
              </Text>
              <View className="w-full p-3 rounded-md border border-gray-200 bg-gray-50 font-bold focus:border-indigo-800">
                <Text className="text-indigo-900 font-bold">
                  {/* {toVND(total())} */}
                  {toVND(
                    shopPay
                      ? parseInt(inputs.cod) || 0
                      : (parseInt(inputs.cod) || 0) + parseInt(tmpCost)
                  )}
                </Text>
              </View>
              <Text className="text-indigo-900 pt-2 text-start w-full font-semibold">
                Ghi chú
              </Text>
              <TextInput
                className="max-w-full bg-white p-3 rounded-md border border-gray-200 focus:border-indigo-800"
                placeholder="Ghi chú của shop"
                multiline={true}
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
