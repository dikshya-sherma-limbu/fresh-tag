import {
  StyleSheet,
  View,
  Pressable,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import React, { useState } from "react";
import DropDownPicker from "react-native-dropdown-picker";
import CustomButton from "./Button";
import { Ionicons } from "@expo/vector-icons"; // Make sure to install this package

export default function LabelForm() {
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState<"date" | "time">("date");
  const [show, setShow] = useState(false);

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
    { label: "Cool", value: "cool" },
    { label: "Dry", value: "dry" },
  ]);

  const packageTypeDropdown = userDropDown([
    { label: "Box", value: "box" },
    { label: "Bottle", value: "bottle" },
  ]);

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      month: "numeric",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <View style={styles.formContainer}>
      <Text style={styles.text}>Create Label</Text>
      <TextInput placeholder="Label Name" style={styles.inputText} />
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
        <CustomButton title="Create" onPress={() => {}} />
        <CustomButton title="Clear" onPress={() => {}} />
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

const styles = StyleSheet.create({
  formContainer: {
    width: "90%",
    backgroundColor: "#88AF8F",
    marginTop: 50,
    marginBottom: 0,
    borderRadius: 10,
    padding: 15,
  },
  text: {
    color: "#116211",
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
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    alignSelf: "center",
    backgroundColor: "#FFFFFF",
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
    borderColor: "#ccc",
    borderRadius: 5,
    paddingHorizontal: 10,
    color: "#116211",
    backgroundColor: "#FFFFFF",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  dateButtonText: {
    color: "#666",
    fontSize: 14,
  },
  buttonContainer: {
    flexDirection: "row-reverse",
    gap: 10,
    marginBottom: 20,
  },
});
