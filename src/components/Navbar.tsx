'use client';

import { useState, useEffect, useRef } from 'react';
import { Home, User, Briefcase, Code, Mail } from 'lucide-react';
import gsap from 'gsap';

export default function Navbar() {
  const [] = useState(false);
  const navRef = useRef<HTMLElement | null>(null);
  const bottomMenuRef = useRef<HTMLDivElement | null>(null);
  const menuItemsRef = useRef<HTMLDivElement | null>(null);

  const menuItems = [
    { name: 'Home', icon: Home },
    { name: 'About', icon: User },
    { name: 'Projects', icon: Briefcase },
    { name: 'Skills', icon: Code },
    { name: 'Contact', icon: Mail },
  ];

  // Navbar animation on page load
  useEffect(() => {
    if (navRef.current) {
      gsap.fromTo(
        navRef.current,
        { y: -100, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power2.out' }
      );
    }

    if (bottomMenuRef.current) {
      gsap.fromTo(
        bottomMenuRef.current,
        { y: 100, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power2.out', delay: 0.2 }
      );

      gsap.fromTo(
        '.menu-item',
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.1,
          duration: 0.5,
          ease: 'power2.out',
          delay: 0.4,
        }
      );
    }
  }, []);

  // Handle menu item hover animations
  useEffect(() => {
    const menuItems = document.querySelectorAll('.menu-item');
    
    menuItems.forEach((item) => {
      const itemElement = item as HTMLElement;

      itemElement.addEventListener('mouseenter', () => {
        gsap.to(itemElement, {
          y: -5,
          scale: 1.1,
          duration: 0.3,
          ease: 'power2.out',
        });
      });

      itemElement.addEventListener('mouseleave', () => {
        gsap.to(itemElement, {
          y: 0,
          scale: 1,
          duration: 0.3,
          ease: 'power2.in',
        });
      });
    });
  }, []);

  return (
    <>
      {/* Main Navbar */}
      <nav ref={navRef} className="bg-white shadow-sm fixed w-full top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center h-16">
            <div className="flex items-center">
              <span className="text-2xl font-bold text-gray-800">Jemsonnn</span>
            </div>
          </div>
        </div>
      </nav>

      {/* Bottom Menu Container */}
      <div 
        ref={bottomMenuRef}
        className="fixed bottom-6 left-0 right-0 z-50 flex justify-center px-4"
      >
        <div className="bg-white rounded-full shadow-lg px-6 py-3">
          <div ref={menuItemsRef} className="flex items-center space-x-8">
            {menuItems.map((item) => (
              <a
                key={item.name}
                href={`#${item.name.toLowerCase()}`}
                className="menu-item flex flex-col items-center text-gray-600 hover:text-gray-900 transition-colors"
              >
                <item.icon className="w-5 h-5 mb-1" />
                <span className="text-xs font-medium">{item.name}</span>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile-friendly touch area */}
      <div className="h-24 w-full fixed bottom-0 pointer-events-none z-40" />
    </>
  );
}