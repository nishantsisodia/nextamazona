// Webhook route file (e.g., /api/webhooks/stripe.ts)

import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'

import { sendPurchaseReceipt } from '@/emails'
import Order from '@/lib/db/models/order.model'

// Stripe instance
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string)

export const config = {
  api: {
    bodyParser: false, // Disable body parsing for this API route
  },
}

export async function POST(req: NextRequest) {
  try {
    const event = await stripe.webhooks.constructEvent(
      await req.text(), // Raw body for signature verification
      req.headers.get('stripe-signature') as string,
      process.env.STRIPE_WEBHOOK_SECRET as string
    )

    // Handle event type
    if (event.type === 'charge.succeeded') {
      const charge = event.data.object
      const orderId = charge.metadata.orderId
      const order = await Order.findById(orderId).populate('user', 'email')

      if (order == null) {
        return new NextResponse('Bad Request', { status: 400 })
      }

      // Update order status
      order.isPaid = true
      order.paidAt = new Date()
      await order.save()

      try {
        // Send receipt email
        await sendPurchaseReceipt({ order })
      } catch (err) {
        console.log('Email error', err)
      }

      return new NextResponse('Webhook processed successfully', { status: 200 })
    }

    // If the event type is not handled, return no content
    return new NextResponse('Webhook event type not handled', { status: 200 })
  } catch (err) {
    console.error('Webhook Error:', err)
    return new NextResponse('Webhook Error', { status: 500 })
  }
}
