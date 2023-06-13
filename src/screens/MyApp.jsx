import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useSelector } from "react-redux";
import {
  Bills,
  Cost,
  Customers,
  Details,
  Layout,
  Login,
  NewShop,
  Profile,
  Register,
  Resetpwd,
  Shops,
} from ".";
const Stack = createNativeStackNavigator();
const App = () => {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{ headerShown: false }}
      >
        {currentUser ? (
          <>
            <Stack.Screen name="Layout" component={Layout} />
            <Stack.Screen name="Bills" component={Bills} />
            <Stack.Screen name="Customers" component={Customers} />
            <Stack.Screen name="Cost" component={Cost} />
            <Stack.Screen name="Shops" component={Shops} />
            <Stack.Screen name="Profile" component={Profile} />
            <Stack.Screen name="NewShop" component={NewShop} />
            <Stack.Screen name="Details" component={Details} />
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
  );
};

export default App;
