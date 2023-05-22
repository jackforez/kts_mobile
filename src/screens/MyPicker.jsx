import {
  ScrollView,
  Text,
  TextInput,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from "react-native";
import { search } from "../ultis/functions";
import { useEffect, useState } from "react";
import { Entypo } from "@expo/vector-icons";
const MyPicker = ({
  placehoder = "",
  size,
  data = [],
  field,
  toShow = "ktscorp.vn",
  output,
  disabled = false,
  required = "",
}) => {
  const [query, setQuery] = useState("");
  const [openDataTable, setOpenDataTable] = useState(false);
  const [selected, setSelected] = useState(placehoder);
  const sz =
    size === "xs" ? "py-1 text-xs" : size === "sm" ? "py-2 text-sm" : "py-3";
  useEffect(() => {
    setSelected(placehoder);
    output(placehoder);
  }, [placehoder]);
  return (
    <View>
      <TouchableOpacity
        className={`w-full border bg-white ${
          openDataTable ? "border-indigo-900" : "border-gray-200"
        } rounded-md px-2 ${disabled && "pointer-events-none bg-slate-100"}`}
        onPress={() => {
          setQuery("");
          setOpenDataTable(!openDataTable);
        }}
        disabled={disabled}
      >
        <View className={`${sz} flex-row justify-between`}>
          <Text className="truncate">{selected}</Text>
          <View className={`${openDataTable && "rotate-180"}`}>
            <Entypo name="chevron-down" size={16} color="black" />
          </View>
        </View>
      </TouchableOpacity>

      {openDataTable && (
        <ScrollView className="rounded-md border border-gray-300 mt-1 max-h-72 grow">
          <TextInput
            className={`w-full ${sz} focus:outline-none rounded px-2 bg-gray-50 ${
              !openDataTable && "hidden"
            }`}
            placeholder="Tìm kiếm..."
            onChangeText={(text) => {
              setQuery(text);
            }}
          />
          {search(data, query, field).length > 0 ? (
            search(data, query, field).map((el, i) => {
              return (
                <TouchableOpacity
                  key={i}
                  onPress={() => {
                    setSelected(el[toShow]);
                    output(el[toShow]);
                    setOpenDataTable(false);
                  }}
                >
                  <Text
                    className={`hover:bg-green-500 truncate px-2 ${sz} ${
                      el[toShow] === selected ? "bg-green-500" : ""
                    }`}
                  >
                    {el[toShow]}
                  </Text>
                </TouchableOpacity>
              );
            })
          ) : (
            <View className="p-2">
              <Text>{required || "Không có dữ liệu phù hợp"}</Text>
            </View>
          )}
        </ScrollView>
      )}
    </View>
  );
};
export default MyPicker;
