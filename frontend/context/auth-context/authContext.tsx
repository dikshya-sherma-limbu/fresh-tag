import { createContext, useContext, useEffect, useState } from "react";
import {
  login as loginApi,
  getToken,
  User,
  LoginCredentials,
} from "../../services/auth-services/authService";

interface AuthContextType {
  isLoading: boolean;
  user: User | null;
  isAuthenticated: boolean;
  login: (credentials: LoginCredentials) => Promise<any>;
}

// Create a context for authentication state - this will be used to provide and consume authentication data throughout the app
const AuthContext = createContext<AuthContextType>({
  isLoading: true,
  user: null,
  isAuthenticated: false,
  login: async () => {},
});

export const useAuth = () => useContext(AuthContext); // Custom hook to use the AuthContext, providing a convenient way to access authentication state and actions

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  // State variables to manage authentication status, loading state, and user data
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkToken = async () => {
      const token = await getToken();
      if (token) {
        setIsAuthenticated(true);
        // Optionally fetch user data here
      }
      setIsLoading(false);
    };

    checkToken();
  }, []);

  const login = async (credentials: LoginCredentials): Promise<any> => {
    setIsLoading(true);
    try {
      console.log("Attempting login with:", credentials.email);
      const response = await loginApi(credentials);
      console.log(
        "Login API response received:",
        response ? "Success" : "Failed"
      );

      if (response && response.token) {
        console.log("Setting authenticated state to true");
        setUser(response.user || null);
        setIsAuthenticated(true);
        return response;
      } else {
        throw new Error("Invalid response from login API");
      }
    } catch (error) {
      console.error("Login failed:", error);
      // Important: re-throw the error so the component can handle it
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ isLoading, user, isAuthenticated, login }}>
      {children}
    </AuthContext.Provider>
  );
};
