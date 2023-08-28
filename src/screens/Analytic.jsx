import {
  SafeAreaView,
  Text,
  View,
  Image,
  ScrollView,
  Dimensions,
} from "react-native";
import { Header } from "../components";
import { PieChart } from "react-native-chart-kit";

const Analytic = () => {
  const screenWidth = Dimensions.get("window").width;
  const data = [
    {
      name: "Đơn mới",
      population: 15,
      color: "#3b82f6",
      legendFontColor: "white",
      legendFontSize: 15,
    },
    {
      name: "Đang giao",
      population: 20,
      color: "#facc15",
      legendFontColor: "white",
      legendFontSize: 15,
    },
    {
      name: "Giao xong",
      population: 60,
      color: "#22c55e",
      legendFontColor: "white",
      legendFontSize: 15,
    },
    {
      name: "Đơn hủy",
      population: 10,
      color: "#ef4444",
      legendFontColor: "white",
      legendFontSize: 15,
    },
  ];
  const chartConfig = {
    backgroundGradientFrom: "#1E2923",
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: "#08130D",
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.5,
    useShadowColorFromDataset: false, // optional
  };
  const customers = [
    { id: 1, name: "Anh Tiến", sl: 159 },
    { id: 1, name: "Anh Sang", sl: 123 },
    { id: 1, name: "Anh Văn", sl: 111 },
    { id: 1, name: "Anh Khánh", sl: 78 },
    { id: 1, name: "Anh Minh", sl: 12 },
  ];
  return (
    <SafeAreaView className="bg-black/50 flex-1 items-center">
      <Header title={"Phân tích dữ liệu"} />
      <ScrollView className="w-full px-4">
        <View className="bg-black/20 h-48 w-full rounded-xl">
          <PieChart
            data={data}
            width={screenWidth * 0.9}
            height={180}
            chartConfig={chartConfig}
            accessor={"population"}
            backgroundColor={"transparent"}
            paddingLeft={""}
            center={[10, 10]}
            absolute
          />
        </View>
        <View className="bg-black/20 w-full rounded-xl mt-6 p-3">
          <Text className="font-semibold uppercase text-white mb-3">
            Khách hàng mua nhiều nhất
          </Text>
          <View className="bg-slate-200 rounded-lg w-full round p-2">
            <View className="flex-row w-full py-2">
              <Text className="font-bold  uppercase w-1/5 text-center">#</Text>
              <Text className="font-bold  uppercase w-3/5 ">Tên</Text>
              <Text className="font-bold  uppercase w-1/5 text-center">SL</Text>
            </View>
            {customers.map((c, i) => {
              return (
                <View className="flex-row w-full divide-y py-1">
                  <Text className=" w-1/5 text-center">{i + 1}</Text>
                  <Text className="capitalize w-3/5 ">{c.name}</Text>
                  <Text className="w-1/5 text-center">{c.sl}</Text>
                </View>
              );
            })}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Analytic;
