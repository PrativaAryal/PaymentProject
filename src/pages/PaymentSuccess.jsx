import { Box, Typography, Paper, Button, CircularProgress, Alert } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import KhaltiLogo from "../assets/Logo.png";
import { verifyKhaltiPayment } from "../api/apiService";
import Dashboard from "../pages/Dashboard";

export default function PaymentSuccess() {
  const navigate = useNavigate();
  const [paymentData, setPaymentData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const verifyPayment = async () => {
      try {
        // Extract pidx from URL parameters
        const params = new URLSearchParams(window.location.search);
        const pidx = params.get("pidx");

        console.log("URL Parameters:", { pidx });

        if (!pidx) {
          setError("Missing payment ID (pidx). Payment may have been cancelled.");
          setLoading(false);
          return;
        }

        const response = await verifyKhaltiPayment({ pidx });

        console.log("Backend response:", response);

        if (response.ok && response.data) {
          const data = response.data;

          // Map the response to payment details
          const paymentDetails = {
            pidx: data.pidx,
            transactionId: data.transaction_id,
            tidx: data.tidx,
            status: data.status,
            purchaseOrderId: data.purchase_order_id,
            purchaseOrderName: data.purchase_order_name,
            totalAmount: data.total_amount,
            mobile: data.mobile,
            extraMerchantParams: data.extra_merchant_params,
          };

          console.log("Payment details captured:", paymentDetails);

          // Only show success if status is "Completed"
          if (data.status === "Completed") {
            setPaymentData(paymentDetails);
            setError(null);
          } else {
            setError(`Payment status: ${data.status}. Please contact support.`);
            setPaymentData(paymentDetails);
          }
        } else {
          setError(response.error?.detail || "Payment verification failed");
        }
      } catch (err) {
        console.error("Payment verification error:", err);
        setError("Error verifying payment. Please try again or contact support.");
      } finally {
        setLoading(false);
      }
    };

    verifyPayment();
  }, []);

  if (loading) {
    return (
      <Box
        sx={{
          width: "100vw",
          minHeight: "100vh",
          background: "linear-gradient(135deg, #0B1F3A, #1E3A5F)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CircularProgress sx={{ color: "white" }} size={60} />
      </Box>
    );
  }

  const isSuccess = !error && paymentData?.status === "Completed";

  return (
    <Box
      sx={{
        width: "100vw",
        minHeight: "100vh",
        background: "linear-gradient(135deg, #0B1F3A, #1E3A5F)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        p: 3,
      }}
    >
      <Paper
        elevation={10}
        sx={{
          p: 4,
          borderRadius: 3,
          width: "100%",
          maxWidth: 500,
          backgroundColor: "white",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 2,
        }}
      >
        <img src={KhaltiLogo} alt="Khalti" style={{ width: 100, marginBottom: 10 }} />

        <Typography
          variant="h5"
          fontWeight={700}
          color={isSuccess ? "#28a745" : "#dc3545"}
        >
          {isSuccess ? "✓ Payment Successful!" : "✗ Payment Failed"}
        </Typography>

        {paymentData && (
          <Box sx={{ width: "100%", mt: 2, bgcolor: "#c07e85ff", p: 2.5, borderRadius: 1 }}>
            <Typography variant="h6" fontWeight={600} mb={2}>
              Payment Details
            </Typography>
            
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
              {paymentData.purchaseOrderName && (
                <Box sx={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid #ddd", pb: 1 }}>
                  <Typography variant="body2" fontWeight={600} color="#333">
                    Product:
                  </Typography>
                  <Typography variant="body2" color="#555">
                    {paymentData.purchaseOrderName}
                  </Typography>
                </Box>
              )}
              
              {paymentData.purchaseOrderId && (
                <Box sx={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid #ddd", pb: 1 }}>
                  <Typography variant="body2" fontWeight={600} color="#333">
                    Order ID:
                  </Typography>
                  <Typography variant="body2" color="#555">
                    {paymentData.purchaseOrderId}
                  </Typography>
                </Box>
              )}
              
              {paymentData.transactionId && (
                <Box sx={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid #ddd", pb: 1 }}>
                  <Typography variant="body2" fontWeight={600} color="#333">
                    Transaction ID:
                  </Typography>
                  <Typography variant="body2" color="#555" sx={{ wordBreak: "break-all" }}>
                    {paymentData.transactionId}
                  </Typography>
                </Box>
              )}
              
              {paymentData.pidx && (
                <Box sx={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid #ddd", pb: 1 }}>
                  <Typography variant="body2" fontWeight={600} color="#333">
                    Payment ID:
                  </Typography>
                  <Typography variant="body2" color="#555" sx={{ wordBreak: "break-all", fontSize: "0.85rem" }}>
                    {paymentData.pidx}
                  </Typography>
                </Box>
              )}
              
              {paymentData.totalAmount && (
                <Box sx={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid #ddd", pb: 1 }}>
                  <Typography variant="body2" fontWeight={600} color="#333">
                    Amount Paid:
                  </Typography>
                  <Typography variant="body2" fontWeight={700} color="#28a745">
                    Rs. {(paymentData.totalAmount / 100).toLocaleString()}
                  </Typography>
                </Box>
              )}
              
              {paymentData.mobile && (
                <Box sx={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid #ddd", pb: 1 }}>
                  <Typography variant="body2" fontWeight={600} color="#333">
                    Mobile:
                  </Typography>
                  <Typography variant="body2" color="#555">
                    {paymentData.mobile}
                  </Typography>
                </Box>
              )}
              
              {paymentData.status && (
                <Box sx={{ display: "flex", justifyContent: "space-between", pt: 1 }}>
                  <Typography variant="body2" fontWeight={600} color="#333">
                    Status:
                  </Typography>
                  <Typography 
                    variant="body2" 
                    fontWeight={700}
                    color={paymentData.status === "Completed" ? "#28a745" : "#dc3545"}
                  >
                    {paymentData.status}
                  </Typography>
                </Box>
              )}
            </Box>
          </Box>
        )}

        {/* Error message */}
        {error && (
          <Alert severity="error" sx={{ width: "100%", mt: 2 }}>
            {error}
          </Alert>
        )}

        <Button
            variant="contained"
            sx={{ 
              mt: 3, 
              textTransform: "none", 
              fontSize: "1rem",
              backgroundColor: "#c07e85ff",
              "&:hover": {
                backgroundColor: "#a86a71ff"
              }
            }}
         fullWidth
            onClick={() => navigate("/Dashboard")}  
        >
          {isSuccess ? "Go to Dashboard" : "Go Back"}
        </Button>
      </Paper>
    </Box>
  );
}