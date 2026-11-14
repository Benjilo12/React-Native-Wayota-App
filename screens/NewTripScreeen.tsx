import {
  ActivityIndicator,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import dayjs from "dayjs";
import { Calendar, DateData } from "react-native-calendars";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { useUser } from "@clerk/expo";
import axios from "axios";

type TripDateRange = {
  startDate?: string;
  endDate?: string;
};

const NewTripScreeen = () => {
  const [calendarVisible, setCalendarVisible] = useState(false);
  const [searchVisible, setSearchVisible] = useState(false);
  const [selectedRange, setSelectedRange] = useState<TripDateRange>({});
  const [chosenLocation, setChosenLocation] = useState("");
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const { user } = useUser();

  const today = dayjs().format("YYYY-MM-DD");
  const getMarkedDates = () => {
    const marks: any = {};

    const { startDate, endDate } = selectedRange;
    if (startDate && !endDate) {
      marks[startDate] = {
        startingDate: true,
        endingDate: true,
        color: "#2196F3",
        textColor: "white",
      };
    } else if (startDate && endDate) {
      let curr = dayjs(startDate);
      const end = dayjs(endDate);

      while (curr.isBefore(end) || curr.isSame(end)) {
        const formatted = curr.format("YYYY-MM-DD");
        marks[formatted] = {
          color: "#2196F3",
          textColor: "white",
          ...(formatted === startDate && { startingDay: true }),
          ...(formatted === endDate && { endingDay: true }),
        };
        curr = curr.add(1, "day");
      }
    }
    return marks;
  };

  const handleDayPress = (day: DateData) => {
    const selected = day.dateString;
    if (
      !selectedRange.startDate ||
      (selectedRange.startDate && selectedRange.endDate)
    ) {
      setSelectedRange({ startDate: selected });
    } else if (dayjs(selected).isBefore(selectedRange.startDate)) {
      setSelectedRange({ startDate: selected });
    } else {
      setSelectedRange({ ...selectedRange, endDate: selected });
    }
  };

  const onSaveDates = () => {
    setCalendarVisible(false);
  };

  const GOOGLE_API_KEY = process.env.EXPO_PUBLIC_GOOGLE_PLACES_API_KEY ?? "";

  const handleCreateTrip = async () => {
    try {
      setIsLoading(true);
      setError(null);

      if (
        !chosenLocation ||
        !selectedRange.startDate ||
        !selectedRange.endDate
      ) {
        setError("Please select a location and date range");
        return;
      }
      const clerkUserId = user?.id;
      const email = user?.primaryEmailAddress?.emailAddress;
      if (!clerkUserId || !email) {
        setError("User not authenticated or email missing");
        return;
      }

      let background = "https://via.placeholder.com/150";

      try {
        const findPlaceUrl = `https://maps.googleapis.com/api/place/findplacefromtext/json?input=${encodeURIComponent(chosenLocation)}&inputtype=textquery&fields=place_id,photos&key=${GOOGLE_API_KEY}`;
        const findPlacesRes = await axios.get(findPlaceUrl);
        const placeId = findPlacesRes.data.candidates?.[0]?.place_id;

        if (placeId) {
          const detailsUrl = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=photos&key=${GOOGLE_API_KEY}`;
          const detailsRes = await axios.get(detailsUrl);
          const photos = detailsRes.data.result?.photos;
          if (photos?.length > 0) {
            background = `https://maps.googleapis.com/maps/api/pace/photo?maxwidth=800&photoreference=${photos[0].photo_reference}&key=${GOOGLE_API_KEY}`;
          }
        }
      } catch (photoError) {
        console.log("Error fetching place photo", photoError);
      }

      const tripData = {
        tripName: chosenLocation,
        startDate: selectedRange.startDate,
        endDate: selectedRange.endDate,
        startDay: dayjs(selectedRange.startDate).format("dddd"),
        endDay: dayjs(selectedRange.endDate).format("dddd"),
        clerkUserId,
        userDataId: {
          email,
          name: user?.fullName || "",
        },
      };

      const response = await axios.post(
        "http://localhost:8082/api/trips",
        tripData,
      );

      const createdTrip = response.data.trip;

      navigation.navigate("PlanTrip", { trip: createdTrip });
    } catch (error) {
      console.log("Error", error);
    } finally {
      setIsLoading(false);
    }
  };
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
      <TouchableOpacity
        className="border border-gray-300 rounded-xl px-4 py-3 mb-4"
        onPress={() => setSearchVisible(true)}
      >
        <Text className="text-sm font-semibold text-gray-700 mb-1">
          Where to?
        </Text>
        <Text className="text-base text-gray-500">
          {chosenLocation || "E.g Tamale, Ho, Kumasi"}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => setCalendarVisible(true)}
        className="flex-row border border-gray-300 rounded-xl px-4 py-3 justify-between mb-4"
      >
        <View className="flex-1 mr-2">
          <Text className="text-sm font-semibold text-gray-700 mb-1">
            Date (optional)
          </Text>
          <View className="flex-row items-center">
            <Ionicons name="calendar" color={"#000"} size={16} />
            <Text className="text-sm text-gray-400 ml-1">
              {selectedRange.startDate
                ? dayjs(selectedRange.startDate).format("MMM D")
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
              {selectedRange.endDate
                ? dayjs(selectedRange.endDate).format("MMM D")
                : "End Date"}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
      <View className="flex-row justify-between items-center mb-8">
        <TouchableOpacity>
          <Text className="text-sm text-gray-600 font-medium">
            + Invite a trip mate
          </Text>
        </TouchableOpacity>
        <TouchableOpacity className="flex-row items-center">
          <Ionicons name="people" size={16} color="#666" />
          <Text className="ml-1 text-sm text-gray-600 font-medium">
            Friends
          </Text>
          <Ionicons name="chevron-down" size={16} color="#666" />
        </TouchableOpacity>
      </View>
      {error && <Text className="text-red-500 text-sm mb-4">{error}</Text>}
      <TouchableOpacity
        className="bg-orange-500 rounded-full py-3 items-center mb-4"
        onPress={handleCreateTrip}
      >
        {isLoading ? (
          <ActivityIndicator size={"small"} color="#fff" />
        ) : (
          <Text className="text-white font-semibold text-base">
            Start Planing
          </Text>
        )}
      </TouchableOpacity>

      <Text className="text-gray-500 text-center">
        Or see an example for{" "}
        <Text className="font-semibold text-gray-600">Cape Coast</Text>
      </Text>
      <Modal
        visible={calendarVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setCalendarVisible(false)}
      >
        <View className="flex-1 justify-center items-center bg-black/60">
          <View className="bg-white rounded-2xl w-11/12">
            <Calendar
              markingType="period"
              markedDates={getMarkedDates()}
              onDayPress={handleDayPress}
              theme={{
                todayTextColor: "#2196F3",
                arrowColor: "#00BFF",
                selectedDayTextColor: "#fff",
              }}
              minDate={today}
            />
            <Pressable
              onPress={onSaveDates}
              className="p-4 border-t border-gray-200 items-center"
            >
              <Text className="text-gray-700 font-semibold">Save</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      <Modal animationType="fade" visible={searchVisible}>
        <SafeAreaView className="flex-1 bg-white pt-10 px-4">
          <View className="flex-row items-center mb-4">
            <TouchableOpacity
              className="mr-3"
              onPress={() => navigation.goBack()}
            >
              <Ionicons name="arrow-back" size={24} color="#000" />
            </TouchableOpacity>
            <Text className="text-lg font-semibold text-gray-900">
              Search for a place
            </Text>
          </View>
          <GooglePlacesAutocomplete
            placeholder="Search for a place"
            fetchDetails={true}
            enablePoweredByContainer={false}
            onPress={(data, details = null) => {
              if (data?.description) {
                setChosenLocation(data.description);
              }
              setSearchVisible(false);
            }}

            query={{
              key: GOOGLE_API_KEY,
              language: "en",
            }}

            styles={{
              container: {
                flex: 0,
              },
              textInputContainer: {
                flexDirection: "row",
                backgroundColor: "#f1f1f1",
                borderRadius: 30,
                paddingHorizontal: 10,
                alignItems: "center",
              },
              TextInput: {
                flex: 1,
                height: 44,
                color: "#333",
                fontSize: 15,
                backgroundColor: "#f1f1f1",
                borderRadius: 25,
              },
              listView: {
                margin: 10,
                backgroundColor: "#fff",
              },
            }}
          />
        </SafeAreaView>
      </Modal>
    </SafeAreaView>
  );
};

export default NewTripScreeen;

const styles = StyleSheet.create({});
