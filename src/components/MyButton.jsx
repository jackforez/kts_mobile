import { ActivityIndicator, Text, TouchableOpacity } from "react-native";
import React from "react";
import { COLORS } from "../constant/color";
const Button = ({
  variant = "",
  size,
  callback,
  loading = false,
  disabledBy = false,
  style = "",
  textStyle = "",
  children = "button",
}) => {
  const bg =
    variant === "success"
      ? "bg-green-500"
      : variant === "warning"
      ? "bg-yellow-500"
      : variant === "danger"
      ? "bg-red-500"
      : variant === "primary"
      ? "bg-primary-600"
      : variant === "outline-primary"
      ? "bg-white border border-primary-500"
      : variant === "outline-success"
      ? "bg-white border border-green-500"
      : variant === "outline-warning"
      ? "bg-white border border-yellow-500"
      : variant === "outline-danger"
      ? "bg-white border border-red-500"
      : "bg-white border border-gray-300";
  const text =
    variant === "success"
      ? "text-white"
      : variant === "warning"
      ? "text-white"
      : variant === "danger"
      ? "text-white"
      : variant === "primary"
      ? "text-white"
      : variant === "outline-primary"
      ? "text-primary-500"
      : variant === "outline-success"
      ? "text-green-500"
      : variant === "outline-warning"
      ? "text-yellow-500"
      : variant === "outline-danger"
      ? "text-red-500"
      : "text-black";
  return (
    <TouchableOpacity
      disabled={disabledBy}
      onPress={callback}
      className={`${disabledBy ? "bg-slate-300" : bg} ${
        size === "xs"
          ? "p-2"
          : size === "sm"
          ? "p-3.5"
          : size === "md"
          ? "p-5"
          : size === "lg"
          ? "p-7"
          : ""
      } justify-center items-center ${style || "rounded-md"}`}
    >
      {loading ? (
        <ActivityIndicator size="small" color={COLORS.priamry} />
      ) : (
        <Text className={`${text} ${textStyle}`}>{children}</Text>
      )}
    </TouchableOpacity>
  );
};

export default Button;
