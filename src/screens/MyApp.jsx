import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useSelector } from "react-redux";
import { Bills, Customers, Layout, Login, Register, Resetpwd } from ".";
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
