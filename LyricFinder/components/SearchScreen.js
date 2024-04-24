import React, { useState } from "react";
import {
  Link,
  Image,
  Text,
  View,
  TextInput,
  Button,
  Alert,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  FlatList,
} from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import CustomButton from "./CustomButton";
const REACT_APP_MM_KEY = "444834c93d83d2493231dd0b8837755e";

function HomeScreen({ navigation }) {
  const [userInput, setUserInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [content, setContent] = useState("");

  const getLyrics = async () => {
    setIsLoading(true);
    try {
      const url = `http://api.musixmatch.com/ws/1.1/track.search?q_track=${userInput}&page_size=10&page=1&s_track_rating=desc&apikey=${REACT_APP_MM_KEY}`;
      const result = await fetch(url);
      if (!result.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await result.json();
      const content = JSON.stringify(data);

      setContent(content);
      navigation.navigate("TextScreen", { content: content });
    } catch (error) {
      Alert.alert("Error", error.message);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <View style={SearchStyles.container}>
      <View style={SearchStyles.header}>
        <View style={SearchStyles.titleContainer}>
          <Text style={SearchStyles.title}>SEARCH FOR A SONG</Text>
          <Image
            source={require("../assets/logooo.png")}
            style={SearchStyles.logo}
          />
          <Text style={SearchStyles.subtitle}>Get the lyrics for any song</Text>
        </View>
      </View>
      <TextInput
        style={SearchStyles.input}
        s
        placeholder="Song title..."
        value={userInput}
        onChangeText={setUserInput}
      />
      <CustomButton
        title="Search"
        onPress={getLyrics}
        disabled={isLoading || userInput.length === 0}
      />
    </View>
  );
}

function LyricScreen({ route }) {
  const { content } = route.params;
  const data = JSON.parse(content);
  const lyrics = data.message.body.lyrics.lyrics_body;
  console.log(content);
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.lyrics}>{lyrics}</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

function TextScreen({ route, navigation }) {
  const [lyrics, setLyrics] = useState({});
  const [lyricsLoad, setLyricsLoad] = useState(false);
  const { content } = route.params;

  let songs = [];
  try {
    const data = JSON.parse(content);
    songs = data.message.body.track_list || [];
  } catch (error) {
    console.error("Error parsing content:", error);
  }

  const getEachLyrics = async (track_id) => {
    setLyricsLoad(true);
    try {
      const url = `http://api.musixmatch.com/ws/1.1/track.lyrics.get?track_id=${track_id}&apikey=${REACT_APP_MM_KEY}`;
      const result = await fetch(url);
      if (!result.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await result.json();
      const content = JSON.stringify(data);

      setLyrics(content);
      navigation.navigate("LyricScreen", { content: content });
    } catch (error) {
      Alert.alert("Error", error.message);
    } finally {
      setLyricsLoad(false);
    }
  };

  return (
    <ScrollView>
      <View style={textScreenStyles.container}>
        {console.log(songs)}
        {songs.map((song, index) => (
          <View key={index} style={textScreenStyles.songBlock}>
            <Text style={textScreenStyles.songTitle}>
              {song.track.track_name}
            </Text>
            <Text style={textScreenStyles.artist}>
              {song.track.artist_name}
            </Text>
            <Text style={textScreenStyles.artist}>{song.track.album_name}</Text>
            <CustomButton
              title="Lyrics"
              onPress={() => getEachLyrics(song.track.track_id)}
            />
          </View>
        ))}
      </View>
    </ScrollView>
  );
}
const stack = createStackNavigator();

function SearchScreen() {
  return (
    <NavigationContainer>
      <stack.Navigator initialRouteName="Home">
        <stack.Screen name="Home" component={HomeScreen} />
        <stack.Screen name="TextScreen" component={TextScreen} />
        <stack.Screen name="LyricScreen" component={LyricScreen} />
      </stack.Navigator>
    </NavigationContainer>
  );
}

const SearchStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "flex-start",
    paddingTop: 50,
    backgroundColor: "#f0f0f0",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    marginBottom: 20,
  },
  titleContainer: {
    flex: 1,
    alignItems: "center",
  },
  title: {
    color: "#333",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    textAlign: "center",
    marginBottom: 20,
    color: "#666",
  },
  input: {
    height: 50,
    width: "100%",
    borderColor: "#ccc",
    borderWidth: 2,
    marginBottom: 20,
    paddingHorizontal: 20,
    fontSize: 16,
    backgroundColor: "#fff",
    borderRadius: 8,
  },
  logo: {
    width: 60,
    height: 50,
    marginRight: 10,
  },
});

const textScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  songBlock: {
    marginBottom: 20,
    backgroundColor: "#e0e0e0",
    padding: 10,
    borderRadius: 8,
  },
  songTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#333",
  },
  artist: {
    fontSize: 16,
    color: "#666",
    marginBottom: 5,
  },
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollContainer: {
    padding: 20,
  },
  lyrics: {
    fontSize: 16,
    lineHeight: 24,
    textAlign: "center",
    color: "#333",
  },
});

export default SearchScreen;
