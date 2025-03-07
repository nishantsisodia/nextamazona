'use server'

import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { connectToDatabase } from '@/lib/db'
import { sendPurchaseReceipt } from '@/emails'
import Order from '@/lib/db/models/order.model'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string)

export async function POST(req: NextRequest) {
  console.log('Webhook received') // Add logging

  try {
    // 1. First connect to database
    await connectToDatabase()
    console.log('Database connected')

    // 2. Verify Stripe signature
    const body = await req.text()
    const signature = req.headers.get('stripe-signature') as string

    const event = await stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET as string
    )

    console.log('Event type:', event.type)

    if (event.type === 'charge.succeeded') {
      const charge = event.data.object
      const orderId = charge.metadata.orderId
      const email = charge.billing_details.email
      const pricePaidInCents = charge.amount

      // 3. Find and update order with timeout
      const orderUpdatePromise = Order.findById(orderId)
        .populate('user', 'email')
        .maxTimeMS(5000) // Add timeout to MongoDB operation

      const order = await orderUpdatePromise

      if (!order) {
        console.error('Order not found:', orderId)
        return new NextResponse('Order not found', { status: 400 })
      }

      // 4. Update order
      order.isPaid = true
      order.paidAt = new Date()
      order.paymentResult = {
        id: event.id,
        status: 'COMPLETED',
        email_address: email!,
        pricePaid: (pricePaidInCents / 100).toFixed(2),
      }

      // 5. Save order with timeout
      await order.save({ wtimeout: 5000 })
      console.log('Order updated:', orderId)

      // 6. Send email in background
      Promise.resolve().then(async () => {
        try {
          await sendPurchaseReceipt({ order })
          console.log('Email sent successfully')
        } catch (err) {
          console.error('Email error:', err)
        }
      })

      return NextResponse.json({
        message: 'Order updated successfully',
        orderId: orderId
      })
    }

    return new NextResponse()
  } catch (error) {
    console.error('Webhook error:', error)
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    )
  }
}