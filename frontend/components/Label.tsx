import { View, Text, StyleSheet } from "react-native";
import { useEffect, useState } from "react";

import { expiryLabelType } from "@/types/expiryLabel";

export default function Label({ labels }: { labels: expiryLabelType[] }) {
  const [Labels, setLabels] = useState<expiryLabelType[]>(labels || []);
  const [loading, setLoading] = useState(false);

  //set labels to the labels passed in as props
  useEffect(() => {
    setLoading(true); // Start loading when labels change

    const timeout = setTimeout(() => {
      if (labels) {
        setLabels(labels);
      }
      setLoading(false); // Done loading after setting labels
    }); // Fake 1 second loading delay (you can remove timeout in real use)

    return () => clearTimeout(timeout); // Cleanup
  }, [labels]);

  if (loading) {
    return (
      <View style={styles.innerContainer}>
        <Text style={styles.text}>Loading...</Text>
      </View>
    );
  }

  if (Labels.length === 0) {
    //if no labels, show a message
    console.log("No labels found.");
    return (
      <View style={styles.innerContainer}>
        <Text style={styles.text}>No labels found.</Text>
      </View>
    );
  }

  return (
    <View style={styles.innerContainer}>
      {Labels.map((label) => (
        <View key={label.id} style={styles.label}>
          <View style={styles.labelHeader}>
            <Text style={styles.text}>{label.foodName}</Text>
            <Text style={styles.text}>
              {label.bestBefore ? label.bestBefore.toString() : "N/A"}
            </Text>
          </View>

          <Text style={styles.text}>{label.additionalInfo}</Text>
        </View>
      ))}
    </View>
  );
}
const styles = StyleSheet.create({
  innerContainer: {
    flexDirection: "column",
    justifyContent: "space-around",
    gap: 20,
  },
  text: {
    color: "black",
    fontFamily: "sans-serif",
    fontSize: 15,
    textAlign: "left",
    padding: 4,
  },
  label: {
    borderWidth: 2,
    borderRadius: 10,
    padding: 10,
    borderColor: "#ccc",
    backgroundColor: "#E8E8E8",
    //shadow
    boxShadow: "10 7px 15px rgba(0, 0, 0, 0.2)",
  },
  labelHeader: {
    justifyContent: "space-between",
    flexDirection: "row",
  },
});
