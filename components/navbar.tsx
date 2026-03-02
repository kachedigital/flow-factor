'use client';

import { useState, useEffect } from 'react';

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  // UX Logic: Make the shadow slightly heavier when the user actually starts scrolling
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 w-full z-[100] transition-all duration-300 ${isScrolled
        ? 'bg-white/85 backdrop-blur-xl border-b border-gray-200/50 shadow-md py-3'
        : 'bg-white/60 backdrop-blur-lg border-b border-transparent py-5'
        }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">

        {/* LOGO CONTAINER */}
        {/* Senior: Ensure this uses the horizontal Kache Digital logo with the transparent background */}
        <a
          href="/"
          className="flex items-center gap-2 focus-visible:ring-2 focus-visible:ring-[#df00c1] focus-visible:outline-none rounded-lg p-1"
          aria-label="Kache Digital Home"
        >
          <img
            src="/logo.png"
            alt="Kache Digital Logo"
            className="h-10 w-auto object-contain"
          />
        </a>

        {/* DESKTOP NAVIGATION */}
        <nav className="hidden md:flex items-center gap-8">
          {['Home', 'About', 'Services', 'Blog'].map((item) => (
            <a
              key={item}
              href={`/${item.toLowerCase()}`}
              className="text-[#290747] font-semibold text-sm uppercase tracking-wider hover:text-[#df00c1] transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-[#df00c1] focus-visible:outline-none rounded-md px-2 py-1"
            >
              {item}
            </a>
          ))}
        </nav>

        {/* CTAs & UTILITIES */}
        <div className="hidden md:flex items-center gap-6">
          <button className="bg-[#290747] text-white px-6 py-2.5 rounded-full font-bold text-sm transition-all duration-300 hover:bg-[#df00c1] hover:shadow-[0_4px_15px_rgba(223,0,193,0.3)] focus:ring-4 focus:ring-[#df00c1]/50 focus:outline-none">
            Get a Digital Audit
          </button>
        </div>

        {/* MOBILE MENU TOGGLE (Hamburger) */}
        <button
          className="md:hidden p-2 text-[#290747] hover:text-[#df00c1] focus-visible:ring-2 focus-visible:ring-[#df00c1] focus-visible:outline-none rounded-md"
          aria-label="Open Mobile Menu"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-7 h-7">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
          </svg>
        </button>

      </div>
    </header>
  );
}

export default Navbar;
