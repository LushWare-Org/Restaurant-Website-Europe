import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";
import { toast } from "react-hot-toast";
import { User, Phone, Mail, Clock, Calendar, Users, Armchair, ChevronRight, Hash, MessageSquare } from "lucide-react";

const Bookings = () => {
  const { admin, axios, loading, setLoading } = useContext(AppContext);
  const [bookings, setBookings] = useState([]);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get("/api/booking/bookings");
      if (data.success) setBookings(data.bookings);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (bookingId, newStatus) => {
    try {
      setLoading(true);
      const { data } = await axios.put(`/api/booking/update-status/${bookingId}`, { status: newStatus });
      if (data.success) {
        toast.success("Guest Status Synchronized");
        fetchBookings();
      }
    } catch (error) {
      toast.error("Process failed");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (admin) fetchBookings();
  }, [admin]);

  return (
    <div className="bg-[#FAF9F6] min-h-screen py-16 px-6 font-sans text-gray-900">
      <div className="max-w-7xl mx-auto">
        
        {/* Minimalist Royal Header */}
        <header className="flex justify-between items-center mb-16">
          <div className="border-l-4 border-yellow-600 pl-6">
            <h1 className="text-4xl font-serif tracking-tight text-gray-900 uppercase">Daily Bookings</h1>
          </div>
          <div className="hidden sm:block">
            <div className="flex gap-8 text-right">
              <div>
                <p className="text-3xl font-bold font-serif">{bookings.length}</p>
                <p className="text-[12px] uppercase tracking-widest text-gray-500">Total Guests</p>
              </div>
              <div className="w-px h-10 bg-gray-300"></div>
              <div>
                <p className="text-3xl font-bold font-serif text-yellow-700">{bookings.filter(b => b.status === 'Pending').length}</p>
                <p className="text-[12px] uppercase tracking-widest text-gray-500">Waitlist</p>
              </div>
            </div>
          </div>
        </header>

        <div className="space-y-4">
          {bookings.map((booking) => {
            const formattedDate = new Date(booking.date).toLocaleDateString('en-GB', {
              day: '2-digit', month: 'short'
            });

            return (
              <div key={booking._id} className="group bg-white border border-gray-100 flex flex-col lg:flex-row items-stretch transition-all hover:border-yellow-600/30 hover:shadow-xl hover:shadow-gray-200/50">
                
                {/* Time & Party Size Block */}
                <div className="bg-gray-900 text-white p-6 lg:w-48 flex flex-row lg:flex-col justify-between items-center lg:justify-center gap-2">
                  <div className="text-center">
                    <p className="text-3xl font-serif tracking-tighter">{booking.time}</p>
                    <p className="text-[12px] uppercase tracking-widest opacity-80 font-bold">{formattedDate}</p>
                  </div>
                  <div className="h-px w-8 bg-yellow-600 my-3 hidden lg:block"></div>
                  <div className="flex flex-col items-center">
                    <span className="text-xl font-bold">{booking.numberOfPeople}</span>
                    <span className="text-[9px] uppercase opacity-80 tracking-widest">Guests</span>
                  </div>
                </div>

                {/* Main Content Info */}
                <div className="flex-1 p-6 md:p-8 flex flex-col md:grid md:grid-cols-12 gap-6 items-center">
                  
                  {/* Guest Profile */}
                  <div className="md:col-span-4 w-full border-r border-gray-50 pr-4">
                    <p className="text-[12px] uppercase tracking-widest text-gray-400 font-bold mb-1">Principal Guest</p>
                    <h3 className="text-xl font-medium tracking-tight mb-2">{booking.name}</h3>
                    <div className="flex font-semibold flex-wrap gap-3">
                       <span className="flex items-center gap-1 text-[12px] text-gray-500"><Phone size={12}/> {booking.phone}</span>
                       <span className="flex items-center gap-1 text-[12px] text-gray-500"><Mail size={12}/> {booking.email}</span>
                    </div>
                  </div>

                  {/* Seat & Note */}
                  <div className="md:col-span-4 w-full">
                    <div className="flex items-center gap-2 mb-2">
                      <Armchair size={18} className="text-yellow-700" />
                      <span className="text-md font-bold uppercase tracking-widest text-gray-700">
                        {booking?.reservedSeats?.length > 0 ? booking.reservedSeats.join(", ") : "Unassigned"}
                      </span>
                    </div>
                    {booking.note ? (
                      <div className="flex gap-2">
                        <MessageSquare size={18} className="text-gray-400 flex-shrink-0 mt-1" />
                        <p className="text-md text-gray-800 italic font-medium line-clamp-2">"{booking.note}"</p>
                      </div>
                    ) : (
                      <p className="text-[10px] text-gray-300 italic uppercase tracking-widest">No Special Requests</p>
                    )}
                  </div>

                  {/* Interactive Status Timeline */}
                  <div className="md:col-span-4 w-full flex flex-col items-end gap-3">
                    <div className="flex w-full items-center gap-2 max-w-[200px]">
                      <div className={`h-1.5 flex-1 rounded-full ${booking.status === 'Pending' ? 'bg-amber-400' : 'bg-gray-100'}`}></div>
                      <div className={`h-1.5 flex-1 rounded-full ${booking.status === 'Approved' ? 'bg-emerald-500' : 'bg-gray-100'}`}></div>
                      <div className={`h-1.5 flex-1 rounded-full ${booking.status === 'Cancelled' ? 'bg-red-500' : 'bg-gray-100'}`}></div>
                    </div>
                    <select
                      value={booking.status}
                      onChange={(e) => handleStatusChange(booking._id, e.target.value)}
                      className="bg-transparent border-b-2 border-gray-100 text-[12px] font-black uppercase tracking-[0.25em] py-1 cursor-pointer focus:ring-0 focus:border-yellow-600 transition-all"
                    >
                      <option value="Pending">Waiting</option>
                      <option value="Approved">Confirmed</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </div>

                </div>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
};

export default Bookings;