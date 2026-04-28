import React, { useState } from "react";
import { View, Text, TextInput, FlatList, TouchableOpacity, ActivityIndicator, StyleSheet } from "react-native";
import { searchBooks } from "../api/openLibrary";
import BookCard from "../components/BookCard";

export default function SearchScreen({ navigation }) {
  const [keyword, setKeyword] = useState("");
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = async () => {
    if (keyword.trim() === "") { setError("Kolom pencarian tidak boleh kosong."); setBooks([]); return; }
    if (keyword.trim().length < 3) { setError("Kata kunci minimal 3 karakter."); setBooks([]); return; }

    try {
      setLoading(true); setError(""); setHasSearched(true);
      const data = await searchBooks(keyword);
      setBooks(data);
      if (data.length === 0) setError("Buku tidak ditemukan");
    } catch (err) {
      console.log(err);
      setError("Tidak terkoneksi jaringan");
      setBooks([]);
    } finally { setLoading(false); }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cari Buku</Text>
      <TextInput
        style={styles.input}
        placeholder="Masukkan judul buku..."
        value={keyword}
        onChangeText={setKeyword}
      />
      <TouchableOpacity style={styles.button} onPress={handleSearch}>
        <Text style={styles.buttonText}>Cari </Text>
      </TouchableOpacity>
      {error ? <Text style={styles.error}>{error}</Text> : null}
      {loading ? <ActivityIndicator size="large" color="#021A54" style={{ marginTop: 20 }} /> : (
        <FlatList
          data={books}
          keyExtractor={(item) => item.key}
          renderItem={({ item }) => (
            <BookCard
              book={item}
              onPress={() => navigation.navigate("Detail", { book: item })}
            />
          )}
          ListEmptyComponent={!hasSearched ? <Text style={styles.empty}>Masukkan kata kunci untuk mencari buku.</Text> : null}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFF5FA", paddingTop: 16 },
  title: { fontSize: 26, color: "#021A54", marginHorizontal: 16, marginBottom: 12 },
  input: { backgroundColor: "#FFF", marginHorizontal: 16, padding: 14, borderRadius: 12, borderWidth: 2, borderColor: "#FFCEE3" },
  button: { backgroundColor: "#021A54", marginHorizontal: 16, marginTop: 10, padding: 14, borderRadius: 12, alignItems: "center" },
  buttonText: { color: "#FFF", fontSize: 16, textAlign: "center" },
  error: { color: "red", marginHorizontal: 16, marginTop: 10 },
  empty: { textAlign: "center", color: "#555", marginTop: 30 },
});