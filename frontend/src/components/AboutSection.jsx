import React from 'react';
import { Link } from 'react-router-dom';

export default function AboutSection() {
  const foodImages = Array.from({ length: 7 }, (_, i) => `/food/food${i + 1}.jpg`);
  const sittingImages = ['/food/sitting1.jpg', '/food/sitting2.jpg'];

  return (
    <section className="bg-[#FFFDFB] py-24 px-6 md:px-12 lg:px-24">
      <div className="max-w-[1400px] mx-auto">
        
        {/* TOP: THE HERO SPLIT */}
        <div className="flex flex-col lg:flex-row gap-16 mb-32 items-center">
          <div className="w-full lg:w-1/2 relative">
            <div className="absolute -top-10 -left-10 w-40 h-40 border-t border-l border-gold-400 opacity-30"></div>
            <img 
              src={sittingImages[0]} 
              alt="Grand Interior" 
              className="w-full h-[700px] object-cover rounded-tr-[100px]" 
            />
            <div className="absolute bottom-10 -right-10 w-64 h-80 hidden xl:block shadow-2xl border-8 border-[#FFFDFB]">
              <img src={foodImages[6]} alt="Signature Start" className="w-full h-full object-cover" />
            </div>
          </div>
          
          <div className="w-full lg:w-1/2 lg:pl-12">
            <h1 className="text-7xl font-serif font-medium text-[#000000] mb-8 leading-[1.1]">
              Blackpepper <br />
              <span className="italic font-light text-gray-400">London</span>
            </h1>
            <div className="h-[2px] w-40 bg-black mb-12"></div>
              <p className="text-xl  text-gray-900 leading-relaxed mb-8 max-w-lg">
                At Blackpepper, every detail is crafted with care. From the first welcome 
                to the final course, we create an atmosphere where refined dining blends 
                seamlessly with the rich, expressive flavors of European inspiration.
              </p>
              <p className="font-serif font-medium italic text-2xl text-gray-800">
                "True hospitality is felt long after the last bite."
              </p>

          </div>
        </div>

        {/* MIDDLE: THE FILM STRIP (All remaining Food images) */}
        <div className="mb-32">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h3 className="text-xs uppercase font-medium tracking-[0.4em] text-gray-800">From Our Kitchen</h3>
              <h2 className="text-3xl font-serif mt-2">Inspired by the Season</h2>
            </div>
            <p className="text-sm font-sans text-gray-400 hidden md:block italic">Scroll to explore flavors →</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {foodImages.slice(0, 6).map((img, idx) => (
              <div key={idx} className={`overflow-hidden group ${idx % 2 !== 0 ? 'mt-8' : ''}`}>
                <img 
                  src={img} 
                  className="w-full h-64 object-cover  transition-all duration-700 ease-in-out cursor-pointer" 
                  alt={`Dish ${idx + 1}`}
                />
              </div>
            ))}
          </div>
        </div>

        {/* BOTTOM: THE PRIVATE SUITE (Sitting 2) */}
        <div className="relative h-[600px] w-full flex items-center justify-center overflow-hidden">
          <img 
            src={sittingImages[1]} 
            alt="Private Dining" 
            className="absolute inset-0 w-full h-full object-cover brightness-50"
          />
          <div className="relative z-10 text-center text-white px-6">
            <h2 className="text-4xl md:text-6xl font-serif mb-6">Your Table Awaits</h2>
            <p className="max-w-2xl mx-auto text-lg font-medium mb-10 ">
              Reservations are recommended for our evening service. Join us for a journey 
              through the finest ingredients London has to offer.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/book-table"
                className="px-10 py-4 bg-white text-black text-xs font-bold uppercase tracking-widest hover:bg-gray-200 transition-colors inline-block"
              >
                Book a Table
              </Link>

              <Link
                to="/contact"
                className="px-10 py-4 bg-transparent border border-white text-white text-xs font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-all inline-block"
              >
                Private Events
              </Link>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}