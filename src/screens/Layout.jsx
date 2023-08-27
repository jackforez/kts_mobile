import { View } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Dashboard from "./Dashboard";
import Bill from "./Bill";
import Setting from "./Setting";
import { AntDesign } from "@expo/vector-icons";
const Tab = createBottomTabNavigator();
const Login = ({ navigation }) => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          justifyContent: "center",
          alignItems: "center",
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={Dashboard}
        options={{
          tabBarIcon: ({ focused }) => (
            <View className="justify-center items-center">
              <AntDesign
                name="home"
                size={24}
                color={focused ? "rgb(59 130 246)" : "gray"}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Tạo đơn"
        component={Bill}
        options={{
          tabBarIcon: ({ focused }) => (
            <View className="justify-center items-center">
              <AntDesign
                name="pluscircleo"
                size={24}
                color={focused ? "rgb(59 130 246)" : "gray"}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Cài đặt"
        component={Setting}
        options={{
          tabBarIcon: ({ focused }) => (
            <View className="justify-center items-center">
              <AntDesign
                name="setting"
                size={24}
                color={focused ? "rgb(59 130 246)" : "gray"}
              />
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};
export default Login;
