const { Payment, Order } = require("../models");
const midtransClient = require("midtrans-client");

class PaymentController {
  // Initialize Midtrans client
  static snap = new midtransClient.Snap({
    isProduction: false, // Change to true in production
    serverKey: process.env.MIDTRANS_SERVER_KEY,
    clientKey: process.env.MIDTRANS_CLIENT_KEY,
  });

  // Create payment (initialize transaction)
  static async createPayment(req, res, next) {
    try {
      const { order_id, amount, method } = req.body;

      // Validate input
      if (!order_id || !amount || !method) {
        return res.status(400).json({ message: "Required fields are missing" });
      }

      const order = await Order.findByPk(order_id);
      if (!order) {
        return res.status(404).json({ message: "Order not found" });
      }

      // Generate Midtrans transaction parameters
      const transactionParams = {
        transaction_details: {
          order_id: `order-${order.id}-${Date.now()}`,
          gross_amount: amount,
        },
        customer_details: {
          email: req.user.email, // Assuming user is authenticated
          first_name: req.user.fullname,
        },
        payment_type: method, // e.g., "gopay", "bank_transfer", etc.
      };

      const transaction = await PaymentController.snap.createTransaction(transactionParams);

      // Save payment data to database
      const payment = await Payment.create({
        order_id,
        amount,
        status: "PENDING",
        method,
        transaction_id: transaction.transaction_id,
      });

      res.status(201).json({
        message: "Payment initiated successfully",
        payment,
        redirect_url: transaction.redirect_url, // For redirection to payment gateway
      });
    } catch (error) {
      next(error);
    }
  }

  // Handle Midtrans notification
  static async handleNotification(req, res, next) {
    try {
      const notification = req.body;

      const statusResponse = await PaymentController.snap.transaction.notification(notification);
      const { order_id, transaction_status, gross_amount } = statusResponse;

      // Find the payment record
      const payment = await Payment.findOne({
        where: { transaction_id: order_id },
      });

      if (!payment) {
        return res.status(404).json({ message: "Payment not found" });
      }

      // Update payment status
      let status;
      if (transaction_status === "settlement") {
        status = "SUCCESS";
      } else if (transaction_status === "pending") {
        status = "PENDING";
      } else if (transaction_status === "expire") {
        status = "EXPIRED";
      } else if (transaction_status === "cancel" || transaction_status === "deny") {
        status = "FAILED";
      }

      await payment.update({ status, payment_date: new Date() });

      // Optionally update order status
      if (status === "SUCCESS") {
        const order = await Order.findByPk(payment.order_id);
        await order.update({ payment_status: "PAID" });
      }

      res.status(200).json({ message: "Notification handled successfully" });
    } catch (error) {
      next(error);
    }
  }

  // Get all payments
  static async getPayments(req, res, next) {
    try {
      const payments = await Payment.findAll({
        attributes: { exclude: ["created_at", "updated_at"] },
        include: [{ model: Order, as: "order", attributes: ["id", "status", "total_price"] }],
      });

      res.status(200).json(payments);
    } catch (error) {
      next(error);
    }
  }

  // Get payment by ID
  static async getPaymentById(req, res, next) {
    try {
      const { id } = req.params;

      const payment = await Payment.findByPk(id, {
        include: [{ model: Order, as: "order", attributes: ["id", "status", "total_price"] }],
      });

      if (!payment) {
        return res.status(404).json({ message: "Payment not found" });
      }

      res.status(200).json(payment);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = PaymentController;
