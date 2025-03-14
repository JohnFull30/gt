import React from "react";
import { Box, Typography, TextField, Button } from "@mui/material";

const HeroSection = () => {
  return (
    <Box
      sx={{
        height: "80vh",
        // background: "url('/turo-hero.jpg') center/cover no-repeat",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        color: "#fff",
        textAlign: "center"
      }}
    >
      <Typography variant="h3" fontWeight="bold" sx={{ color: "#000" }}>
        Skip the rental car counter
      </Typography>
      <Typography variant="h6" mt={2} sx={{ color: "#000" }}>
        Rent just about any car, just about anywhere
      </Typography>
      <Box display="flex" gap={2} mt={4} sx={{ bgcolor: "rgba(255,255,255,0.9)", p: 2, borderRadius: 2 }}>
        <TextField label="City, airport, address or hotel" variant="outlined" fullWidth />
        <Button variant="contained" sx={{ bgcolor: "#6200ea" }}>Search</Button>
      </Box>
    </Box>
  );
};

export default HeroSection;
