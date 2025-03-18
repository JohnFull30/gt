import React, { useState } from "react";
import {
  Box,
  Checkbox,
  FormControlLabel,
  Slider,
  Typography,
  Divider,
  Button,
} from "@mui/material";

const FilterComponent = () => {
  const [price, setPrice] = useState([20, 250]);
  const [features, setFeatures] = useState({
    instantBook: false,
    electricVehicle: false,
    petFriendly: false,
  });

  const handleFeatureChange = (event) => {
    setFeatures({
      ...features,
      [event.target.name]: event.target.checked,
    });
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        justifyContent: { xs: "center", md: "space-between" }, // Centered on mobile, spaced out on desktop
        width: "100%",
        maxWidth: { xs: "100%", sm: "90%", md: "80%" }, // Ensures consistency
        borderRadius: "30px",
        bgcolor: "#fff",
        boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
        p: { xs: 2, sm: 3, md: 4 }, // Increases padding for larger screens
        gap: { xs: 2, md: 3 }, // Adjusts spacing dynamically
        flexDirection: { xs: "column", md: "row" }, // Stack on mobile, row on desktop
      }}
    >
      {/* Price Slider Section */}
      <Box sx={{ flex: 1, minWidth: { xs: "100%", sm: 250, md: 300 }, px: { xs: 1, sm: 2 } }}>
        <Typography variant="subtitle2">Price Range (USD)</Typography>
        <Slider
          value={price}
          onChange={(e, newValue) => setPrice(newValue)}
          valueLabelDisplay="auto"
          min={0}
          max={500}
          sx={{ color: "primary.main" }}
        />
      </Box>

      <Divider
        orientation="vertical"
        flexItem
        sx={{ mx: { xs: 0, md: 2 }, display: { xs: "none", md: "block" } }} // Hide divider on mobile
      />

      {/* Checkboxes Section - Moves BEFORE the button on desktop */}
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: { xs: 1, sm: 2, md: 3 },
          justifyContent: { xs: "center", md: "flex-start" },
          order: { xs: 2, md: 2 }, // Keep it in the middle
        }}
      >
        <FormControlLabel
          control={
            <Checkbox
              name="instantBook"
              onChange={handleFeatureChange}
              sx={{ "& .MuiSvgIcon-root": { fontSize: 24 } }} // Slightly larger icon
            />
          }
          label="Instant Book"
        />
        <FormControlLabel
          control={
            <Checkbox
              name="electricVehicle"
              onChange={handleFeatureChange}
              sx={{ "& .MuiSvgIcon-root": { fontSize: 24 } }}
            />
          }
          label="Electric Vehicle"
        />
        <FormControlLabel
          control={
            <Checkbox
              name="petFriendly"
              onChange={handleFeatureChange}
              sx={{ "& .MuiSvgIcon-root": { fontSize: 24 } }}
            />
          }
          label="Pet Friendly"
        />
      </Box>

      <Divider
        orientation="vertical"
        flexItem
        sx={{ mx: { xs: 0, md: 2 }, display: { xs: "none", md: "block" } }} // Hide divider on mobile
      />

      {/* Apply Filters Button - Moves AFTER checkboxes on desktop */}
      <Box
        sx={{
          order: { xs: 3, md: 3 }, // Last on mobile, last on desktop
          textAlign: "center",
        }}
      >
        <Button
          variant="contained"
          color="primary"
          sx={{
            px: { xs: 3, sm: 4, md: 5 },
            py: { xs: 1, sm: 1.5 },
            borderRadius: "20px",
            whiteSpace: "nowrap",
            width: { xs: "100%", sm: "auto" }, // Full-width on mobile, auto on larger screens
          }}
        >
          Apply Filters
        </Button>
      </Box>
    </Box>
  );
};

export default FilterComponent;
