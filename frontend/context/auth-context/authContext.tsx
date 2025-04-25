import { createContext, useContext, useEffect, useState } from "react";
import {
  login as loginApi,
  getToken,
  User,
  LoginCredentials,
  isAuthenticated,
} from "../../services/auth-services/authService";
interface AuthContextType {
  isLoading: boolean;
  user: User | null;
  isUserValidated: boolean;
  login: (credentials: LoginCredentials) => Promise<any>;
}

// Create a context for authentication state - this will be used to provide and consume authentication data throughout the app
const AuthContext = createContext<AuthContextType>({
  isLoading: true,
  user: null,
  isUserValidated: false,
  login: async () => {},
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
        setUser(response.user); // Assuming the response contains user data

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
    <AuthContext.Provider value={{ isLoading, user, isUserValidated, login }}>
      {children}
    </AuthContext.Provider>
  );
};
