const stripe = require("stripe")(process.env.NEXT_PUBLIC_STRIPE_SECRET_TEST);

export default stripe;
