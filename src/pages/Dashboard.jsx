import {
  Box,
  Typography,
  Paper,
  Button,
  Grid,
  Dialog,
  DialogContent,
  IconButton,
  Stack
} from "@mui/material";
import Navbar from "../components/Navbar";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

import CloseIcon from "@mui/icons-material/Close";
import LockIcon from "@mui/icons-material/Lock";

export default function Dashboard() {
  const user = JSON.parse(localStorage.getItem("user")) || {};
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const floatingIcons = [
    { icon: "fa-wallet", left: "10%", delay: "0s" },
    { icon: "fa-credit-card", left: "30%", delay: "1.5s" },
    { icon: "fa-money-bill-wave", left: "55%", delay: "3s" },
    { icon: "fa-coins", left: "75%", delay: "0.5s" },
    { icon: "fa-building-columns", left: "90%", delay: "2.5s" },
  ];

  return (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
        background: "linear-gradient(135deg, #0B1F3A, #1E3A5F)",
        position: "relative",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box sx={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
        {floatingIcons.map((item, index) => (
          <i
            key={index}
            className={`fas ${item.icon}`}
            style={{
              position: "absolute",
              left: item.left,
              bottom: "-15vh",
              fontSize: "50px",
              opacity: "0.14",
              color: "white",
              animation: `floatUp 10s linear infinite`,
              animationDelay: item.delay,
            }}
          />
        ))}
      </Box>

      <style>
        {`
          @keyframes floatUp {
            0% { transform: translateY(0) rotate(0deg); }
            100% { transform: translateY(-120vh) rotate(360deg); }
          }
        `}
      </style>

      <Navbar user={user} />

      {/* PRODUCT CARD */}
      <Box
        sx={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 2,
        }}
      >
        <Grid container justifyContent="center">
          <Grid item xs={12} sm={8} md={5}>
            <Paper
              sx={{
                p: 4,
                borderRadius: 3,
                backgroundColor: "#1E3A5F",
                color: "white",
                textAlign: "center",
                transition: "0.3s",
                "&:hover": {
                  transform: "translateY(-5px)",
                  boxShadow: "0 15px 30px rgba(0,0,0,0.4)",
                },
              }}
            >
              <img
                src="/chair.png"
                alt="Chair"
                style={{ width: 180, marginBottom: 12 }}
              />

              <Typography variant="h5" fontWeight={700}>
                Premium Office Chair
              </Typography>

              <Typography sx={{ opacity: 0.8, mt: 1 }}>
                Comfortable & ergonomic workspace chair
              </Typography>

              <Typography
                variant="h6"
                sx={{ mt: 2, fontWeight: 700, color: "#4FA3F7" }}
              >
                Rs. 2,500
              </Typography>

              <Button
                variant="contained"
                sx={{ mt: 3, px: 4 }}
                onClick={() => setOpen(true)}
              >
                Buy Now
              </Button>
            </Paper>
          </Grid>
        </Grid>
      </Box>

      {/* PAYMENT POPUP */}
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        maxWidth="xs"
        fullWidth
        BackdropProps={{
          sx: {
            backdropFilter: "blur(10px)",
            backgroundColor: "rgba(11,31,58,0.8)",
          },
        }}
      >
        <DialogContent
          sx={{
            background: "linear-gradient(135deg, #0B1F3A, #1E3A5F)",
            color: "white",
            borderRadius: 3,
            p: 3,
            position: "relative",
          }}
        >
          <IconButton
            onClick={() => setOpen(false)}
            sx={{ position: "absolute", top: 8, right: 8, color: "white" }}
          >
            <CloseIcon />
          </IconButton>

          <Stack spacing={2} alignItems="center">
            <LockIcon sx={{ fontSize: 40, color: "#4FA3F7" }} />
            <Typography variant="h6" fontWeight={700}>
              Secure Payment
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.8 }}>
              Choose a payment method
            </Typography>
          </Stack>

          {/* KHALTI */}
          <Paper
            onClick={() => {
              setOpen(false);
              navigate("/khalti-payment");
            }}
            sx={{
              mt: 3,
              p: 2,
              display: "flex",
              alignItems: "center",
              gap: 2,
              cursor: "pointer",
              backgroundColor: "#122B4A",
              borderRadius: 2,
              border: "1px solid rgba(79,163,247,0.5)",
              transition: "0.3s",
              "&:hover": {
                transform: "translateY(-3px)",
                boxShadow: "0 0 20px rgba(79,163,247,0.6)",
                backgroundColor: "#163B63",
              },
            }}
          >
            <img src="/khalti.png" width={60} />
            <Box>
              <Typography fontWeight={700}>Khalti</Typography>
              <Typography variant="caption" sx={{ opacity: 0.75 }}>
                Wallet · Bank · Card
              </Typography>
            </Box>
          </Paper>

          {/* ESEWA */}
          <Paper
            sx={{
              mt: 2,
              p: 2,
              display: "flex",
              alignItems: "center",
              gap: 2,
              backgroundColor: "#122B4A",
              borderRadius: 2,
              opacity: 0.45,
            }}
          >
            <img src="/esewa.png" width={60} />
            <Typography>eSewa (Coming soon)</Typography>
          </Paper>

          {/* CONNECT IPS */}
          <Paper
            sx={{
              mt: 2,
              p: 2,
              display: "flex",
              alignItems: "center",
              gap: 2,
              backgroundColor: "#122B4A",
              borderRadius: 2,
              opacity: 0.45,
            }}
          >
            <img src="/connectips.png" width={60} />
            <Typography>ConnectIPS (Coming soon)</Typography>
          </Paper>
        </DialogContent>
      </Dialog>
    </Box>
  );
}
