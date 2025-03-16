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
        width: "90%",
        borderRadius: "30px",
        bgcolor: "#fff",
        boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
        p: "10px 20px",
        gap: 3,
        overflowX: "auto",
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
        />
      </Box>

      <Divider orientation="vertical" flexItem sx={{ mx: 1 }} />

      {/* Checkboxes */}
      <Box sx={{ display: "flex", gap: 1, px: 2, flexWrap: "nowrap" }}>
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

      <Divider orientation="vertical" flexItem sx={{ mx: 2, display: { xs: "none", md: "block" } }} />

      <Button
        variant="contained"
        color="primary"
        sx={{
          px: 4,
          py: 1,
          borderRadius: "20px",
          whiteSpace: "nowrap",
        }}
      >
        Apply Filters
      </Button>
    </Box>
  );
};

export default FilterComponent;
