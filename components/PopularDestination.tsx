import { Image, ScrollView, StyleSheet, Text, View } from "react-native";

const destinations = [
  {
    name: "Bolgatanga",
    image: require("../assets/bolga.jpg"),
  },
  {
    name: "Tamale",
    image: require("../assets/Tamale.jpg"),
  },
  {
    name: "Kumasi",
    image: require("../assets/kumasi.jpg"),
  },
  {
    name: "Accra",
    image: require("../assets/accra.jpg"),
  },
  {
    name: "Cape Coast",
    image: require("../assets/cape.jpg"),
  },
  {
    name: "Ho",
    image: require("../assets/ho.jpg"),
  },
  {
    name: "Takoradi",
    image: require("../assets/tako.png"),
  },
];

const PopularDestination = () => {
  return (
    <View className="mt-2 bg-blue-100 py-3">
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className="space-x-4 px-4"
      >
        {destinations?.map((place, index) => (
          <View className="mr-4 relative" key={index}>
            <Image
              className="w-40 h-52 rounded-2xl"
              source={
                typeof place.image === "number"
                  ? place.image
                  : { uri: place.image }
              }
            />
            <View className="absolute bottom-0 left-0 right-0  bg-opacity-50 p-2 rounded-b-2xl justify-center items-center ">
              <Text className="text-white font-bold text-xl">{place.name}</Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default PopularDestination;

const styles = StyleSheet.create({});
