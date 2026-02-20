import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";
import { toast } from "react-hot-toast";
import { ChevronDown, ChevronUp, Phone, CreditCard, Calendar, MapPin } from "lucide-react";

const Orders = () => {
  const { admin, axios, loading, setLoading } = useContext(AppContext);
  const [orders, setOrders] = useState([]);
  const [expandedOrders, setExpandedOrders] = useState({});

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get("/api/order/orders");
      if (data.success) {
        setOrders(data.orders);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      setLoading(true);
      const { data } = await axios.put(`/api/order/update-status/${orderId}`, {
        status: newStatus,
      });
      if (data.success) {
        toast.success(data.message);
        fetchOrders();
      }
    } catch (error) {
      toast.error("Failed to update status");
    } finally {
      setLoading(false);
    }
  };

  const toggleExpand = (orderId) => {
    setExpandedOrders((prev) => ({
      ...prev,
      [orderId]: !prev[orderId],
    }));
  };

  useEffect(() => {
    if (admin) fetchOrders();
  }, [admin]);

  return (
    <div className="bg-[#FCFBFA] min-h-screen py-16 px-4 sm:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Royal Header */}
        <header className="text-center mb-16">
          <h1 className="text-4xl font-serif font-semibold tracking-[0.2em] text-gray-900 uppercase">
            Order Details
          </h1>
          <div className="h-px w-32 bg-yellow-600 mx-auto mt-4"></div>
        </header>

        <div className="space-y-10">
          {orders.map((order) => {
            const isExpanded = expandedOrders[order._id];
            const visibleItems = isExpanded ? order.items : order.items?.slice(0, 2);
            const orderDate = new Date(order.createdAt).toLocaleDateString('en-GB', {
                day: '2-digit', month: 'short', year: 'numeric'
            });

            return (
              <div 
                key={order._id} 
                className="bg-white border border-gray-100 shadow-sm rounded-none overflow-hidden"
              >
                {/* 1. Header Section: Order Identity */}
                <div className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-4 gap-6 border-b border-gray-50">
                  <div className="space-y-1">
                    <p className="text-[12px] uppercase tracking-widest text-gray-400 font-bold">Customer Details</p>
                    <p className="text-lg font-semibold text-gray-900">{order?.user?.name || "Guest User"}</p>
                    <div className="flex font-medium  items-center gap-2 text-gray-500 text-sm">
                        <Phone size={12} className="text-yellow-700" />
                        <span>{order?.phone || order?.user?.phone || "N/A"}</span>
                    </div>
                  </div>
                  
                  <div className="space-y-1">
                    <p className="text-[12px] uppercase tracking-widest text-gray-400 font-bold">Delivery Address</p>
                    <div className="flex font-medium items-start gap-2 text-sm text-gray-600">
                        <MapPin size={14} className="mt-0.5 flex-shrink-0" />
                        <p className="leading-relaxed line-clamp-2">{order?.address}</p>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <p className="text-[12px] uppercase tracking-widest text-gray-400 font-bold">Total Bill</p>
                    <p className="text-lg font-bold text-gray-900">£{order?.totalAmount?.toFixed(2)}</p>
                    <div className="flex items-center font-medium gap-2 text-gray-500 text-xs">
                        <CreditCard size={12} />
                        <span>{order?.paymentMethod}</span>
                    </div>
                  </div>

                  <div className="flex flex-col md:items-end justify-center gap-3">
                    <div className="flex items-center gap-2 text-[12px] text-gray-600 uppercase font-bold tracking-tighter">
                        <Calendar size={12} />
                        {orderDate}
                    </div>
                    <select
                      value={order.status}
                      onChange={(e) => handleStatusChange(order._id, e.target.value)}
                      disabled={loading}
                      className={`text-xs font-bold border border-amber-500 uppercase tracking-widest border-none rounded-full px-5 py-2 cursor-pointer shadow-sm transition-all
                        ${order.status === 'Delivered' ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'}`}
                    >
                      <option value="Pending">Pending</option>
                      <option value="Preparing">Preparing</option>
                      <option value="Delivered">Delivered</option>
                    </select>
                  </div>
                </div>

                {/* 2. Items List: Software/Services */}
                <div className="p-6 bg-[#FAFAFA]">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {visibleItems?.map((item, idx) => (
                      <div key={idx} className="flex items-center gap-4 bg-white p-4 border border-gray-100 rounded-sm">
                        <div className="relative">
                            <img 
                            src={item?.menuItem?.image} 
                            alt="" 
                            className="w-18 h-18 object-cover rounded-sm border border-gray-50"
                            />
                            <span className="absolute -top-2 -right-2 bg-gray-900 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full">
                                {item?.quantity}
                            </span>
                        </div>
                        <div className="flex-1">
                          <p className="text-md font-bold text-gray-800 uppercase tracking-tight">
                            {item?.menuItem?.name}
                          </p>
                          <p className="text-xs font-bold text-gray-400 ">Unit Price: £{item?.menuItem?.price}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* 3. Footer: Expand Logic */}
                  {order.items?.length > 2 && (
                    <div className="mt-6 flex justify-center">
                        <button
                        onClick={() => toggleExpand(order._id)}
                        className="flex cursor-pointer items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 hover:text-yellow-700 transition-all"
                        >
                        {isExpanded ? (
                            <><ChevronUp size={14} /> Collapse Details</>
                        ) : (
                            <><ChevronDown size={14} /> View Full Manifest ({order.items.length} Items)</>
                        )}
                        </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Orders;