import React, { useEffect, useState } from "react";
import { View, Text, Image, ScrollView, TouchableOpacity, ActivityIndicator, StyleSheet } from "react-native";
import { getBookDetail, getCoverUrl, getAuthorText } from "../api/openLibrary";
import useFavoriteStore from "../store/favoriteStore";

export default function DetailScreen({ route }) {
  const { book } = route.params;
  const [detail, setDetail] = useState(null);
  const [loading, setLoading] = useState(true);

  const store = useFavoriteStore();
  const isFavorite = store.isFavorite(book.key);

  const coverUrl = getCoverUrl(book);

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const data = await getBookDetail(book.key);
        setDetail(data);
      } catch {
        setDetail(null);
      } finally {
        setLoading(false);
      }
    };
    fetchDetail();
  }, []);

  const handleFavorite = () => {
    if (isFavorite) store.removeFavorite(book.key);
    else store.addFavorite(book);
  };

  const description = typeof detail?.description === "string" ? detail.description : detail?.description?.value || "Deskripsi tidak tersedia.";

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        {coverUrl ? (
          <Image source={{ uri: coverUrl }} style={styles.cover} />
        ) : (
          <View style={styles.noCover}>
            <Text style={styles.noCoverText}>No Cover</Text>
          </View>
        )}
        <Text style={styles.title}>{book.title}</Text>
        <TouchableOpacity
          style={[styles.button, isFavorite && styles.removeButton]}
          onPress={handleFavorite}
        >
          <Text style={styles.buttonText}>
            {isFavorite ? "Hapus dari Favorit" : "Tambah ke Favorite"}
          </Text>
        </TouchableOpacity>
        {loading ? (
          <ActivityIndicator size="large" color="#021A54" />
        ) : (
          <View style={styles.box}>
            {[
              ["Judul", book.title || "-"],
              ["Penulis", getAuthorText(book)],
              ["Tahun Terbit", book.first_publish_year || "-"],
              ["Jumlah Edisi", book.edition_count || "-"],
              ["Bahasa", book.language ? book.language.join(", ") : "-"],
              ["Publisher", book.publisher ? book.publisher.slice(0, 5).join(", ") : "-"],
              ["Subjek", book.subject ? book.subject.slice(0, 8).join(", ") : "-"],
              ["Deskripsi", description]
            ].map(([label, value], idx) => (
              <View key={idx} style={{ marginTop: idx === 0 ? 0 : 12 }}>
                <Text style={styles.label}>{label}:</Text>
                <Text style={styles.value}>{value}</Text>
              </View>
            ))}
          </View>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFF5FA" },
  content: { padding: 20, alignItems: "center" },
  cover: { width: 160, height: 230, borderRadius: 16, backgroundColor: "#FFCEE3" },
  noCover: { width: 160, height: 230, backgroundColor: "#FFCEE3", justifyContent: "center", alignItems: "center", borderRadius: 16 },
  noCoverText: { color: "#021A54", fontWeight: "bold" },
  title: { fontSize: 24, color: "#021A54", textAlign: "center", marginTop: 16 },
  button: { backgroundColor: "#021A54", padding: 14, borderRadius: 14, width: "100%", alignItems: "center", marginTop: 16, marginBottom: 20 },
  removeButton: { backgroundColor: "#B91C1C" },
  buttonText: { color: "#FFF", fontSize: 16 },
  box: { backgroundColor: "#FFF", width: "100%", padding: 16, borderRadius: 16, borderWidth: 2, borderColor: "#FFCEE3" }, 
  label: { color: "#021A54", fontWeight: "bold", marginTop: 10 },
  value: { color: "#333", marginTop: 4, lineHeight: 20 },
});