import { useDispatch } from "react-redux";
import { onCloseModal } from "../redux/systemSlice";
import { View, Text, TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";
const Modal = ({ children }) => {
  const dispatch = useDispatch();
  return (
    <View className="absolute z-10 h-screen w-screen bg-black/50 top-0 left-0 flex justify-center items-center">
      <View className="bg-white overflow-hidden rounded-md w-4/5 md:w-1/2 lg:w-1/3">
        <View className="bg-red-500  font-semibold flex-row justify-between items-center ">
          <Text className="px-4 uppercase text-white">cảnh báo</Text>
          <TouchableOpacity
            className="p-2"
            onPress={() => {
              dispatch(onCloseModal());
            }}
          >
            <AntDesign name="close" size={18} color="white" />
          </TouchableOpacity>
        </View>
        {children}
      </View>
    </View>
  );
};

export default Modal;
