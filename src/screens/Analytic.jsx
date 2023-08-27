import { SafeAreaView, Text, View, Image } from "react-native";
import { Header } from "../components";

const Analytic = () => {
  return (
    <SafeAreaView className="bg-black/50 flex-1 ">
      <Header title={"Phân tích dữ liệu"} />
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
    </SafeAreaView>
  );
};

export default Analytic;
