import { router, Slot } from "expo-router";
import { useEffect, useState } from "react";
import * as SplashScreen from "expo-splash-screen";
import { useFonts } from "expo-font";
import { StatusBar } from "expo-status-bar";
import { useAuth } from "../context/auth-context/authContext";
import { AuthProvider } from "../context/auth-context/authContext";
import { NavigationContainer } from "@react-navigation/native";
import { useTheme, ThemeProvider } from "../context/theme-context/themeContext";
SplashScreen.preventAutoHideAsync();

function RootLayoutContent() {
  const { isUserValidated, isLoading } = useAuth();
  const [fontsLoaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  const { isDark, theme } = useTheme(); // Get the theme and isDark from the context

  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    if (fontsLoaded && !isLoading) {
      setAppIsReady(true);
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, isLoading]);
  console.log("Rendering test component");
  console.log("isAuthenticated:", isUserValidated);
  useEffect(() => {
    if (appIsReady) {
      if (isUserValidated) {
        console.log("User is authenticated, redirecting to dashboard");
        router.replace("/(dashboard)");
      } else {
        console.log("User is not authenticated, redirecting to login");
        router.replace("/(auth)/login");
      }
    }
  }, [appIsReady, isUserValidated]);

  if (!appIsReady) {
    console.log("App is not ready yet");
    return null;
  }

  return (
    <>
      <Slot />
      <StatusBar style={isDark ? "light" : "dark"} />
    </>
  );
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <RootLayoutContent />
      </ThemeProvider>
    </AuthProvider>
  );
}
