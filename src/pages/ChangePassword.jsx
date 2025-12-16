import { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Alert,
  CircularProgress,
  Paper,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { changePassword } from "../api/apiService";
import Navbar from "../components/Navbar";
import FullPageLayout from "../components/FullPageLayout";

export default function ChangePassword() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user")) || {};

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [retypePassword, setRetypePassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});
  const [success, setSuccess] = useState("");

  const validateFields = () => {
    const errors = {};

    if (!oldPassword) {
      errors.oldPassword = "Old password is required";
    }

    if (!newPassword) {
      errors.newPassword = "New password is required";
    } else if (newPassword.length < 6) {
      errors.newPassword = "Password must be at least 6 characters";
    }

    if (!retypePassword) {
      errors.retypePassword = "Please confirm your new password";
    }

    if (newPassword && retypePassword && newPassword !== retypePassword) {
      errors.retypePassword = "Passwords do not match";
    }

    if (oldPassword && newPassword && oldPassword === newPassword) {
      errors.newPassword = "New password cannot be the same as old password";
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = (field, value) => {
    switch (field) {
      case "oldPassword":
        setOldPassword(value);
        break;
      case "newPassword":
        setNewPassword(value);
        break;
      case "retypePassword":
        setRetypePassword(value);
        break;
      default:
        break;
    }

    setFieldErrors({});
    setApiError("");
  };

  const handleSubmit = async () => {
    setApiError("");
    setSuccess("");

    if (!validateFields()) {
      return;
    }

    setLoading(true);

    try {
      const res = await changePassword({
        oldPassword,
        newPassword,
        retypePassword,
      });

      if (res.ok) {
        setSuccess("Password changed successfully! Redirecting to dashboard...");

        setOldPassword("");
        setNewPassword("");
        setRetypePassword("");
        setFieldErrors({});

        setTimeout(() => navigate("/dashboard"), 2000);
      } else {
        console.log("Error response from backend:", res.error); 
        
        // If error is an array, take the first element
        if (Array.isArray(res.error)) {
          setApiError(res.error[0]);
        } else if (res.error?.old_password) {
          setApiError(res.error.old_password[0] || "Old password is incorrect");
        } else if (res.error?.old_password?.[0]) {
          setApiError(res.error.old_password[0]);
        } else if (res.error?.new_password) {
          setApiError(res.error.new_password[0] || "Invalid new password");
        } else if (res.error?.detail) {
          setApiError(res.error.detail);
        } else if (res.error?.message) {
          setApiError(res.error.message);
        } else if (res.error?.non_field_errors) {
          setApiError(res.error.non_field_errors[0] || "Failed to change password");
        } else if (typeof res.error === "string") {
          setApiError(res.error);
        } else {
          console.log("Unhandled error format:", res.error);
          setApiError("Failed to change password. Please try again.");
        }
      }
    } catch (err) {
      console.error("Change password error:", err);

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
    if (e.key === "Enter" && !loading && Object.keys(fieldErrors).length === 0 && oldPassword && newPassword && retypePassword) {
      handleSubmit();
    }
  };

  const isFormValid = oldPassword && newPassword && retypePassword && Object.keys(fieldErrors).length === 0;

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
      }}
    >
      <Navbar user={user} />
      <Box
        sx={{
          flex: 1,
          width: "100vw",
          background: "linear-gradient(135deg, #0B1F3A, #1E3A5F)",
          display: "grid",
          placeItems: "center",
          p: 2,
        }}
      >
      <Paper
        elevation={8}
        sx={{
          width: "100%",
          maxWidth: 600,
          backgroundColor: "#1E3A5F",
          borderRadius: 2,
          p: 4,
          display: "flex",
          flexDirection: "column",
          gap: 2,
          color: "white",
        }}
      >
        <Typography variant="h5" textAlign="center" fontWeight={700} color="white">
          Change Password
        </Typography>

        {apiError && (
          <Alert 
            severity="error"
            onClose={() => setApiError("")}
          >
            {String(apiError)}
          </Alert>
        )}

        {success && (
          <Alert 
            severity="success"
            onClose={() => setSuccess("")}
          >
            {success}
          </Alert>
        )}

        <TextField
          label="Old Password"
          type="password"
          value={oldPassword}
          onChange={(e) => handleChange("oldPassword", e.target.value)}
          onKeyPress={handleKeyPress}
          error={!!fieldErrors.oldPassword}
          helperText={fieldErrors.oldPassword}
          fullWidth
          disabled={loading}
          variant="outlined"
        />

        <TextField
          label="New Password"
          type="password"
          value={newPassword}
          onChange={(e) => handleChange("newPassword", e.target.value)}
          onKeyPress={handleKeyPress}
          error={!!fieldErrors.newPassword}
          helperText={fieldErrors.newPassword}
          fullWidth
          disabled={loading}
          variant="outlined"
        />

        <TextField
          label="Confirm New Password"
          type="password"
          value={retypePassword}
          onChange={(e) => handleChange("retypePassword", e.target.value)}
          onKeyPress={handleKeyPress}
          error={!!fieldErrors.retypePassword}
          helperText={fieldErrors.retypePassword}
          fullWidth
          disabled={loading}
          variant="outlined"
        />

        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          disabled={loading || !isFormValid}
          fullWidth
          sx={{ mt: 1 }}
        >
          {loading ? <CircularProgress size={24} color="inherit" /> : "Change Password"}
        </Button>
      </Paper>
    </Box>
    </Box>
  );
}