import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";

// Screens
import HomeScreen from "./src/screens/HomeScreen";
import SearchScreen from "./src/screens/SearchScreen";
import FavoriteScreen from "./src/screens/FavoriteScreen";
import AboutScreen from "./src/screens/AboutScreen";
import DetailScreen from "./src/screens/DetailScreen";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export default function App() {
  function MainTabs() {
    return (
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerStyle: { backgroundColor: "#021A54" },
          headerTintColor: "#FFF",
          tabBarStyle: { backgroundColor: "#FFCEE3", height: 65, paddingBottom: 8 },
          tabBarActiveTintColor: "#021A54",
          tabBarInactiveTintColor: "#555",
          tabBarIcon: ({ color, size }) => {
            if (route.name === "Home") return <MaterialCommunityIcons name="home" color={color} size={size} />;
            if (route.name === "Search") return <MaterialCommunityIcons name="magnify" color={color} size={size} />;
            if (route.name === "Favorite") return <MaterialCommunityIcons name="library" color={color} size={size} />;
            if (route.name === "Profile") return <MaterialCommunityIcons name="account-circle" color={color} size={size} />;
          },
        })}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Search" component={SearchScreen} />
        <Tab.Screen name="Favorite" component={FavoriteScreen} />
        <Tab.Screen name="Profile" component={AboutScreen} />
      </Tab.Navigator>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerStyle: { backgroundColor: "#021A54" }, headerTintColor: "#FFF" }}>
        <Stack.Screen name="MainTabs" component={MainTabs} options={{ headerShown: false }} />
        <Stack.Screen name="Detail" component={DetailScreen} options={{ title: "Detail Buku" }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}