import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

import { sendPurchaseReceipt } from "@/emails";
import Order from "@/lib/db/models/order.model";

export async function POST(req: NextRequest) {
  let event;
  try {
    event = Stripe.webhooks.constructEvent(
      await req.text(),
      req.headers.get("stripe-signature") as string,
      process.env.STRIPE_WEBHOOK_SECRET as string
    );
  } catch (err) {
    console.error("Webhook signature verification failed.", err);
    return new NextResponse("Webhook signature verification failed", {
      status: 400,
    });
  }

  if (event.type === "charge.succeeded") {
    const charge = event.data.object;
    const orderId = charge.metadata.orderId;
    const email = charge.billing_details.email;
    const pricePaidInCents = charge.amount;

    // ✅ Pehle response bhej do
    const response = new NextResponse(JSON.stringify({ message: "Received" }), {
      status: 200,
    });

    // ✅ Baad me async processing karo
    process.nextTick(async () => {
      try {
        const order = await Order.findById(orderId).populate("user", "email");
        if (!order) {
          console.error("Order not found");
          return;
        }

        order.isPaid = true;
        order.paidAt = new Date();
        order.paymentResult = {
          id: event.id,
          status: "COMPLETED",
          email_address: email!,
          pricePaid: (pricePaidInCents / 100).toFixed(2),
        };
        await order.save();

        try {
          await sendPurchaseReceipt({ order }); // Email sending async
        } catch (err) {
          console.error("Email error:", err);
        }
      } catch (error) {
        console.error("Order update failed:", error);
      }
    });

    return response;
  }

  return new NextResponse();
}
