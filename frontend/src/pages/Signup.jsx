import { useContext, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Fingerprint, ArrowRight, ChefHat, ArrowBigRight, ArrowRightIcon, Utensils } from "lucide-react";
import { AppContext } from "../context/AppContext";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";

const Auth = () => {
  const { loading, setLoading, axios, setUser, navigate } = useContext(AppContext);
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ 
    name: "", email: "", password: "", phone: "", address: "", city: "" 
  });

  const onChangeHandler = (e) => setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { data } = await axios.post("/api/auth/login", {
        email: formData.email,
        password: formData.password,
      });
      if (data.success) {
        setUser(data.user);
        toast.success(data.message);
        navigate("/");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Authentication Failed");
    } finally {
      setLoading(false);
    }
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { data } = await axios.post("/api/auth/register", formData);
      if (data.success) {
        toast.success(data.message);
        setIsLogin(true);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Registration Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#FAF9F6] flex items-center justify-center p-3 sm:p-4 md:p-10 font-sans selection:bg-[#A68966] selection:text-white">
      
      {/* BACKGROUND DECORATIVE ELEMENTS */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-[#A68966]/5 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-zinc-900/5 blur-[120px]" />
      </div>

      <div className="relative w-full max-w-7xl bg-white shadow-[0_40px_100px_-20px_rgba(0,0,0,0.08)] flex flex-col md:flex-row overflow-hidden border border-[#E8E1D9] md:h-[85vh]">
        
        {/* LEFT / TOP PANEL */}
        <div className="w-full md:w-[45%] md:h-full bg-black flex flex-col justify-between text-white relative overflow-hidden
          /* Mobile: compact top bar */
          px-6 py-8 sm:px-10 sm:py-10 md:p-20
        ">
          {/* Texture overlay */}
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.55] pointer-events-none z-10" />
          {/* Warm gradient bg */}
          <div className="absolute inset-0 bg-gradient-to-br from-stone-950 via-zinc-950 to-black" />
          
          {/* Gold orb */}
          <div className="absolute top-[20%] left-[10%] w-[300px] h-[300px] rounded-full bg-[#da9746]/20 blur-[100px]" />
          <div className="absolute bottom-[10%] right-0 w-[200px] h-[200px] rounded-full bg-amber-900/30 blur-[80px]" />

          {/* Top row: logo + toggle (mobile shows toggle here) */}
          <div className="relative z-10 flex items-start justify-between gap-4">
            {/* Logo */}
            <Link to="/" className="group flex items-center gap-3">
              <Utensils 
                className="text-[#da9746] group-hover:rotate-[360deg] transition-all duration-1000 shrink-0" 
                size={24} 
                strokeWidth={2} 
              />
              <div className="h-8 w-[1.5px] bg-gradient-to-b from-transparent via-[#da9746] to-transparent" />
              <div className="flex flex-col">
                <span className="text-[12px] tracking-[0.5em] font-bold uppercase text-[#da9746] leading-none mb-1">
                  Black
                </span>
                <span className="text-[11px] tracking-[0.3em] font-black italic text-stone-200 leading-none">
                  Pepper
                </span>
              </div>
            </Link>

            {/* Toggle button — visible on mobile, hidden on md+ (shown at bottom) */}
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="group flex md:hidden items-center gap-2 text-[10px] tracking-[0.25em] font-bold uppercase"
            >
              <span className="text-gray-300 group-hover:text-white transition-colors whitespace-nowrap">
                {isLogin ? "New?" : "Returning?"}
              </span>
              <span className="text-[#f1ba75] flex items-center gap-1 whitespace-nowrap">
                {isLogin ? "Register" : "Sign In"}
                <ArrowRight size={12} className="group-hover:translate-x-0.5 transition-transform" />
              </span>
            </button>
          </div>

          {/* Headline — compact on mobile */}
          <div className="relative z-10 mt-6 md:mt-0">
            <AnimatePresence mode="wait">
              <motion.div
                key={isLogin ? "login-txt" : "reg-txt"}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="text-4xl sm:text-5xl md:text-7xl font-serif italic text-white mb-3 md:mb-6 leading-tight">
                  {isLogin ? "Member" : "Guest"} <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 via-amber-600 to-amber-500 not-italic font-light">
                    Access
                  </span>
                </h2>
                <p className="text-gray-50 text-sm sm:text-base md:text-xl font-medium font-serif italic max-w-xs leading-relaxed">
                  {isLogin 
                    ? "Sign in to manage your reservations and dining experience."
                    : "Join our guest circle for priority reservations and exclusive dining updates."}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Bottom toggle — hidden on mobile (shown in top row), visible on md+ */}
          <div className="relative z-10 mt-8 md:mt-0 hidden md:block">
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="group flex items-center gap-4 text-[11px] tracking-[0.3em] font-bold uppercase transition-all"
            >
              <span className="text-gray-100 group-hover:text-white transition-colors">
                {isLogin ? "New Client?" : "Returning Client?"}
              </span>
              <div className="flex cursor-pointer items-center gap-2 text-[#f1ba75]">
                {isLogin ? "Create Account" : "Sign In"}
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </div>
            </button>
          </div>
        </div>

        {/* RIGHT / BOTTOM PANEL: FORM */}
        <div className="w-full md:w-[55%] md:h-full bg-white overflow-y-auto custom-scrollbar
          px-6 py-8 sm:px-10 sm:py-10 md:px-20 md:py-20
        ">
          <AnimatePresence mode="wait">
            <motion.div
              key={isLogin ? "login-form" : "reg-form"}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.5, ease: "circOut" }}
            >
              <div className="mb-8 md:mb-12">
                <p className="text-[#A68966] text-[10px] uppercase tracking-[0.4em] font-bold mb-2">Registry</p>
                <h3 className="text-3xl sm:text-4xl font-bold font-serif text-[#1A1A1A]">
                  {isLogin ? "Client Login" : "Guest Registration"}
                </h3>
              </div>

              <form className="space-y-7 md:space-y-10" onSubmit={isLogin ? handleLoginSubmit : handleRegisterSubmit}>
                {!isLogin && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-7 md:gap-10">
                    <ScrollInput label="Full Name" name="name" placeholder="E.g. Arthur Wellesley" value={formData.name} onChange={onChangeHandler} required />
                    <ScrollInput label="Phone Number" name="phone" placeholder="+44 20 ..." value={formData.phone} onChange={onChangeHandler} required />
                  </div>
                )}

                <ScrollInput label="Email Address" type="email" name="email" placeholder="client@firm.com" value={formData.email} onChange={onChangeHandler} required />
                <ScrollInput label="Password" type="password" name="password" placeholder="••••••••" value={formData.password} onChange={onChangeHandler} required />

                {!isLogin && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-7 md:gap-10">
                    <ScrollInput label="Address" name="address" placeholder="Street Name" value={formData.address} onChange={onChangeHandler} required />
                    <ScrollInput label="City" name="city" placeholder="London" value={formData.city} onChange={onChangeHandler} required />
                  </div>
                )}

                <div className="pt-4 md:pt-6">
                  <button 
                    disabled={loading}
                    type="submit" 
                    className="w-full cursor-pointer relative group bg-[#1A1A1A] text-white py-4 md:py-5 px-6 md:px-8 flex items-center justify-between overflow-hidden transition-all duration-500 hover:bg-[#a37237] disabled:opacity-60"
                  >
                    <span className="relative z-10 text-[10px] md:text-[11px] tracking-[0.5em] md:tracking-[0.6em] font-bold uppercase">
                      {loading ? "Authenticating..." : (isLogin ? "Confirm Login" : "Complete Registry")}
                    </span>
                    <ArrowRightIcon className="relative z-10 opacity-100 group-hover:opacity-100 transition-opacity shrink-0" size={18} />
                    <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                  </button>
                  

                </div>
              </form>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

const ScrollInput = ({ label, ...props }) => (
  <div className="group relative">
    <label className="text-[11px] md:text-[13px] uppercase tracking-[0.2em] font-bold text-gray-600 mb-2 md:mb-3 block group-focus-within:text-[#A68966] transition-colors">
      {label}
    </label>
    <div className="relative">
      <input 
        {...props}
        className="w-full bg-transparent border-b border-gray-300 pb-2 text-base md:text-lg text-[#1A1A1A] outline-none focus:border-[#1A1A1A] transition-all font-semibold font-serif placeholder:text-gray-400 placeholder:italic"
      />
      <div className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#A68966] group-focus-within:w-full transition-all duration-500" />
    </div>
  </div>
);

export default Auth;