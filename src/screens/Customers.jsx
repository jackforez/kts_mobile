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
import {
  loaded,
  onCloseModal,
  onLoading,
  onOpenModal,
  onRefreh,
} from "../redux/systemSlice";
import {
  FontAwesome,
  AntDesign,
  Feather,
  SimpleLineIcons,
} from "@expo/vector-icons";
import MyPicker from "./MyPicker";
import Modal from "./Modal";
import { Header } from "../components";
const Card = ({ data, setData, showEdit }) => {
  const dispatch = useDispatch();
  return (
    <View className="rounded-md bg-white mt-1 border border-gray-200">
      <View className={`justify-between flex-row p-2  rounded-t-md`}>
        <Text className="text-indigo-900 font-semibold my-auto mx-[20%]">
          {data.name}
        </Text>
        <View className="flex-row gap-4 p-1">
          <TouchableOpacity
            onPress={() => {
              showEdit(true);
              setData(data);
            }}
          >
            <SimpleLineIcons name="pencil" size={18} color="orange" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              dispatch(onOpenModal());
              setData(data);
            }}
          >
            <FontAwesome name="trash-o" size={20} color="red" />
          </TouchableOpacity>
        </View>
      </View>
      <View className="flex-row">
        <View className="w-1/5 items-center">
          <View className="h-12 w-12 bg-orange-500 rounded-full justify-center items-center">
            <Text className="text-white font-bold">
              {textAvatar(data.name)}
            </Text>
          </View>
        </View>
        <View className="w-4/5 px-2 pb-2">
          <Text className="text-xs">{data.phone}</Text>
          <Text className="text-xs">
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
  );
};
const Customers = () => {
  const { currentUser } = useSelector((state) => state.user);
  const { loading, refresh, openModal } = useSelector((state) => state.system);
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
  const handleDelete = async () => {
    dispatch(onLoading());
    try {
      const res = await ktsRequest.delete(`/customers/${inputs?._id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert(res.data);
      dispatch(onRefreh());
      dispatch(loaded());
      dispatch(onCloseModal());
    } catch (error) {
      dispatch(loaded());
      alert(error.response ? error.response.data.message : "Network Error!");
    }
  };
  const handleSave = async () => {
    dispatch(onLoading());
    if (!inputs.name) {
      alert("Tên khách không hợp lệ!");
      dispatch(loaded());
      return;
    }
    if (!inputs.phone || inputs.phone.length !== 10) {
      alert("Số điện thoại không hợp lệ");
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
      const res = openAdd
        ? await ktsRequest.post("/customers", inputs, {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          })
        : await ktsRequest.put(`/customers/${inputs?._id}`, inputs, {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          });
      alert(res.data);
      dispatch(loaded());
      dispatch(onRefreh());
    } catch (er) {
      console.log(er);
      dispatch(loaded());
      alert(er.response ? er.response.data : "Network Error");
    }
  };
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1 justify-between items-center w-full bg-white"
    >
      {openModal && (
        <Modal>
          <View className="p-2">
            <Text>
              Sau khi thực hiện sẽ không thể hoàn tác. Các thông tin đơn hàng cũ
              cũng không thể truy xuất! Bạn chắc chắn muốn xóa khách hàng{" "}
              <Text className="font-semibold italic mx-auto my-auto">
                {inputs?.name}
              </Text>
              <Text> ?</Text>
            </Text>
          </View>
          <View className="flex-row justify-end gap-2 p-2">
            <TouchableOpacity
              onPress={() => dispatch(onCloseModal())}
              className="rounded-md bg-blue-600"
            >
              <Text className="p-3 text-white ">Hủy bỏ</Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="rounded-md border border-red-500"
              onPress={handleDelete}
            >
              <Text className="p-3 text-red-500">Xác nhận xóa</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      )}
      <SafeAreaView className="flex-1 items-center bg-gray-50 w-full justify-between relative">
        {/* header */}
        <Header title={"danh bạ khách hàng"} fallBack={"Home"} />
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
        {openAdd || openEdit ? (
          <View className="w-full px-2 rounded-md">
            <View className="flex-row justify-between py-1 items-center">
              <Text className="uppercase font-semibold text-indigo-900">
                {openAdd ? "Thêm mới" : "Sửa thông tin"}
              </Text>
              <View className="gap-2 flex-row">
                <TouchableOpacity
                  className="rounded-md p-2 border border-red-500"
                  onPress={() => {
                    setOpenAdd(false);
                    setOpenEdit(false);
                  }}
                >
                  <AntDesign name="close" size={18} color="red" />
                </TouchableOpacity>
                <TouchableOpacity
                  className="rounded-md p-2 border border-green-500"
                  onPress={handleSave}
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
        ) : (
          <></>
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
                  return (
                    <Card
                      key={i}
                      data={b}
                      setData={setInputs}
                      showEdit={setOpenEdit}
                    />
                  );
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
          onPress={() => {
            setOpenAdd(true);
            setOpenEdit(false);
          }}
        >
          <AntDesign name="pluscircle" size={52} color="#312e81" />
        </TouchableOpacity>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default Customers;
