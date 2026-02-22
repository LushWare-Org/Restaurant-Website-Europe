import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";
import { useNavigate } from "react-router-dom";
import {
  TrendingUp,
  Users,
  ShoppingBag,
  CalendarDays,
  PlusCircle,
  ClipboardList,
  ChefHat,
} from "lucide-react";

const Dashboard = () => {
  const { axios } = useContext(AppContext);
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalOrders: 0,
    todayBookings: 0,
    totalCustomers: 0,
    totalRevenue: 0,
  });
  const [recentOrders, setRecentOrders] = useState([]);
  const [recentBookings, setRecentBookings] = useState([]);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { data } = await axios.get("/api/dashboard/stats");
        if (data.success) {
          setStats({
            totalOrders: data.stats.totalOrders,
            todayBookings: data.stats.todayBookings,
            totalCustomers: data.stats.totalCustomers,
            totalRevenue: data.stats.totalRevenue,
          });
          setRecentOrders(data.recentOrders || []);
          setRecentBookings(data.recentBookings || []);
        }
      } catch (error) {
        console.log("Error fetching dashboard stats:", error);
      }
    };

    fetchStats();
  }, []);

  const statsData = [
    {
      title: "Total Orders",
      value: stats.totalOrders.toLocaleString(),
      trend: "+12%",
      icon: ShoppingBag,
    },
    {
      title: "Today Bookings",
      value: stats.todayBookings.toString(),
      trend: "+6%",
      icon: CalendarDays,
    },
    {
      title: "Total Customers",
      value: stats.totalCustomers.toLocaleString(),
      trend: "+18%",
      icon: Users,
    },
    {
      title: "Total Revenue",
      value: `£${stats.totalRevenue.toFixed(2)}`,
      trend: "+9%",
      icon: TrendingUp,
    },
  ];

  const quickActions = [
    {
      title: "Add Menu Item",
      description: "Create seasonal dishes and promos.",
      icon: ChefHat,
      onClick: () => navigate("/admin/add-menu"),
    },
    {
      title: "Add Category",
      description: "Organize menu sections in seconds.",
      icon: PlusCircle,
      onClick: () => navigate("/admin/add-category"),
    },
    {
      title: "Review Orders",
      description: "Track prep and delivery status.",
      icon: ClipboardList,
      onClick: () => navigate("/admin/orders"),
    },
  ];

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-stone-400">
            Admin Overview
          </p>
          <h1 className="text-3xl font-semibold text-stone-900">
            Black Pepper Dashboard
          </h1>
        </div>
        <div className="rounded-2xl border border-stone-200 bg-white px-4 py-3 text-sm text-stone-500 shadow-sm">
          Tonight capacity: <span className="font-semibold text-stone-900">78%</span>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {statsData.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.title}
              className="rounded-2xl border border-stone-200 bg-white p-5 shadow-sm"
            >
              <div className="flex items-center justify-between">
                <div className="h-10 w-10 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center">
                  <Icon size={20} />
                </div>
                <span className="text-xs font-semibold text-emerald-600">
                  {item.trend}
                </span>
              </div>
              <p className="mt-4 text-sm text-stone-500">{item.title}</p>
              <p className="text-2xl font-semibold text-stone-900">{item.value}</p>
            </div>
          );
        })}
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        <div className="rounded-3xl border border-stone-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-stone-900">
              Quick Actions
            </h2>
            <span className="text-xs text-stone-400">Last updated 5m ago</span>
          </div>
          <div className="mt-5 grid gap-4 md:grid-cols-3">
            {quickActions.map((action) => {
              const Icon = action.icon;
              return (
                <div
                  key={action.title}
                  onClick={action.onClick}
                  className="rounded-2xl border border-stone-200 bg-stone-50 p-4 cursor-pointer hover:bg-stone-100 transition-colors"
                >
                  <div className="h-9 w-9 rounded-xl bg-stone-900 text-white flex items-center justify-center">
                    <Icon size={18} />
                  </div>
                  <h3 className="mt-4 text-sm font-semibold text-stone-900">
                    {action.title}
                  </h3>
                  <p className="mt-2 text-xs text-stone-500">
                    {action.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        <div className="rounded-3xl border border-stone-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-stone-900">Service Snapshot</h2>
          <div className="mt-4 space-y-4 text-sm">
            <div className="flex items-center justify-between rounded-2xl bg-stone-50 px-4 py-3">
              <span className="text-stone-500">Active tables</span>
              <span className="font-semibold text-stone-900">6</span>
            </div>
            <div className="flex items-center justify-between rounded-2xl bg-stone-50 px-4 py-3">
              <span className="text-stone-500">Kitchen queue</span>
              <span className="font-semibold text-stone-900">7 tickets</span>
            </div>
            <div className="flex items-center justify-between rounded-2xl bg-stone-50 px-4 py-3">
              <span className="text-stone-500">Avg. prep time</span>
              <span className="font-semibold text-stone-900">18 min</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-3xl border border-stone-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-stone-900">Recent Orders</h2>
          <div className="mt-5 space-y-3">
            {recentOrders.length > 0 ? (
              recentOrders.map((order) => (
                <div
                  key={order.id}
                  className="flex items-center justify-between rounded-2xl border border-stone-100 px-4 py-3"
                >
                  <div>
                    <p className="text-sm font-semibold text-stone-900">
                      {order.customer}
                    </p>
                    <p className="text-xs text-stone-400">
                      #{order.id.slice(-6)} · {order.status}
                    </p>
                  </div>
                  <span className="text-sm font-semibold text-stone-900">
                    £{order.total.toFixed(2)}
                  </span>
                </div>
              ))
            ) : (
              <p className="text-sm text-stone-400 text-center py-4">No recent orders</p>
            )}
          </div>
        </div>

        <div className="rounded-3xl border border-stone-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-stone-900">Recent Bookings</h2>
          <div className="mt-5 space-y-3">
            {recentBookings.length > 0 ? (
              recentBookings.map((booking) => (
                <div
                  key={booking.id}
                  className="flex items-center justify-between rounded-2xl border border-stone-100 px-4 py-3"
                >
                  <div>
                    <p className="text-sm font-semibold text-stone-900">
                      {booking.name}
                    </p>
                    <p className="text-xs text-stone-400">
                      #{booking.id.slice(-6)} · {booking.party}
                    </p>
                  </div>
                  <span className="text-sm font-semibold text-stone-900">
                    {booking.time}
                  </span>
                </div>
              ))
            ) : (
              <p className="text-sm text-stone-400 text-center py-4">No recent bookings</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
