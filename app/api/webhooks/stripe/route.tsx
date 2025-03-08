import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'

import { sendPurchaseReceipt } from '@/emails'
import { connectToDatabase } from '@/lib/db'
import Order from '@/lib/db/models/order.model'


const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string)

export async function POST(req: NextRequest) {
  try {
    await connectToDatabase()
    const event = await stripe.webhooks.constructEvent(
      await req.text(),
      req.headers.get('stripe-signature') as string,
      process.env.STRIPE_WEBHOOK_SECRET as string
    )

    if (event.type === 'charge.succeeded') {
      const charge = event.data.object
      const orderId = charge.metadata.orderId
      const order = await Order.findById(orderId).populate('user', 'email')
      if (order == null) {
        return new NextResponse('Bad Request', { status: 400 })
      }

      order.isPaid = true
      order.paidAt = new Date()
      order.paymentResult = {
        id: event.id,
        status: 'COMPLETED',
        email_address: charge.billing_details.email!,
        pricePaid: (charge.amount / 100).toFixed(2),
      }
      await order.save()
      try {
        await sendPurchaseReceipt({ order })
      } catch (err) {
        console.error('Error sending email', err)
      }
      return NextResponse.json({
        message: 'updateOrderToPaid was successful',
      })
    }
    return new NextResponse('Event type not handled', { status: 400 })
  } catch (error) {
    console.error('Error processing Stripe webhook', error)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}

