import { StyleSheet, Text, View } from "react-native";
import NavigationBar from "./components/NavigationBar";
import SearchScreen from "./components/SearchScreen";

export default function App() {
  return (
    <View style={styles.container}>
      <NavigationBar />
      <SearchScreen />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
