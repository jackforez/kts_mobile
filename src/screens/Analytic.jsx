import { SafeAreaView, Text, View, Image, ScrollView } from "react-native";
import { Header } from "../components";

const Analytic = () => {
  return (
    <SafeAreaView className="bg-black/50 flex-1 items-center">
      <Header title={"Phân tích dữ liệu"} />
      <ScrollView className="w-full px-4">
        <View className="bg-white/50 h-48 w-full rounded-xl"></View>
        <View className="top-40 items-center justify-center">
          <Image
            source={require("../constant/underconstruct.png")}
            resizeMode="cover"
            className="rounded-xl"
          />
        </View>
        <Text className="top-48 uppercase text-white font-bold self-center">
          Trang đang được xây dựng
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Analytic;
