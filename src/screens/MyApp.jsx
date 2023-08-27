import React from "react";
import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useSelector } from "react-redux";
import {
  Analytic,
  Bill,
  Bills,
  Cost,
  Customers,
  Dashboard,
  Details,
  Layout,
  Login,
  NewShop,
  Profile,
  Register,
  Resetpwd,
  Setting,
  Shops,
  Tracking,
} from ".";
import { ImageBackground, StatusBar } from "react-native";
const Stack = createNativeStackNavigator();
const navTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: "transparent",
  },
};
const App = () => {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <ImageBackground
      source={require("../constant/ktsbg.jpeg")}
      className="absolute h-full w-full"
    >
      <StatusBar barStyle={"light-content"} />
      <NavigationContainer theme={navTheme}>
        <Stack.Navigator
          initialRouteName="Dashboard"
          screenOptions={{
            headerShown: false,
          }}
        >
          {currentUser ? (
            <>
              <Stack.Screen name="Dashboard" component={Dashboard} />
              <Stack.Screen name="NewBill" component={Bill} />
              <Stack.Screen name="Bills" component={Bills} />
              <Stack.Screen name="Customers" component={Customers} />
              <Stack.Screen name="Cost" component={Cost} />
              <Stack.Screen name="Shops" component={Shops} />
              <Stack.Screen name="Profile" component={Profile} />
              <Stack.Screen name="NewShop" component={NewShop} />
              <Stack.Screen name="Details" component={Details} />
              <Stack.Screen name="Setting" component={Setting} />
              <Stack.Screen name="Analytic" component={Analytic} />
              <Stack.Screen name="Tracking" component={Tracking} />
            </>
          ) : (
            <>
              <Stack.Screen name="Login" component={Login} />
              <Stack.Screen name="Resetpwd" component={Resetpwd} />
              <Stack.Screen name="Register" component={Register} />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </ImageBackground>
  );
};

export default App;
