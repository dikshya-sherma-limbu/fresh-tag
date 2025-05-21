//base theme colors
export interface ThemeColors {
  // Base colors
  primary: string;
  background: string;
  card: string;
  text: string;
  subText: string;
  border: string;
  shadow: string;

  // Component-specific colors
  buttonBackground: string;
  buttonText: string;
  buttonDisabledBackground: string;
  buttonDisabledText: string;
  inputBackground: string;
  greenBlock: string; // For your green header/form backgrounds
  profileBackground: string; // For profile background
  toggleActiveBackground: string; // For toggle active background
  toggleInActiveBackground: string; // For toggle background
}

// Theme interface
export interface Theme {
  dark: boolean;
  colors: ThemeColors;
}

// Theme for light mode
export const LightTheme: Theme = {
  dark: false,
  colors: {
    primary: "whitesmoke",
    background: "#FFFFFF",
    card: "#F5F5F5",
    text: "#000000",
    subText: "#8A8A8A",
    border: "#E8E8E8",
    shadow: "#000000",

    buttonBackground: "#FFFFFF",
    buttonText: "#116211",
    buttonDisabledBackground: "#F5F5F5",
    buttonDisabledText: "#8A8A8A",
    inputBackground: "#FFFFFF",
    greenBlock: "#8FBC8F",
    profileBackground: "#E4E4E4", // For profile background
    toggleActiveBackground: "#88AF8F", // For toggle active background
    toggleInActiveBackground: "#555", // For toggle background
  },
};

// Theme for dark mode
export const DarkTheme: Theme = {
  dark: true,
  colors: {
    primary: "#4CAF50",
    background: "#121212",
    card: "#1E1E1E",
    text: "#FFFFFF",
    subText: "#B0B0B0",
    border: "#2C2C2C",
    shadow: "#000000",

    buttonBackground: "#1E1E1E",
    buttonText: "#4CAF50",
    buttonDisabledBackground: "#2C2C2C",
    buttonDisabledText: "#707070",
    inputBackground: "#2C2C2C",
    greenBlock: "#1E5C1E",
    profileBackground: "#2C2C2C", // For profile background
    toggleActiveBackground: "#4CAF50", // For toggle active background
    toggleInActiveBackground: "#fff", // For toggle background
  },
};
