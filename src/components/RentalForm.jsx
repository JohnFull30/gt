// src/components/RentalForm.jsx
import React, { useState } from 'react';
import { Box, Button, TextField, Typography, MenuItem } from '@mui/material';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { loadStripe } from '@stripe/stripe-js';
import { useLocation } from 'react-router-dom';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);

export default function RentalForm() {
  const location = useLocation();
  const { state } = location;
  const params = new URLSearchParams(location.search);

  // fallback: first try state, then URL param, then empty string
  const tourId   = state?.tourId   || params.get('tourId')   || '';
  const tourName = state?.tourName || params.get('tourName') || '';

  const [formData, setFormData] = useState({
    name: '',
    date: null,
    timeOfDay: '',
    phone: '',
    email: '',
    message: '',
    tourId,
    tourName,
  });
  const [errors, setErrors] = useState({});

  const handleChange = ({ target: { name, value } }) => {
    setFormData(fd => ({ ...fd, [name]: value }));
    setErrors(err => ({ ...err, [name]: '' }));
  };

  const validate = () => {
    const temp = {};
    if (!formData.name)      temp.name = 'Name is required';
    if (!formData.date)      temp.date = 'Pickup date is required';
    if (!formData.timeOfDay) temp.timeOfDay = 'Select morning or afternoon';
    if (!formData.phone)     temp.phone = 'Phone is required';
    if (!formData.email)     temp.email = 'Email is required';
    setErrors(temp);
    return Object.keys(temp).length === 0;
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (!validate()) return;

    // send email
    const emailPromise = fetch('http://localhost:4000/send-email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...formData,
        date: formData.date.format('YYYY-MM-DD'),
      }),
    });

    // create Stripe session
    const res = await fetch('http://localhost:4000/create-checkout-session', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        metadata: {
          tourId,
          tourName,
          name: formData.name,
          email: formData.email,
          date: formData.date.format('YYYY-MM-DD'),
        },
        line_items: [
          {
            price_data: {
              currency: 'usd',
              product_data: { name: tourName || 'GoTobago Tour' },
              unit_amount: 100 * 100,
            },
            quantity: 1,
          },
        ],
        success_url: `${window.location.origin}/#/success`,
        cancel_url:  `${window.location.origin}/#/rentalForm`,
      }),
    });
    const { id: sessionId, error } = await res.json();
    if (error) return console.error('Stripe error:', error);

    const stripe = await stripePromise;
    const { error: stripeErr } = await stripe.redirectToCheckout({ sessionId });
    if (stripeErr) console.error(stripeErr);

    // warn if email failed
    const emailRes = await emailPromise;
    if (!emailRes.ok) console.warn('Email send failed');
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 500, mx: 'auto', p: 2 }}>
      <Typography variant="h5" gutterBottom>
        Customer Information
      </Typography>

      {tourName && (
        <Typography variant="subtitle1" sx={{ mb: 2 }}>
          Booking: <strong>{tourName}</strong> (ID: {tourId})
        </Typography>
      )}

      <TextField
        fullWidth label="Name" name="name"
        value={formData.name} onChange={handleChange}
        error={!!errors.name} helperText={errors.name}
        margin="normal"
      />

      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          label="Pickup Date"
          value={formData.date}
          onChange={newVal => handleChange({ target: { name: 'date', value: newVal } })}
          renderInput={params => (
            <TextField
              {...params} fullWidth margin="normal"
              error={!!errors.date} helperText={errors.date}
            />
          )}
        />
      </LocalizationProvider>

      <TextField
        select fullWidth label="Time of Day" name="timeOfDay"
        value={formData.timeOfDay} onChange={handleChange}
        error={!!errors.timeOfDay} helperText={errors.timeOfDay}
        margin="normal"
      >
        <MenuItem value="morning">Morning</MenuItem>
        <MenuItem value="afternoon">Afternoon</MenuItem>
      </TextField>

      <TextField
        fullWidth label="Phone Number" name="phone"
        value={formData.phone} onChange={handleChange}
        error={!!errors.phone} helperText={errors.phone}
        margin="normal"
      />

      <TextField
        fullWidth label="Email" name="email"
        value={formData.email} onChange={handleChange}
        error={!!errors.email} helperText={errors.email}
        margin="normal"
      />

      <TextField
        fullWidth label="Message (Optional)" name="message"
        value={formData.message} onChange={handleChange}
        multiline rows={4} margin="normal"
      />

      <Button type="submit" variant="contained" color="error" fullWidth sx={{ mt: 2 }}>
        Submit & Pay
      </Button>
    </Box>
  );
}
