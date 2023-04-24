import { View, Text } from "react-native";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Dashboard from "./Dashboard";
import Bill from "./Bill";
import Cost from "./Cost";
import Setting from "./Setting";
const Tab = createBottomTabNavigator();
const Login = ({ navigation }) => {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name="Dashboard" component={Dashboard} />
      <Tab.Screen name="Bill" component={Bill} />
      <Tab.Screen name="Cost" component={Cost} />
      <Tab.Screen name="Setting" component={Setting} />
    </Tab.Navigator>
  );
};
export default Login;
