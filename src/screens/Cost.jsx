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
import Modal from "./Modal";
const Card = ({ data, setData, showEdit }) => {
  const dispatch = useDispatch();
  return (
    <View className="rounded-md bg-white mt-1 border border-gray-200">
      <View className={`justify-between flex-row p-2  rounded-t-md`}>
        <Text className="text-indigo-900 font-semibold my-auto">
          {data.costName}
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
      <View className="flex-row px-2 pb-2">
        <View className="w-2/3">
          <Text>Min: {data.minWeight}</Text>
          <Text>Max: {data.maxWeight}</Text>
        </View>
        <View className="w-1/3 justify-center items-end">
          <Text className="font-semibold text-base text-indigo-900">
            {toVND(data.value)}
          </Text>
        </View>
      </View>
    </View>
  );
};
const Cost = () => {
  const { currentUser } = useSelector((state) => state.user);
  const { loading, refresh, openModal } = useSelector((state) => state.system);
  const dispatch = useDispatch();
  const { token } = currentUser;
  const [refreshing, setRefreshing] = useState(false);
  const [customers, setCustomers] = useState([]);
  const [query, setQuery] = useState("");
  const [inputs, setInputs] = useState({});
  const [openAdd, setOpenAdd] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      dispatch(onLoading());
      try {
        const res = await ktsRequest.get("/cost", {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        setCustomers(res.data.data);
        dispatch(loaded());
      } catch (error) {
        dispatch(loaded());
        alert(error.response ? error.response.data : "Network Error!");
      }
    };
    fetchData();
  }, [refresh, refreshing]);
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);
  const handleDelete = async () => {
    try {
      const res = await ktsRequest.delete(`/cost/${inputs._id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert(res.data.message);
      dispatch(onRefreh());
      dispatch(onCloseModal());
    } catch (err) {
      alert(err.response ? err.response.data.message : "Network Error!");
    }
  };
  const handleSave = async () => {
    dispatch(onLoading());
    if (!inputs.costName) {
      alert("Vui lòng nhập tên mức giá");
      dispatch(loaded());
      return;
    }
    if (!inputs.minWeight) {
      alert("Vui lòng khối lượng tối thiểu");
      dispatch(loaded());
      return;
    }
    if (!inputs.maxWeight) {
      alert("Vui lòng khối lượng tối đa");
      dispatch(loaded());
      return;
    }
    if (parseInt(inputs.minWeight) >= parseInt(inputs.maxWeight)) {
      console.log(inputs);
      alert("Giá trị không hợp lệ");
      dispatch(loaded());
      return;
    }
    if (inputs.value <= 0) {
      alert("Giá trị mức giá không hợp lệ");
      dispatch(loaded());
      return;
    }
    try {
      const res = openAdd
        ? await ktsRequest.post(
            "/cost",
            {
              ...inputs,
              createdBy: currentUser._id,
              shopName: currentUser.displayName,
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
              },
            }
          )
        : await ktsRequest.put(
            `/cost/${inputs?._id}`,
            {
              ...inputs,
              updateddBy: currentUser._id,
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
              },
            }
          );
      alert(openAdd ? res.data.message : res.data);
      dispatch(loaded());
      dispatch(onRefreh());
    } catch (err) {
      dispatch(loaded());
      console.log(err);
      alert(
        err.response
          ? openAddCost
            ? err.response.data.message
            : err.response.data
          : "Network Error"
      );
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
              cũng không thể truy xuất! Bạn chắc chắn muốn xóa đơn giá{" "}
              <Text className="font-semibold italic mx-auto my-auto">
                {inputs?.costName}
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
        <Text className="p-2 mx-auto">Đơn giá</Text>
        <View className="relative pb-2 w-full px-2">
          <TextInput
            className="px-2 py-3 bg-white border border-gray-200 rounded-md"
            placeholder="tên mức giá..."
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
                placeholder="Tên mức giá"
                value={inputs?.costName}
                onChangeText={(text) => {
                  setInputs((prev) => {
                    return { ...prev, costName: text };
                  });
                }}
              />
              <View className="w-full flex-row">
                <View className="w-1/2 pr-0.5">
                  <TextInput
                    className="w-full bg-white p-3 rounded-md border border-gray-200 focus:border-indigo-800 "
                    placeholder="Khối lượng tối thiểu"
                    value={inputs?.minWeight}
                    keyboardType="numeric"
                    onChangeText={(text) => {
                      setInputs((prev) => {
                        return { ...prev, minWeight: parseInt(text) };
                      });
                    }}
                  />
                </View>
                <View className="w-1/2 pl-0.5">
                  <TextInput
                    className="w-full bg-white p-3 rounded-md border border-gray-200 focus:border-indigo-800"
                    placeholder="Khối lượng tối đa"
                    value={inputs?.maxWeight}
                    keyboardType="numeric"
                    onChangeText={(text) => {
                      setInputs((prev) => {
                        return { ...prev, maxWeight: parseInt(text) };
                      });
                    }}
                  />
                </View>
              </View>
              <TextInput
                className="w-full bg-white p-3 rounded-md border border-gray-200 focus:border-indigo-800"
                placeholder="Đơn giá"
                // value={String(inputs?.value)}
                keyboardType="numeric"
                onChangeText={(text) => {
                  setInputs((prev) => {
                    return { ...prev, value: parseInt(text) };
                  });
                }}
              />
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
              {search(customers, query, ["costName"]).length > 0 ? (
                search(customers, query, ["costName"]).map((b, i) => {
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
            setInputs({});
          }}
        >
          <AntDesign name="pluscircle" size={52} color="#312e81" />
        </TouchableOpacity>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default Cost;
