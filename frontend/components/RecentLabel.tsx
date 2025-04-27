import { View, Text, StyleSheet } from "react-native";
import { useEffect, useState } from "react";
import { expiryLabelType } from "@/types/expiryLabel";
import Label from "./Label";
export default function RecentLabel({ Labels }: { Labels: expiryLabelType[] }) {
  const [recentLabels, setRecentLabels] = useState<expiryLabelType[]>(
    Labels || []
  );
  const [loading, setLoading] = useState(false);
  return (
    <View style={styles.recentLabelContainer}>
      <Text style={styles.headerText}>Recent Labels</Text>
      <Label labels={recentLabels} />
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
