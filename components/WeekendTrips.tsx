import { StyleSheet, Text, View, ScrollView, Image } from "react-native";

const places = [
  {
    name: "Ada Foah",
    image: require("../assets/ada.jpg"),
  },
  {
    name: "Safari Valley Resort",
    image: require("../assets/safari.jpg"),
  },
  {
    name: "Akosombo",
    image: require("../assets/akosombo.jpg"),
  },
  {
    name: "Aburi Botanical Gardens",
    image: require("../assets/aburi.jpg"),
  },
  {
    name: "Busua Beach",
    image: require("../assets/busua.jpg"),
  },
  {
    name: "Labadi Beach",
    image: require("../assets/labadi.jpg"),
  },
];

const WeekendTrips = () => {
  return (
    <View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className="space-x-4 px-4"
      >
        {places?.map((place, index) => (
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

export default WeekendTrips;

const styles = StyleSheet.create({});
