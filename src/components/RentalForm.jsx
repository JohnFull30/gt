import React, { useState } from 'react';
import { Box, Button, TextField, Typography, MenuItem } from '@mui/material';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { loadStripe } from '@stripe/stripe-js';
import { useLocation } from 'react-router-dom';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);

export default function RentalForm() {
  // grab tour data from Link state
  const loc = useLocation();
const params = new URLSearchParams(loc.search);
const tourId   = loc.state?.tourId   || params.get('tourId')   || '';
const tourName = loc.state?.tourName || params.get('tourName') || '';

  const [formData, setFormData] = useState({
    name: '',
    date: null,
    timeOfDay: '',
    phone: '',
    email: '',
    guests: 1,            // ← added default guest count
    message: '',
    tourId,
    tourName,
  });
  const [errors, setErrors] = useState({});

  const handleChange = ({ target: { name, value } }) => {
    setFormData(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const validate = () => {
    const temp = {};
    if (!formData.name) temp.name = 'Name is required';
    if (!formData.date) temp.date = 'Pickup date is required';
    if (!formData.timeOfDay) temp.timeOfDay = 'Select morning or afternoon';
    if (!formData.phone) temp.phone = 'Phone is required';
    if (!formData.email) temp.email = 'Email is required';
    if (!formData.guests || formData.guests < 1)
      temp.guests = 'Please enter at least 1 guest';
    setErrors(temp);
    return Object.keys(temp).length === 0;
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (!validate()) return;

    // 1️⃣ send email with full formData (includes guests)
    const emailPromise = fetch('http://localhost:4000/send-email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    // 2️⃣ create Stripe session, adding guests to metadata
    const resp = await fetch('http://localhost:4000/create-checkout-session', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        metadata: {
          tourId,
          tourName,
          date: formData.date.format('YYYY-MM-DD'),
          name: formData.name,
          email: formData.email,
          guests: formData.guests,
        },
        line_items: [
          {
            price_data: {
              currency: 'usd',
              product_data: { name: tourName || 'GoTobago Tour' },
              unit_amount: 100 * 100, // $100
            },
            quantity: 1,
          },
        ],
        success_url: `${window.location.origin}/#/success`,
        cancel_url: `${window.location.origin}/#/rentalForm`,
      }),
    });
    const { id: sessionId, error } = await resp.json();
    if (error) return console.error('Stripe error:', error);

    // 3️⃣ redirect to Stripe
    const stripe = await stripePromise;
    const { error: stripeErr } = await stripe.redirectToCheckout({ sessionId });
    if (stripeErr) console.error(stripeErr);

    // 4️⃣ warn if email failed
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
          Booking: <strong>{tourName}</strong> 
        </Typography>
      )}

      <TextField
        fullWidth
        label="Name"
        name="name"
        value={formData.name}
        onChange={handleChange}
        error={!!errors.name}
        helperText={errors.name}
        margin="normal"
      />

      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'stretch' }}>
          <DatePicker
            label="Pickup Date"
            value={formData.date}
            onChange={newVal => handleChange({ target: { name: 'date', value: newVal } })}
            renderInput={params => (
              <TextField
                {...params}
                fullWidth // Ensures the field stretches to match height
                margin="normal"
                error={!!errors.date}
                helperText={errors.date}
              />
            )}
          />
          <TextField
            type="number"
            label="Number of Guests"
            name="guests"
            InputProps={{ inputProps: { min: 1 } }}
            value={formData.guests}
            onChange={handleChange}
            error={!!errors.guests}
            helperText={errors.guests}
            fullWidth // Ensures the field stretches to match height
            margin="normal"
          />
        </Box>
      </LocalizationProvider>

      <TextField
        select
        fullWidth
        label="Time of Day"
        name="timeOfDay"
        value={formData.timeOfDay}
        onChange={handleChange}
        error={!!errors.timeOfDay}
        helperText={errors.timeOfDay}
        margin="normal"
      >
        <MenuItem value="morning">Morning</MenuItem>
        <MenuItem value="afternoon">Afternoon</MenuItem>
      </TextField>

      <TextField
        fullWidth
        label="Phone Number"
        name="phone"
        value={formData.phone}
        onChange={handleChange}
        error={!!errors.phone}
        helperText={errors.phone}
        margin="normal"
      />

      <TextField
        fullWidth
        label="Email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        error={!!errors.email}
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

      <Button type="submit" variant="contained" color="error" fullWidth sx={{ mt: 2 }}>
        Submit & Pay
      </Button>
    </Box>
  );
}
