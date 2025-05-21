import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import Navbar from "@/components/Navbar";
import LabelForm from "@/components/LabelForm";
import RecentLabel from "@/components/RecentLabel";
import { useTheme } from "@/context/theme-context/themeContext";
const DashboardIndex = () => {
  const { theme } = useTheme(); // Get the theme from the context
  const styles = StyleSheet.create({
    indexContainer: {
      alignItems: "center",
      flex: 1,
      backgroundColor: theme.colors.primary,
    },
  });

  return (
    <View style={styles.indexContainer}>
      <Navbar />
      <LabelForm />
      <RecentLabel />
    </View>
  );
};

export default DashboardIndex;
