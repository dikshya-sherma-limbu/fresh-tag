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

  // Show the current date labels when the component mounts
  useEffect(() => {
    const fetchCurrentDateLabels = async () => {
      try {
        const response = await getCurrentDateLabels();
        console.log("Current date labels fetched successfully:", response);
        //if response is not null, set labels to the response data
        if (response) {
          setLabels(response.data);
        }
      } catch (error) {
        console.error("Error fetching current date labels:", error);
      }
    };
    fetchCurrentDateLabels();
  }, []);

  //handle all labels
  const handleAllLabels = async () => {
    // Fetch all labels from the API
    try {
      const response = await getAllLabels();
      //if response is not null, set labels to the response data
      if (response) {
        setLabels(response.data);
      }
    } catch (error) {
      console.error("Error fetching labels:", error);
    }
    console.log("All Labels");
  };
  //handle expired labels
  const handleExpiredLabels = async () => {
    // Fetch all labels from the API
    try {
      const response = await getExpiredLabels();
      //if response is not null, set labels to the response data
      if (response) {
        setLabels(response.data);
      }
    } catch (error) {
      console.error("Error fetching labels:", error);
    }
    console.log("Expired Labels");
  };

  //handle active labels
  const handleActiveLabels = async () => {
    // Fetch all labels from the API
    try {
      const response = await getActiveLabels();
      //if response is not null, set labels to the response data
      if (response) {
        setLabels(response.data);
      }
    } catch (error) {
      console.error("Error fetching labels:", error);
    }
    console.log("Active Labels");
  };

  return (
    <View style={styles.historyContainer}>
      <Navbar />

      <View style={styles.headerContainer}>
        <CustomButton
          title="Active"
          onPress={() => {
            handleActiveLabels();
          }}
        />
        <CustomButton
          title="Expired"
          onPress={() => {
            handleExpiredLabels();
          }}
        />
        <CustomButton
          title="All"
          onPress={() => {
            handleAllLabels();
          }}
        />
      </View>
      <View style={styles.labelContainer}>
        <Label labels={labels} />
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
  },
  label: {
    borderWidth: 2,
    borderRadius: 10,
    padding: 10,
    borderColor: "#ccc",
    backgroundColor: "#86AB89",
  },
});
