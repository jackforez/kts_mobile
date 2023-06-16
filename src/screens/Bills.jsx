import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Platform,
  KeyboardAvoidingView,
  TouchableOpacity,
  RefreshControl,
  StyleSheet,
  Button,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { TextInput } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { search, toVND } from "../ultis/functions";
import { ktsRequest } from "../ultis/connections";
import { useDispatch, useSelector } from "react-redux";
import { loaded, onLoading } from "../redux/systemSlice";
import { Feather, Entypo } from "@expo/vector-icons";
import { Modal } from "react-native";
import { Pressable } from "react-native";
import { Alert } from "react-native";
import { Header } from "../components";
import DateTimePicker from "@react-native-community/datetimepicker";
const STATUS = [
  {
    id: 0,
    bgColor: "bg-blue-500",
    textColor: "text-blue-500",
    name: "Đơn mới",
  },
  {
    id: 1,
    bgColor: "bg-yellow-400",
    textColor: "text-yellow-400",
    name: "Đang giao",
  },
  {
    id: 2,
    bgColor: "bg-green-500",
    textColor: "text-green-500",
    name: "Giao xong",
  },
  {
    id: 3,
    bgColor: "bg-red-500",
    textColor: "text-red-500",
    name: "Đã hủy",
  },
];
const getStatus = (_status) => {
  return (
    STATUS.find((item) =>
      item.name.toLocaleLowerCase().includes(_status.toLocaleLowerCase())
    ) || STATUS[0]
  );
};
const Card = ({ data, openDetails }) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity className="mt-2.5" onPress={openDetails}>
      <View className="rounded-2xl overflow-hidden bg-white w-full">
        <View
          className={`${
            getStatus(data.status).bgColor
          } justify-between flex-row p-3  rounded-t-md`}
        >
          <View className="flex-row">
            <Text className="text-white font-semibold px-1">
              {data.orderNumber}
            </Text>
            <Text className="text-white font-semibold px-1">
              {data.partnerTrackingId}
            </Text>
          </View>

          <Text className="text-white">
            {new Date(data.createdAt).toLocaleDateString()}
          </Text>
        </View>
        <View className="p-3 flex-row">
          <View className="w-2/3 justify-between space-y-2">
            <Text className="font-semibold capitalize">
              {data.toName + " - " + data.toPhone}
            </Text>

            <Text className="">
              {data.toAddress +
                ", " +
                data.toWard +
                ", " +
                data.toDistrict +
                ", " +
                data.toCity}
            </Text>
            <Text className={`${getStatus(data.status).textColor}`}>
              {data.status}
            </Text>
          </View>
          <View className="items-end w-1/3 justify-center">
            <Text className="font-semibold text-base text-indigo-900">
              {toVND(data.shopAmount)}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};
const Bills = () => {
  const { currentUser } = useSelector((state) => state.user);
  const { loading, refresh } = useSelector((state) => state.system);
  const dispatch = useDispatch();
  const { token } = currentUser;
  const navigation = useNavigation();
  const [refreshing, setRefreshing] = useState(false);
  const [bills, setBills] = useState([]);
  const [query, setQuery] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [details, setDetails] = useState({});
  const [fromDate, setFromDate] = useState(new Date());
  const [toDate, setToDate] = useState(new Date());
  const [show, setShow] = useState(false);
  const onChange1 = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShow(false);
    setFromDate(currentDate);
  };
  const onChange2 = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShow(false);
    setToDate(currentDate);
  };

  const showMode = (currentMode) => {
    if (Platform.OS === "android") {
      setShow(false);
      // for iOS, add a button that closes the picker
    }
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode("date");
  };
  useEffect(() => {
    dispatch(onLoading());
    const fetch = async () => {
      try {
        const res = await ktsRequest.get("v2/bills", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setBills(res.data);
        dispatch(loaded());
      } catch (err) {
        dispatch(loaded());
        if (err.response) {
          if (err.response.data.status === 403) {
            dispatch(logout());
          }
        } else {
          alert("Network Error!");
        }
      }
    };
    fetch();
  }, [refresh, refreshing]);
  const handleClick = async () => {};
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1 justify-between items-center w-full"
    >
      <SafeAreaView className="flex-1 items-center bg-slate-200 w-full px-4 justify-between">
        {/* header */}

        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(false);
          }}
        >
          <View className="flex-1 bg-black/30">
            <View className="w-full h-5/6 bg-white bottom-0 absolute rounded-t-3xl justify-between items-center pb-6 pt-3 overflow-hidden">
              <View className="h-[92%] px-3 rounded-md overflow-hidden">
                <View>
                  {details?.tracking && (
                    <View className="max-h-full">
                      <ScrollView
                        showsVerticalScrollIndicator={false}
                        showsHorizontalScrollIndicator={false}
                      >
                        {details.tracking.map((t, i) => {
                          return (
                            // <View
                            //   key={i}
                            //   className="rounded-md border-l-4 border-l-orange-500 mt-2 p-2 bg-indigo-50 w-full"
                            // >
                            //   <Text className="font-semibold">
                            //     {t.description}
                            //   </Text>
                            //   <Text className="text-xs">
                            //     {new Date(t.time).toLocaleString()}
                            //   </Text>
                            //   <Text>{t.position}</Text>
                            // </View>
                            <View
                              key={i}
                              className=" pl-10 py-2 w-full relative"
                            >
                              <Text className="font-semibold">
                                {t.description}
                              </Text>
                              <Text className="text-xs">
                                {new Date(t.time).toLocaleString()}
                              </Text>
                              <Text>{t.position}</Text>

                              <View className="h-6 w-6 bg-white rounded-full absolute top-1/2 items-center justify-center">
                                <View
                                  className={`h-4 w-4 ${
                                    getStatus(t.status).bgColor
                                  } rounded-full`}
                                ></View>
                              </View>

                              {i < details.tracking.length - 1 && (
                                <View className="h-full border border-ktsPrimary/50 absolute top-[85%] left-2.5"></View>
                              )}
                            </View>
                          );
                        })}
                      </ScrollView>
                    </View>
                  )}
                </View>
              </View>
              <View className="h-[8%] justify-center px-4 w-full">
                <Pressable
                  className={`p-3 ${
                    details.status
                      ? getStatus(details.status).bgColor
                      : getStatus("Đơn mới").bgColor
                  } w-full rounded-xl`}
                  onPress={() => setModalVisible(!modalVisible)}
                >
                  <Text className="text-white font-semibold mx-auto">Đóng</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </Modal>
        <Header title={"danh sách đơn hàng"} fallBack={"Home"} />
        <View className="relative pb-2 w-full px-2">
          <TextInput
            className="px-4 py-3 bg-white border border-gray-200 rounded-3xl"
            placeholder="mã vận đơn, tên người nhận, số điện thoại..."
            onChangeText={(text) => {
              setQuery(text);
            }}
          />
          <View className="absolute top-2 right-5">
            <Feather name="search" size={24} color="rgb(156 163 175)" />
          </View>
        </View>
        {show && (
          <DateTimePicker value={fromDate} mode="date" onChange={onChange1} />
        )}
        <View className="flex-row justify-between w-full px-3">
          <Pressable
            className="bg-white justify-center items-center p-3 rounded-xl"
            onPress={() => setShow(true)}
          >
            <Text className="mx-auto">{fromDate.toLocaleDateString()}</Text>
          </Pressable>
          <Pressable
            className="bg-white justify-center items-center p-3 rounded-xl"
            onPress={() => setShow(true)}
          >
            <Text className="mx-auto">{toDate.toLocaleDateString()}</Text>
          </Pressable>
        </View>
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
              {search(bills, query, ["toPhone", "toName", "status"]).length >
              0 ? (
                search(bills, query, ["toPhone", "toName", "status"]).map(
                  (b, i) => {
                    return (
                      <Card
                        key={i}
                        data={b}
                        openDetails={() => {
                          setModalVisible(true);
                          setDetails(b);
                        }}
                      />
                    );
                  }
                )
              ) : (
                <View className="py-3 text-center">
                  {loading ? (
                    <View className="flex h-full w-full items-center justify-center flex-col">
                      {/* <img src={logo} alt="" className="animate-bounce w-20" /> */}
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
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};
export default Bills;
