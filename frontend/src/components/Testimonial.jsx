import React, { useEffect, useRef } from "react";
import { motion, animate, useMotionValue } from "framer-motion";
import { Quote } from "lucide-react";

const testimonials = [
  {
    name: "Donald Jackman",
    role: "Culinary Critic",
    image: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=200",
    text: "The ambiance is matched only by the exquisite plating. A truly regal dining experience."
  },
  {
    name: "Elena Rossi",
    role: "Lifestyle Blogger",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200",
    text: "It feels like dining in a royal palace in the heart of Rome. The truffles are world-class."
  },
  {
    name: "Marcus Thorne",
    role: "Food Photographer",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200",
    text: "From a visual standpoint, it's perfection. The textures of the food are a photographer's dream."
  },
  {
    name: "Sophia Von Berg",
    role: "Event Planner",
    image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?q=80&w=200",
    text: "The attention to detail in the décor and the menu is simply breathtaking. Highly recommended."
  },
  {
    name: "James Washington",
    role: "Marketing Manager",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200",
    text: "Unparalleled European elegance. The perfect venue for sophisticated business dinners."
  },
  {
    name: "Isabella Montagne",
    role: "Sommelier",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200",
    text: "The wine cellar is a masterpiece of curation. A rare find even by European standards."
  }
];

export default function Testimonial() {
  const fullTrack = [...testimonials, ...testimonials, ...testimonials];
  const x = useMotionValue(0);
  const controlsRef = useRef(null);

  // Detect mobile for tighter scroll distance
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
  const cardWidth = isMobile ? 300 : 450;
  const cardGap = isMobile ? 24 : 64;
  const scrollDist = (cardWidth + cardGap) * testimonials.length;

  useEffect(() => {
    const controls = animate(x, [0, -scrollDist], {
      duration: isMobile ? 100 : 160,
      repeat: Infinity,
      ease: "linear",
    });

    controlsRef.current = controls;
    return () => controls.stop();
  }, [x]);

  const handleHoverStart = () => controlsRef.current?.pause();
  const handleHoverEnd = () => controlsRef.current?.play();

  return (
    <section className="bg-[#fcfaf8] py-16 md:py-32 overflow-hidden relative border-t border-b border-[#eeeae5] rounded-b-3xl md:rounded-b-3xl lg:rounded-b-4xl">

      <div className="relative z-10 text-center mb-12 md:mb-24 px-4">
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light tracking-[0.05em] uppercase mb-3 md:mb-4">
          What our guests{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-700 via-amber-500 to-amber-700">
            love
          </span>
        </h2>
        <p className="mt-2 text-gray-900 font-serif italic font-semibold uppercase tracking-[0.15em] md:tracking-[0.2em] text-[13px] md:text-[18px]">
          Thoughts from our happy guests
        </p>
      </div>

      <div className="relative">
        <motion.div
          className="flex gap-6 md:gap-16 px-4 md:px-12"
          style={{ x }}
        >
          {fullTrack.map((item, index) => (
            <motion.div
              key={index}
              className="flex-shrink-0 w-[280px] sm:w-[340px] md:w-[450px] relative cursor-pointer bg-white backdrop-blur-sm p-7 sm:p-10 md:p-14 border border-stone-100 transition-all duration-1000 hover:bg-white hover:border-amber-200/50 group"
              onHoverStart={handleHoverStart}
              onHoverEnd={handleHoverEnd}
              onTouchStart={handleHoverStart}
              onTouchEnd={handleHoverEnd}
            >
              {/* Floating Quote Icon */}
              <div className="absolute -top-4 -left-4 w-10 h-10 md:w-12 md:h-12 bg-[#FAF9F6] flex items-center justify-center text-amber-600/80 group-hover:text-amber-600/40 transition-colors duration-700">
                <Quote size={20} strokeWidth={1} className="md:hidden" />
                <Quote size={24} strokeWidth={1} className="hidden md:block" />
              </div>

              <div className="flex flex-col h-full">
                {/* Review Text */}
                <p className="text-stone-500 font-serif text-lg sm:text-xl md:text-2xl italic font-semibold leading-relaxed text-left mb-8 md:mb-12 relative z-10">
                  "{item.text}"
                </p>

                <div className="mt-auto flex items-end justify-between border-t border-stone-300 pt-6 md:pt-8">
                  <div className="flex items-center gap-3 md:gap-5">
                    <div className="relative">
                      <img
                        className="h-11 w-11 md:h-14 md:w-14 rounded-full object-cover border border-stone-200"
                        src={item.image}
                        alt={item.name}
                      />
                      <div className="absolute -inset-1 border border-amber-500/0 group-hover:border-amber-500/20 rounded-full transition-all duration-700"></div>
                    </div>

                    <div className="text-left">
                      <h3 className="text-stone-900 font-serif text-sm md:text-lg font-semibold tracking-wide mb-0.5 uppercase">
                        {item.name}
                      </h3>
                      <p className="text-amber-700/90 font-sans text-[8px] md:text-[9px] font-bold tracking-[0.25em] md:tracking-[0.3em] uppercase">
                        {item.role}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Side Masks */}
        <div className="absolute inset-y-0 left-0 w-12 sm:w-24 md:w-36 bg-gradient-to-r from-[#FAF9F6] via-[#FAF9F6]/80 to-transparent pointer-events-none z-20" />
        <div className="absolute inset-y-0 right-0 w-12 sm:w-24 md:w-36 bg-gradient-to-l from-[#FAF9F6] via-[#FAF9F6]/80 to-transparent pointer-events-none z-20" />
      </div>
    </section>
  );
}