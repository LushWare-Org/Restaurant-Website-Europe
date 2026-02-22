import { useContext, useState, useEffect } from "react";
import { AppContext } from "../context/AppContext";
import MenuCard from "./MenuCard";
import { Link } from "react-router-dom";
import { X, Gift } from "lucide-react";

const Menus = () => {
  const { menus, navigate, activeOffersCount } = useContext(AppContext);
  const previewMenus = menus.slice(0, 6);
  
  const [showVoucher, setShowVoucher] = useState(false);
  const [voucherIndex, setVoucherIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  // Get all offers from menus
  const allOffers = [];
  menus.forEach(menu => {
    if (menu.offers && menu.offers.length > 0) {
      menu.offers.forEach(offer => {
        if (!allOffers.find(o => o._id === offer._id)) {
          allOffers.push(offer);
        }
      });
    }
  });

  useEffect(() => {
    const handleScroll = () => {
      const menuSectionTop = document.querySelector('.menus-section')?.offsetTop || 0;
      const menuSectionHeight = document.querySelector('.menus-section')?.offsetHeight || 0;
      const scrollPos = window.scrollY;
      
      // Show voucher when scrolling in the menus section
      if (scrollPos > menuSectionTop + 300 && scrollPos < menuSectionTop + menuSectionHeight - 300) {
        setShowVoucher(true);
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }

      // Rotate through offers
      if (allOffers.length > 0) {
        const index = Math.floor((scrollPos / 200) % allOffers.length);
        setVoucherIndex(index);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [allOffers.length]);

  const currentOffer = allOffers[voucherIndex];

  return (
    <>
{/* Floating Voucher Card */}
{showVoucher && allOffers.length > 0 && (
  <div className={`fixed z-40 transition-all duration-700 ease-out
    /* Mobile: full-width bottom bar */
    bottom-0 left-0 right-0
    /* Desktop: floating card on right */
    sm:right-0 sm:bottom-24 sm:left-auto
    ${isVisible ? 'translate-y-0 opacity-100 sm:translate-x-0 sm:translate-y-0' : 'translate-y-full opacity-0 sm:translate-x-full sm:translate-y-0'}
  `}>
    <div className="
      bg-gradient-to-br from-amber-50 to-amber-100 border-t-2 border-[#C5A059] shadow-2xl relative overflow-hidden group
      /* Mobile: horizontal strip layout */
      flex items-center gap-3 p-3 rounded-none
      /* Desktop: card layout */
      sm:flex-col sm:items-stretch sm:rounded-lg sm:border-2 sm:p-8 sm:w-80 sm:mr-4 sm:mb-0
    ">

      {/* Decorative Gift Icon — hidden on mobile */}
      <div className="hidden sm:block absolute top-2 right-2 text-[#C5A059] opacity-30">
        <Gift size={40} />
      </div>

      {/* Close Button */}
      <button
        onClick={() => setShowVoucher(false)}
        className="absolute top-2 left-2 text-gray-400 hover:text-gray-600 transition-colors"
      >
        <X size={16} />
      </button>

      {/* Mobile: small gift icon inline */}
      <div className="sm:hidden flex-shrink-0 text-[#C5A059] ml-6">
        <Gift size={24} />
      </div>

      {/* Content */}
      <div className="relative z-10 flex-1 sm:pt-2">
        <p className="text-[10px] text-[#C5A059] font-black uppercase tracking-wider mb-0.5 sm:mb-1">
          🎉 Today's Offer
        </p>
        <h3 className="text-xs sm:text-sm font-bold text-stone-900 leading-tight line-clamp-1 sm:line-clamp-2 sm:mb-2">
          {currentOffer?.title}
        </h3>

        {/* Offer details — condensed on mobile */}
        <div className="flex items-center gap-2 sm:block sm:bg-white/60 sm:rounded sm:px-3 sm:py-2 sm:mb-3">
          {currentOffer?.offerType === "percentage" && (
            <p className="text-sm sm:text-lg font-black text-amber-700">
              {currentOffer.discountValue}% OFF
            </p>
          )}
          {currentOffer?.offerType === "fixed" && (
            <p className="text-sm sm:text-lg font-black text-amber-700">
              £{currentOffer.discountValue} OFF
            </p>
          )}
          {!["percentage", "fixed"].includes(currentOffer?.offerType) && (
            <p className="text-xs font-bold text-amber-700 capitalize">
              {currentOffer?.offerType.replace(/([A-Z])/g, ' $1')}
            </p>
          )}
          <p className="hidden sm:block text-[9px] text-stone-600 mt-1">
            {currentOffer?.description}
          </p>
        </div>
      </div>

      {/* Claim Button */}
      <button
        onClick={() => navigate('/rewards')}
        className="flex-shrink-0 cursor-pointer bg-gradient-to-r from-amber-700 to-amber-600 hover:from-amber-800 hover:to-amber-700 text-white text-[10px] font-black uppercase tracking-wider
          /* Mobile: compact pill */
          px-4 py-2 rounded-full
          /* Desktop: full width block */
          sm:w-full sm:py-2.5 sm:rounded
          transition-all duration-300 shadow-md"
      >
        Claim Now
      </button>
    </div>

    {/* Pulse Animation */}
    <div className="absolute inset-0 bg-gradient-to-r from-[#C5A059]/20 to-transparent rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
  </div>
)}

      {/* Main Menus Section */}
      <section
        className="relative z-10 min-h-screen py-24 px-6 sm:px-0 md:px-0 lg:px-0 bg-repeat menus-section"
        style={{ 
          backgroundImage: "url('/menubg.jpg')", 
          backgroundSize: "500px", 
          backgroundAttachment: "fixed" 
        }}
      >
      {/* The "Royal Vellum" Overlay - creates that thick, expensive paper feel */}
      <div className="absolute inset-0 bg-[#fdfcf9]/92 backdrop-blur-[0.5px]"></div>

      {/* Double Fine-Line Border - Signature of Mayfair establishments */}
      <div className="absolute inset-6 border border-[#d4af37]/10 pointer-events-none hidden lg:block"></div>
      <div className="absolute inset-10 border border-[#d4af37]/20 pointer-events-none hidden lg:block"></div>

      <div className="relative z-10 container mx-auto  max-w-[90rem]">
        
        {/* Header: Centered & Regal */}
        <div className="text-center mb-24">
          <div className="flex items-center justify-center gap-6 mb-6">
            <div className="h-[1px] w-16 bg-gradient-to-r from-transparent to-[#C5A059]"></div>
            <span className="text-[#C5A059] tracking-[0.6em] text-[10px] uppercase font-bold">
              Established MMXXVI
            </span>
            <div className="h-[1px] w-16 bg-gradient-to-l from-transparent to-[#C5A059]"></div>
          </div>

          <h2 className="text-4xl sm:text-4xl md:text-6xl lg:text-7xl font-light tracking-[0.05em] uppercase mb-6">
            Food You’ll  <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-700 via-amber-500 to-amber-700">Love</span>
          </h2>
          
          <div className="max-w-4xl mx-auto relative">
            {/* Quote marks for a literary feel */}
            <span className="absolute -top-4 -left-8 text-6xl text-stone-100 font-serif">“</span>
            <p className="text-stone-500 font-semibold font-serif italic text-2xl leading-relaxed">
              A menu of fresh, seasonal dishes made with quality ingredients from across the United Kingdom.
            </p>
            <span className="absolute -bottom-8 -right-8 text-6xl text-stone-100 font-serif">”</span>
          </div>
        </div>

        {/* The 12 Categories Grid - Refined to 3 columns for Premium impact */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-20">
          {previewMenus.map((menu) => (
            <div 
              key={menu._id} 
              className="relative group cursor-pointer"
            >



              
              <div className="relative ">
                {/* Your MenuCard Component */}
                <MenuCard menu={menu} />
              </div>


            </div>
          ))}
        </div>

        {menus.length > 6 && (
          <div className="mt-16 flex justify-center">
            <Link
              to="/menu"
              className="px-10 py-4 text-[11px] font-bold uppercase tracking-[0.3em] text-white bg-stone-900 hover:bg-[#B38728] transition-all duration-700 shadow-2xl"
            >
              View Full Menu
            </Link>
          </div>
        )}


      </div>
    </section>
    </>
  );
};
export default Menus;
