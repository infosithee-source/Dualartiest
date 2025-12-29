import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';

const Navbar = ({ onNavigate }) => {
  const [isOpen, setIsOpen] = useState(false);
  const links = ['HOME', 'COMMISSIONS', 'PORTFOLIO', 'CONTACT'];

  const handleNav = (index) => {
    onNavigate(index);
    setIsOpen(false);
  };

  return (
    <>
      {/* Desktop & persistent Nav */}
      <nav className="fixed top-0 left-0 w-full z-50 px-6 py-6 md:px-12 flex justify-between items-center mix-blend-difference text-white pointer-events-none">
        {/* Logo - Pointer events auto to allow clicking */}
        <div 
          className="text-2xl md:text-3xl font-black tracking-tighter cursor-pointer pointer-events-auto font-['Anton']" 
          onClick={() => handleNav(0)}
        >
          DUALITE
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex gap-10 pointer-events-auto">
          {links.map((link, i) => (
            <button 
              key={link} 
              onClick={() => handleNav(i)}
              className="text-xs font-bold tracking-[0.2em] hover:opacity-50 transition-opacity relative group"
            >
              {link}
              <span className="absolute -bottom-2 left-0 w-0 h-[2px] bg-white transition-all group-hover:w-full" />
            </button>
          ))}
        </div>

        {/* Mobile Menu Toggle */}
        <button 
          className="md:hidden pointer-events-auto"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X /> : <Menu />}
        </button>
      </nav>

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 z-40 bg-black text-white flex flex-col items-center justify-center gap-8 transition-transform duration-500 ease-expo ${isOpen ? 'translate-y-0' : '-translate-y-full'}`}>
        {links.map((link, i) => (
          <button 
            key={link} 
            onClick={() => handleNav(i)}
            className="text-4xl font-black tracking-tighter hover:text-red-500 transition-colors font-['Anton']"
          >
            {link}
          </button>
        ))}
      </div>
    </>
  );
};

export default Navbar;
