import { View, Text, StyleSheet } from "react-native";
import { useEffect, useState } from "react";
import { expiryLabelType } from "@/types/expiryLabel";
import { getRecentLabels } from "@/services/label-services/labelService";
import Label from "./Label";
import { isAuthenticated } from "@/services/auth-services/authService";
import { useTheme } from "@/context/theme-context/themeContext";
export default function RecentLabel() {
  const [labels, setLabels] = useState<expiryLabelType[]>([]);
  const [loading, setLoading] = useState(false);
  const { theme } = useTheme(); // Get the theme from the context

  // Create styles based on current theme
  const styles = StyleSheet.create({
    recentLabelContainer: {
      backgroundColor: theme.colors.background,
      marginTop: 50,
      padding: 15,
      width: "90%",
      borderRadius: 10,
      flex: 1, // Allow this container to expand
    },
    labelListContainer: {
      flex: 1, // This ensures the FlatList has room to scroll
    },
    innerContainer: {
      flexDirection: "column",
      justifyContent: "space-around",
      gap: 10,
    },

    headerText: {
      // color: "#116211",
      color: theme.colors.text,
      fontFamily: "sans-serif",
      fontSize: 20,
      textAlign: "left",
      marginBottom: 10,
    },
    text: {
      // color: "#F7F7F7",
      color: theme.colors.text,
      fontFamily: "sans-serif",
      fontSize: 15,
      textAlign: "left",
    },
    label: {
      borderWidth: 2,
      borderRadius: 10,
      padding: 10,
      // borderColor: "#ccc",
      // backgroundColor: "#86AB89",
      backgroundColor: theme.colors.background,
      borderColor: theme.colors.border,
    },
  });
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

    const checkAuthenticationAndFetch = async () => {
      if (await isAuthenticated()) {
        fetchRecentLabels();
      }
    };

    checkAuthenticationAndFetch();
  }, []);
  if (loading) {
    return (
      <View style={styles.recentLabelContainer}>
        <Text style={styles.headerText}>Loading...</Text>
      </View>
    );
  }
  return (
    <View style={styles.recentLabelContainer}>
      <Text style={styles.headerText}>Recent Labels</Text>
      <View style={styles.labelListContainer}>
        <Label labels={labels} />
      </View>
    </View>
  );
}
