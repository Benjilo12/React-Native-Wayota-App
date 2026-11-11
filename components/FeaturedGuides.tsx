import {
  Image,
  ScrollView,
  Text,
  View,
  type ImageSourcePropType,
} from "react-native";

type Guide = {
  place: string;
  description: string;
  image: ImageSourcePropType | string;
  author: {
    name: string;
    avatar: string;
    views: number;
  };
};

const guides: Guide[] = [
  {
    place: "Kakum National Park",
    description:
      "Explore Ghana's rainforest, canopy walkway, and diverse wildlife.",
    image: require("../assets/kakum.jpg"),
    author: {
      name: "John Doe",
      avatar:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80",
      views: 1000,
    },
  },
  {
    place: "Cape Coast Castle",
    description:
      "Visit this historic castle and learn about its history and significance.",
    image: require("../assets/axim.jpg"),
    author: {
      name: "Jane Smith",
      avatar:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80",
      views: 500,
    },
  },
  {
    place: "Wli Waterfalls",
    description:
      "Experience the beauty of Ghana's tallest waterfall and surrounding nature.",
    image: require("../assets/wli.jpg"),
    author: {
      name: "Kwame Nkrumah",
      avatar:
        "https://upload.wikimedia.org/wikipedia/commons/7/7e/Kwame_Nkrumah_1960.jpg",
      views: 800,
    },
  },
  {
    place: "Paga Crocodile Pond",
    description:
      "Get up close with the sacred crocodiles and learn about their cultural significance.",
    image: require("../assets/paga.png"),

    author: {
      name: "Kofi Annan",
      avatar:
        "https://upload.wikimedia.org/wikipedia/commons/8/8e/Kofi_Annan_2001.jpg",
      views: 1200,
    },
  },
  {
    place: "Boti Falls",
    description:
      "Discover the twin waterfalls and enjoy the lush greenery of the surrounding area.",
    image: require("../assets/boti.jpg"),
    author: {
      name: "Nana Akufo-Addo",
      avatar:
        "https://upload.wikimedia.org/wikipedia/commons/3/3e/Nana_Akufo-Addo_2017.jpg",
      views: 600,
    },
  },
  {
    place: "kwame Nkrumah Mausoleum",
    description:
      "Visit the final resting place of Ghana's first president and learn about his legacy.",
    image: require("../assets/kwame.jpg"),
    author: {
      name: "Kwame Nkrumah",
      avatar:
        "https://upload.wikimedia.org/wikipedia/commons/7/7e/Kwame_Nkrumah_1960.jpg",
      views: 900,
    },
  },
  {
    place: "Nzulezo Stilt Village",
    description:
      "Experience the unique lifestyle of the people living in this stilt village on Lake Tadane.",
    image: require("../assets/nzu.jpg"),
    author: {
      name: "Ama Serwaa",
      avatar:
        "https://upload.wikimedia.org/wikipedia/commons/5/5e/Ama_Serwaa.jpg",
      views: 700,
    },
  },
];

const FeaturedGuides = () => {
  return (
    <View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {guides.map((guide) => (
          <View
            className="w-64 mr-4 rounded-2xl overflow-hidden bg-white shadow-lg"
            key={guide.place}
          >
            <Image
              className="w-64 h-48"
              resizeMode="cover"
              source={
                typeof guide.image === "string"
                  ? { uri: guide.image }
                  : guide.image
              }
            />
            <View className="py-3">
              <Text className="text-lg font-semibold px-3">{guide.place}</Text>
              <Text className="text-gray-600 text-sm px-3">
                {guide.description}
              </Text>
              <View className="flex-row items-center mt-2">
                <Image
                  className="w-8 h-8 rounded-full mr-2"
                  source={{ uri: guide.author.avatar }}
                />
                <View className="flex-1">
                  <Text className="text-sm font-semibold">
                    {guide.author.name}
                  </Text>
                  <Text className="text-gray-500 text-xs">
                    {guide.author.views} views
                  </Text>
                </View>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default FeaturedGuides;
