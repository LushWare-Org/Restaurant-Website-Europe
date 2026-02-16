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
    text: "From a visual standpoint, it’s perfection. The textures of the food are a photographer’s dream."
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

const GoldStar = () => (
  <svg width="10" height="10" viewBox="0 0 22 20" fill="#D4AF37">
    <path d="M10.525.464a.5.5 0 0 1 .95 0l2.107 6.482a.5.5 0 0 0 .475.346h6.817a.5.5 0 0 1 .294.904l-5.515 4.007a.5.5 0 0 0-.181.559l2.106 6.483a.5.5 0 0 1-.77.559l-5.514-4.007a.5.5 0 0 0-.588 0l-5.514 4.007a.5.5 0 0 1-.77-.56l2.106-6.482a.5.5 0 0 0-.181-.56L.832 8.197a.5.5 0 0 1 .294-.904h6.817a.5.5 0 0 0 .475-.346z" />
  </svg>
);

export default function Testimonial() {
  // We use a very long track to make the "linear" loop unnoticeable
  const fullTrack = [...testimonials, ...testimonials, ...testimonials];
  const x = useMotionValue(0);
  const controlsRef = useRef(null);

  useEffect(() => {
    const controls = animate(x, [0, -2000], {
      duration: 80,
      repeat: Infinity,
      ease: "linear",
    });

    controlsRef.current = controls;

    return () => controls.stop();
  }, [x]);

  const handleHoverStart = () => {
    controlsRef.current?.pause();
  };

  const handleHoverEnd = () => {
    controlsRef.current?.play();
  };

  return (
    <section className="bg-[#fcfaf8] py-32 overflow-hidden relative border-t border-b border-[#eeeae5]  rounded-b-4xl">

      <div className="relative z-10 text-center mb-24">
        <h2 className="text-5xl md:text-6xl font-light tracking-[0.05em] uppercase mb-4">
          What our guests <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-700 via-amber-500 to-amber-700">love</span>
        </h2>
        <p className="mt-2 text-gray-900 font-serif italic font-semibold  uppercase tracking-[0.2em] text-[18px] ">
          Thoughts from our happy guests
        </p>
      </div>

      <div className="relative">
        <motion.div className="flex gap-16 px-12" style={{ x }}>
          {fullTrack.map((item, index) => (
            <motion.div
              key={index}
              className="flex-shrink-0 w-[450px] relative cursor-pointer bg-white backdrop-blur-sm p-14 border border-stone-100 transition-all duration-1000 hover:bg-white  hover:border-amber-200/50 group"
              onHoverStart={handleHoverStart}
              onHoverEnd={handleHoverEnd}
            >
              {/* Floating Quote Icon */}
              <div className="absolute -top-4 -left-4 w-12 h-12 bg-[#FAF9F6] flex items-center justify-center text-amber-600/80 group-hover:text-amber-600/40 transition-colors duration-700">
                <Quote size={24} strokeWidth={1} />
              </div>

              <div className="flex flex-col h-full">
                {/* The Review Text - Increased Leading for Elegance */}
                <p className="text-stone-500 font-serif text-2xl italic font-semibold leading-relaxed text-left mb-12 relative z-10">
                  "{item.text}"
                </p>
                
                <div className="mt-auto flex items-end justify-between border-t border-stone-300 pt-8">
                  <div className="flex items-center gap-5">
                    <div className="relative">
                      <img
                        className="h-14 w-14 rounded-full object-cover  border border-stone-200"
                        src={item.image}
                        alt={item.name}
                      />
                      {/* Premium Accent Ring */}
                      <div className="absolute -inset-1 border border-amber-500/0 group-hover:border-amber-500/20 rounded-full transition-all duration-700"></div>
                    </div>
                    
                    <div className="text-left">
                      <h3 className="text-stone-900 font-serif text-lg font-semibold tracking-wide mb-0.5 uppercase">
                        {item.name}
                      </h3>
                      <p className="text-amber-700/90 font-sans text-[9px] font-bold tracking-[0.3em] uppercase">
                        {item.role}
                      </p>
                    </div>
                  </div>


                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Side Masks - Softened for Light Mode */}
        <div className="absolute inset-y-0 left-0 w-48 bg-gradient-to-r from-[#FAF9F6] via-[#FAF9F6]/80 to-transparent pointer-events-none z-20" />
        <div className="absolute inset-y-0 right-0 w-48 bg-gradient-to-l from-[#FAF9F6] via-[#FAF9F6]/80 to-transparent pointer-events-none z-20" />
      </div>
    </section>
  );
}