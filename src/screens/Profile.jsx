import {
  View,
  Text,
  KeyboardAvoidingView,
  SafeAreaView,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { ktsRequest } from "../ultis/connections";
import { textAvatar } from "../ultis/functions";

const Profile = ({ route }) => {
  const { userId } = route.params;
  const { currentUser } = useSelector((state) => state.user);
  const { token } = currentUser;
  const [user, setUser] = useState({});
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await ktsRequest.get(`/users/find/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        setUser(res.data);
      } catch (error) {
        alert(error);
      }
    };
    fetchData();
  }, []);
  return (
    <KeyboardAvoidingView>
      <SafeAreaView>
        <ScrollView>
          <View className="justify-center items-center h-[30vh]">
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
                <Text className="p-1">#{user.name}</Text>
                <Text>{user.role}</Text>
              </View>
            )}
          </View>
          <View>
            <View>
              <Text>Đơn giá áp dụng</Text>
            </View>
            <View>
              <Text>Bảo mật</Text>
            </View>
            <View>
              <Text>Thông tin cơ bản</Text>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default Profile;
