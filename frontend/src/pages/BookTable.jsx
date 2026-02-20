import { useContext, useState, useEffect } from "react";
import { AppContext } from "../context/AppContext";
import toast from "react-hot-toast";
import { Diamond } from "lucide-react";

const BookTable = () => {
  const { axios, navigate, user } = useContext(AppContext);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  
  // State for the "Shopping Cart" of seats
  const [selectedSeats, setSelectedSeats] = useState([]); // Array of strings like ["A0", "B5"]
  const [activeTable, setActiveTable] = useState("A"); // Which table is currently being viewed
  const [bookedSeats, setBookedSeats] = useState([]); // Seats already booked for selected date

  const [formData, setFormData] = useState({
    name: "", email: "", phone: "", date: "", time: "", note: "",
  });
  
  const [selectedDateForBooking, setSelectedDateForBooking] = useState(""); // Date picker for booking view

  // Restore booking details from localStorage on mount
  useEffect(() => {
    const savedSeats = localStorage.getItem("selectedSeats");
    const savedDate = localStorage.getItem("selectedDateForBooking");
    
    if (savedSeats) {
      setSelectedSeats(JSON.parse(savedSeats));
    }
    if (savedDate) {
      setSelectedDateForBooking(savedDate);
    }
  }, []);

  // Fetch booked seats when date changes
  const fetchBookedSeats = async (date) => {
    try {
      const { data } = await axios.get("/api/booking/booked-seats", {
        params: { date }
      });
      if (data.success) {
        setBookedSeats(data.bookedSeats);
      }
    } catch (error) {
      console.log("Error fetching booked seats:", error);
    }
  };

  // Auto-fill form when drawer opens
  useEffect(() => {
    if (isDrawerOpen) {
      // Use selected date from booking, or get current date in YYYY-MM-DD format
      const selectedDate = selectedDateForBooking || new Date().toISOString().split('T')[0];
      
      // Get current time in HH:MM format
      const now = new Date();
      const currentTime = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
      
      // Populate user details from context
      setFormData(prev => ({
        ...prev,
        name: user?.name || prev.name || "",
        email: user?.email || prev.email || "",
        phone: user?.phone || prev.phone || "",
        date: selectedDate,
        time: currentTime,
      }));
      
      // Fetch booked seats for the selected date
      fetchBookedSeats(selectedDate);
    }
  }, [isDrawerOpen, user, selectedDateForBooking]);

  // Fetch booked seats when date changes
  const handleDateChange = (e) => {
    const newDate = e.target.value;
    setFormData({...formData, date: newDate});
    fetchBookedSeats(newDate);
  };

  // Handle date selection from the main date picker
  const handleBookingDateChange = (e) => {
    const newDate = e.target.value;
    setSelectedDateForBooking(newDate);
    fetchBookedSeats(newDate);
  };

  const tableIDs = ["A", "B", "C", "D", "E", "F"];

  const toggleSeat = (tableId, seatIndex) => {
    const seatId = `${tableId}${seatIndex}`;
    
    // Must select date first
    if (!selectedDateForBooking) {
      return toast.error("Please select a booking date first.");
    }
    
    // Prevent selecting booked seats
    if (bookedSeats.includes(seatId)) {
      return toast.error("This seat is already booked for the selected date.");
    }
    
    if (selectedSeats.includes(seatId)) {
      setSelectedSeats(selectedSeats.filter(s => s !== seatId));
    } else {
      setSelectedSeats([...selectedSeats, seatId]);
    }
  };

  const removeSeat = (id) => {
    setSelectedSeats(selectedSeats.filter(s => s !== id));
  };

  const handleProceedClick = () => {
    if (!user) {
      // Save selected seats and date to localStorage before redirecting
      localStorage.setItem("selectedSeats", JSON.stringify(selectedSeats));
      localStorage.setItem("selectedDateForBooking", selectedDateForBooking);
      
      toast.error("Please log in to proceed with your booking.");
      navigate("/signup");
      return;
    }
    setIsDrawerOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (selectedSeats.length === 0) return toast.error("Please select at least one seat.");
    
    try {
      const payload = { ...formData, reservedSeats: selectedSeats };
      const { data } = await axios.post("/api/booking/create", payload);
      if (data.success) {
        toast.success("Your royal table is ready.");
        // Clear saved booking details from localStorage
        localStorage.removeItem("selectedSeats");
        localStorage.removeItem("selectedDateForBooking");
        navigate("/my-bookings");
      }
    } catch (error) {
      toast.error("An error occurred during booking.");
    }
  };

  return (
    <div className="min-h-screen bg-[#FFFFFF] text-[#1a1a1a]">
      {/* --- PREMIUM HERO SECTION --- */}
        <div
          className="relative h-[70vh] bg-cover bg-fixed bg-center flex items-center justify-center overflow-hidden"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1643066873594-4df339b2e232?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
          }}
        >
          <div className="absolute inset-0 bg-[#0a0a0a]/40 backdrop-blur-[1px]"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent  to-[#ffffff]"></div>
          
          <div className="relative text-center z-10 px-4">
            <span className="text-[#ffffff] uppercase tracking-[0.4em] text-xs mb-4 block font-medium animate-fade-in">
              Reserve Your Experience • Fine Dining
            </span>
            <h1 className="text-5xl md:text-8xl font-serif italic tracking-tight text-white mb-8">
              The <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500"  >Gourmet</span> Table
            </h1>


          </div>
        </div>
        {/* --- OVERLAPPING IMAGE SECTION --- */}
        <div className="relative max-w-6xl mx-auto px-6 -mt-32 z-10">
          <div className="bg-white  rounded-sm ">
              <img 
                src="/tablesview.png" 
                alt="System Architecture Layout" 
                className="w-full h-full object-contain "
              />
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-4 gap-12">
          
          {/* 2. TABLE & SEAT SELECTION SECTION */}
          <div className="lg:col-span-3">
            <h2 className="text-md uppercase font-medium tracking-widest text-gray-800 mb-8 border-b pb-4">01. Select Your Booking Date</h2>
            
            {/* Date Selector */}
            <div className="mb-10 p-6 bg-gradient-to-r from-[#f2d696]/10 to-[#c4a661]/10 border border-[#c4a661]/30 rounded-lg">
              <div className="flex flex-col sm:flex-row gap-6 items-center">
                <div className="flex-1">
                  <label className="text-[12px] uppercase tracking-[0.2em] text-gray-800 block mb-3">Select Date to Check Availability</label>
                  <input 
                    type="date" 
                    value={selectedDateForBooking}
                    onChange={handleBookingDateChange}
                    className="w-full cursor-pointer border border-gray-300 rounded px-4 py-3 focus:outline-none focus:border-[#c4a661] transition-colors"
                  />
                </div>
                {selectedDateForBooking && bookedSeats.length > 0 && (
                  <div className="text-center sm:text-right">
                    <p className="text-xs text-red-600 font-semibold uppercase">⚠ {bookedSeats.length} seats booked</p>
                    <p className="text-xs text-gray-600 mt-1">{9 * 6 - bookedSeats.length} seats available</p>
                  </div>
                )}
                {selectedDateForBooking && bookedSeats.length === 0 && (
                  <div className="text-center sm:text-right">
                    <p className="text-xs text-green-600 font-semibold uppercase">✓ All seats available</p>
                  </div>
                )}
              </div>
            </div>

            <h2 className="text-md uppercase font-medium tracking-widest text-gray-800 mb-8 border-b pb-4">02. Select Your Table & Seats</h2>
            
            {/* Table Selector Tabs */}
            <div className="flex space-x-4 mb-10 overflow-x-auto pb-2">
              {tableIDs.map((id) => (
                <button
                  key={id}
                  onClick={() => setActiveTable(id)}
                  className={`px-8 py-4 rounded-sm transition-all border font-serif text-xl
                    ${activeTable === id 
                      ? "bg-[#1a1a1a] text-[#f2d696] border-[#1a1a1a] scale-105 shadow-lg" 
                      : "bg-white text-gray-600 border-gray-100 hover:border-[#bc9437]"}`}
                >
                  Table {id}
                </button>
              ))}
            </div>

            {/* Seat Grid for Active Table */}
            <div className="grid grid-cols-3 md:grid-cols-3 gap-6 max-w-3xl mx-auto p-8 bg-[#FDFDFD] shadow-[0_10px_40px_rgba(0,0,0,0.04)] border border-gray-100 rounded-xl">
              {[...Array(9)].map((_, i) => {
                const seatId = `${activeTable}${i}`;
                const isSelected = selectedSeats.includes(seatId);
                const isBooked = selectedDateForBooking && bookedSeats.includes(seatId);
                
                return (
                  <button
                    key={seatId}
                    onClick={() => toggleSeat(activeTable, i)}
                    disabled={isBooked}
                    className={`relative group cursor-pointer h-28 flex flex-col items-center justify-center transition-all duration-500 rounded-sm border
                      ${isBooked
                        ? "bg-red-100 border-red-500 cursor-not-allowed opacity-90"
                        : isSelected 
                        ? "bg-[#121212] border-[#c4a661] shadow-2xl scale-105 z-10" // The Dark Mode Flip
                        : "bg-white border-gray-300 hover:border-[#c4a661]/40 hover:shadow-md"}`}
                  >
                    {/* Subtle Tracking label */}
                    <span className={`text-[12px] uppercase tracking-[0.25em] mb-2 font-medium transition-colors duration-300
                      ${isBooked ? 'text-red-600' : isSelected ? 'text-[#c4a661]' : 'text-gray-700'}`}>
                      {isBooked ? 'Booked' : 'Seat'}
                    </span>

                    {/* The Number */}
                    <span className={`text-4xl font-serif italic transition-colors duration-300
                      ${isBooked ? 'text-red-600' : isSelected ? 'text-white' : 'text-[#222]'}`}>
                      {String(i + 1).padStart(2, '0')}
                    </span>

                    {/* Luxury Selection Indicator for Selected Seats */}
                    {isSelected && (
                      <>
                        {/* Top gold accent line */}
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-[2px] bg-[#c4a661]" />
                        {/* Floating checkmark */}
                        <div className="absolute -top-2 -right-2 bg-[#c4a661] text-[#121212] rounded-full w-6 h-6 text-[10px] flex items-center justify-center font-bold shadow-lg border border-[#121212]">
                          ✓
                        </div>
                      </>
                    )}

                    {/* Booked Indicator */}
                    {isBooked && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-red-600 font-bold text-lg">✕</span>
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* 3. BOOKING SUMMARY & CTA */}
          <div className="lg:col-span-1">
            <div className="sticky top-10 bg-white border border-gray-500 p-8 ">
              <h2 className="text- text-gray-800 font-medium uppercase tracking-widest mb-6">Reservation Summary</h2>
              
              {selectedDateForBooking && (
                <div className="mb-6 p-4 bg-[#f2d696]/10 border border-[#c4a661]/30 rounded">
                  <p className="text-xs uppercase tracking-widest text-gray-700 mb-2">Selected Date:</p>
                  <p className="text-sm font-bold text-[#1a1a1a]">{new Date(selectedDateForBooking).toLocaleDateString()}</p>
                  <p className="text-xs text-gray-600 mt-2">
                    {bookedSeats.length > 0 
                      ? `${bookedSeats.length} seats booked` 
                      : 'All seats available'}
                  </p>
                </div>
              )}
              
              <div className="space-y-3 mb-8 min-h-[100px]">
                {selectedSeats.length === 0 ? (
                  <p className="text-gray-400 italic text-sm">No seats selected yet...</p>
                ) : (
                  <div className="flex flex-wrap gap-2">
                    {selectedSeats.map(seat => (
                      <span key={seat} className="bg-gray-100 text-[#1a1a1a] px-3 py-1 text-xs font-bold rounded-full flex items-center">
                        {seat} 
                        <button onClick={() => removeSeat(seat)} className="ml-2 text-gray-400 hover:text-red-500">×</button>
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <div className="border-t pt-6">
                <div className="flex justify-between mb-6">
                  <span className="text-gray-800 font-medium text-sm">Total Seats:</span>
                  <span className="font-bold">{selectedSeats.length}</span>
                </div>
                <button
                  disabled={selectedSeats.length === 0 || !selectedDateForBooking}
                  onClick={handleProceedClick}
                  className={`w-full py-4 px-2 cursor-pointer tracking-[0.1em] uppercase text-xs hover:scale-105 duration-500 font-bold transition-all
                    ${selectedSeats.length > 0 && selectedDateForBooking
                      ? "bg-[#1a1a1a] text-[#c4a661] hover:bg-[#c4a661] hover:text-white" 
                      : "bg-gray-100 text-gray-300 cursor-not-allowed"}`}
                  title={!selectedDateForBooking ? "Please select a date first" : ""}
                >
                  Proceed to Details
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* 4. THE ROYAL DRAWER (SLIDES FROM RIGHT) */}
        {isDrawerOpen && <div className={`fixed top-0 right-0 h-screen w-full sm:w-[500px] bg-white z-100 shadow-[-25px_0_60px_rgba(0,0,0,0.2)] transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] p-12 overflow-y-auto translate-x-0`}>
          
          <button onClick={() => setIsDrawerOpen(false)} className="text-gray-800 cursor-pointer hover:text-black mb-4 flex font-medium items-center gap-2 text-sm tracking-widest">
            ← BACK TO SELECTION
          </button>

          <h2 className="text-4xl font-serif font-semibold mb-2 italic">Guest Information</h2>
          <p className="text-[#ae8b39] text-xs  font-semibold tracking-[0.2em] uppercase mb-6 border-b border-gray-50 pb-4">
            Securing {selectedSeats.length} seats for your party
          </p>

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="space-y-2">
              <label className="text-[12px] uppercase tracking-[0.2em] text-gray-800">Reservation Name</label>
              <input required type="text" value={formData.name} onChange={(e)=>setFormData({...formData, name: e.target.value})} className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-[#c4a661] transition-colors" placeholder="e.g. Lord Byron" />
            </div>

            <div className="grid grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-[12px] uppercase tracking-[0.2em] text-gray-800">Email Address</label>
                <input required type="email" value={formData.email} onChange={(e)=>setFormData({...formData, email: e.target.value})} className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-[#c4a661]" />
              </div>
              <div className="space-y-2">
                <label className="text-[12px] uppercase tracking-[0.2em] text-gray-800">Phone</label>
                <input required type="tel" value={formData.phone} onChange={(e)=>setFormData({...formData, phone: e.target.value})} className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-[#c4a661]" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-[12px] uppercase tracking-[0.2em] text-gray-800">Arrival Date</label>
                <input required type="date" value={formData.date} onChange={handleDateChange} className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-[#c4a661]" />
              </div>
              <div className="space-y-2">
                <label className="text-[12px] uppercase tracking-[0.2em] text-gray-800">Time of Service</label>
                <input required type="time" value={formData.time} onChange={(e)=>setFormData({...formData, time: e.target.value})} className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-[#c4a661]" />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[12px] uppercase tracking-[0.2em] text-gray-800">Special Notes</label>
              <textarea rows="3" value={formData.note} onChange={(e)=>setFormData({...formData, note: e.target.value})} className="w-full bg-[#FAFAFA] border-none p-4 focus:outline-none focus:ring-1 focus:ring-[#c4a661] text-sm" placeholder="Allergies, anniversaries, or special preferences..."></textarea>
            </div>

            <button type="submit" className="w-full bg-[#1a1a1a] text-[#c4a661] py-5 mt-4 hover:bg-[#c4a661] hover:text-white transition-all duration-500 hover:scale-105 font-bold tracking-[0.3em] uppercase text-xs shadow-xl">
              Confirm Booking
            </button>
          </form>
        </div>
        }

        {/* Backdrop */}
        {isDrawerOpen && <div className="fixed inset-0 bg-black/50 backdrop-blur-md z-40 transition-opacity" onClick={() => setIsDrawerOpen(false)} />}
    </div>
  );
};

export default BookTable;