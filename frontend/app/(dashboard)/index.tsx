import React, { useState, useEffect } from "react";
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
import { expiryLabelType } from "@/types/expiryLabel";
import { getRecentLabels } from "@/services/label-services/labelService";
const DashboardIndex = () => {
  const [labels, setLabels] = useState<expiryLabelType[]>([]);
  const [loading, setLoading] = useState(false);

  // Fetch recent labels when the component mounts
  useEffect(() => {
    const fetchRecentLabels = async () => {
      setLoading(true);
      try {
        const response = await getRecentLabels();
        console.log("Recent labels fetched successfully:", response);
        //if response is not null, set labels to the response data
        if (response) {
          setLabels(response.data);
        }
      } catch (error) {
        console.error("Error fetching recent labels:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchRecentLabels();
  }, []);
  if (loading) {
    return (
      <View style={styles.indexContainer}>
        <Navbar />
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.indexContainer}>
      <Navbar />
      <LabelForm />
      <RecentLabel Labels={labels} />
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
