import React, { useState } from "react";
import { TextField, IconButton, Box, Grid2 } from "@mui/material";
import { DatePicker, TimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Search as SearchIcon } from "@mui/icons-material";
import dayjs from "dayjs";

const SearchBar = () => {
  const [location, setLocation] = useState("");
  const [fromDate, setFromDate] = useState(dayjs());
  const [fromTime, setFromTime] = useState(dayjs().hour(10).minute(0));
  const [untilDate, setUntilDate] = useState(dayjs().add(3, "day"));
  const [untilTime, setUntilTime] = useState(dayjs().hour(10).minute(0));

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: { xs: "center", md: "flex-start" },
          gap: 2,
          backgroundColor: "white",
          borderRadius: "30px",
          padding: "10px 20px",
          boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
          width: "100%",
          maxWidth: { xs: "100%", sm: "95%", md: "fit-content" },
          mx: "auto",
        }}
      >
    <Grid2 container spacing={2} alignItems="center">
  {/* Location */}
  <Grid2 xs={12} sm={6} md={2.5}>
    <TextField
      fullWidth
      label="Where"
      placeholder="City, airport, address or hotel"
      variant="standard"
      value={location}
      onChange={(e) => setLocation(e.target.value)}
      InputProps={{ disableUnderline: true }}
    />
  </Grid2>

  {/* From Date */}
  <Grid2 xs={6} sm={3} md={2}>
    <DatePicker
      label="From"
      value={fromDate}
      onChange={setFromDate}
      format="MM/DD/YYYY"
      slotProps={{ textField: { fullWidth: true } }}
    />
  </Grid2>

  {/* From Time */}
  <Grid2 xs={6} sm={3} md={1.5}>
    <TimePicker
      value={fromTime}
      onChange={setFromTime}
      format="hh:mm A"
      slotProps={{ textField: { fullWidth: true } }}
    />
  </Grid2>

  {/* Until Date */}
  <Grid2 xs={6} sm={3} md={2}>
    <DatePicker
      label="Until"
      value={untilDate}
      onChange={setUntilDate}
      format="MM/DD/YYYY"
      slotProps={{ textField: { fullWidth: true } }}
    />
  </Grid2>

  {/* Until Time */}
  <Grid2 xs={6} sm={3} md={1.5}>
    <TimePicker
      value={untilTime}
      onChange={setUntilTime}
      format="hh:mm A"
      slotProps={{ textField: { fullWidth: true } }}
    />
  </Grid2>

  {/* Search Button */}
  <Grid2 xs={12} sm="auto">
    <Box display="flex" justifyContent={{ xs: "center", sm: "flex-end" }}>
      <IconButton
        sx={{
          backgroundColor: "secondary.main",
          color: "white",
          borderRadius: "50%",
          width: 40,
          height: 40,
          "&:hover": { backgroundColor: "primary.main" },
        }}
      >
        <SearchIcon />
      </IconButton>
    </Box>
  </Grid2>
</Grid2>

      </Box>
    </LocalizationProvider>
  );
};

export default SearchBar;
