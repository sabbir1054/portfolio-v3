"use client";
import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem("admin_token");
    if (saved) {
      fetch("/api/auth", { headers: { Authorization: `Bearer ${saved}` } })
        .then((r) => r.json())
        .then((data) => {
          if (data.valid) setToken(saved);
          else localStorage.removeItem("admin_token");
        })
        .catch(() => localStorage.removeItem("admin_token"))
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  const sendOTP = async (username, password) => {
    const res = await fetch("/api/auth/send-otp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });
    const data = await res.json();
    if (!res.ok) return { success: false, error: data.error };
    return { success: true };
  };

  const resendOTP = async () => {
    const res = await fetch("/api/auth/send-otp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ resend: true }),
    });
    const data = await res.json();
    if (!res.ok) return { success: false, error: data.error };
    return { success: true };
  };

  const verifyOTP = async (otp) => {
    const res = await fetch("/api/auth/verify-otp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ otp }),
    });
    const data = await res.json();
    if (data.token) {
      setToken(data.token);
      localStorage.setItem("admin_token", data.token);
      return { success: true };
    }
    return { success: false, error: data.error };
  };

  const logout = () => {
    setToken(null);
    localStorage.removeItem("admin_token");
  };

  return (
    <AuthContext.Provider value={{ token, sendOTP, resendOTP, verifyOTP, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
