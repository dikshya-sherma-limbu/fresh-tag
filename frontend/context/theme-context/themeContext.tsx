import React, { createContext, useContext, useState, useEffect } from "react";

import { Appearance, ColorSchemeName } from "react-native";
import * as SecureStore from "expo-secure-store";
import { Theme } from "../../types/theme";
import { LightTheme, DarkTheme } from "../../types/theme";

//theme context type

type ThemeContextType = {
  theme: Theme;
  isDark: boolean;
  toogleTheme: () => void;
  setTheme: (scheme: "dark" | "light") => void;
};

//create context with default values
const ThemeContext = createContext<ThemeContextType>({
  theme: LightTheme,
  isDark: false,
  toogleTheme: () => {},
  setTheme: () => {},
});

const THEME_PREFERENCE_KEY = "user_theme_preference"; // Key for storing theme preference

// ThemeProvider component
export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  //Get the device color scheme
  const deviceColorScheme = Appearance.getColorScheme();

  const [theme, setTheme] = useState<Theme>(
    deviceColorScheme === "dark" ? DarkTheme : LightTheme
  ); // Set initial theme based on device color scheme

  //Load saved theme preference from secure store when the app starts
  useEffect(() => {
    const loadThemePreference = async () => {
      try {
        const savedTheme = await SecureStore.getItemAsync(THEME_PREFERENCE_KEY);
        if (savedTheme !== null) {
          setTheme(savedTheme === "dark" ? DarkTheme : LightTheme);
        }
      } catch (error) {
        console.error("Error loading theme preference:", error);
      }
    };
    loadThemePreference();
  }, []);

  // Listen for changes in the device color scheme
  useEffect(() => {
    const subscription = Appearance.addChangeListener(({ colorScheme }) => {
      //only set the theme if the user has not set a preference
      SecureStore.getItemAsync(THEME_PREFERENCE_KEY).then((savedTheme) => {
        if (savedTheme === null && colorScheme) {
          setTheme(colorScheme === "dark" ? DarkTheme : LightTheme);
        }
      });
    });
    return () => {
      subscription.remove();
    };
  }, []);

  //Toggle theme between light and dark
  const toggleTheme = async () => {
    const newTheme = theme.dark ? LightTheme : DarkTheme;
    setTheme(newTheme);
    //save the new theme preference to secure store
    try {
      await SecureStore.setItemAsync(
        THEME_PREFERENCE_KEY,
        newTheme.dark ? "dark" : "light"
      );
    } catch (error) {
      console.error("Error saving theme preference:", error);
    }
  };
  // set the specific theme based on the scheme
  const changeTheme = async (scheme: "dark" | "light") => {
    const newTheme = scheme === "dark" ? DarkTheme : LightTheme;
    setTheme(newTheme);
    // Save the preference
    try {
      await SecureStore.setItemAsync(THEME_PREFERENCE_KEY, scheme);
    } catch (error) {
      console.error("Failed to save theme preference", error);
    }
  };

  return (
    <ThemeContext.Provider
      value={{
        theme,
        isDark: theme.dark,
        toogleTheme: toggleTheme,
        setTheme: changeTheme,
      }}
    >
      {/* Pass the theme to the children components */}
      {children}
    </ThemeContext.Provider>
  );
};

// Custom hook to use the ThemeContext
export const useTheme = () => useContext(ThemeContext);
