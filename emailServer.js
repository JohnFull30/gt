// emailServer.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
const Stripe = require('stripe');

const app = express();
app.use(express.json());
app.use(cors());

// sanity‐check
app.get('/', (_req, res) => res.send('✅ EmailServer up'));

// Stripe setup
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

// 1️⃣ Checkout‐session endpoint
app.post('/create-checkout-session', async (req, res) => {
  try {
    const { line_items, metadata, success_url, cancel_url } = req.body;
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items,
      mode: 'payment',
      metadata,
      success_url: success_url || `${process.env.CLIENT_URL}/#/success`,
      cancel_url:  cancel_url  || `${process.env.CLIENT_URL}/#/rentalForm`,
    });
    return res.json({ id: session.id });
  } catch (err) {
    console.error('⚠️ Stripe session error:', err);
    return res.status(500).json({ error: err.message });
  }
});

// 2️⃣ Email handler
app.post('/send-email', async (req, res) => {
  const {
    name, email, phone,
    tourId, tourName,
    date, timeOfDay, message
  } = req.body;

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  // Admin notification
  const adminMail = {
    from: process.env.EMAIL_USER,
    to:   process.env.ADMIN_EMAIL || process.env.EMAIL_USER,
    subject: `🚨 [Admin] New Booking: ${tourName}`,
    html: `
      <h2>New Tour Booking</h2>
      <ul>
        <li><strong>Tour:</strong> ${tourName} (ID: ${tourId})</li>
        <li><strong>Name:</strong> ${name}</li>
        <li><strong>Email:</strong> ${email}</li>
        <li><strong>Phone:</strong> ${phone}</li>
        <li><strong>Date:</strong> ${date} (${timeOfDay})</li>
        <li><strong>Message:</strong> ${message || '—'}</li>
      </ul>
    `,
  };

  // Customer confirmation
  const customerMail = {
    from: process.env.EMAIL_USER,
    to:   email,
    subject: `🎉 Your ${tourName} Booking is Confirmed!`,
    html: `
      <div>
        <h1>Thanks for booking with GoTobago!</h1>
        <p>Hi ${name},</p>
        <p>Your tour <strong>${tourName}</strong> (ID: ${tourId}) is all set for <strong>${date}</strong> (${timeOfDay}).</p>
        <p><strong>Meeting point:</strong> [Your meeting location]</p>
        <p><strong>What to bring:</strong> Water, sunscreen, comfy shoes</p>
        <p>If you have any questions or need to modify your booking, just reply or call us at (868) 555-5555.</p>
        <p>— The GoTobago Team</p>
      </div>
    `,
  };

  try {
    await transporter.sendMail(adminMail);
    await transporter.sendMail(customerMail);
    console.log('✉️ Emails sent');
    res.json({ success: true });
  } catch (err) {
    console.error('⚠️ Email error:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`🚀 EmailServer running on http://localhost:${PORT}`));
