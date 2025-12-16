import { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Alert,
  CircularProgress,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import FullPageLayout from "../components/FullPageLayout";
import { requestOtp } from "../api/apiService";

const ForgotPassword = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [fieldError, setFieldError] = useState("");
  const [apiError, setApiError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const validateEmail = (value) => {
    if (!value) return "Email is required";
    if (!/\S+@\S+\.\S+/.test(value)) return "Enter a valid email address";
    return "";
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    setFieldError(validateEmail(value));
    setApiError("");
    setSuccess("");
  };

  const handleSubmit = async () => {
    setApiError("");
    setSuccess("");

    const validation = validateEmail(email);
    if (validation) {
      setFieldError(validation);
      return;
    }

    setLoading(true);

    try {
      const res = await requestOtp(email);

      if (res.ok) {
        setSuccess(
          "If this email is registered, a password reset link has been sent."
        );
        setEmail("");
        setFieldError("");
      } else {

        if (res.error?.detail) {
          setApiError(res.error.detail);
        } else if (res.error?.message) {
          setApiError(res.error.message);
        } else if (res.error?.mail) {
          setApiError(res.error.mail[0] || "Invalid email address");
        } else if (res.error?.email) {
          setApiError(res.error.email[0] || "Email not found");
        } else if (res.error?.non_field_errors) {
          setApiError(res.error.non_field_errors[0] || "Unable to send reset link");
        } else {
          setApiError(res.error || "Unable to send reset link");
        }
      }
    } catch (err) {
      console.error("Request OTP error:", err);

      if (err.message === "Network Error") {
        setApiError("Network error. Please check your connection.");
      } else if (err.code === "ECONNABORTED") {
        setApiError("Request timeout. Please try again.");
      } else {
        setApiError("An unexpected error occurred. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !fieldError && email && !loading) {
      handleSubmit();
    }
  };

  return (
    <FullPageLayout>
      <Typography variant="h4" mb={1} color="primary.main">
        Forgot Password
      </Typography>

      <Typography variant="body2" mb={3} color="text.secondary">
        Enter your registered email and we'll send you a reset link
      </Typography>

      {apiError && (
        <Alert 
          severity="error" 
          sx={{ mb: 2 }}
          onClose={() => setApiError("")}
        >
          {apiError}
        </Alert>
      )}

      {success && (
        <Alert 
          severity="success" 
          sx={{ mb: 2 }}
          onClose={() => setSuccess("")}
        >
          {success}
        </Alert>
      )}

      <TextField
        fullWidth
        label="Email Address"
        placeholder="example@email.com"
        value={email}
        onChange={handleChange}
        onKeyPress={handleKeyPress}
        error={!!fieldError}
        helperText={fieldError}
        margin="normal"
        disabled={loading}
        type="email"
      />

      <Box mt={3}>
        <Button
          fullWidth
          variant="contained"
          size="large"
          onClick={handleSubmit}
          disabled={loading || !!fieldError || !email}
        >
          {loading ? (
            <CircularProgress size={22} color="inherit" />
          ) : (
            "Send Reset Link"
          )}
        </Button>
      </Box>

      <Typography
        mt={3}
        sx={{ 
          cursor: "pointer", 
          color: "primary.main", 
          textAlign: "center",
          "&:hover": { textDecoration: "underline" }
        }}
        onClick={() => navigate("/login")}
      >
        Back to Login
      </Typography>
    </FullPageLayout>
  );
};

export default ForgotPassword;