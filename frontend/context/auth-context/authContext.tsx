import { createContext, useContext, useEffect, useState } from "react";
import {
  login as loginApi,
  getToken,
  LoginCredentials,
  isAuthenticated,
  register as registerApi,
  RegisterCredentials,
} from "../../services/auth-services/authService";
import { User } from "../../types/User"; // Importing the User type for type safety

interface AuthContextType {
  isLoading: boolean;
  user: User | null;
  isUserValidated: boolean;
  login: (credentials: LoginCredentials) => Promise<any>;
  register: (credentials: RegisterCredentials) => Promise<any>; // Function to register a new user
}

// Create a context for authentication state - this will be used to provide and consume authentication data throughout the app
const AuthContext = createContext<AuthContextType>({
  isLoading: true,
  user: null,
  isUserValidated: false,
  login: async () => {},
  register: async () => {}, // Default values for the context
});

export const useAuth = () => useContext(AuthContext); // Custom hook to use the AuthContext, providing a convenient way to access authentication state and actions

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  // State variables to manage authentication status, loading state, and user data
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const [isUserValidated, setIsUserValidated] = useState(false);

  useEffect(() => {
    const checkToken = async () => {
      const token = await getToken();
      if (token) {
        const isValideToken = await isAuthenticated();

        if (isValideToken) {
          console.log("Token is valid, user is authenticated.");
          setIsUserValidated(true);
        } else {
          setIsUserValidated(false);
          setUser(null); // Clear user data if token is invalid
        }
      }
      setIsLoading(false);
    };

    checkToken();
  }, []);

  const login = async (credentials: LoginCredentials): Promise<any> => {
    setIsLoading(true);
    try {
      const response = await loginApi(credentials);

      if (response && response.token) {
        const isValideToken = await isAuthenticated();
        if (!isValideToken) {
          setIsUserValidated(false);
          setUser(null);
          console.error("Invalid token received:", response.token);
          return response; // Token is invalid, return early
        }

        setIsUserValidated(true);
        setUser(response.username);

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
  //for register
  const register = async (credentials: RegisterCredentials): Promise<any> => {
    setIsLoading(true);
    try {
      const response = await registerApi(credentials);
      if (response && response.token) {
        const isValideToken = await isAuthenticated();
        if (!isValideToken) {
          setIsUserValidated(false);
          setUser(null);
          console.error(
            "Invalid token received during registration:",
            response.token
          );
          return response; // Token is invalid, return early
        }

        setIsUserValidated(true);
        setUser(response.username);

        return response;
      } else {
        throw new Error("Invalid response from register API");
      }
    } catch (error) {
      console.error("Registration failed:", error);
      // Important: re-throw the error so the component can handle it
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{ isLoading, user, isUserValidated, login, register }}
    >
      {children}
    </AuthContext.Provider>
  );
};
