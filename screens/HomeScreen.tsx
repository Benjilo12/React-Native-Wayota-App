import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import FeaturedGuides from "../components/FeaturedGuides";
import PopularDestination from "../components/PopularDestination";
import WeekendTrips from "../components/WeekendTrips";

//? Define the type for the navigation parameters
export type HomeStackParamList = {
  Home: undefined;
  NewTrip: undefined;
  PlanTrip: { trip: any };
  AIChat: undefined;
  MapScreen: undefined;
};

//? Define the type for the navigation parameters
export type TabNavigatorParamList = {
  Home: undefined;
  Guide: undefined;
  Profile: undefined;
};

//? Define the type for the navigation prop
type HomeScreenNavigationProp = NativeStackNavigationProp<
  HomeStackParamList & TabNavigatorParamList
>;

const HomeScreen = () => {
  const navigation = useNavigation();
  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView className="flex-1">
        {/* Header section with logo and buttons */}
        <View className="flex flex-row justify-between items-center pt-4 px-4 pb-2">
          <Image
            source={{ uri: "https://wanderlog.com./assets/logoWithText.png" }}
            className="w-36 h-8"
            resizeMode="contain"
          />
          <View className="flex-row items-center space-x-3">
            <TouchableOpacity className="p-2 bg-gray-100 rounded-full">
              <Text className="text-lg">🔍</Text>
            </TouchableOpacity>
            <TouchableOpacity className="bg-yellow-400 px-3 py-1 rounded-full">
              <Text className="text-sm font-semibold text-white">PRO</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View className="border-b border-gray-200 mx-4" />
        {/* Main content section with image and buttons */}
        <View className="relative">
          <Image
            source={require("../assets/beach.jpg")}
            className="w-full h-80 "
            resizeMode="contain"
          />
          <View pointerEvents="none" className="absolute inset-0 bg-black/25" />
          <View className="absolute inset-0 flex items-center justify-center">
            <Text className="text-center text-white text-4xl font-bold  px-5">
              Plan your next adventure
            </Text>
            <TouchableOpacity
              className="bg-orange-500 px-6 py-3 rounded-full mt-4"
              onPress={() => navigation.navigate("NewTrip")}
            >
              <Text className="text-white font-semibold text-base">
                Create new trip plan
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View className="p-6">
          <Text className="text-2xl font-semibold mb-4">
            Featured guides from users
          </Text>
          <FeaturedGuides />
        </View>
        <View className="p-6">
          <Text className="text-2xl font-semibold mb-4">
            Popular destinations to explore
          </Text>
          <PopularDestination />
        </View>
        <View className="p-6">
          <Text className="text-2xl font-semibold mb-4">
            Weekend Trips and Getaways
          </Text>
          <WeekendTrips />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
