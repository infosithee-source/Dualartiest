import React, { useEffect } from 'react';
import { ArrowRight, ShoppingBag, Palette } from 'lucide-react';

const Commissions = () => {
  useEffect(() => {
    console.log("Commissions Component Mounted");
  }, []);

  return (
    // Added data-extra-scroll attribute to request a "wait" period
    // 1500px of scrolling where the section stays pinned
    <div 
      className="w-full h-full flex flex-col md:flex-row bg-white text-black"
      data-extra-scroll="1500"
    >
      {/* Buy Existing Art */}
      <div className="flex-1 p-8 md:p-16 flex flex-col justify-center border-b md:border-b-0 md:border-r border-black/10 hover:bg-gray-50 transition-colors group">
        <div className="h-full flex flex-col justify-between">
          <div className="mb-8">
            <ShoppingBag className="w-12 h-12 mb-6 text-black" />
            <h2 className="text-6xl md:text-8xl mb-4 group-hover:translate-x-2 transition-transform duration-500">SHOP</h2>
            <p className="text-xl text-gray-600 max-w-md">
              Browse the curated collection of limited edition prints and original digital assets.
            </p>
          </div>
          <button className="flex items-center gap-4 text-lg font-bold uppercase tracking-wider hover:gap-6 transition-all">
            View Collection <ArrowRight />
          </button>
        </div>
      </div>

      {/* Request Commission */}
      <div className="flex-1 p-8 md:p-16 flex flex-col justify-center bg-black text-white group relative overflow-hidden">
        {/* Decorative bg */}
        <div className="absolute inset-0 bg-red-600/10 translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-in-out pointer-events-none"></div>
        
        <div className="relative z-10 h-full flex flex-col justify-between">
          <div className="mb-8">
            <Palette className="w-12 h-12 mb-6 text-white" />
            <h2 className="text-6xl md:text-8xl mb-4 group-hover:translate-x-2 transition-transform duration-500">CUSTOM</h2>
            <p className="text-xl text-gray-400 max-w-md">
              Have a specific vision? Let's collaborate to bring your unique ideas to life.
            </p>
          </div>
          
          <form className="space-y-6 max-w-md" onSubmit={(e) => e.preventDefault()}>
            <div>
              <input 
                type="email" 
                placeholder="YOUR EMAIL" 
                className="w-full bg-transparent border-b border-white/30 py-4 text-lg focus:outline-none focus:border-white transition-colors placeholder:text-white/30"
              />
            </div>
            <button className="flex items-center gap-4 text-lg font-bold uppercase tracking-wider hover:gap-6 transition-all text-white">
              Start Project <ArrowRight />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Commissions;
