import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { Minus, Plus, UtensilsCrossed, X } from "lucide-react";
import toast from "react-hot-toast";

const Cart = () => {
  const { cart, totalPrice, navigate, removeFromCart, updateQuantity, user } =
    useContext(AppContext);

  if (!cart || !cart.items || cart.items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[500px] bg-[#FFFCF9] border border-[#E5D9C6] mx-auto max-w-4xl my-12 shadow-sm relative overflow-hidden">
        
        {/* Corner Accents (Optional for that Royal vibe) */}
        <div className="absolute top-0 left-0 w-16 h-16 border-t border-l border-[#A68966] opacity-30 m-4"></div>
        <div className="absolute bottom-0 right-0 w-16 h-16 border-b border-r border-[#A68966] opacity-30 m-4"></div>

        {/* Visual Centerpiece */}
        <div className="mb-8">
          <div className="relative inline-block">
            {/* Delicate, thin-stroke icon */}
            <UtensilsCrossed size={48} strokeWidth={1} className="text-[#A68966] mb-2" />
            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-8 h-[1px] bg-[#A68966]"></div>
          </div>
        </div>

        {/* Typography Suite */}
        <div className="text-center px-6">
          <h2 className="text-4xl font-serif font-medium italic text-[#1A1A1A] mb-4 tracking-tight">
            Your Order Awaits
          </h2>
          
          <p className="text-[#8C7E6A] font-medium text-[11px] uppercase tracking-[0.3em]  leading-loose max-w-sm mx-auto">
            Your meal is ready <br /> to be customized.
          </p>
        </div>

        {/* The "Menu" Button */}
        <div className="mt-12">
          <button 
            onClick={() => navigate("/menu")}
            className="px-10 py-4 bg-[#1A1A1A] text-white hover:bg-[#A68966] transition-all duration-500 shadow-xl group"
          >
            <span className="text-[10px] uppercase tracking-[0.5em] font-bold">
              View The Full Menu
            </span>
          </button>
        </div>
      </div>
    );
  }

  const handleCheckoutClick = () => {
    if (!user) {
      toast.error("Please log in to proceed with checkout.");
      navigate("/signup");
      return;
    }
    navigate("/checkout");
  };

  return (
    <div className="max-w-6xl mx-auto mt-16 px-4 mb-24">
      {/* Royal Header Section */}
      <div className="text-center mb-16">
        <span className="text-[10px] tracking-[0.5em] text-[#A68966] uppercase mb-4 block font-bold">
          Your Handpicked Choices
        </span>
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-[#1A1A1A] italic">
          The Order Hub
        </h1>
        <div className="w-24 h-[2px] bg-[#A68966] mx-auto mt-6 opacity-90"></div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
        {/* Items Gallery (Left Side) */}
        <div className="lg:col-span-8 space-y-12">
          {cart.items.map((item) => (
            <div 
              key={item._id} 
              className="flex flex-col sm:flex-row gap-8 pb-10 border-b-2 border-[#E8E1D9] items-start group"
            >
              {/* Elegant Framed Image */}
              <div className="relative w-full sm:w-48 aspect-square overflow-hidden bg-[#F9F7F5] border border-[#E8E1D9] rounded-sm">
                <img
                  src={item.menuItem.image}
                  alt={item.menuItem.name}
                  className="w-full h-full object-cover transition-transform "
                />
              </div>

              {/* Product Details */}
              <div className="flex-1 flex flex-col justify-between self-stretch py-1">
                <div>
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-3xl font-serif text-[#1A1A1A] font-bold mb-1 leading-tight tracking-tight">
                        {item.menuItem.name}
                      </h3>
                      <p className="text-[12px] uppercase tracking-[0.1em] text-[#A68966] font-medium mb-4">
                        Individual Portion • £{item.menuItem.price.toLocaleString()}
                      </p>
                    </div>
                    <button 
                      onClick={() => removeFromCart(item.menuItem._id)}
                      className="text-[#1A1A1A] opacity-90 hover:opacity-100 hover:text-red-700 transition-all p-1 cursor-pointer"
                      aria-label="Remove item"
                    >
                      <X size={24} strokeWidth={1.5} />
                    </button>
                  </div>
                </div>

                <div className="flex items-end justify-between mt-auto">
                  {/* Minimalist Quantity Toggle */}
                  <div className="flex items-center space-x-6 border border-[#E8E1D9] px-4 py-2 bg-white ">
                    <button
                      onClick={() => updateQuantity(item.menuItem._id, item.quantity - 1)}
                      className="text-[#1A1A1A] cursor-pointer hover:scale-110 transition-transform disabled:opacity-20"
                      disabled={item.quantity <= 1}
                    >
                      <Minus size={16} />
                    </button>
                    <span className="font-serif  font-semibold italic text-xl w-4 text-center text-[#1A1A1A]">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.menuItem._id, item.quantity + 1)}
                      className="text-[#1A1A1A] cursor-pointer hover:scale-110 transition-transform"
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                  
                  {/* Pricing Logic Fixed */}
                  <div className="text-right">
                    <span className="block text-[12px] font-bold text-[#A68966] uppercase tracking-[0.1em] mb-1">
                      Total Selection
                    </span>
                    <span className="text-2xl font-medium text-[#1A1A1A]">
                      £{(item.menuItem.price * item.quantity).toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary (Right Side / Sidebar) */}
        <div className="lg:col-span-4">
          <div className="bg-[#FBF9F6] border border-[#E8E1D9] p-8 sticky top-20">
            <h4 className="text-sm uppercase tracking-[0.3em] font-semibold text-[#1A1A1A] mb-8 border-b-2 border-[#E8E1D9] pb-4">
              Order Summary
            </h4>
            
            <div className="space-y-4 mb-10">
              <div className="flex justify-between font-semibold text-sm text-[#666]">
                <span>Subtotal</span>
                <span>£{totalPrice.toLocaleString()}</span>
              </div>

              <div className="pt-6 mt-6 border-t-2 border-[#E8E1D9] font-semibold flex justify-between items-baseline">
                <span className="text-lg font-serif italic text-[#1A1A1A]">Grand Total</span>
                <span className="text-3xl font-light text-[#1A1A1A]">£{totalPrice.toLocaleString()}</span>
              </div>
            </div>

            <button
              onClick={handleCheckoutClick}
              className="w-full bg-[#1A1A1A] cursor-pointer text-white py-5 group relative overflow-hidden transition-all hover:scale-105 duration-500 hover:bg-[#b77e3a]"
            >
              <span className="relative z-10 text-[11px] uppercase tracking-[0.2em] font-semibold">
                Proceed to Checkout
              </span>
            </button>

          </div>
        </div>
      </div>
    </div>
  );
};
export default Cart;
