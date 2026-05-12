"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { User } from "../lib/types";
import { useRouter } from "next/navigation";

interface AuthContextType {
  user: User | null;
  login: (id: string, password: string) => Promise<{ success: boolean; message?: string }>;
  register: (name: string, id: string, password: string) => Promise<{ success: boolean; message?: string }>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const savedUser = localStorage.getItem("currentUser");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (studentId: string, password: string): Promise<{ success: boolean; message?: string }> => {
    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ studentId, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setUser(data.user);
        localStorage.setItem("currentUser", JSON.stringify(data.user));
        return { success: true };
      } else {
        return { success: false, message: data.message || "Login failed" };
      }
    } catch (error) {
      console.error("Login error:", error);
      return { success: false, message: "An error occurred during login" };
    }
  };

  const register = async (fullName: string, studentId: string, password: string): Promise<{ success: boolean; message?: string }> => {
    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fullName, studentId, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setUser(data.user);
        localStorage.setItem("currentUser", JSON.stringify(data.user));
        return { success: true };
      } else {
        return { success: false, message: data.message || "Registration failed" };
      }
    } catch (error) {
      console.error("Registration error:", error);
      return { success: false, message: "An error occurred during registration" };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("currentUser");
    router.push("/");
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
