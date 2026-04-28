import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";

export default function BookCard({ book, onPress, showRemove, onRemove }) {
  const coverUrl = book.cover_edition_key
    ? `https://covers.openlibrary.org/b/olid/${book.cover_edition_key}-M.jpg`
    : book.cover_i
    ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
    : null;

  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <View style={styles.imageBox}>
        {coverUrl ? (
          <Image source={{ uri: coverUrl }} style={styles.cover} />
        ) : (
          <View style={styles.noCover}>
            <Text style={styles.noCoverText}>No Cover</Text>
          </View>
        )}
      </View>
      <View style={styles.info}>
        <Text style={styles.title}>{book.title || "-"}</Text>
        <Text style={styles.author}>{book.author_name ? book.author_name.join(", ") : "-"}</Text>
        <Text style={styles.year}>{book.first_publish_year || "-"}</Text>
        {showRemove && (
          <TouchableOpacity onPress={onRemove}>
            <Text style={styles.remove}>Hapus</Text>
          </TouchableOpacity>
        )}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: { flexDirection: "row", backgroundColor: "#FFF", borderRadius: 12, borderWidth: 2, borderColor: "#FFCEE3", marginHorizontal: 16, marginVertical: 8, padding: 10 },
  imageBox: { marginRight: 12 },
  cover: { width: 80, height: 120, borderRadius: 8 },
  noCover: { width: 80, height: 120, backgroundColor: "#FFCEE3", justifyContent: "center", alignItems: "center", borderRadius: 8 },
  noCoverText: { color: "#021A54", fontWeight: "bold" },
  info: { flex: 1, justifyContent: "center" },
  title: { fontSize: 16, color: "#021A54" },
  author: { fontSize: 14, color: "#333", marginTop: 4 },
  year: { fontSize: 13, color: "#555", marginTop: 2 },
  remove: { color: "#B91C1C", marginTop: 6 },
});