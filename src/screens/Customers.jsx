import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Platform,
  KeyboardAvoidingView,
  TouchableOpacity,
  RefreshControl,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { TextInput } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { search, textAvatar, toVND } from "../ultis/functions";
import { ktsRequest } from "../ultis/connections";
import { useDispatch, useSelector } from "react-redux";
import { loaded, onLoading } from "../redux/systemSlice";
import {
  FontAwesome,
  Entypo,
  AntDesign,
  Feather,
  Ionicons,
  SimpleLineIcons,
} from "@expo/vector-icons";
import MyPicker from "./MyPicker";
const Card = ({ data }) => {
  return (
    <View>
      <View className="rounded-md bg-white mt-1">
        <View
          className={`bg-indigo-900 justify-between flex-row p-2  rounded-t-md`}
        >
          <Text className="text-white font-semibold my-auto">{data.name}</Text>
          <View className="flex-row gap-4 p-1">
            <TouchableOpacity>
              <SimpleLineIcons name="pencil" size={18} color="white" />
            </TouchableOpacity>
            <TouchableOpacity>
              <FontAwesome name="trash-o" size={20} color="white" />
            </TouchableOpacity>
          </View>
        </View>
        <View className="flex-row border-b border-x rounded-b-md border-gray-200">
          <View className="w-1/5 items-center justify-center">
            <View className="h-12 w-12 bg-orange-500 rounded-full justify-center items-center">
              <Text className="text-white font-bold">
                {textAvatar(data.name)}
              </Text>
            </View>
          </View>
          <View className="w-4/5 p-2">
            <Text className="text-sm">{data.phone}</Text>
            <Text className="text-sm">
              {data.address +
                ", " +
                data.wardFullName +
                ", " +
                data.districtFullName +
                ", " +
                data.cityFullName}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};
const Customers = () => {
  const { currentUser } = useSelector((state) => state.user);
  const { loading, refresh } = useSelector((state) => state.system);
  const dispatch = useDispatch();
  const { token } = currentUser;
  const navigation = useNavigation();
  const [refreshing, setRefreshing] = useState(false);
  const [customers, setCustomers] = useState([]);
  const [query, setQuery] = useState("");
  const [inputs, setInputs] = useState({});
  const [cities, setCities] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const [cityCode, setCityCode] = useState("");
  const [districtCode, setDistrictCode] = useState("");
  const [wardCode, setWardCode] = useState("");
  const [openAdd, setOpenAdd] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const res = await ktsRequest.get(`/v2/customers/my`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setCustomers(res.data);
      } catch (error) {
        alert.error(error);
      }
    };
    fetchCustomers();
  }, [refresh, refreshing]);
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1 justify-between items-center w-full bg-white"
    >
      <SafeAreaView className="flex-1 items-center bg-gray-50 w-full justify-between relative">
        {/* header */}
        <Text className="p-2 mx-auto">Danh bạ khách hàng</Text>
        <View className="relative pb-2 w-full px-2">
          <TextInput
            className="px-2 py-3 bg-white border border-gray-200 rounded-md"
            placeholder="tên người nhận, số điện thoại..."
            onChangeText={(text) => {
              setQuery(text);
            }}
          />
          <View className="absolute top-2 right-4">
            <Feather name="search" size={24} color="rgb(156 163 175)" />
          </View>
        </View>
        {openAdd && (
          <View className="w-full px-2 rounded-md">
            <View className="flex-row justify-between py-1 items-center">
              <Text className="uppercase font-semibold text-indigo-900">
                Thêm mới
              </Text>
              <View className="gap-2 flex-row">
                <TouchableOpacity
                  className="rounded-md p-2 border border-red-500"
                  onPress={() => setOpenAdd(false)}
                >
                  <AntDesign name="close" size={18} color="red" />
                </TouchableOpacity>
                <TouchableOpacity
                  className="rounded-md p-2 border border-green-500"
                  onPress={() => setOpenAdd(false)}
                >
                  <FontAwesome name="floppy-o" size={20} color="#22c55e" />
                </TouchableOpacity>
              </View>
            </View>
            <View className="rounded-md space-y-1">
              <TextInput
                className="w-full bg-white p-3 rounded-md border border-gray-200 focus:border-indigo-800"
                placeholder="Tên khách"
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
        <ScrollView
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          className="w-full"
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          <View className="w-full h-full flex-1 px-2">
            {/* content */}
            <View>
              {search(customers, query, ["phone", "name"]).length > 0 ? (
                search(customers, query, ["phone", "name"]).map((b, i) => {
                  return <Card key={i} data={b} />;
                })
              ) : (
                <View className="py-3 text-center">
                  {loading ? (
                    <View className="flex h-full w-full items-center justify-center flex-col">
                      <Text>Đang tải dữ liệu ...</Text>
                    </View>
                  ) : (
                    <Text>Không có dữ liệu</Text>
                  )}
                </View>
              )}
            </View>
          </View>
        </ScrollView>
        <TouchableOpacity
          className="absolute bottom-6 right-6"
          onPress={() => setOpenAdd(true)}
        >
          <AntDesign name="pluscircle" size={52} color="#312e81" />
        </TouchableOpacity>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default Customers;
