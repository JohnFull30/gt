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

  const handleSubmit = (e) => {
    e.preventDefault();
  
    if (validate()) {
      const subject = encodeURIComponent("New Rental Request");
      const body = encodeURIComponent(`
        Name: ${formData.name}
        Phone: ${formData.phone}
        Email: ${formData.email}
        Message: ${formData.message || 'No message provided.'}
      `);
  
      window.location.href = `mailto:your-email@example.com?subject=${subject}&body=${body}`;
    }
    
      // TODO: Integrate with your email sending service/API here
    
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
  );
}
