import React, { useState } from 'react';
import {
  Box,
  Button,
  TextField,
  Typography,
  MenuItem
} from '@mui/material';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(
  process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY
);

export default function RentalForm() {
  const [formData, setFormData] = useState({
    name: '',
    date: null,
    timeOfDay: '',
    phone: '',
    email: '',
    message: ''
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
    if (!formData.timeOfDay) temp.timeOfDay = 'Please select morning or afternoon';
    if (!formData.phone) temp.phone = 'Phone number is required';
    if (!formData.email) temp.email = 'Email is required';
    setErrors(temp);
    return Object.keys(temp).length === 0;
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (!validate()) return;

    // 1) send email in parallel
    const emailPromise = fetch('http://localhost:4000/send-email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });

    // 2) create Stripe session
    const resp = await fetch('http://localhost:4000/create-checkout-session', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        metadata: {
          ...formData,
          date: formData.date.format('YYYY-MM-DD')
        },
        line_items: [
          {
            price_data: {
              currency: 'usd',
              product_data: { name: 'GoTobago Rental' },
              unit_amount: 100
            },
            quantity: 1
          }
        ],
        success_url: `${window.location.origin}/#/success`,
        cancel_url: `${window.location.origin}/#/cancel`
      })
    });
    const session = await resp.json();
    if (!resp.ok) {
      console.error('create-checkout-session failed:', session);
      return;
    }
    console.log('✅ Received session.id:', session.id);

    // 3) redirect to Stripe
    const stripe = await stripePromise;
    const { error } = await stripe.redirectToCheckout({ sessionId: session.id });
    if (error) console.error('Stripe redirect error:', error);

    // 4) warn if email failed
    const emailRes = await emailPromise;
    if (!emailRes.ok) console.warn('Email send failed.');
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 500, mx: 'auto', p: 2 }}>
      <Typography variant="h5" gutterBottom>
        Customer Information
      </Typography>
      <TextField
        fullWidth label="Name" name="name"
        value={formData.name} onChange={handleChange}
        error={Boolean(errors.name)} helperText={errors.name}
        margin="normal"
      />
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          label="Pickup Date" value={formData.date}
          onChange={newVal => handleChange({ target: { name: 'date', value: newVal } })}
          renderInput={params => (
            <TextField
              {...params} fullWidth margin="normal"
              error={Boolean(errors.date)} helperText={errors.date}
            />
          )}
        />
      </LocalizationProvider>
      <TextField
        select fullWidth label="Time of Day" name="timeOfDay"
        value={formData.timeOfDay} onChange={handleChange}
        error={Boolean(errors.timeOfDay)} helperText={errors.timeOfDay}
        margin="normal"
      >
        <MenuItem value="morning">Morning</MenuItem>
        <MenuItem value="afternoon">Afternoon</MenuItem>
      </TextField>
      <TextField
        fullWidth label="Phone Number" name="phone"
        value={formData.phone} onChange={handleChange}
        error={Boolean(errors.phone)} helperText={errors.phone}
        margin="normal"
      />
      <TextField
        fullWidth label="Email" name="email"
        value={formData.email} onChange={handleChange}
        error={Boolean(errors.email)} helperText={errors.email}
        margin="normal"
      />
      <TextField
        fullWidth label="Message (Optional)" name="message"
        value={formData.message} onChange={handleChange}
        multiline rows={4} margin="normal"
      />
      <Button variant="contained" color="primary" type="submit" sx={{ mt: 2 }}>
        Submit & Pay
      </Button>
    </Box>
  );
}
