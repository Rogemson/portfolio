'use client';

import { useState, useEffect, useRef } from 'react';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);

  const menuItems = [
    { name: 'Home',  id: 'home' },
    { name: 'About',  id: 'about' },
    { name: 'Projects', id: 'projects' },
    { name: 'Skills',  id: 'skills' },
    { name: 'Contact', id: 'contact' },
  ];

  // Set isClient to true once component mounts
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Handle animations only after component mounts and gsap is available
  useEffect(() => {
    if (typeof window !== 'undefined' && isClient) {
      // Dynamically import gsap only on the client side
      import('gsap').then((gsap) => {
        if (navRef.current) {
          gsap.default.fromTo(
            navRef.current,
            { y: -100, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.8, ease: 'power2.out' }
          );
        }
      });
    }
  }, [isClient]);

  const handleNavigation = (id: string): void => {
    // Close mobile menu if open
    setIsMobileMenuOpen(false);
    
    // Get the target section
    const element = document.getElementById(id);
    if (element) {
      // Get the navbar height
      const navHeight = navRef.current?.offsetHeight || 0;
      
      // Calculate scroll position with offset for the navbar
      const offsetPosition = element.offsetTop - navHeight;

      // Smooth scroll to the section
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  // Don't render animations until client-side
  const navClassName = `fixed top-0 left-0 right-0 bg-white shadow-md z-50 w-screen ${
    !isClient ? 'opacity-0' : ''
  }`;

  return (
    <div className="relative">
      {/* Main Navbar */}
      <nav ref={navRef} className={navClassName}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex-shrink-0">
              <button 
                onClick={() => handleNavigation('home')}
                className="text-2xl font-bold text-gray-900 hover:text-gray-700 transition-colors"
              >
                Jemsonnn
              </button>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {menuItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => handleNavigation(item.id)}
                  className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
                >
                  <span>{item.name}</span>
                </button>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gray-500"
              >
                {isMobileMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-40 transform ${
          isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        } transition-transform duration-300 ease-in-out md:hidden`}
      >
        <div className="relative bg-white h-full w-64 shadow-xl pt-20 px-4">
          {menuItems.map((item) => (
            <button
              key={item.name}
              onClick={() => handleNavigation(item.id)}
              className="flex items-center space-x-2 w-full p-4 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors"
            >
              <span>{item.name}</span>
            </button>
          ))}
        </div>
        {/* Overlay */}
        <div
          className="absolute inset-0 bg-black bg-opacity-50 -z-10"
          onClick={() => setIsMobileMenuOpen(false)}
        ></div>
      </div>
    </div>
  );
}