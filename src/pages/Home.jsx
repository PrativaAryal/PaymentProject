import { Typography, Button, Box, Fade, Slide, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import FullPageLayout from "../components/FullPageLayout";

const Home = () => {
  const navigate = useNavigate();
  const [fadeIn, setFadeIn] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setFadeIn(true), 200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <FullPageLayout>
      <Fade in={fadeIn} timeout={1000}>
        <Paper
          elevation={12}
          sx={{
            width: "100%",
            maxWidth: 420,
            padding: 4,
            borderRadius: 3,
            backgroundColor: "#1E3A5F",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 2,
            backdropFilter: "blur(6px)",
          }}
        >
          <Slide direction="up" in={fadeIn} timeout={1200}>
            <Typography
              variant="h4"
              color="primary.main"
              sx={{
                fontWeight: 700,
                textShadow: "1px 1px 6px rgba(0,0,0,0.3)",
              }}
            >
              Welcome to whatever this is
            </Typography>
          </Slide>

          <Slide direction="up" in={fadeIn} timeout={1400}>
            <Typography
              variant="body1"
              color="text.secondary"
              textAlign="center"
            >
              Log in to whatever this is 
            </Typography>
          </Slide>

          <Slide direction="up" in={fadeIn} timeout={1600}>
            <Box>
              <Button
                variant="contained"
                color="primary"
                onClick={() => navigate("/login")}
                sx={{
                  px: 5,
                  py: 1.5,
                  borderRadius: 2,
                  fontWeight: 600,
                  transition: "all 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-3px)",
                    boxShadow: "0px 6px 12px rgba(0,0,0,0.25)",
                  },
                }}
              >
                Login / Sign Up
              </Button>
            </Box>
          </Slide>
        </Paper>
      </Fade>
    </FullPageLayout>
  );
};

export default Home;
