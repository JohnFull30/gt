const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');

const app = express();
app.use(express.json());

// Temporarily unrestricted CORS to debug
app.use(cors());
app.options('*', cors());

// Nodemailer setup (ensure correct credentials!)
let transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'johnathanfuller0@gmail.com',
    pass: 'iviy lxin kxbb qiwm', // Double-check this
  },
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
