import { StyleSheet, Text, View } from "react-native";
import NavigationBar from "components/NavigationBar";

export default function App() {
  return (
    <View style={styles.container}>
      <NavigationBar/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
