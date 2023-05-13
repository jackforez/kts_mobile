import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { search } from "../ultis/functions";
import { useEffect, useState } from "react";
import { Entypo } from "@expo/vector-icons";
const MyPicker = ({
  placehoder,
  size,
  data,
  field,
  toShow = "ktscorp.vn",
  output,
  disabled = false,
}) => {
  const [query, setQuery] = useState("");
  const [openDataTable, setOpenDataTable] = useState(false);
  const [selected, setSelected] = useState(placehoder);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const sz =
    size === "xs" ? "py-1 text-xs" : size === "sm" ? "py-2 text-sm" : "py-2.5";
  useEffect(() => {
    setSelected(placehoder);
  }, [placehoder]);
  return (
    <View
      className={`w-full border bg-white ${
        openDataTable ? "border-primary-500" : "border-gray-300"
      } rounded px-2 relative ${
        disabled && "pointer-events-none bg-slate-200"
      }`}
    >
      <TouchableOpacity
        onPress={() => {
          setOpenDataTable(!openDataTable);
        }}
      >
        <View className={`${sz} flex-row justify-between`}>
          <Text className="truncate">{selected}</Text>
          <Entypo name="chevron-down" size={24} color="black" />
        </View>
      </TouchableOpacity>

      <View
        className={`absolute bg-white w-full right-0 top-[110%] ${
          openDataTable && "border border-primary-500"
        } rounded`}
      >
        <TextInput
          className={`w-full ${sz} focus:outline-none rounded px-2 ${
            !openDataTable && "hidden"
          }`}
          placeholder="Tìm kiếm"
          onChangeText={(text) => {
            setQuery(text);
            setSelectedIndex(-1);
          }}
        />
        <View
          className={`${
            openDataTable ? "max-h-36" : "h-0"
          } overflow-y-auto duration-100`}
        >
          {search(data, query, field).length > 0 ? (
            search(data, query, field).map((el, i) => {
              return (
                // <View
                //   key={i}
                //   className={`hover:bg-green-500 truncate px-2 ${sz} ${
                //     i === selectedIndex ? "bg-green-500" : ""
                //   }`}
                // >
                <Text
                  className="bg-green-500 p-3"
                  onPress={(text) => {
                    // setSelected(text);
                    // output(text);
                    // setSelectedIndex(i);
                    // setOpenDataTable(false);
                    console.log(text);
                  }}
                >
                  {el[toShow]}
                </Text>
                // </View>
              );
            })
          ) : (
            <View className="p-2">
              <Text>Không có dữ liệu phù hợp</Text>
            </View>
          )}
        </View>
      </View>
    </View>
  );
};
export default MyPicker;
