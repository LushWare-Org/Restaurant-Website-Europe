import { useContext, useState, useEffect } from "react";
import { AppContext } from "../context/AppContext";
import { 
  ShieldCheck, Clock, Users, MapPin, 
  MessageSquare, Phone, Mail, Hash, 
  History, ArrowRight 
} from "lucide-react";

const MyBookings = () => {
  const { axios } = useContext(AppContext);
  const [bookings, setBookings] = useState([]);

  const fetchBookings = async () => {
    try {
      const { data } = await axios.get("/api/booking/my-bookings");
      if (data.success) {
        setBookings(data.bookings);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  return (
    <div className="max-w-7xl mx-auto mt-24 px-6 mb-40 font-sans">
      {/* Royal Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-16 border-b-2 border-[#1A1A1A] pb-10">
        <div className="text-center md:text-left">
          <p className="text-[#A68966] text-[12px] uppercase tracking-[0.3em] font-bold mb-2">
            Table Reservations
          </p>
          <h1 className="text-5xl font-semibold font-serif text-[#1A1A1A] italic tracking-tight">
            Your Bookings
          </h1>
        </div>
        <div className="hidden md:flex items-center gap-12">
          
          <div className="w-[1px] h-10 bg-[#E8E1D9]"></div>
          <div className="text-center">
            <p className="text-[12px] uppercase text-[#8C7E6A] font-medium tracking-widest mb-1">Total Bookings</p>
            <p className="text-lg  font-bold text-[#1A1A1A]">{bookings.length.toString().padStart(2, '0')}</p>
          </div>
        </div>
      </div>

      <div className="space-y-12">
        {bookings.map((booking) => (
          <div key={booking._id} className="relative group">
            {/* Background Serial Number (Royal Detail) */}
            <span className="absolute -top-6 -left-2 text-[80px] font-serif italic text-[#F9F7F5] -z-10 select-none opacity-50">
              {bookings.indexOf(booking) + 1}
            </span>

            <div className="grid grid-cols-1 lg:grid-cols-12 bg-white border-2 border-[#E8E1D9] group-hover:border-[#A68966] transition-all duration-500 ">
              
              {/* SECTION 1: IDENTITY (3 Cols) */}
              <div className="lg:col-span-3 p-8 bg-[#FBF9F6] border-b lg:border-b-0 lg:border-r border-[#E8E1D9]">
                <div className="flex items-center justify-between  mb-6">
                  <div className="bg-[#1A1A1A] text-white px-3 py-1.5 text-center min-w-[60px]">
                    <p className="text-[12px] uppercase font-bold tracking-tighter opacity-80">
                      {new Date(booking.date).toLocaleDateString('en-GB', { month: 'short' })}
                    </p>
                    <p className="text-xl  leading-none">
                      {new Date(booking.date).toLocaleDateString('en-GB', { day: '2-digit' })}
                    </p>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-[#A68966] font-bold leading-none mb-1">Status</p>
                    <p className={`text-lg font-serif font-bold italic ${
                      booking.status === "Approved" ? "text-emerald-700" : "text-amber-700"
                    }`}>
                      {booking.status}
                    </p>
                  </div>
                </div>
                <h3 className="text-2xl font-serif italic font-semibold text-[#1A1A1A] font-bold mb-4 leading-tight">
                  {booking.name}
                </h3>
                <div className="space-y-2">
                  <p className="flex items-center font-semibold gap-3 text-[13px] text-[#666]">
                    <Phone size={14} className="text-[#A68966]" /> {booking.phone}
                  </p>
                  <p className="flex items-center gap-3 font-semibold text-[12px] text-[#666] break-all">
                    <Mail size={14} className="text-[#A68966]" /> {booking.email}
                  </p>
                </div>
              </div>

              {/* SECTION 2: LOGISTICS (6 Cols) */}
              <div className="lg:col-span-6 p-8 grid grid-cols-2 gap-8">
                <div className="space-y-1">
                  <p className="text-[12px] uppercase text-[#A68966] font-bold tracking-widest flex items-center gap-2">
                    <Clock size={14} /> Reservation Details
                  </p>
                  <p className="text-sm font-medium text-[#1A1A1A]">
                    {new Date(booking.date).toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' })}
                    <span className="block text-[12px] text-[#8C7E6A] font-medium">At {booking.time} Hours</span>
                  </p>
                </div>

                <div className="space-y-1">
                  <p className="text-[12px] uppercase text-[#A68966] font-bold tracking-widest flex items-center gap-2">
                    <Users size={14} /> Guests
                  </p>
                  <p className="text-sm font-medium text-[#1A1A1A]">{booking.numberOfPeople} People</p>
                </div>

                <div className="col-span-2 space-y-3 pt-4 border-t-2 border-[#F1F1F1]">
                  <p className="text-[12px] uppercase text-[#A68966] font-bold tracking-widest flex items-center gap-2">
                    <MapPin size={14} /> Selected Seats
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {booking.reservedSeats.map((seat, i) => (
                      <span key={i} className="px-4 py-1.5 bg-[#1A1A1A] text-white text-[10px] font-mono tracking-widest">
                        Seat_{seat}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* SECTION 3: SYSTEM AUDIT (3 Cols) */}
              <div className="lg:col-span-3 p-8 flex flex-col justify-between bg-white lg:border-l border-[#E8E1D9]">
                <div>
                  <p className="text-[12px] uppercase text-[#A68966] font-bold tracking-widest flex items-center gap-2 mb-3">
                    <MessageSquare size={14} /> Special Note
                  </p>
                  <p className="text-[20px] italic font-bold text-[#666] leading-relaxed font-serif">
                    {booking.note ? `"${booking.note.trim()}"` : "Formal instructions pending."}
                  </p>
                </div>

                <div className="mt-8 pt-6 border-t-2 border-[#F1F1F1]">
                  <div className="flex items-center gap-2 text-[12px] text-gray-400 mb-2">
                    <History size={12} /> 
                    <span>Last Synced: {new Date(booking.updatedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                  </div>
                  <button className="group/btn flex items-center justify-between w-full text-[10px] uppercase tracking-[0.3em] font-bold text-[#1A1A1A] hover:text-[#A68966] transition-colors">
                    Access Profile <ArrowRight size={14} className="group-hover/btn:translate-x-2 transition-transform" />
                  </button>
                </div>
              </div>

            </div>

            {/* Unique System ID Footer */}
            <div className="mt-2 flex justify-end">
              <span className="text-[9px] font-mono text-[#E8E1D9] uppercase group-hover:text-[#A68966] transition-colors">
                Registry Hash: {booking._id}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyBookings;