import {
  SafeAreaView,
  Text,
  View,
  Image,
  ScrollView,
  Dimensions,
} from "react-native";
import { Header } from "../components";
import { LineChart, PieChart } from "react-native-chart-kit";
import { useEffect, useState } from "react";
import { ktsRequest } from "../ultis/connections";
import { useSelector } from "react-redux";
const Analytic = () => {
  const screenWidth = Dimensions.get("window").width;
  const { currentUser } = useSelector((state) => state.user);
  const { token } = currentUser;
  const [dataSet, setDataSet] = useState();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await ktsRequest.get("/v2/bills/report", {
          headers: {
            "Content-Type": "Application/json",
            Authorization: `Beare ${token}`,
          },
        });
        setDataSet(res.data);
        console.log(res.data);
      } catch (error) {
        alert(error);
      }
    };
    fetchData();
  }, []);
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
  const chartConfig1 = {
    backgroundGradientFrom: "#fff",
    backgroundGradientFromOpacity: 1,
    backgroundGradientTo: "#fff",
    backgroundGradientToOpacity: 1,
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.5,
    useShadowColorFromDataset: false, // optional
  };
  const data1 = {
    labels: [
      "T1",
      "T2",
      "T3",
      "T4",
      "T5",
      "T6",
      "T7",
      "T8",
      "T9",
      "T10",
      "T11",
      "T12",
    ],
    datasets: [
      {
        data: [20, 45, 28, 80, 99, 43],
      },
    ],
  };
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
            lượng đơn
          </Text>
          <View className="bg-slate-200 rounded-lg w-full round p-2">
            <LineChart
              data={data1}
              width={screenWidth * 0.82}
              height={180}
              chartConfig={chartConfig1}
            />
          </View>
        </View>
        <View className="bg-black/20 w-full rounded-xl mt-6 p-3">
          <Text className="font-semibold uppercase text-white mb-3">
            Top khách hàng
          </Text>
          <View className="bg-slate-200 rounded-lg w-full round p-2">
            <View className="flex-row w-full py-2">
              <Text className="font-bold  uppercase w-1/5 text-center">#</Text>
              <Text className="font-bold  uppercase w-3/5 ">Tên</Text>
              <Text className="font-bold  uppercase w-1/5 text-center">SL</Text>
            </View>
            {dataSet &&
              dataSet?.theMost.map((i, index) => {
                return (
                  <View className="flex-row w-full py-2" key={index}>
                    <Text className="font-bold  uppercase w-1/5 text-center">
                      {index + 1}
                    </Text>
                    <Text className="font-bold  uppercase w-3/5 ">
                      {i._id.name}
                    </Text>
                    <Text className="font-bold  uppercase w-1/5 text-center">
                      {i.soluong}
                    </Text>
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
