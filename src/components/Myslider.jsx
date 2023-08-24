import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Linking,
} from "react-native";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Image } from "react-native";

const Myslider = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          "https://api.sale168.vn/api/products/hotest/10"
        );
        setData(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);
  return (
    <ScrollView
      className="py-2 w-full"
      pagingEnabled
      horizontal
      showsHorizontalScrollIndicator={false}
    >
      {data.map((d, i) => {
        return (
          <TouchableOpacity
            onPress={() => {
              Linking.openURL(`https://dichoho.top/products/${d._id}`);
            }}
            key={i}
          >
            <View className="w-[30vw] px-1">
              <Image
                source={{ uri: d.imgs[0] }}
                className="w-full aspect-square object-cover rounded-md overflow-hidden"
              />
            </View>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
};

export default Myslider;
