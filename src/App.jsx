import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import ForgotPassword from "./pages/ForgotPassword";
import ChangePassword from "./pages/ChangePassword";
import ResetPassword  from "./pages/ResetPassword";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import { AuthProvider } from "./auth/AuthContext";
import ProductDetail from "./pages/KhaltiPayment";
import PaymentSuccess from "./pages/PaymentSuccess";
import KhaltiPayment from "./pages/KhaltiPayment";

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: { main: "#8bdcffff" },
    background: { default: "#0B1F3A", paper: "#1E3A5F" },
    text: { primary: "#ffffff" },
  },
});

const lightTheme = createTheme({
  palette: { mode: "light" },
});

function App() {
  return (
    <AuthProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/change-password" element={<ChangePassword />} />
            <Route path="/reset-password/:token" element={
              <ThemeProvider theme={lightTheme}>
                <ResetPassword />
              </ThemeProvider>
            } />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/payment-success" element={<PaymentSuccess />} />
            <Route path="/khalti-payment" element={<KhaltiPayment />} />
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }/>
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;