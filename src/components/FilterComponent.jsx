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
        alignItems: "center",
        justifyContent: "space-between",
        flexWrap: "wrap",
        width: "100%",
        maxWidth: 1200,
        borderRadius: "30px",
        bgcolor: "#fff",
        boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
        p: { xs: 2, sm: 3 },
        gap: 2,
        flexDirection: { xs: "column", md: "row" }, // Stacks on mobile, horizontal on desktop
      }}
    >
      {/* Price Slider Section */}
      <Box sx={{ flex: "1", minWidth: 200, px: 2 }}>
        <Typography variant="subtitle2">Price Range (USD)</Typography>
        <Slider
          value={price}
          onChange={(e, newValue) => setPrice(newValue)}
          valueLabelDisplay="auto"
          min={0}
          max={500}
          sx={{
            color: "primary.main",
          }}
        />
      </Box>

      <Divider
        orientation="vertical"
        flexItem
        sx={{ mx: 1, display: { xs: "none", md: "block" } }}
      />

      {/* Checkboxes Section - Stays BEFORE the button on desktop */}
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: { xs: 1, sm: 2 },
          justifyContent: { xs: "center", md: "flex-start" },
          order: { xs: 2, md: 2 }, // Checkboxes stay in the middle on desktop
        }}
      >
        <FormControlLabel
          control={
            <Checkbox
              name="instantBook"
              onChange={handleFeatureChange}
              sx={{ "& .MuiSvgIcon-root": { fontSize: 20 } }}
            />
          }
          label="Instant Book"
        />
        <FormControlLabel
          control={
            <Checkbox
              name="electricVehicle"
              onChange={handleFeatureChange}
              sx={{ "& .MuiSvgIcon-root": { fontSize: 20 } }}
            />
          }
          label="Electric Vehicle"
        />
        <FormControlLabel
          control={
            <Checkbox
              name="petFriendly"
              onChange={handleFeatureChange}
              sx={{ "& .MuiSvgIcon-root": { fontSize: 20 } }}
            />
          }
          label="Pet Friendly"
        />
      </Box>

      <Divider
        orientation="vertical"
        flexItem
        sx={{ mx: 2, display: { xs: "none", md: "block" } }}
      />

      {/* Apply Filters Button - Moves AFTER checkboxes on desktop */}
      <Box
        sx={{
          order: { xs: 3, md: 3 }, // On mobile, it comes last; on desktop, it's after checkboxes
          textAlign: "center",
        }}
      >
        <Button
          variant="contained"
          color="primary"
          sx={{
            px: { xs: 3, sm: 4 },
            py: 1,
            borderRadius: "20px",
            whiteSpace: "nowrap",
            width: { xs: "100%", sm: "auto" },
          }}
        >
          Apply Filters
        </Button>
      </Box>
    </Box>
  );
};

export default FilterComponent;
