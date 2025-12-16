import { useState, useMemo } from "react";
import { Typography, TextField, Button, Alert, CircularProgress, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import * as api from "../api/apiService";
import FullPageLayout from "../components/FullPageLayout";

const Login = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ mobile_number: "", password: "" });
  const [errors, setErrors] = useState({});
  const [apiMsg, setApiMsg] = useState("");
  const [apiMsgType, setApiMsgType] = useState("error");
  const [loading, setLoading] = useState(false);

  const validateField = (name, value) => {
    if (!value) return "This field is required";
    if (name === "mobile_number" && !/^\d{10}$/.test(value)) return "Phone must be 10 digits";
    if (name === "password" && value.length < 6) return "Password must be at least 6 characters";
    return "";
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(s => ({ ...s, [name]: value }));
    setErrors(s => ({ ...s, [name]: validateField(name, value) }));
    setApiMsg(""); // Clear API message when user starts typing
  };

  const isFormValid = useMemo(() => !Object.values(errors).some(Boolean) && form.mobile_number && form.password, [errors, form]);

  const handleSubmit = async () => {
    if (!isFormValid) {
      setApiMsg("Please fix the errors above");
      setApiMsgType("warning");
      return;
    }

    setLoading(true);
    setApiMsg("");

    try {
      const res = await api.login(form.mobile_number, form.password);

      if (res.ok) {
        setApiMsgType("success");
        setApiMsg("Login successful! Redirecting...");
        
        if (res.data?.user) {
          localStorage.setItem("user", JSON.stringify(res.data.user));
        }
        if (res.data?.access) {
          localStorage.setItem("access_token", res.data.access);
        }

        setTimeout(() => navigate("/dashboard"), 1500);
      } else {
        setApiMsgType("error");
        
        if (res.error?.detail) {
          setApiMsg(res.error.detail);
        } else if (res.error?.message) {
          setApiMsg(res.error.message);
        } else if (res.error?.mobile_number) {
          setApiMsg(res.error.mobile_number[0] || "Invalid mobile number");
        } else if (res.error?.password) {
          setApiMsg(res.error.password[0] || "Invalid password");
        } else if (res.error?.non_field_errors) {
          setApiMsg(res.error.non_field_errors[0] || "Invalid credentials");
        } else {
          setApiMsg("Login failed. Please try again.");
        }
      }
    } catch (err) {
      console.error("Login error:", err);
      setApiMsgType("error");
      
      // Handle network errors
      if (err.message === "Network Error") {
        setApiMsg("Network error. Please check your connection.");
      } else if (err.code === "ECONNABORTED") {
        setApiMsg("Request timeout. Please try again.");
      } else {
        setApiMsg("An unexpected error occurred. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && isFormValid && !loading) {
      handleSubmit();
    }
  };

  return (
    <FullPageLayout>
      <Typography variant="h4" mb={2} color="primary.main">
        Login
      </Typography>

      {/* API Error/Success Message */}
      {apiMsg && (
        <Alert 
          severity={apiMsgType} 
          sx={{ mb: 2 }}
          onClose={() => setApiMsg("")}
        >
          {apiMsg}
        </Alert>
      )}

      {/* Mobile Number Field */}
      <TextField
        fullWidth
        label="Mobile Number"
        name="mobile_number"
        placeholder="98XXXXXXXXX"
        margin="normal"
        value={form.mobile_number}
        onChange={handleChange}
        onKeyPress={handleKeyPress}
        error={!!errors.mobile_number}
        helperText={errors.mobile_number}
        disabled={loading}
        inputProps={{
          maxLength: 10,
          inputMode: "numeric",
        }}
      />

      {/* Password Field */}
      <TextField
        fullWidth
        label="Password"
        type="password"
        name="password"
        margin="normal"
        value={form.password}
        onChange={handleChange}
        onKeyPress={handleKeyPress}
        error={!!errors.password}
        helperText={errors.password}
        disabled={loading}
      />

      {/* Login Button */}
      <Button
        fullWidth
        variant="contained"
        sx={{ mt: 2 }}
        onClick={handleSubmit}
        disabled={!isFormValid || loading}
      >
        {loading ? <CircularProgress size={22} color="inherit" /> : "Login"}
      </Button>

      {/* Links */}
      <Box sx={{ mt: 2 }}>
        <Typography
          sx={{ cursor: "pointer", color: "primary.main", "&:hover": { textDecoration: "underline" } }}
          onClick={() => navigate("/forgot-password")}
        >
          Forgot Password?
        </Typography>
      </Box>

      <Box sx={{ mt: 1 }}>
        <Typography
          sx={{ cursor: "pointer", color: "primary.main", "&:hover": { textDecoration: "underline" } }}
          onClick={() => navigate("/signup")}
        >
          New user? Sign Up
        </Typography>
      </Box>
    </FullPageLayout>
  );
};

export default Login;