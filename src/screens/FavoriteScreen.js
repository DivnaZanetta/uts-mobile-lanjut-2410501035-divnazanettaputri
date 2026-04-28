import React from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import BookCard from "../components/BookCard";
import useFavoriteStore from "../store/favoriteStore";

export default function FavoriteScreen({ navigation }) {
  const store = useFavoriteStore();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Buku Favorit</Text>
      <FlatList
        data={store.favorites}
        keyExtractor={(item) => item.key}
        renderItem={({ item }) => (
          <BookCard
            book={item}
            showRemove={true}
            onRemove={() => store.removeFavorite(item.key)}
            onPress={() => navigation.navigate("Detail", { book: item })}
          />
        )}
        ListEmptyComponent={
          <Text style={styles.empty}>Belum ada buku favorit.</Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFF5FA" },
  title: { fontSize: 26, color: "#021A54", margin: 16 },
  empty: { textAlign: "center", color: "#555", marginTop: 40, fontSize: 16 },
});