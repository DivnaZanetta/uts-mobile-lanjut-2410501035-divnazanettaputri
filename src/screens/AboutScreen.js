import React from "react";
import { View, Text, Image, StyleSheet, ScrollView } from "react-native";

export default function AboutScreen() {
  const nama = "Divna Zanetta";
  const nim = "2410501035 ";
  const avatar = require("../../assets/profile.png");

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Image source={avatar} style={styles.avatar} />
        <Text style={styles.name}>{nama}</Text>
        <Text style={styles.nim}>NIM:{nim} </Text>

        <Text style={styles.subtitle}>Tentang</Text>
        <Text style={styles.text}>
          BookShelf adalah aplikasi katalog buku sederhana yang dibuat untuk memenuhi tugas UTS Mobile Programming.
        </Text>
        <Text style={styles.text}>
          Aplikasi ini menggunakan API Open Library untuk menampilkan daftar buku trending, mencari buku, melihat detail buku, menambahkan buku ke favorit, dan menghapus buku dari favorit.
        </Text>

        <View style={styles.infoBox}>
          <Text style={styles.infoText}>Tema: Tema C - BookShelf</Text>
          <Text style={styles.infoText}>API: Open Library</Text>
          <Text style={styles.infoText}>Framework: React Native Expo</Text>
          <Text style={styles.infoText}>State Management: Zustand</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFF5FA" },
  content: { padding: 20, alignItems: "center" },
  avatar: { width: 120, height: 120, borderRadius: 60, borderWidth: 2, borderColor: "#FFCEE3" },
  name: { fontSize: 22, fontWeight: "bold", color: "#021A54", marginTop: 12 },
  nim: { fontSize: 16, color: "#021A54", marginTop: 4 },
  subtitle: { fontSize: 18, fontWeight: "bold", color: "#021A54", marginTop: 20, alignSelf: "flex-start" },
  text: { fontSize: 14, color: "#333", marginTop: 6, textAlign: "justify" },
  infoBox: { marginTop: 16, padding: 12, backgroundColor: "#FFF", borderRadius: 12, borderWidth: 2, borderColor: "#FFCEE3", width: "100%" },
  infoText: { fontSize: 14, color: "#021A54", marginVertical: 2 },
});