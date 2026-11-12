import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import type { GuideStackParamList, Place } from "../navigation/GuideStack";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";

const TEAL = "#0E7C86";
const GOLD = "#E9A820";

type GuideScreenNavigationProp = NativeStackNavigationProp<
  GuideStackParamList,
  "GuideScreen"
>;

export const Places: Place[] = [
  {
    id: 1,
    name: "Cape Coast Castle",
    image: require("../assets/axim.jpg"),
    description:
      "Explore one of Ghana's most historic castles and learn about the transatlantic slave trade through guided tours and museum exhibitions.",
    attributes: {
      location: "Cape Coast",
      type: "Historical Site",
      bestTime: "November to April",
      attractions: [
        "Slave Dungeons",
        "Door of No Return",
        "West African Historical Museum",
        "Guided Historical Tours",
      ],
    },
  },
  {
    id: 2,
    name: "Kakum National Park",
    image: require("../assets/kakum.jpg"),
    description:
      "Experience Ghana's tropical rainforest through an exciting canopy walkway suspended high above the forest floor.",
    attributes: {
      location: "Abrafo",
      type: "Nature and Adventure",
      bestTime: "November to April",
      attractions: [
        "Canopy Walkway",
        "Rainforest Hiking",
        "Bird Watching",
        "Guided Nature Tours",
      ],
    },
  },
  {
    id: 3,
    name: "Elmina Castle",
    image: require("../assets/new.jpg"),
    description:
      "Visit the historic St. George's Castle in Elmina, a UNESCO World Heritage Site that tells the story of European trade and Ghana's history.",
    attributes: {
      location: "Elmina, Central Region, Ghana",
      type: "Historical Site",
      bestTime: "November to April",
      attractions: [
        "Slave Dungeons",
        "Door of No Return",
        "Castle Museum",
        "Historical Guided Tours",
      ],
    },
  },
  {
    id: 4,
    name: "Hans Cottage Botel",
    image: require("../assets/Hans.jpg"),
    description:
      "Enjoy a relaxing visit to a famous eco-tourism destination known for its crocodile pond, natural scenery, and hospitality.",
    attributes: {
      location: "Hans Cottage",
      type: "Eco-Tourism and Resort",
      bestTime: "Weekends and holidays",
      attractions: [
        "Crocodile Pond",
        "Nature Photography",
        "Restaurant",
        "Relaxation",
      ],
    },
  },
  {
    id: 5,
    name: "Fort William Lighthouse",
    image: require("../assets/fort.jpg"),
    description:
      "Discover a historic lighthouse and fort located on Dawson's Hill, offering an interesting glimpse into Cape Coast's coastal history.",
    attributes: {
      location: "Dawson's Hill",
      type: "Historical Landmark",
      bestTime: "Morning or afternoon",
      attractions: [
        "Historic Lighthouse",
        "Coastal History",
        "Photography",
        "Fort Architecture",
      ],
    },
  },
  {
    id: 6,
    name: "Brenu Beach",
    image: require("../assets/Brenu.jpg"),
    description:
      "Relax on a beautiful sandy beach near Cape Coast, enjoy coastal scenery, and experience a peaceful beach getaway.",
    attributes: {
      location: "Brenu Akyinim, Central Region, Ghana",
      type: "Beach",
      bestTime: "November to March",
      attractions: [
        "Beach Relaxation",
        "Photography",
        "Coastal Scenery",
        "Picnics",
      ],
    },
  },
];

const GuideScreen = () => {
  const navigation = useNavigation<GuideScreenNavigationProp>();
  return (
    <SafeAreaView className="flex-1 bg-[#F2F6F7]" edges={["top"]}>
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingBottom: 110 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View className="px-5 pt-4 pb-5">
          <Text className="text-3xl font-extrabold text-[#12222B]">
            Explore Cape Coast
          </Text>
          <Text className="mt-1 text-base text-gray-500">
            {Places.length} places worth the trip
          </Text>
        </View>

        {/* Cards */}
        {Places.map((place) => (
          <Pressable
            key={place.id}
            onPress={() => navigation.navigate("GuideDetails", { place })}
            android_ripple={{ color: "#00000010" }}
            className="mx-4 mb-6 overflow-hidden rounded-3xl bg-white"
            style={({ pressed }) => [
              styles.card,
              pressed && { transform: [{ scale: 0.99 }] },
            ]}
          >
            {/* Image with overlay */}
            <View className="h-64 w-full">
              <Image
                className="h-full w-full"
                source={place.image}
                resizeMode="cover"
              />

              {/* Darkening layers fake a gradient without extra packages */}
              <View className="absolute bottom-0 left-0 right-0 h-36 bg-black/25" />
              <View className="absolute bottom-0 left-0 right-0 h-24 bg-black/35" />

              {/* Type badge */}
              <View className="absolute left-3 top-3 flex-row items-center rounded-full bg-white/95 px-3 py-1.5">
                <Ionicons name="compass-outline" size={14} color={TEAL} />
                <Text className="ml-1.5 text-xs font-semibold text-[#12222B]">
                  {place.attributes.type}
                </Text>
              </View>

              {/* Title */}
              <View className="absolute bottom-4 left-4 right-4">
                <Text
                  className="text-2xl font-bold text-white"
                  numberOfLines={2}
                >
                  {place.name}
                </Text>
                <View className="mt-1 flex-row items-center">
                  <Ionicons name="location-sharp" size={14} color={GOLD} />
                  <Text
                    className="ml-1 flex-1 text-sm font-medium text-white/90"
                    numberOfLines={1}
                  >
                    {place.attributes.location}
                  </Text>
                </View>
              </View>
            </View>

            {/* Details */}
            <View className="p-4">
              <Text className="text-[15px] leading-6 text-gray-600">
                {place.description}
              </Text>

              <View className="mt-4 flex-row items-center self-start rounded-xl bg-[#FFF6DD] px-3 py-2">
                <Ionicons name="calendar-outline" size={16} color="#9A6B00" />
                <Text className="ml-2 text-sm font-semibold text-[#7A5500]">
                  Best time: {place.attributes.bestTime}
                </Text>
              </View>

              <View className="mt-4 flex-row flex-wrap gap-2">
                {place.attributes.attractions.map((item) => (
                  <View
                    key={item}
                    className="rounded-full bg-[#E4F1F2] px-3 py-1.5"
                  >
                    <Text className="text-xs font-medium text-[#0B5C64]">
                      {item}
                    </Text>
                  </View>
                ))}
              </View>
            </View>
          </Pressable>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default GuideScreen;

const styles = StyleSheet.create({
  card: {
    elevation: 4,
    shadowColor: "#0B2A33",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.12,
    shadowRadius: 14,
  },
});
