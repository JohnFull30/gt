// paymentServer.js
import Stripe from 'stripe';
const stripe = new Stripe(process.env.pk_live_51RFG4N1IGu9HyH6d4DALWtDCNl90sFmZfWfeq18rL9kYoZSewbIjk7efNSHpoZMeuAHEzIadUu2FKURtUNXE5ios00pC3ejKVz);

app.post('/create-checkout-session', async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [{
      price_data: {
        currency: 'usd',
        product_data: { name: 'GoTobago Rental' },
        unit_amount: 100,
      },
      quantity: 1,
    }],
    mode: 'payment',
    success_url: `${YOUR_DOMAIN}/success`,
    cancel_url: `${YOUR_DOMAIN}/cancel`,
  });
  res.json({ id: session.id });
});
