import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import dayjs from "dayjs";

type TripDateRange = {
  startDate?: string;
  endDate?: string;
};

const NewTripScreeen = () => {
  const [calendarVisible, setCalendarVisible] = useState(false);
  const [selectedRange, setSelectedRange] = useState<TripDateRange>({});
  const [displayStart, setDisplayStart] = useState("");
  const [displayEnd, setDisplayEnd] = useState("");
  const [searchVisible, setSearchVisible] = useState("");
  const [chosenLocation, setChosenLocation] = useState("");
  const navigation = useNavigation();

  const today = dayjs().format("YYYY-MM-DD");
  const optional = true;
  return (
    <SafeAreaView className="flex-1 bg-white px-5">
      <View className="mt-2 mb-4">
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="close" color={"#000"} size={28} />
        </TouchableOpacity>
      </View>
      <Text className="text-2xl font-bold text-gray-900 mb-1">
        Plan a new trip
      </Text>
      <Text className="text-base text-gray-500 mb-6">
        Build an itinerary and map out your upcoming travel plan
      </Text>
      <TouchableOpacity className="border border-gray-300 rounded-xl px-4 py-3 mb-4">
        <Text className="text-sm font-semibold text-gray-700 mb-1">
          Where to?
        </Text>
        <Text className="text-base text-gray-500">
          {chosenLocation || "E.g Tamale, Ho, Kumasi"}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity className=" flex-row border border-gray-300 rounded-xl px-4 py-3 justify-between mb-4">
        <View className="flex-1 mr-2">
          <Text className="text-sm font-semibold text-gray-700 mb-1">
            Date (optional)
          </Text>
          <View className="flex-row items-center">
            <Ionicons name="calendar" color={"#000"} size={16} />
            <Text className="text-sm text-gray-400 ml-1">
              {displayStart
                ? dayjs(displayStart).format("MMM D")
                : "Start Date"}
            </Text>
          </View>
        </View>
        <View className="flex-1 ml-2">
          <Text className="text-sm font-semibold text-gray-700 mb-1 invisible">
            .
          </Text>
          <View className="flex-row items-center">
            <Ionicons name="calendar" color={"#000"} size={16} />
            <Text className="text-sm text-gray-400 ml-1">
              {displayEnd ? dayjs(displayEnd).format("MMM D") : "End Date"}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default NewTripScreeen;

const styles = StyleSheet.create({});
