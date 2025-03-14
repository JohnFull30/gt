import React, { useState } from "react";
import { TextField, IconButton, Box, } from "@mui/material";
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
          alignItems: "center",
          gap: 2,
          backgroundColor: "white",
          borderRadius: "30px",
          padding: "10px 20px",
          boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
          width: "fit-content",
        }}
      >
        {/* Location Input */}
        <TextField
          label="Where"
          placeholder="City, airport, address or hotel"
          variant="standard"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          sx={{ minWidth: 220 }}
          InputProps={{
            disableUnderline: true,
          }}
        />

        {/* From Date & Time */}
        <DatePicker
          label="From"
          value={fromDate}
          onChange={setFromDate}
          format="MM/DD/YYYY"
          sx={{ minWidth: 140 }}
        />
        <TimePicker
          value={fromTime}
          onChange={setFromTime}
          format="hh:mm A"
          sx={{ minWidth: 100 }}
        />

        {/* Until Date & Time */}
        <DatePicker
          label="Until"
          value={untilDate}
          onChange={setUntilDate}
          format="MM/DD/YYYY"
          sx={{ minWidth: 140 }}
        />
        <TimePicker
          value={untilTime}
          onChange={setUntilTime}
          format="hh:mm A"
          sx={{ minWidth: 100 }}
        />

        {/* Search Button */}
        <IconButton
          sx={{
            backgroundColor: "#5E17EB",
            color: "white",
            borderRadius: "50%",
            width: 40,
            height: 40,
            "&:hover": { backgroundColor: "#4B13C5" },
          }}
        >
          <SearchIcon />
        </IconButton>
      </Box>
    </LocalizationProvider>
  );
};

export default SearchBar;
