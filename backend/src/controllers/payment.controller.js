import { Order } from "../models/Order.model.js"
import { ApiError } from "../utils/apiError.js"
import { ApiResponse } from "../utils/apiResponse.js"
import { asyncHandler } from "../utils/asyncHandle.js"
import { razorpay } from "../utils/Razorpay.js"
import crypto from "crypto"

const CreateOrder = asyncHandler(async (req, res) => {
  const { orderId } = req.body
  if (!orderId) throw new ApiError(400, "orderId required")

  const order = await Order.findById(orderId).populate("test")
  if (!order) throw new ApiError(404, "Order not found")

  // If already has a Razorpay order, just reuse it
  if (order.razorpayOrderId) {
    return res
      .status(200)
      .json(
        new ApiResponse(200, {
          keyId: process.env.RAZORPAY_KEY_ID,
            // amount stored in paise
          amount: order.amount,
          currency: order.currency,
          razorpayOrderId: order.razorpayOrderId,
          orderId: order._id
        }, "existing razorpay order")
      )
  }

  // Create fresh Razorpay order
  if (!order.test?.price) {
    throw new ApiError(400, "Test price missing")
  }
  const basePaise = order.test.price * 100

  const rzpOrder = await razorpay.orders.create({
    amount: basePaise,
    currency: "INR",
    receipt: order._id.toString(),
    notes: {
      orderId: order._id.toString(),
      userId: order.user.toString()
    }
  })

  // Persist
  order.amount = basePaise
  order.currency = "INR"
  order.razorpayOrderId = rzpOrder.id
  order.paymentStatus = "PENDING"
  await order.save()

  return res
    .status(200)
    .json(
      new ApiResponse(200, {
        keyId: process.env.RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        razorpayOrderId: order.razorpayOrderId,
        orderId: order._id
      }, "created razorpay order")
    )
})

const verifyPayment = asyncHandler(async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature, orderId } = req.body
  if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature || !orderId) {
    throw new ApiError(400, "Missing verification fields")
  }

  const body = `${razorpay_order_id}|${razorpay_payment_id}`
  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
    .update(body)
    .digest("hex")

  const update = {
    razorpayPaymentId: razorpay_payment_id,
    razorpayOrderId: razorpay_order_id,
    razorpaySignature: razorpay_signature
  }

  if (expectedSignature !== razorpay_signature) {
    update.paymentStatus = "FAILED"
    await Order.findByIdAndUpdate(orderId, update)
    throw new ApiError(400, "Signature verification failed")
  }

  update.paymentStatus = "SUCCESS"
  update.paidAt = new Date()
  const order = await Order.findByIdAndUpdate(orderId, update, { new: true })

  return res
    .status(200)
    .json(new ApiResponse(200, { order }, "payment verified"))
})

export { CreateOrder, verifyPayment }