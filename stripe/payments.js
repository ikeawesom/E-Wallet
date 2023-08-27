import stripe from "./config";

class Payment {
  async manual(amount) {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount,
      currency: "sgd",
    });

    return { clientSecret: paymentIntent.client_secret };
  }
}

export const stripePay = new Payment();
