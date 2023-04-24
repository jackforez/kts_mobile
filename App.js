import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  Alert,
  Image,
  ImageBackground,
  KeyboardAvoidingView,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ktsRequest } from "./src/constant/connection";
import img1 from "./src/constant/img1.jpg";
import logo from "./assets/logo.png";
import { Login, Tracking } from "./src/screens";
import { SvgXml } from "react-native-svg";
const Stack = createNativeStackNavigator();

const Home = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const xml = `<svg version="1.0" xmlns="http://www.w3.org/2000/svg"
  width="145.000000pt" height="55.000000pt" viewBox="0 0 145.000000 55.000000"
  preserveAspectRatio="xMidYMid meet">
 
 <g transform="translate(0.000000,55.000000) scale(0.100000,-0.100000)"
 fill="red" stroke="" fill-rule="nonzero" >
 <path d="M93 523 c-4 -10 -10 -20 -15 -23 -11 -8 -68 -434 -58 -440 4 -3 9
 -14 11 -25 4 -18 12 -20 84 -20 73 0 81 2 90 22 13 31 49 29 69 -2 16 -25 20
 -26 104 -23 84 3 87 4 85 26 -3 21 0 22 71 22 70 0 75 -1 78 -22 3 -22 7 -23
 93 -23 86 0 90 1 93 23 3 21 8 22 91 22 80 0 89 -2 111 -25 22 -24 28 -25 142
 -25 112 0 121 2 152 25 18 14 44 25 58 25 25 0 25 1 52 198 33 248 33 242 -2
 242 -16 0 -37 9 -47 20 -16 18 -31 20 -145 20 -114 0 -129 -2 -145 -20 -11
 -12 -31 -20 -52 -20 -26 0 -33 4 -33 20 0 19 -7 20 -206 20 -197 0 -206 -1
 -211 -20 -3 -11 -13 -20 -23 -20 -13 0 -17 6 -13 20 5 19 0 20 -85 20 -81 0
 -93 -2 -102 -20 -7 -13 -21 -20 -40 -20 -23 0 -30 4 -30 20 0 18 -7 20 -85 20
 -72 0 -87 -3 -92 -17z m162 -25 c-12 -76 -22 -148 -19 -148 2 0 31 41 64 90
 l61 90 80 0 80 0 -23 -32 c-12 -18 -53 -75 -90 -126 l-67 -93 15 -35 c8 -20
 33 -75 55 -122 21 -46 39 -87 39 -89 0 -2 -37 -3 -81 -1 l-81 3 -30 75 c-16
 41 -33 79 -37 83 -5 5 -11 -20 -15 -55 -13 -114 -8 -108 -93 -108 l-74 0 6 32
 c2 18 16 121 30 228 14 107 28 205 31 218 4 20 10 22 80 22 l75 0 -6 -32z
 m705 5 c0 -16 -3 -45 -6 -65 l-7 -38 -58 0 c-33 0 -59 -4 -59 -9 0 -12 -38
 -299 -45 -338 l-6 -33 -74 0 -75 0 0 28 c0 15 9 90 20 167 28 198 31 185 -36
 185 l-55 0 7 58 c3 31 8 60 11 65 2 4 89 7 194 7 l189 0 0 -27z m397 -5 c29
 -30 31 -37 26 -80 l-6 -48 -68 0 c-56 0 -69 3 -69 16 0 12 -10 14 -47 12 -44
 -3 -48 -5 -51 -30 l-3 -28 85 0 85 0 26 -35 c27 -34 27 -35 16 -122 -11 -85
 -13 -89 -52 -126 l-42 -37 -110 0 -111 0 -33 32 c-24 23 -33 41 -33 64 0 60 5
 64 82 64 58 0 69 -3 64 -15 -4 -12 4 -15 44 -15 49 0 50 1 50 30 l0 30 -78 0
 c-75 0 -79 1 -110 33 l-32 33 11 89 c11 87 13 91 53 127 l41 38 116 0 115 0
 31 -32z"/>
 </g>
 </svg>`;
  const handleLogin = async () => {
    setLoading(true);
    try {
      const res = await ktsRequest.post("/auth/signin", {
        name: username,
        password: password,
      });
      setLoading(false);
      navigation.navigate("Login");
    } catch (error) {
      setLoading(false);
      Alert.alert("", "Sai tên đăng nhập hoặc mật khẩu", [{ text: "OK" }]);
    }
  };
  return (
    <ImageBackground
      source={img1}
      resizeMode="cover"
      className="flex-1 h-full w-full justify-center items-center"
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1 justify-center items-center w-full"
      >
        <View className="items-center p-4 justify-center rounded-md space-y-4 w-5/6 bg-white/50 flex text-white backdrop-blur drop-shadow-lg bg-opacity-10">
          <View className="w-full p-2">
            <SvgXml xml={xml} className="mx-auto" />
          </View>
          <TextInput
            className="w-full bg-white p-4 rounded-md"
            placeholder="Username"
            onChangeText={(text) => {
              setUsername(text);
            }}
          />
          <TextInput
            className="w-full bg-white p-4 rounded-md"
            placeholder="password"
            secureTextEntry={true}
            onChangeText={(text) => {
              setPassword(text);
            }}
          />
          <TouchableOpacity
            // onPress={() => navigation.navigate("Login")}
            onPress={handleLogin}
            className="p-4 rounded-md bg-indigo-900 w-full justify-center items-center"
          >
            {loading ? (
              <Text className="text-white uppercase">Loading...</Text>
            ) : (
              <Text className="text-white uppercase">đăng nhập</Text>
            )}
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate("Tracking")}
            className="p-4 rounded-md border bg-white border-indigo-900 w-full justify-center items-center"
          >
            <Text className="text-indigo-900 uppercase">Tra cứu đơn hàng</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
};

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Tracking" component={Tracking} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
