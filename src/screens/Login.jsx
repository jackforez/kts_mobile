import { View, Text, Image } from "react-native";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Dashboard from "./Dashboard";
import Bill from "./Bill";
import Cost from "./Cost";
import Setting from "./Setting";
import { AntDesign } from "@expo/vector-icons";
const Tab = createBottomTabNavigator();
const Login = ({ navigation }) => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          position: "absolute",
          bottom: 20,
          marginRight: 20,
          marginLeft: 20,
          justifyContent: "center",
          alignItems: "center",
          borderRadius: 20,
        },
      }}
    >
      <Tab.Screen
        name="Dashboard"
        component={Dashboard}
        options={{
          tabBarIcon: ({ focused }) => (
            <View className="justify-center items-center">
              <AntDesign
                name="home"
                size={24}
                color={focused ? "red" : "blue"}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen name="Bill" component={Bill} />
      <Tab.Screen name="Cost" component={Cost} />
      <Tab.Screen name="Setting" component={Setting} />
    </Tab.Navigator>
  );
};
export default Login;
