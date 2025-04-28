import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import Navbar from "@/components/Navbar";
import LabelForm from "@/components/LabelForm";
import RecentLabel from "@/components/RecentLabel";

const DashboardIndex = () => {
  return (
    <View style={styles.indexContainer}>
      <Navbar />
      <LabelForm />
      <RecentLabel />
    </View>
  );
};

const styles = StyleSheet.create({
  indexContainer: {
    alignItems: "center",
    flex: 1,
  },
});

export default DashboardIndex;
