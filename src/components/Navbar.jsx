import { AppBar, Toolbar, Typography, IconButton, Box } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
<AppBar
  position="absolute"
  elevation={0}
  sx={{
    background: "rgba(0, 0, 0, 0.3)", // transparent black overlay
    color: "#fff",                   // white text for contrast
    boxShadow: "none",
    backdropFilter: "blur(10px)",    // subtle blur effect
  }}
>

      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        {/* Logo */}
        <Typography
          variant="h6"
          component={Link}
          to="/gt"
          sx={{ fontWeight: "bold", cursor: "pointer", "&:hover": { color: "#secondary.main" }, textDecoration: 'none', color: 'primary.main' }}
        >
          GoTobago
        </Typography>

        {/* Centered Navigation Links */}
        <Box sx={{ display: "flex", gap: 4 }}>
          <Typography
            variant="subtitle1"
            component={Link}
            to="/rentals"
            sx={{ fontWeight: "bold", cursor: "pointer", "&:hover": { color: "primary.main" }, textDecoration: 'none', color: 'inherit' }}
          >
            RENTALS
          </Typography>
          <Typography
            variant="subtitle1"
            component={Link}
            to="/tours"
            sx={{ fontWeight: "bold", cursor: "pointer", "&:hover": { color: "primary.main" }, textDecoration: 'none', color: 'inherit' }}
          >
            TOURS
          </Typography>
        </Box>

        {/* Menu Icon */}
        <IconButton edge="end" color="inherit">
          <MenuIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
