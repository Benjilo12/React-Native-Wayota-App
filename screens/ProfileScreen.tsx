import { useClerk } from "@clerk/expo";
import { Pressable, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const ProfileScreen = () => {
  const { signOut } = useClerk();
  const handleSignout = async () => {
    try {
      await signOut();
    } catch (error) {
      console.log("Error", error);
    }
  };
  return (
    <SafeAreaView>
      <Text>ProfileScreen</Text>
      <Pressable onPress={handleSignout}>
        <Text>Logout</Text>
      </Pressable>
    </SafeAreaView>
  );
};

export default ProfileScreen;
