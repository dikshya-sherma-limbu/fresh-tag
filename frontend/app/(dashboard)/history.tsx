import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Navbar from "@/components/Navbar";
import { expiryLabelType } from "@/types/expiryLabel";
import CustomButton from "@/components/Button";
import Label from "@/components/Label";
import { useEffect, useState } from "react";
import { getAllLabels } from "@/services/label-services/labelService";
export default function History() {
  const [labels, setLabels] = useState<expiryLabelType[]>([]);
  const [loading, setLoading] = useState(false);
  //handle all labes
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
  return (
    <View style={styles.historyContainer}>
      <Navbar />

      <View style={styles.headerContainer}>
        <CustomButton title="Active" onPress={() => {}} />
        <CustomButton title="Expired" onPress={() => {}} />
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
