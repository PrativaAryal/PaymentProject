import { Box } from "@mui/material";
import Navbar from "./Navbar";

const PageLayout = ({ children }) => {
  return (
    <Box minHeight="100vh" sx={{ backgroundColor: "#0a192f" }}>
      <Navbar />
      <Box
        sx={{
          padding: 3,
          backgroundColor: "#f9fafb",
          minHeight: "calc(100vh - 64px)",
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default PageLayout;
