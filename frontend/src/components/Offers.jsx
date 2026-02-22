import { useNavigate } from "react-router-dom";

const Offers = () => {
  const navigate = useNavigate();

  // Shiny gold gradient style for re-use
  const shinyGoldGradient = "bg-gradient-to-tr from-[#B8860B] via-[#F7EF8A] to-[#D4AF37]";

  return (
    <section className="relative py-16 md:py-24 bg-[#FCFBF7] text-black overflow-hidden px-6">
      


      <div className="max-w-8xl px-0 md:px-6 mx-auto">
        <div className="flex flex-col md:flex-row gap-10 md:gap-16 items-center">

          {/* Left Section */}
          <div className="w-full pl-2 md:pl-0 md:w-1/3 text-left">
            <h4 className="text-[#B8860B] font-black text-xs md:text-sm uppercase tracking-[0.4em] md:tracking-[0.5em] mb-3 md:mb-4">
              Customer Rewards
            </h4>

            <h2 className="text-4xl sm:text-5xl md:text-7xl font-serif font-bold leading-none uppercase mb-5 md:mb-6">
              Enjoy More <br /> <span>Every Visit</span>
            </h2>

            <div className={`w-16 md:w-20 h-1 mb-6 md:mb-8 ${shinyGoldGradient}`}></div>

            <p className="text-base md:text-lg font-bold text-gray-900 leading-relaxed uppercase tracking-tight">
              We love rewarding our guests. <br />
              Discover special offers, <br />
              exclusive treats, and <br />
              little extras made just for you.
            </p>
          </div>

          {/* Right Section */}
          <div className="w-full md:w-2/3 relative mt-8 md:mt-0">
            
            <div className="hidden md:block absolute -top-6 -left-6 w-full h-full border-2 border-[#F7EF8A]/60 -z-0 shadow-[0_0_15px_rgba(212,175,55,0.2)]" />

            <div className="relative z-10 bg-white border-[1px] border-[#D4AF37]/40 p-1 md:p-2 shadow-[20px_20px_60px_rgba(0,0,0,0.08)] md:shadow-[40px_40px_80px_rgba(0,0,0,0.08)]">

              <div className="bg-[#1A1A1A] text-[#D4AF37] p-8 sm:p-12 md:p-20 text-center relative overflow-hidden">
                
                {/* Subtle shimmer overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full animate-[shimmer_5s_infinite]" />

                <h3 className="text-2xl sm:text-3xl md:text-5xl font-serif font-black italic mb-4 md:mb-6 text-white">
                  Your <span className="bg-gradient-to-b from-[#F7EF8A] to-[#B8860B] bg-clip-text text-transparent">Rewards</span> Are Waiting
                </h3>

                <p className="text-base sm:text-xl md:text-3xl font-semibold font-serif text-gray-100 mb-8 md:mb-10 leading-relaxed italic">
                  Earn points, unlock special dishes, and enjoy exclusive benefits every time you dine with us.
                </p>

                <div className="flex flex-col items-center">
                  <button
                    onClick={() => navigate("/rewards")}
                    className={`group relative ${shinyGoldGradient} cursor-pointer text-black px-8 sm:px-12 py-4 sm:py-6 font-bold text-base sm:text-xl uppercase tracking-[0.3em] sm:tracking-[0.4em] transition-all duration-300 hover:brightness-110 hover:scale-105 w-full sm:w-auto shadow-[0_10px_20px_rgba(184,134,11,0.3)]`}
                  >
                    View Rewards
                  </button>

                  <div className="mt-6 md:mt-8 flex items-center gap-3 md:gap-4">
                    <span className="h-[1px] w-6 md:w-8 bg-gradient-to-r from-transparent to-[#F7EF8A]"></span>
                    <span className="text-[11px] md:text-[14px] uppercase font-black tracking-widest text-[#F7EF8A] text-center drop-shadow-md">
                      Available to All Guests
                    </span>
                    <span className="h-[1px] w-6 md:w-8 bg-gradient-to-l from-transparent to-[#F7EF8A]"></span>
                  </div>
                </div>

              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Offers;