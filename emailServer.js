// emailServer.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
const Stripe = require('stripe');

const app = express();
app.use(express.json());
app.use(cors());

// Simple sanity‐check endpoint
app.get('/', (req, res) => res.send('✅ EmailServer up'));

// ——— Stripe checkout-session endpoint ———
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);
app.post('/create-checkout-session', async (req, res) => {
  try {
    const { line_items, metadata, success_url, cancel_url  } = req.body;
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items,
      mode: 'payment',
      metadata,
      success_url: success_url || `${process.env.CLIENT_URL}/success`,
      cancel_url:  cancel_url  || `${process.env.CLIENT_URL}/rentalForm`,
    });
    return res.json({ id: session.id });
  } catch (err) {
    console.error('⚠️ Stripe session error:', err);
    return res.status(500).json({ error: err.message });
  }
});

// ——— Your email handler ———
app.post('/send-email', async (req, res) => {
  const { name, email, phone, tourName, date, timeOfDay, guests, message } = req.body;
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASSWORD }
  });

  const adminMail = {
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_USER,
    subject: `📩 New Booking: ${tourName}`,
    html: `
      <h2>New booking received</h2>
      <ul>
        <li><strong>Name:</strong> ${name}</li>
        <li><strong>Email:</strong> ${email}</li>
        <li><strong>Phone:</strong> ${phone}</li>
        <li><strong>Tour:</strong> ${tourName}</li>
        <li><strong>Date:</strong> ${date} (${timeOfDay})</li>
        <li><strong>Guests:</strong> ${guests}</li>
        <li><strong>Message:</strong> ${message || '—'}</li>
      </ul>
    `
  };

  const customerMail = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: `🎉 Your ${tourName} Booking is Confirmed!`,
    html: `
      <div>
        <h1>Thanks for booking with GoTobago!</h1>
        <p>Hi ${name},</p>
        <p>Your tour <strong>${tourName}</strong> is all set for <strong>${date}</strong> (${timeOfDay}).</p>
        <p><strong>Booking Details:</strong></p>
        <ul>
          <li><strong>Guests:</strong> ${guests || 1}</li>
          <li><strong>Meeting point:</strong> [Your meeting location]</li>
          <li><strong>What to bring:</strong> Water, sunscreen, comfy shoes</li>
        </ul>
        <p>If you have any questions or need to modify your booking, just reply to this email or call us at (868) 555-5555.</p>
        <p>Can’t wait to show you around Tobago!</p>
        <p>— The GoTobago Team</p>
      </div>
    `
    
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

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`🚀 EmailServer running on http://localhost:${port}`));
