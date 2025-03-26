const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');

const app = express();
app.use(express.json());
app.use(cors());

// Configure Nodemailer
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'johnathanfuller0@gmail.com',        // Your email
    pass: 'iviy lxin kxbb qiwm',           // Your email password (Use an app password)
  },
});

// Email sending endpoint
app.post('/send-email', (req, res) => {
  const { name, phone, email, message } = req.body;

  const mailOptions = {
    from: email,
    to: 'johnathanfuller0@gmail.com',  // Your receiving email
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
      console.error(error);
      return res.status(500).send({ success: false, error });
    }
    res.status(200).send({ success: true, info });
  });
});

app.listen(5000, () => {
  console.log('Server running on port 5000');
});
