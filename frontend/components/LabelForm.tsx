import {
  StyleSheet,
  View,
  Pressable,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import React, { useState } from "react";
import DropDownPicker from "react-native-dropdown-picker";
import CustomButton from "./Button";
import { Ionicons } from "@expo/vector-icons";
import { createLabel } from "@/services/label-services/labelService";
import { useTheme } from "@/context/theme-context/themeContext";

export default function LabelForm() {
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState<"date" | "time">("date");
  const [show, setShow] = useState(false);
  const [foodName, setFoodName] = useState<string>("");

  const { theme } = useTheme(); // Get the theme from the context

  // Create styles based on  current theme
  const styles = StyleSheet.create({
    formContainer: {
      width: "90%",
      backgroundColor: theme.colors.background,
      marginTop: 50,
      marginBottom: 0,
      borderRadius: 10,
      padding: 15,
    },
    text: {
      color: theme.colors.text,
      fontFamily: "sans-serif",
      fontSize: 15,
      textAlign: "left",
    },
    inputText: {
      width: "100%",
      minWidth: 300,
      height: 45,
      borderWidth: 1,
      marginTop: 20,
      marginBottom: 20,
      borderColor: theme.colors.border,

      borderRadius: 5,
      padding: 10,
      alignSelf: "center",
      backgroundColor: theme.colors.inputBackground,
      color: theme.colors.text,
    },
    //for placeholder
    placeholder: {
      color: theme.colors.text,
    },
    innerContainer: {
      flexDirection: "row",
      justifyContent: "space-around",
      gap: 10,
      marginBottom: 20,
    },
    date: {
      width: "100%",
      height: 45,
      borderWidth: 1,
      borderColor: theme.colors.border,
      borderRadius: 5,
      paddingHorizontal: 10,
      color: theme.colors.text,
      backgroundColor: theme.colors.inputBackground,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    },
    dateButtonText: {
      color: theme.colors.text,
      fontSize: 14,
    },
    buttonContainer: {
      flexDirection: "row-reverse",
      gap: 10,
      marginBottom: 20,
    },
  });

  // For the DateTimePicker
  interface DateChangeEvent {
    type: string;
    nativeEvent: {
      timestamp: number;
    };
  }

  const onChange = (
    event: DateChangeEvent,
    selectedDate: Date | undefined
  ): void => {
    const currentDate = selectedDate || date;
    setShow(false);
    setDate(currentDate);
  };

  const showMode = (currentMode: "date" | "time"): void => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode("date");
  };

  // For the Drop DownPicker
  const userDropDown = (initialItems: { label: string; value: string }[]) => {
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState(initialItems);

    return {
      open,
      setOpen,
      value,
      setValue,
      items,
      setItems,
    };
  };

  const preservativesDropdown = userDropDown([
    { label: "Yes", value: "true" },
    { label: "No", value: "false" },
  ]);

  const storageDropdown = userDropDown([
    { label: "Fridge", value: "Fridge" },
    { label: "Pantry", value: "Pantry" },
    { label: "Freezer", value: "Freezer" },
  ]);

  const packageTypeDropdown = userDropDown([
    { label: "Plastic Wrap", value: "Plastic Wrap" },
    { label: "Ziploc", value: "Ziploc" },
    { label: "Open Plate", value: "Open Plate" },
    { label: "Glass Jar", value: "Glass Jar" },
  ]);

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      month: "numeric",
      day: "numeric",
      year: "numeric",
    });
  };

  // Function to handle the creation of the label
  const handleCreateLabel = async () => {
    try {
      if (
        !foodName ||
        preservativesDropdown.value === null ||
        storageDropdown.value === null ||
        packageTypeDropdown.value === null ||
        !date
      ) {
        // Check if all fields are filled
        Alert.alert("Error", "Please fill  all fields");
        return;
      }
      const labelData = {
        foodName,
        preparationDate: date,
        preservative: preservativesDropdown.value,
        storageMethod: storageDropdown.value,
        packageType: packageTypeDropdown.value,
      };
      console.log("Label data:", labelData);
      // Call the createLabel function from the labelService
      const response = await createLabel(labelData);
      if (response.status !== 201) {
        console.error("Response error:", response);
        Alert.alert("Error", "Failed to create label");
        return;
      }
      // then handle the response as needed

      console.log("Label created successfully:", response);
    } catch (error) {
      console.error("Error creating label:", error);
    } finally {
      // finally clear the form
      onClear();
      Alert.alert("Success", "Label created successfully!");
    }
  };

  // clear the form
  const onClear = () => {
    setDate(new Date()); // Reset date to current date
    setFoodName(""); // Reset food name to empty string
    preservativesDropdown.setValue(null);
    storageDropdown.setValue(null);
    packageTypeDropdown.setValue(null);
  };
  return (
    <View style={styles.formContainer}>
      <Text style={styles.text}>Create Label</Text>
      <TextInput
        placeholder="Label Name"
        style={styles.inputText}
        value={foodName} // Bind the input value to the state
        onChangeText={(text) => setFoodName(text)} // Update the state with the input value
      />
      <View style={styles.innerContainer}>
        <View style={{ flex: 1 }}>
          <TouchableOpacity
            onPress={showDatepicker}
            style={styles.date}
            activeOpacity={0.7}
          >
            <Text style={styles.dateButtonText}>
              {date ? formatDate(date) : "Select Date"}
            </Text>
            <Ionicons name="calendar-outline" size={18} color="#666" />
          </TouchableOpacity>
        </View>
        <View style={{ flex: 1 }}>
          <DropDownPicker
            placeholder="Preservative"
            open={preservativesDropdown.open}
            value={preservativesDropdown.value}
            items={preservativesDropdown.items}
            setOpen={preservativesDropdown.setOpen}
            setValue={preservativesDropdown.setValue}
            setItems={preservativesDropdown.setItems}
            style={styles.date}
            dropDownDirection="TOP"
          />
        </View>
      </View>
      <View style={styles.innerContainer}>
        <View style={{ flex: 1 }}>
          <DropDownPicker
            placeholder="Storage Type"
            open={storageDropdown.open}
            value={storageDropdown.value}
            items={storageDropdown.items}
            setOpen={storageDropdown.setOpen}
            setValue={storageDropdown.setValue}
            setItems={storageDropdown.setItems}
            style={styles.date}
          />
        </View>
        <View style={{ flex: 1 }}>
          <DropDownPicker
            placeholder="Package Type"
            open={packageTypeDropdown.open}
            value={packageTypeDropdown.value}
            items={packageTypeDropdown.items}
            setOpen={packageTypeDropdown.setOpen}
            setValue={packageTypeDropdown.setValue}
            setItems={packageTypeDropdown.setItems}
            style={styles.date}
          />
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <CustomButton
          title="Create"
          onPress={() => {
            handleCreateLabel();
          }}
        />
        <CustomButton title="Clear" onPress={() => onClear()} />
      </View>
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={mode}
          is24Hour={true}
          onChange={onChange}
        />
      )}
    </View>
  );
}
