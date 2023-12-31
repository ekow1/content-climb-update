import { getSession } from "@auth0/nextjs-auth0";
import StripeInit from 'stripe';

const stripe = StripeInit(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  try {
    const { user } = await getSession(req, res);

    const lineItems = [
      {
        price: process.env.STRIPE_PRODUCTA_ID,
        quantity: 1
      }
    ];

    const protocol = process.env.NODE_ENV === 'development' ? "http://" : "https://";
    const host = req.headers.host;

    const checkoutSession = await stripe.checkout.sessions.create({
      line_items: lineItems,
      mode: "payment",
      success_url: `${protocol}${host}/success`,
      cancel_url: `${protocol}${host}/cancel` ,
       payment_intent_data : {
        metadata:{
          sub : user.sub
        }},
        metadata :{
          sub : user.sub,
        }

       
    });

    console.log(checkoutSession);

    

    res.status(200).json({ session: checkoutSession });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
