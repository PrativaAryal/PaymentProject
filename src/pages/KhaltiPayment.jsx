import { Box, Typography, Paper, Button } from "@mui/material";
import Navbar from "../components/Navbar";
import { initiateKhaltiPayment } from "../api/apiService";

export default function KhaltiPayment() {
  const user = JSON.parse(localStorage.getItem("user")) || {};

  const product = {
    id: "001",
    name: "Premium Office Chair",
    amount: 2500, 
    image: "/chair.png",
  };

  const handlePayment = async () => {
    try {
      const payload = {
        amount: product.amount * 100, 
        purchase_order_id: product.id,
        purchase_order_name: product.name,
        return_url: `${window.location.origin}/payment-success`, 
      };

      console.log("Initiating Khalti payment with:", payload);

      const res = await initiateKhaltiPayment(payload);

      console.log("Backend response:", res);

      if (res.ok && res.data?.payment_url) {
        // Redirect to Khalti payment page
        window.location.href = res.data.payment_url;
      } else {
        alert(
          res.error?.detail ||
          res.error?.message ||
          "Payment initiation failed. Please try again."
        );
        console.error("Error response:", res.error);
      }
    } catch (err) {
      console.error("Payment initiation error:", err);
      alert("Payment initiation error. Please try again.");
    }
  };

  return (
    <Box
      sx={{
        width: "100vw",
        minHeight: "100vh",
        background: "linear-gradient(135deg, #0B1F3A, #1E3A5F)",
        color: "white",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Navbar user={user} />

      <Box
        sx={{
          flex: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          p: 3,
        }}
      >
        <Paper
          elevation={8}
          sx={{
            p: 4,
            borderRadius: 3,
            backgroundColor: "#1E3A5F",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 2,
          }}
        >
          <img
            src={product.image}
            alt={product.name}
            style={{
              width: 250,
              height: 250,
              objectFit: "contain",
              marginBottom: 10,
            }}
          />

          <Typography variant="h4" fontWeight={700}>
            {product.name}
          </Typography>

          <Typography
            variant="h5"
            sx={{ mt: 2, fontWeight: 700, color: "#4FA3F7" }}
          >
            Rs. {product.amount.toLocaleString()}
          </Typography>

          <Button
            variant="contained"
            color="primary"
            sx={{ mt: 2, textTransform: "none", fontSize: "1rem" }}
            onClick={handlePayment}
          >
            Pay with Khalti
          </Button>
        </Paper>
      </Box>
    </Box>
  );
}