
import { useState, useMemo } from "react";
import { Typography, TextField, Button, Alert, CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";
import * as api from "../api/apiService";
import FullPageLayout from "../components/FullPageLayout";

const SignUp = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: "", mail: "", mobile_number: "", password: "", confirmPassword: "" });
  const [errors, setErrors] = useState({});
  const [apiMsg, setApiMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const validateField = (name, value) => {
    if (!value) return "This field is required";
    if (name === "username" && value.length < 3) return "Name must be at least 3 characters";
    if (name === "mail" && !/\S+@\S+\.\S+/.test(value)) return "Enter a valid email";
    if (name === "mobile_number" && !/^\d{10}$/.test(value)) return "Phone must be 10 digits";
    if (name === "password" && value.length < 6) return "Password must be at least 6 characters";
    if (name === "confirmPassword" && value !== form.password) return "Passwords do not match";
    return "";
  };
const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(s => ({ ...s, [name]: value }));
    setErrors(s => ({ ...s, [name]: validateField(name, value) }));
    setApiMsg("");
  };

  const isFormValid = useMemo(() => !Object.values(errors).some(Boolean) && Object.values(form).every(Boolean), [errors, form]);

  const handleSubmit = async () => {
    if (!isFormValid) return;
    setLoading(true);
    const res = await api.signup(form);
    setLoading(false);
    if (res.ok) navigate("/dashboard");
    else setApiMsg(res.error || "Sign Up failed");
  };

  return (
    <FullPageLayout>
      <Typography variant="h4" mb={2} color="primary.main">Sign Up</Typography>
      {apiMsg && <Alert severity="error" sx={{ mb: 2 }}>{apiMsg}</Alert>}
      <TextField fullWidth label="Full Name" name="username" margin="normal" value={form.username} onChange={handleChange} error={!!errors.username} helperText={errors.username}/>
      <TextField fullWidth label="Email" name="mail" margin="normal" value={form.mail} onChange={handleChange} error={!!errors.mail} helperText={errors.mail}/>
      <TextField fullWidth label="Mobile Number" name="mobile_number" margin="normal" value={form.mobile_number} onChange={handleChange} error={!!errors.mobile_number} helperText={errors.mobile_number}/>
      <TextField fullWidth label="Password" name="password" type="password" margin="normal" value={form.password} onChange={handleChange} error={!!errors.password} helperText={errors.password}/>
      <TextField fullWidth label="Confirm Password" name="confirmPassword" type="password" margin="normal" value={form.confirmPassword} onChange={handleChange} error={!!errors.confirmPassword} helperText={errors.confirmPassword}/>
      <Button fullWidth variant="contained" sx={{ mt: 2 }} onClick={handleSubmit} disabled={!isFormValid || loading}>
        {loading ? <CircularProgress size={22} /> : "Sign Up"}
      </Button>
      <Typography mt={2} sx={{ cursor: "pointer", color: "primary.main" }} onClick={() => navigate("/login")}>
        Already have an account? Login
      </Typography>
    </FullPageLayout>
  );
};

export default SignUp;
