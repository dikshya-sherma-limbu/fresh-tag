import { View, Text, StyleSheet } from "react-native";
import { useEffect, useState } from "react";

interface Label {
  id: number;
  foodName: string;
  bestBefore: string;
  additionalInfo: string;
}

export default function RecentLabel({ Labels }: { Labels: Label[] }) {
  const [recentLabels, setRecentLabels] = useState<Label[]>(Labels || []);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setRecentLabels(Labels || []);
  }, [Labels]);
  if (Labels.length === 0) {
    return (
      <View style={styles.recentLabelContainer}>
        <Text style={styles.text}>No recent labels found.</Text>
      </View>
    );
  }
  return (
    <View style={styles.recentLabelContainer}>
      <Text style={styles.headerText}>Recent Labels</Text>
      <View style={styles.innerContainer}>
        {recentLabels.map((label) => (
          <View key={label.id} style={styles.label}>
            <Text style={styles.text}>Food Name: {label.foodName}</Text>
            <Text style={styles.text}>Best Before: {label.bestBefore}</Text>
            <Text style={styles.text}>
              Additional Info: {label.additionalInfo}
            </Text>
          </View>
        ))}
        {loading && <Text>Loading...</Text>}
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  recentLabelContainer: {
    backgroundColor: "#FFFFFF",
    marginTop: 50,
    padding: 15,
    width: "90%",
    borderRadius: 10,
  },
  innerContainer: {
    flexDirection: "column",
    justifyContent: "space-around",
    gap: 10,
  },

  headerText: {
    color: "#116211",
    fontFamily: "sans-serif",
    fontSize: 20,
    textAlign: "left",
    marginBottom: 10,
  },
  text: {
    color: "#F7F7F7",
    fontFamily: "sans-serif",
    fontSize: 15,
    textAlign: "left",
  },
  label: {
    borderWidth: 2,
    borderRadius: 10,
    padding: 10,
    borderColor: "#ccc",
    backgroundColor: "#86AB89",
  },
});
