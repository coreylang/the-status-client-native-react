import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native";
import Home from "../src/screens/Home";

export default function HomeScreen() {
  return (
    <SafeAreaView style={{ flex: 1}}>
      <Home />
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}
