import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";
import Navbar from "@/components/Navbar";
import LabelForm from "@/components/LabelForm";
import RecentLabel from "@/components/RecentLabel";

const DashboardIndex = () => {
  return (
    <View style={styles.indexContainer}>
      <Navbar />
      <LabelForm />
      <RecentLabel
        Labels={[
          {
            id: 1,
            foodName: "Apple",
            bestBefore: "2023-10-01",
            additionalInfo: "Keep in a cool place",
          },
          {
            id: 2,
            foodName: "Banana",
            bestBefore: "2023-10-05",
            additionalInfo: "Store at room temperature",
          },
        ]}
      />
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
