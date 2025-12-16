import { Box } from "@mui/material";

const FullPageLayout = ({ children }) => {
  return (
    <Box
      sx={{
        position: "relative",
        width: "100vw",
        height: "100vh",
        display: "grid",               
        placeItems: "center",         
        background: "linear-gradient(135deg, #0B1F3A, #1E3A5F)",
        overflow: "hidden",
      }}
    >

      <Box
        sx={{
          position: "absolute",
          width: "100%",
          height: "100%",
          top: 0,
          left: 0,
          zIndex: 0,
        }}
      >
        {Array.from({ length: 20 }).map((_, i) => (
          <Box
            key={i}
            sx={{
              position: "absolute",
              width: 6 + Math.random() * 12,
              height: 6 + Math.random() * 12,
              borderRadius: "50%",
              backgroundColor: "#b2dadf52",
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animation: `float ${5 + Math.random() * 5}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          />
        ))}

        <Box
          sx={{
            position: "absolute",
            top: "10%",
            left: "15%",
            fontSize: 80,
            color: "#b2dadf52",
            animation: `rotate 20s linear infinite`,
          }}
        >
          💳
        </Box>
        <Box
          sx={{
            position: "absolute",
            top: "40%",
            right: "10%",
            fontSize: 100,
            color: "#b2dadf52",
            animation: `rotateReverse 25s linear infinite`,
          }}
        >
          💰
        </Box>
        <Box
          sx={{
            position: "absolute",
            bottom: "15%",
            left: "15%",
            fontSize: 70,
            color: "#b2dadf52)",
            animation: `rotate 30s linear infinite`,
          }}
        >
          🏦
        </Box>
      </Box>

      <Box
        sx={{
          position: "relative",
          zIndex: 1,
          width: { xs: "90%", sm: 420 },
          maxWidth: "95%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {children}
      </Box>

      <style>
        {`
          @keyframes float {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-20px); }
          }
          @keyframes rotate {
            0% { transform: rotate(0deg);}
            100% { transform: rotate(360deg);}
          }
          @keyframes rotateReverse {
            0% { transform: rotate(360deg);}
            100% { transform: rotate(0deg);}
          }
        `}
      </style>
    </Box>
  );
};

export default FullPageLayout;
