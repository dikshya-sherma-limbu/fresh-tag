import { router, Slot } from "expo-router";
import { useEffect, useState } from "react";
import * as SplashScreen from "expo-splash-screen";
import { useFonts } from "expo-font";
import { ThemeProvider, DefaultTheme } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { useAuth } from "../context/auth-context/authContext";

SplashScreen.preventAutoHideAsync();

function RootLayoutContent() {
  const { isAuthenticated, isLoading } = useAuth();
  const [fontsLoaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    if (fontsLoaded && !isLoading) {
      setAppIsReady(true);
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, isLoading]);
  console.log("Rendering test component");
  console.log("isAuthenticated:", isAuthenticated);
  useEffect(() => {
    if (appIsReady) {
      if (isAuthenticated) {
        router.replace("/(dashboard)");
      } else {
        router.replace("/(auth)/login");
      }
    }
  }, [appIsReady, isAuthenticated]);

  if (!appIsReady) return null;

  return (
    <ThemeProvider value={DefaultTheme}>
      <Slot />
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}

import { AuthProvider } from "../context/auth-context/authContext";
export default function RootLayout() {
  return (
    <AuthProvider>
      <RootLayoutContent />
    </AuthProvider>
  );
}
