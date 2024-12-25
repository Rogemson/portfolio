'use client';

import { useState, useEffect, useRef } from 'react';
import { Menu, X } from 'lucide-react';
import gsap from 'gsap';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navRef = useRef<HTMLElement | null>(null);
  const mobileMenuRef = useRef<HTMLDivElement | null>(null);
  const desktopLinksRef = useRef<HTMLDivElement | null>(null);

  // Navbar animation on page load
  useEffect(() => {
    if (navRef.current) {
      gsap.fromTo(
        navRef.current,
        { y: -100, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power2.out' }
      );
    }

    if (desktopLinksRef.current) {
      gsap.fromTo(
        desktopLinksRef.current.querySelectorAll('.desktop-menu-item'),
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.1,
          duration: 0.8,
          ease: 'power2.out',
        }
      );
    }
  }, []);

  // Handle mobile menu animations
  const animateMenuOpen = () => {
    if (mobileMenuRef.current) {
      const tl = gsap.timeline();
      tl.fromTo(
        mobileMenuRef.current,
        { y: -20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, ease: 'power2.out' }
      ).from(
        '.mobile-menu-item',
        {
          duration: 0.5,
          x: -50,
          opacity: 0,
          stagger: 0.1,
          ease: 'power2.out',
        },
        '<' // Start this animation concurrently
      );
    }
  };

  const animateMenuClose = () => {
    if (mobileMenuRef.current) {
      const tl = gsap.timeline({
        onComplete: () => setIsMenuOpen(false), // Close menu after animation
      });
      tl.to('.mobile-menu-item', {
        duration: 0.3,
        x: 50,
        opacity: 0,
        stagger: 0.1,
        ease: 'power2.in',
      }).to(
        mobileMenuRef.current,
        {
          y: -20,
          opacity: 0,
          duration: 0.3,
          ease: 'power2.in',
        },
        '<' // Start this animation concurrently
      );
    }
  };

  useEffect(() => {
    if (isMenuOpen) {
      animateMenuOpen();
    } else if (mobileMenuRef.current) {
      animateMenuClose();
    }
  }, [isMenuOpen]);

  // Handle desktop hover animations
  useEffect(() => {
    const desktopLinks = desktopLinksRef.current?.querySelectorAll('.desktop-menu-item');
    if (desktopLinks) {
      desktopLinks.forEach((link) => {
        const linkElement = link as HTMLElement;

        linkElement.addEventListener('mouseenter', () => {
          gsap.to(linkElement, {
            scale: 1.1,
            color: '#1a202c', // Darker gray
            duration: 0.3,
            ease: 'power2.out',
          });
        });

        linkElement.addEventListener('mouseleave', () => {
          gsap.to(linkElement, {
            scale: 1,
            color: '#4a5568', // Original gray
            duration: 0.3,
            ease: 'power2.in',
          });
        });
      });
    }
  }, []);

  // Handle mobile menu item click
  const handleMobileNavClick = () => {
    animateMenuClose();
  };

  return (
    <>
      <nav ref={navRef} className="bg-white shadow-sm fixed w-full z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <span className="text-xl font-bold text-gray-800">Jemsonnn</span>
            </div>

            {/* Mobile menu button */}
            <div className="flex items-center sm:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-600 hover:text-gray-900 transition-colors p-2"
                aria-label="Toggle menu"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>

            {/* Desktop nav links */}
            <div
              ref={desktopLinksRef}
              className="hidden sm:flex sm:items-center sm:space-x-8"
            >
              {['About', 'Projects', 'Skills', 'Contact'].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="desktop-menu-item text-gray-600 hover:text-gray-900 transition-colors"
                >
                  {item}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile menu - Fixed positioned */}
        {isMenuOpen && (
          <div
            ref={mobileMenuRef}
            className="sm:hidden fixed top-16 left-0 right-0 bg-white border-t border-gray-100 shadow-lg z-50"
          >
            <div className="px-2 pt-2 pb-3 space-y-1">
              {['About', 'Projects', 'Skills', 'Contact'].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="mobile-menu-item block px-3 py-2 text-base font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-md transition-colors"
                  onClick={handleMobileNavClick}
                >
                  {item}
                </a>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Backdrop overlay for mobile menu */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-25 z-40"
          onClick={() => setIsMenuOpen(false)}
        />
      )}
    </>
  );
}
