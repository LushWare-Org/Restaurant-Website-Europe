import Order from "../models/orderModel.js";
import Booking from "../models/bookingModel.js";
import User from "../models/userModel.js";

export const getDashboardStats = async (req, res) => {
  try {
    // Get today's date in the same format as stored in bookings
    const today = new Date().toISOString().split('T')[0];

    const [
      pendingOrders,
      pendingBookings,
      totalOrders,
      totalBookings,
      totalCustomers,
      todayBookings,
      orders,
      recentOrders,
      recentBookings
    ] = await Promise.all([
      Order.countDocuments({ status: "Pending" }),
      Booking.countDocuments({ status: "Pending" }),
      Order.countDocuments(),
      Booking.countDocuments(),
      User.countDocuments(),
      Booking.countDocuments({ date: today }),
      Order.find().select('totalAmount'),
      Order.find()
        .populate('user', 'name')
        .sort({ createdAt: -1 })
        .limit(3)
        .select('_id user totalAmount status createdAt'),
      Booking.find()
        .populate('user', 'name')
        .sort({ createdAt: -1 })
        .limit(3)
        .select('_id user name time numberOfPeople date')
    ]);

    // Calculate total revenue from all orders
    const totalRevenue = orders.reduce((sum, order) => sum + (order.totalAmount || 0), 0);

    res.status(200).json({
      success: true,
      stats: {
        pendingOrders,
        pendingBookings,
        totalOrders,
        totalBookings,
        totalCustomers,
        todayBookings,
        totalRevenue
      },
      recentOrders: recentOrders.map(order => ({
        id: order._id,
        customer: order.user?.name || 'Guest',
        total: order.totalAmount,
        status: order.status
      })),
      recentBookings: recentBookings.map(booking => ({
        id: booking._id,
        name: booking.name,
        time: booking.time,
        party: `${booking.numberOfPeople} guests`,
        date: booking.date
      }))
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
