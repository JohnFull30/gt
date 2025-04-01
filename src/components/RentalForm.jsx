import React, { useState } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';

export default function RentalForm() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: '',
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    setErrors({
      ...errors,
      [name]: '',
    });
  };

  const validate = () => {
    let tempErrors = {};

    if (!formData.name) tempErrors.name = 'Name is required';
    if (!formData.phone) tempErrors.phone = 'Phone number is required';
    if (!formData.email) tempErrors.email = 'Email is required';

    setErrors(tempErrors);

    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (validate()) {
      try {
        const response = await fetch('http://localhost:4000/send-email', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });
  
        if (response.ok) {
          alert('Email sent successfully!');
        } else {
          alert('Failed to send email. Please try again later.');
        }
      } catch (error) {
        console.error(error);
        alert('An error occurred while sending email.');
      }
    }
  };



  return (
    <Box
    sx={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      minHeight: "calc(100vh - 64px)", // minus navbar height
      px: { xs: 2, sm: 4 },
      py: { xs: 6, md: 8 },
      backgroundColor: "#f9f9f9",
    }}
  >
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        width: "100%",
        maxWidth: 500,
        bgcolor: "#fff",
        p: { xs: 3, sm: 4 },
        borderRadius: 3,
        boxShadow: 3,
      }}
    >
      <Typography variant="h5" gutterBottom>
        Customer Rental Information
      </Typography>
      {/* ...form fields remain the same... */}

  

      <TextField
        fullWidth
        label="Name"
        name="name"
        value={formData.name}
        onChange={handleChange}
        error={Boolean(errors.name)}
        helperText={errors.name}
        margin="normal"
      />

      <TextField
        fullWidth
        label="Phone Number"
        name="phone"
        value={formData.phone}
        onChange={handleChange}
        error={Boolean(errors.phone)}
        helperText={errors.phone}
        margin="normal"
      />

      <TextField
        fullWidth
        label="Email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        error={Boolean(errors.email)}
        helperText={errors.email}
        margin="normal"
      />

      <TextField
        fullWidth
        label="Message (Optional)"
        name="message"
        value={formData.message}
        onChange={handleChange}
        multiline
        rows={4}
        margin="normal"
      />

      <Button variant="contained" color="primary" type="submit" sx={{ mt: 2 }}>
        Submit
      </Button>
    </Box>
    </Box>
  );
}
