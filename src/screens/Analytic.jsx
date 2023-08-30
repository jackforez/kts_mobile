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
const STATUS_COLOR = [
  {
    name: "Đơn mới",
    color: "#3b82f6",
    legendFontColor: "white",
    legendFontSize: 15,
  },
  {
    name: "Đang giao",
    color: "#facc15",
    legendFontColor: "white",
    legendFontSize: 15,
  },
  {
    name: "Giao xong",
    color: "#22c55e",
    legendFontColor: "white",
    legendFontSize: 15,
  },
  {
    name: "Đơn hủy",
    color: "#ef4444",
    legendFontColor: "white",
    legendFontSize: 15,
  },
  {
    name: "Chuyển hoàn",
    color: "#94a3b8",
    legendFontColor: "white",
    legendFontSize: 15,
  },
];
const labels = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

const Analytic = () => {
  const screenWidth = Dimensions.get("window").width;
  const { currentUser } = useSelector((state) => state.user);
  const { token } = currentUser;
  const [dataSet, setDataSet] = useState();
  const [monthData, setMonthData] = useState([
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  ]);
  const [percentData, setPercentData] = useState([]);
  const [monthLabels, setMonthLabels] = useState([]);
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
        res.data.month.forEach((element) => {
          setMonthData((prev) =>
            prev.map((m, i) => {
              return i == element._id - 1 ? element.soluong : m;
            })
          );
        });

        res.data.percent.forEach((e) => {
          const color = STATUS_COLOR.find((c) =>
            c.name.toLowerCase().includes(e._id.toLowerCase())
          );
          if (color) {
            setPercentData((prev) => {
              return [...prev, { ...color, population: e.soluong }];
            });
          }
        });
      } catch (error) {
        alert(error);
      }
    };
    fetchData();
  }, []);
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
    strokeWidth: 1, // optional, default 3
    barPercentage: 0.5,
    useShadowColorFromDataset: false, // optional
    decimalPlaces: 0, // optional, defaults to 2dp
    style: {
      borderRadius: 16,
    },
    propsForDots: {
      r: "3",
      strokeWidth: "2",
      stroke: "#ffa726",
    },
  };
  const data1 = {
    labels: labels,
    datasets: [
      {
        data: monthData,
      },
    ],
  };
  return (
    <SafeAreaView className="bg-black/50 flex-1 items-center">
      <Header title={"Phân tích dữ liệu"} />
      <ScrollView className="w-full px-4" showsVerticalScrollIndicator={false}>
        <View className="bg-black/20 h-48 w-full rounded-xl">
          <PieChart
            data={percentData}
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
              width={screenWidth * 0.81}
              height={180}
              chartConfig={chartConfig1}
              yLabelsOffset={24}
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
              <Text className="font-bold  uppercase w-3/5 ">shop</Text>
              <Text className="font-bold  uppercase w-1/5 text-center">SL</Text>
            </View>
            {dataSet &&
              dataSet?.theMost.map((i, index) => {
                return (
                  <View className="flex-row w-full py-2" key={index}>
                    <Text className="font-semibold  w-1/5 text-center">
                      {index + 1}
                    </Text>
                    <Text className="font-semibold  capitalize w-3/5 ">
                      {i._id.name}
                    </Text>
                    <Text className="font-semibold  w-1/5 text-center">
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
