import React, { useState } from "react";
import {
  Box,
  Checkbox,
  FormControlLabel,
  Slider,
  Button,
  Typography,
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
    flexDirection: { xs: "column", md: "row" },
    alignItems: "center",
    justifyContent: "center",
    flexWrap: "wrap",
    gap: 3,
    width: "100%",
    maxWidth: "1200px",
    mx: "auto",
    bgcolor: "#fff",
    borderRadius: "20px",
    boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.06)",
    p: { xs: 2, sm: 3 },
  }}
>
  {/* Price Slider */}
  <Box sx={{ flexGrow: 1, minWidth: 260 }}>
    <Typography variant="subtitle2" sx={{ mb: 1 }}>Price Range (USD)</Typography>
    <Slider
      value={price}
      onChange={(e, newValue) => setPrice(newValue)}
      valueLabelDisplay="auto"
      min={0}
      max={500}
      step={null}
      marks={[
        { value: 0, label: "$0" },
        { value: 125, label: "$125" },
        { value: 250, label: "$250" },
        { value: 375, label: "$375" },
        { value: 500, label: "$500" },
      ]}
      sx={{
        color: "primary.main",
        width: "100%",
      }}
    />
  </Box>

  {/* Checkboxes */}
  <Box
    sx={{
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "center",
      gap: 2,
    }}
  >
    <FormControlLabel control={<Checkbox name="instantBook" onChange={handleFeatureChange} />} label="Instant Book" />
    <FormControlLabel control={<Checkbox name="electricVehicle" onChange={handleFeatureChange} />} label="Electric Vehicle" />
    <FormControlLabel control={<Checkbox name="petFriendly" onChange={handleFeatureChange} />} label="Pet Friendly" />
  </Box>

  {/* Apply Filters Button (always last) */}
  <Box sx={{ textAlign: "center", minWidth: 150 }}>
    <Button
      variant="contained"
      color="primary"
      sx={{
        px: 4,
        py: 1.5,
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
}

export default FilterComponent;
