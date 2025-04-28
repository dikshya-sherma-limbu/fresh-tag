import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Navbar from "@/components/Navbar";
import { expiryLabelType } from "@/types/expiryLabel";
import CustomButton from "@/components/Button";
import Label from "@/components/Label";
import { useEffect, useState } from "react";
import {
  getAllLabels,
  getActiveLabels,
  getExpiredLabels,
  getCurrentDateLabels,
} from "@/services/label-services/labelService";
export default function History() {
  const [labels, setLabels] = useState<expiryLabelType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Show the current date labels when the component mounts
  useEffect(() => {
    const fetchCurrentDateLabels = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await getCurrentDateLabels();

        if (response.success) {
          setLabels(response.data || []);
        } else {
          console.error(
            "Error fetching current date labels:",
            response.message
          );
          setError(response.message || "Failed to load labels");
        }
      } catch (error) {
        console.error("Unexpected error in current labels:", error);
        setError("An unexpected error occurred");
      } finally {
        setIsLoading(false);
      }
    };
    fetchCurrentDateLabels();
  }, []);

  //handle all labels
  const handleAllLabels = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await getAllLabels();

      if (response.success) {
        setLabels(response.data || []);
      } else {
        console.error("Error fetching all labels:", response.message);
        setError(response.message || "Failed to load labels");
      }
    } catch (error) {
      console.error("Unexpected error fetching all labels:", error);
      setError("An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  //handle expired labels
  const handleExpiredLabels = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await getExpiredLabels();

      if (response.success) {
        setLabels(response.data || []);
      } else {
        console.error("Error fetching expired labels:", response.message);
        setError(response.message || "Failed to load expired labels");
      }
    } catch (error) {
      console.error("Unexpected error fetching expired labels:", error);
      setError("An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  //handle active labels
  const handleActiveLabels = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await getActiveLabels();

      if (response.success) {
        setLabels(response.data || []);
      } else {
        console.error("Error fetching active labels:", response.message);
        setError(response.message || "Failed to load active labels");
      }
    } catch (error) {
      console.error("Unexpected error fetching active labels:", error);
      setError("An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.historyContainer}>
      <Navbar />

      <View style={styles.headerContainer}>
        <CustomButton
          title="Active"
          onPress={handleActiveLabels}
          disabled={isLoading}
        />
        <CustomButton
          title="Expired"
          onPress={handleExpiredLabels}
          disabled={isLoading}
        />
        <CustomButton
          title="All"
          onPress={handleAllLabels}
          disabled={isLoading}
        />
      </View>

      <View style={styles.labelContainer}>
        {isLoading ? (
          <Text style={styles.statusText}>Loading labels...</Text>
        ) : error ? (
          <Text style={styles.errorText}>{error}</Text>
        ) : labels.length > 0 ? (
          <Label labels={labels} />
        ) : (
          <Text style={styles.statusText}>No labels found</Text>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  historyContainer: {
    alignItems: "center",
    flex: 1,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginTop: 45,
  },
  headerText: {
    color: "#116211",
    fontFamily: "sans-serif",
    fontSize: 18,
    textAlign: "left",
    borderRadius: 10,
    padding: 8,
    backgroundColor: "#F5F5F5",
  },
  labelContainer: {
    backgroundColor: "#FFFFFF",
    marginTop: 50,
    padding: 15,
    width: "90%",
    borderRadius: 10,
    minHeight: 200,
    justifyContent: "center",
  },
  label: {
    borderWidth: 2,
    borderRadius: 10,
    padding: 10,
    borderColor: "#ccc",
    backgroundColor: "#86AB89",
  },
  statusText: {
    textAlign: "center",
    color: "#666",
    fontSize: 16,
  },
  errorText: {
    textAlign: "center",
    color: "#d32f2f",
    fontSize: 16,
  },
});
