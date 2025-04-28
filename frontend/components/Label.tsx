import { View, Text, StyleSheet, FlatList, Platform } from "react-native";

import { expiryLabelType } from "@/types/expiryLabel";

export default function Label({ labels }: { labels: expiryLabelType[] }) {
  if (labels.length === 0) {
    //if no labels, show a message
    console.log("No labels found.");
    return (
      <View style={styles.innerContainer}>
        <Text style={styles.text}>No labels found.</Text>
      </View>
    );
  }
  // Combine styles with platform-specific shadow
  const labelStyles = [
    styles.label,
    Platform.OS === "android" ? styles.androidShadow : styles.iosShadow,
  ];
  // Render an individual label item
  const renderItem = ({ item }: { item: expiryLabelType }) => (
    <View style={labelStyles}>
      <View style={styles.label}>
        <View style={styles.labelHeader}>
          <Text style={styles.text}>{item.foodName}</Text>
          <Text style={styles.text}>
            {item.bestBefore ? item.bestBefore.toString() : "N/A"}
          </Text>
        </View>
        <Text style={styles.text}>{item.additionalInfo}</Text>
      </View>
    </View>
  );

  return (
    <FlatList
      data={labels}
      renderItem={renderItem}
      keyExtractor={(item) => item._id}
      contentContainerStyle={styles.listContainer}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
    />
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
  listContainer: {
    flexGrow: 1,
  },
  separator: {
    height: 20, // This creates the gap between items
  },
  label: {
    borderWidth: 2,
    borderRadius: 10,
    padding: 10,
    borderColor: "#ccc",
    backgroundColor: "#E8E8E8",
  },
  // Specific shadow styles for Android
  androidShadow: {
    elevation: 10,
  },
  // Specific shadow styles for iOS
  iosShadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },

    shadowOpacity: 0.5,
    shadowRadius: 5,
  },
  labelHeader: {
    justifyContent: "space-between",
    flexDirection: "row",
  },
});
