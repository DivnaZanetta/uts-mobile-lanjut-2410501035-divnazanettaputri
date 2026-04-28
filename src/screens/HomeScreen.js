import React, { useEffect, useState } from "react";
import { View, FlatList, Text, ActivityIndicator, RefreshControl, StyleSheet } from "react-native";
import { getTrendingBooks } from "../api/openLibrary";
import BookCard from "../components/BookCard";

export default function HomeScreen({ navigation }) {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState("");

  const fetchBooks = async () => {
    try {
      setError("");
      const data = await getTrendingBooks();
      setBooks(data);
    } catch (err) {
      console.log(err);
      setError("Tidak terkoneksi jaringan");
      setBooks([]);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => { fetchBooks(); }, []);
  const onRefresh = () => { setRefreshing(true); fetchBooks(); };

  if (loading) return (
    <View style={styles.center}>
      <ActivityIndicator size="large" color="#021A54" />
      <Text style={styles.loadingText}>Memuat data buku...</Text>
    </View>
  );

  if (error) return (
    <View style={styles.center}>
      <Text style={styles.errorText}>{error}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={books}
        keyExtractor={(item) => item.key}
        renderItem={({ item }) => (
          <BookCard
            book={item}
            onPress={() => navigation.navigate("Detail", { book: item })}
          />
        )}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        ListHeaderComponent={
          <View style={styles.headerBox}>
            <Text style={styles.headerTitle}>BookShelf</Text>
            <Text style={styles.headerSubtitle}>Katalog buku trending dari Open Library</Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFF5FA" },
  center: { flex: 1, justifyContent: "center", alignItems: "center", padding: 20, backgroundColor: "#FFF5FA" },
  loadingText: { marginTop: 12, color: "#021A54", fontWeight: "bold" },
  errorText: { color: "red", fontSize: 16, textAlign: "center" },
  headerBox: { backgroundColor: "#021A54", padding: 20, borderBottomLeftRadius: 24, borderBottomRightRadius: 24, marginBottom: 10 },
  headerTitle: { color: "#FFCEE3", fontSize: 30, fontWeight: "bold" },
  headerSubtitle: { color: "#FFF", fontSize: 15, marginTop: 6 },
});