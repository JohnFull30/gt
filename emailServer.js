require('dotenv').config();               // 1️⃣ Load .env first
const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer'); // 2️⃣ Require Nodemailer


const app = express();
app.use(express.json());
app.use(cors());


// Nodemailer setup (ensure correct credentials!)
let transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'johnathanfuller0@gmail.com',
    pass: 'iviy lxin kxbb qiwm', // Double-check this
  },
});

const Stripe = require('stripe');       
const stripe = Stripe(process.env.REACT_APP_STRIPE_SECRET_KEY);

app.post('/create-checkout-session', async (req, res) => {
  try {
    const { metadata, line_items, success_url, cancel_url } = req.body;
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      metadata,
      line_items,
      mode: 'payment',
      success_url,
      cancel_url,
    });
    res.json({ id: session.id });
  } catch (err) {
    console.error('Stripe error:', err);
    res.status(500).json({ error: err.message });
  }
});


app.post('/send-email', (req, res) => {
  const { name, phone, email, message } = req.body;

  const mailOptions = {
    from: email,
    to: 'johnathanfuller0@gmail.com',
    subject: 'New Rental Request',
    text: `
      Name: ${name}
      Phone: ${phone}
      Email: ${email}
      Message: ${message || 'No message provided.'}
    `,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Detailed error:", error);
      return res.status(500).send({ success: false, error: error.message });
    }
    console.log("Email sent:", info.response);
    res.status(200).send({ success: true, info: info.response });
  });
});

// Explicitly set safe port
const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
