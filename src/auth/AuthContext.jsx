import { createContext, useContext, useState } from "react";
import * as api from "../api/apiService";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);

  const login = async (mobile_number, password) => {
    setLoading(true);
    const res = await api.login(mobile_number, password);
    setLoading(false);
    if (res.ok) setUser(res.data.user || res.data); 
    return res;
  };

  const signup = async (formData) => {
    setLoading(true);
    const res = await api.signup(formData);
    setLoading(false);
    if (res.ok) setUser(res.data.user || res.data);
    return res;
  };

  const requestOtp = async (mail) => {
    setLoading(true);
    const res = await api.requestOtp(mail);
    setLoading(false);
    return res;
  };

  const resetPassword = async (formData) => {
    setLoading(true);
    const res = await api.resetPassword(formData);
    setLoading(false);
    return res;
  };

  return (
    <AuthContext.Provider
      value={{ user, login, signup, requestOtp, resetPassword, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
