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
        <div className={`fixed right-0 bottom-24 z-40 transition-all duration-700 ease-out ${
          isVisible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
        }`}>
          <div className="bg-gradient-to-br from-amber-50 to-amber-100 border-2 border-[#C5A059] rounded-lg shadow-2xl p-4 w-72 mr-4 relative overflow-hidden group">
            
            {/* Decorative Elements */}
            <div className="absolute top-2 right-2 text-[#C5A059] opacity-20">
              <Gift size={40} />
            </div>

            {/* Close Button */}
            <button 
              onClick={() => setShowVoucher(false)}
              className="absolute top-2 left-2 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X size={16} />
            </button>

            {/* Content */}
            <div className="relative z-10 pt-2">
              <p className="text-[10px] text-[#C5A059] font-black uppercase tracking-wider mb-1">
                🎉 Today's Offer
              </p>
              
              <h3 className="text-sm font-bold text-stone-900 mb-2 line-clamp-2">
                {currentOffer?.title}
              </h3>

              {/* Offer Details */}
              <div className="bg-white/60 rounded px-3 py-2 mb-3">
                {currentOffer?.offerType === "percentage" && (
                  <p className="text-lg font-black text-amber-700">
                    {currentOffer.discountValue}% OFF
                  </p>
                )}
                {currentOffer?.offerType === "fixed" && (
                  <p className="text-lg font-black text-amber-700">
                    £{currentOffer.discountValue} OFF
                  </p>
                )}
                {!["percentage", "fixed"].includes(currentOffer?.offerType) && (
                  <p className="text-sm font-bold text-amber-700 capitalize">
                    {currentOffer?.offerType.replace(/([A-Z])/g, ' $1')}
                  </p>
                )}
                <p className="text-[9px] text-stone-600 mt-1">
                  {currentOffer?.description}
                </p>
              </div>

              {/* Claim Button */}
              <button
                onClick={() => navigate('/rewards')}
                className="w-full cursor-pointer bg-gradient-to-r from-amber-700 to-amber-600 hover:from-amber-800 hover:to-amber-700 text-white text-[10px] font-black uppercase tracking-wider py-2.5 rounded transition-all duration-300 shadow-md"
              >
                Claim Now
              </button>
            </div>

            {/* Pulse Animation */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#C5A059]/20 to-transparent rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          </div>
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
