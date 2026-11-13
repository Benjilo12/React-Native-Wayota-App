import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeStack from "./HomeStack";
import Ionicons from "@expo/vector-icons/Ionicons";
import GuideStack from "./GuideStack";
import ProfileScreen from "../screens/ProfileScreen";

const TabNavigator = () => {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: "#FF5722",
        tabBarInactiveTintColor: "#666",
        tabBarStyle: { backgroundColor: "#DBEAFE", borderTopColor: "#e5e5e5" },
        tabBarIconStyle: { marginTop: -3 },
        tabBarLabelStyle: { fontSize: 12, marginBottom: 3 },
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeStack}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Guide"
        component={GuideStack}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="book" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;
