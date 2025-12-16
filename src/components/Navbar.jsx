import { useState } from "react";
import { AppBar, Toolbar, Typography, Box, Button, Menu, MenuItem, IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export default function Navbar({ user }) {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleProfileClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleChangePassword = () => {
    handleClose();
    navigate("/change-password"); 
  };

  const handleLogout = () => {
    handleClose();
    localStorage.removeItem("access_token");
    localStorage.removeItem("user");
    navigate("/");
  };

  const handleBackClick = () => {
    navigate(-1);
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton
          color="inherit"
          onClick={handleBackClick}
          sx={{ mr: 1 }}
          title="Go back"
        >
          <ArrowBackIcon />
        </IconButton>

        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Hello, welcome to an accessible payment app
        </Typography>

        <Box>
          <Button color="inherit" onClick={handleProfileClick}>
            {user?.username || "Profile"}
          </Button>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem disabled>Email: {user?.mail || "Not set"}</MenuItem>
            <MenuItem onClick={handleChangePassword}>Change Password</MenuItem>
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
}