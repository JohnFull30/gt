import React, { useState } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';

export default function RentalForm() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
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

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validate()) {
      alert('Form submitted successfully!');
      console.log(formData);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 500, mx: 'auto', p: 2 }}>
      <Typography variant="h5" gutterBottom>
        Customer Rental Information
      </Typography>

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

      <Button variant="contained" color="primary" type="submit" sx={{ mt: 2 }}>
        Submit
      </Button>
    </Box>
  );
}
