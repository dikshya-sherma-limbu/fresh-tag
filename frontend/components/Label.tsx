import { View, Text, StyleSheet, FlatList, Platform } from "react-native";

import { expiryLabelType } from "@/types/expiryLabel";
import { useTheme } from "@/context/theme-context/themeContext";
export default function Label({ labels }: { labels: expiryLabelType[] }) {
  const { theme } = useTheme(); // Get the theme from the context

  // Create styles with the current theme
  const styles = StyleSheet.create({
    container: {},
    innerContainer: {
      flexDirection: "column",
      justifyContent: "space-around",
      gap: 20,
    },
    text: {
      color: theme.colors.text,
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
      borderColor: theme.colors.border,
      backgroundColor: theme.colors.background,
    },
    // Specific shadow styles for Android
    androidShadow: {
      elevation: 10,
    },
    // Specific shadow styles for iOS
    iosShadow: {
      shadowColor: theme.colors.shadow,
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
    <View style={styles.container}>
      <FlatList
        data={labels}
        renderItem={renderItem}
        keyExtractor={(item) => item._id}
        contentContainerStyle={styles.listContainer}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </View>
  );
}
