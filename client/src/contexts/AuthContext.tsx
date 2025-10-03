import { createContext, useContext, useState, useEffect } from "react";
import type { User } from "@shared/schema";

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // todo: remove mock functionality - Check auth status on mount
    const checkAuth = async () => {
      setIsLoading(true);
      try {
        // todo: remove mock functionality - Replace with actual API call to /api/auth/me
        const storedUser = localStorage.getItem("mockUser");
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
      } catch (error) {
        console.error("Failed to check auth status", error);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (email: string, password: string) => {
    // todo: remove mock functionality - Replace with actual API call to /api/auth/login
    console.log("Login triggered", { email, password });
    
    const mockUser: User = {
      id: "1",
      name: "John Doe",
      email: email,
      password: "",
      role: email.includes("admin") ? "admin" : "user",
    };
    
    setUser(mockUser);
    localStorage.setItem("mockUser", JSON.stringify(mockUser));
  };

  const register = async (name: string, email: string, password: string) => {
    // todo: remove mock functionality - Replace with actual API call to /api/auth/register
    console.log("Register triggered", { name, email, password });
    
    const mockUser: User = {
      id: "1",
      name: name,
      email: email,
      password: "",
      role: "user",
    };
    
    setUser(mockUser);
    localStorage.setItem("mockUser", JSON.stringify(mockUser));
  };

  const logout = () => {
    // todo: remove mock functionality - Replace with actual API call to /api/auth/logout
    console.log("Logout triggered");
    setUser(null);
    localStorage.removeItem("mockUser");
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
