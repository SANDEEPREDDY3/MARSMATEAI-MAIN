

/* const express = require("express");
const Razorpay = require("razorpay");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors()); // Enable CORS so your frontend can access this server

// ✅ Razorpay instance with LIVE keys
const razorpay = new Razorpay({
  key_id: "rzp_live_2sE0V1MKb66dax",
  key_secret: "2z2WLj5MYKxTk3gYSBkt5Ab3" // Replace this with your Razorpay secret key
});

// 🔁 POST route to create an order
app.post("/create-order", async (req, res) => {
  const { amount } = req.body;

  try {
    const order = await razorpay.orders.create({
      amount: amount, // Amount in paisa
      currency: "INR",
      payment_capture: 1 // Auto-capture
    });

    res.status(200).json({ order });
  } catch (err) {
    console.error("Order creation error:", err);
    res.status(500).json({ error: "Failed to create order" });
  }
});

// 🟢 Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
*/