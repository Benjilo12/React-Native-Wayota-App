import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import type { RouteProp } from "@react-navigation/native";
import type { GuideStackParamList } from "../navigation/GuideStack";
import { Ionicons } from "@expo/vector-icons";

const TEAL = "#0E7C86";
const GOLD = "#E9A820";

type GuideDetailScreenRouteProp = RouteProp<
  GuideStackParamList,
  "GuideDetails"
>;

type GuideDetailScreenProps = {
  route: GuideDetailScreenRouteProp;
};

const itineraries: { [key: string]: string[] } = {
  "Cape Coast Castle": [
    "Day 1: Arrival and Castle Tour",
    "Day 2: Historical Museum Visit and Cultural Experience",
    "Day 3: Guided Historical Tours and Departure",
  ],

  "Kakum National Park": [
    "Day 1: Arrival and Canopy Walk",
    "Day 2: Rainforest Exploration and Bird Watching",
    "Day 3: Guided Nature Tours and Departure",
  ],

  "Elmina Castle": [
    "Day 1: Arrival and Castle Tour",
    "Day 2: Historical Museum Visit and Cultural Experience",
    "Day 3: Guided Historical Tours and Departure",
  ],

  "Hans Cottage Botel": [
    "Day 1: Arrival and Nature Walk",
    "Day 2: Bird Watching and Crocodile Pond Experience",
    "Day 3: Relaxation and Departure",
  ],

  "Fort William Lighthouse": [
    "Day 1: Arrival and Historical Landmark Tour",
    "Day 2: Lighthouse Exploration and Coastal Photography",
    "Day 3: Guided Historical Tour and Departure",
  ],

  "Brenu Beach": [
    "Day 1: Arrival and Beach Relaxation",
    "Day 2: Water Activities and Coastal Exploration",
    "Day 3: Beach Picnic and Departure",
  ],
};

const additionalAttributes: {
  [key: string]: {
    entryFee: string;
    travelTips: string[];
  };
} = {
  "Cape Coast Castle": {
    entryFee: "$10",
    travelTips: [
      "Wear comfortable shoes for walking.",
      "Bring a hat and sunscreen for sun protection.",
      "Carry a water bottle to stay hydrated.",
    ],
  },

  "Kakum National Park": {
    entryFee: "$15",
    travelTips: [
      "Wear insect repellent to avoid mosquito bites.",
      "Bring a camera for capturing the scenic views.",
      "Follow the park rules and stay on designated trails.",
    ],
  },

  "Elmina Castle": {
    entryFee: "$8",
    travelTips: [
      "Learn about the history of the castle before your visit.",
      "Respect the historical significance of the site.",
      "Take a guided tour for a more informative experience.",
    ],
  },

  "Hans Cottage Botel": {
    entryFee: "$20",
    travelTips: [
      "Check the weather forecast before your visit.",
      "Bring a swimsuit for water activities.",
      "Explore the surrounding nature trails for a complete experience.",
    ],
  },

  "Fort William Lighthouse": {
    entryFee: "$5",
    travelTips: [
      "Wear comfortable shoes for exploring the lighthouse.",
      "Bring a camera for panoramic views.",
      "Check the opening hours before your visit.",
    ],
  },

  "Brenu Beach": {
    entryFee: "Free",
    travelTips: [
      "Bring beach essentials like towels and sunscreen.",
      "Check local conditions before swimming.",
      "Keep the beach clean and dispose of waste properly.",
    ],
  },
};

const SectionTitle = ({ children }: { children: string }) => (
  <Text className="mb-3 text-xl font-bold text-[#12222B]">{children}</Text>
);

const FactTile = ({
  icon,
  label,
  value,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  value: string;
}) => (
  <View className="flex-1 rounded-2xl bg-[#F2F6F7] p-3">
    <Ionicons name={icon} size={20} color={TEAL} />
    <Text className="mt-2 text-xs text-gray-500">{label}</Text>
    <Text
      className="mt-0.5 text-sm font-semibold text-[#12222B]"
      numberOfLines={2}
    >
      {value}
    </Text>
  </View>
);

const GuideDetailScreen = ({ route }: GuideDetailScreenProps) => {
  const { place } = route?.params;
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();

  const itinerary = itineraries[place.name] || [];
  const extraAttributes = additionalAttributes[place.name] || {
    entryFee: "N/A",
    travelTips: [],
  };

  return (
    <View className="flex-1 bg-white">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 48 }}
      >
        {/* Hero */}
        <View className="h-80 w-full">
          <Image
            className="h-full w-full"
            source={
              typeof place.image === "string"
                ? { uri: place.image }
                : place.image
            }
            resizeMode="cover"
          />
          <View className="absolute bottom-0 left-0 right-0 h-44 bg-black/25" />
          <View className="absolute bottom-0 left-0 right-0 h-28 bg-black/35" />

          <TouchableOpacity
            onPress={() => navigation.goBack()}
            activeOpacity={0.8}
            style={{ top: insets.top + 8 }}
            className="absolute left-4 h-10 w-10 items-center justify-center rounded-full bg-white/90"
          >
            <Ionicons name="arrow-back" size={22} color="#12222B" />
          </TouchableOpacity>

          <View className="absolute bottom-10 left-5 right-5">
            <View className="mb-2 self-start rounded-full bg-white/95 px-3 py-1">
              <Text className="text-xs font-semibold text-[#12222B]">
                {place.attributes.type}
              </Text>
            </View>
            <Text className="text-3xl font-extrabold text-white">
              {place.name}
            </Text>
            <View className="mt-1 flex-row items-center">
              <Ionicons name="location-sharp" size={15} color={GOLD} />
              <Text
                className="ml-1 flex-1 text-sm font-medium text-white/90"
                numberOfLines={1}
              >
                {place.attributes.location}
              </Text>
            </View>
          </View>
        </View>

        {/* Content sheet overlaps the hero */}
        <View className="-mt-6 rounded-t-3xl bg-white px-5 pt-6">
          {/* Quick facts */}
          <View className="mb-7 flex-row gap-3">
            <FactTile
              icon="calendar-outline"
              label="Best time"
              value={place.attributes.bestTime}
            />
            <FactTile
              icon="cash-outline"
              label="Entry fee"
              value={extraAttributes.entryFee}
            />
          </View>

          {/* About */}
          <View className="mb-7">
            <SectionTitle>About</SectionTitle>
            <Text className="text-base leading-7 text-gray-600">
              {place.description}
            </Text>
          </View>

          {/* Highlights */}
          <View className="mb-7">
            <SectionTitle>Highlights</SectionTitle>
            <View className="flex-row flex-wrap gap-2">
              {place.attributes.attractions.map((item) => (
                <View
                  key={item}
                  className="flex-row items-center rounded-full bg-[#E4F1F2] px-3 py-2"
                >
                  <Ionicons name="star" size={12} color={TEAL} />
                  <Text className="ml-1.5 text-sm font-medium text-[#0B5C64]">
                    {item}
                  </Text>
                </View>
              ))}
            </View>
          </View>

          {/* Itinerary: a real sequence, so a timeline fits */}
          {itinerary.length > 0 && (
            <View className="mb-7">
              <SectionTitle>Suggested itinerary</SectionTitle>
              {itinerary.map((item, index) => {
                const [dayLabel, ...rest] = item.split(":");
                const title = rest.join(":").trim();
                const dayNumber = dayLabel.replace(/\D/g, "") || `${index + 1}`;
                const isLast = index === itinerary.length - 1;

                return (
                  <View className="flex-row" key={index}>
                    <View className="w-10 items-center">
                      <View className="h-8 w-8 items-center justify-center rounded-full bg-[#0E7C86]">
                        <Text className="text-sm font-bold text-white">
                          {dayNumber}
                        </Text>
                      </View>
                      {!isLast && (
                        <View className="w-0.5 flex-1 bg-[#0E7C86]/25" />
                      )}
                    </View>
                    <View className={`flex-1 pl-2 ${isLast ? "" : "pb-5"}`}>
                      <Text className="text-sm font-semibold text-[#0E7C86]">
                        {dayLabel.trim()}
                      </Text>
                      <Text className="mt-0.5 text-base leading-6 text-[#12222B]">
                        {title}
                      </Text>
                    </View>
                  </View>
                );
              })}
            </View>
          )}

          {/* Travel tips */}
          {extraAttributes.travelTips.length > 0 && (
            <View className="rounded-2xl bg-[#FFF6DD] p-4">
              <Text className="mb-3 text-xl font-bold text-[#12222B]">
                Travel tips
              </Text>
              {extraAttributes.travelTips.map((tip, index) => (
                <View
                  key={index}
                  className={`flex-row items-start ${
                    index === extraAttributes.travelTips.length - 1
                      ? ""
                      : "mb-3"
                  }`}
                >
                  <Ionicons
                    name="checkmark-circle"
                    size={20}
                    color="#B07D00"
                    style={{ marginTop: 2 }}
                  />
                  <Text className="ml-2.5 flex-1 text-[15px] leading-6 text-[#5C4300]">
                    {tip}
                  </Text>
                </View>
              ))}
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default GuideDetailScreen;
