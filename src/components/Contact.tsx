"use client"

import React, { useEffect, useRef } from 'react';
import { Github, Linkedin, Mail, MapPin, Phone } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const ContactAndFooter = () => {
  const contactRef = useRef<HTMLDivElement>(null);
  const socialsRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Register ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);

    // Contact section animations
    const contactElements = contactRef.current ? contactRef.current.children : [];
    gsap.fromTo(contactElements, {
      opacity: 0,
      y: 50
    }, {
      opacity: 1,
      y: 0,
      duration: 1,
      stagger: 0.2,
      scrollTrigger: {
        trigger: contactRef.current,
        start: 'top 80%',
        end: 'bottom 20%',
      }
    });

    // Social icons hover animation
    if (socialsRef.current) {
      const socialIcons = socialsRef.current.children;
      Array.from(socialIcons).forEach(icon => {
        icon.addEventListener('mouseenter', () => {
          gsap.to(icon, {
            scale: 1.1,
            duration: 0.3,
            ease: 'power2.out'
          });
        });
        
        icon.addEventListener('mouseleave', () => {
          gsap.to(icon, {
            scale: 1,
            duration: 0.3,
            ease: 'power2.out'
          });
        });
      });
    }

    // Footer animations
    const footerColumns = footerRef.current ? footerRef.current.querySelectorAll('.footer-column') : [];
    gsap.fromTo(footerColumns, {
      opacity: 0,
      y: 30
    }, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      stagger: 0.2,
      scrollTrigger: {
        trigger: footerRef.current,
        start: 'top 90%',
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div className="bg-white">
      {/* Contact Section */}
      <section className="py-16 bg-gray-50 overflow-hidden" id="contact">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto" ref={contactRef}>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Let&apos;s Connect</h2>
            <p className="text-gray-600 text-lg mb-8">
              Get in touch for opportunities or just to say hello.
            </p>
            
            <div className="space-y-4 mb-8">
              <div className="flex items-center justify-center space-x-3 text-gray-600 hover:text-gray-900 transition-colors cursor-pointer">
                <MapPin className="w-5 h-5" />
                <span>123 Business Avenue, City, Country</span>
              </div>
              <div className="flex items-center justify-center space-x-3 text-gray-600 hover:text-gray-900 transition-colors cursor-pointer">
                <Phone className="w-5 h-5" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center justify-center space-x-3 text-gray-600 hover:text-gray-900 transition-colors cursor-pointer">
                <Mail className="w-5 h-5" />
                <span>hello@example.com</span>
              </div>
            </div>
            
            <div className="flex justify-center space-x-4" ref={socialsRef}>
              <a href="https://github.com" className="p-3 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors">
                <Github className="w-6 h-6 text-gray-700" />
              </a>
              <a href="https://linkedin.com" className="p-3 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors">
                <Linkedin className="w-6 h-6 text-gray-700" />
              </a>
              <a href="mailto:hello@example.com" className="p-3 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors">
                <Mail className="w-6 h-6 text-gray-700" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400" ref={footerRef}>
        <div className="max-w-6xl mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-4 footer-column">
              <h3 className="text-white text-lg font-semibold">About</h3>
              <p className="text-sm">
                Creating meaningful digital experiences through innovative design and development.
              </p>
            </div>
            
            <div className="space-y-4 footer-column">
              <h3 className="text-white text-lg font-semibold">Quick Links</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">Home</a></li>
                <li><a href="#" className="hover:text-white transition-colors">About</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Services</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Portfolio</a></li>
              </ul>
            </div>
            
            <div className="space-y-4 footer-column">
              <h3 className="text-white text-lg font-semibold">Services</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">Web Design</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Development</a></li>
                <li><a href="#" className="hover:text-white transition-colors">UI/UX Design</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Consulting</a></li>
              </ul>
            </div>
          </div>
          
          <div className="mt-12 pt-8 border-t border-gray-800 text-center text-sm">
            <p>© {new Date().getFullYear()} Jemsonnn. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ContactAndFooter;