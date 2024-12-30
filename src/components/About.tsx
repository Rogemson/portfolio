'use client'

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import { Mail, Github, Linkedin, ArrowRight, Award, Code, Coffee } from 'lucide-react';

const About = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const bentoRefs = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    if (section) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('fade-in');
              entry.target.classList.remove('fade-out');
            }
          });
        },
        { threshold: 0.1 }
      );

      bentoRefs.current.forEach((ref) => {
        if (ref) observer.observe(ref);
      });

      return () => observer.disconnect();
    }
  }, []);

  const addToRefs = (el: HTMLDivElement) => {
    if (el && !bentoRefs.current.includes(el)) {
      bentoRefs.current.push(el);
    }
  };

  return (
    <section id="about" className="min-h-auto bg-neutral-100 py-24 px-4 sm:px-6 lg:px-8" ref={sectionRef}>
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-12 gap-4 md:gap-6">
          <div
            ref={addToRefs}
            className="col-span-12 md:col-span-8 bg-white rounded-3xl p-8 shadow-sm hover:shadow-md transition-all duration-300 fade-out"
          >
            <div className="flex flex-col md:flex-row gap-8 h-full">
              <div className="relative w-48 h-48 md:w-56 md:h-56 flex-shrink-0 mx-auto md:mx-0">
                <div className="absolute inset-0 bg-neutral-900/5 rounded-2xl transform transition-transform group-hover:rotate-6" />
                <Image
                  src="https://placehold.co/600x400"
                  alt="Profile"
                  className="relative rounded-2xl w-full h-full object-cover"
                  layout="fill"
                  objectFit="cover"
                />
              </div>
              <div className="flex-1 flex flex-col justify-center text-center md:text-left">
                <h1 className="text-4xl font-bold text-neutral-900 mb-4">Rogemson Molina</h1>
                <p className="text-neutral-600 text-lg leading-relaxed mb-6">
                Driven to design and develop high-performance, user-centric web applications using cutting-edge technologies.
                </p>
                <div>
                  <a
                    href="#contact"
                    className="group inline-flex items-center space-x-2 bg-neutral-900 text-white px-6 py-3 rounded-xl hover:bg-neutral-800 transition-all duration-300"
                  >
                    <span>Let&apos;s collaborate</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Experience Card - Aligned with Profile Card */}
          <div 
            ref={addToRefs}
            className="col-span-12 md:col-span-4 bg-gradient-to-br from-neutral-900 to-neutral-800 text-white rounded-3xl shadow-sm hover:translate-y-[-4px] transition-all duration-300 flex flex-col"
          >
            <div className="p-8 flex flex-col h-full justify-between">
              <Award className="w-8 h-8 text-neutral-300" />
              <div className="mt-auto">
                <h3 className="text-3xl font-bold mb-3">1+ Years</h3>
                <p className="text-neutral-300 text-lg">Proven experience in web development</p>
              </div>
            </div>
          </div>

          {/* Technologies Card */}
          <div 
            ref={addToRefs}
            className="col-span-12 md:col-span-5 bg-white rounded-3xl p-8 shadow-sm hover:shadow-md transition-all duration-300"
          >
            <Code className="w-8 h-8 mb-6 text-neutral-900" />
            <h3 className="text-2xl font-bold mb-6">Core Technologies</h3>
            <div className="grid grid-cols-2 gap-y-4">
              {['React/Next.js', 'Python', 'Tailwind CSS', 'Django'].map((skill) => (
                <div key={skill} className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-neutral-900 rounded-full" />
                  <span className="text-neutral-600">{skill}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Projects Stats Card */}
          <div 
            ref={addToRefs}
            className="col-span-12 md:col-span-4 bg-gradient-to-br from-neutral-800 via-neutral-900 to-neutral-800 text-white rounded-3xl p-8 hover:translate-y-[-4px] transition-all duration-300"
          >
            <Coffee className="w-8 h-8 mb-6 text-neutral-300" />
            <div className="grid grid-cols-2 gap-6">
              <div>
                <h4 className="text-3xl font-bold mb-1">3+</h4>
                <p className="text-neutral-300">Projects</p>
              </div>
              <div>
                <h4 className="text-3xl font-bold mb-1">10k+</h4>
                <p className="text-neutral-300">Code lines</p>
              </div>
            </div>
          </div>

          {/* Social Links Card */}
          <div 
            ref={addToRefs}
            className="col-span-12 md:col-span-3 bg-white rounded-3xl p-8 shadow-sm hover:shadow-md transition-all duration-300"
          >
            <div className="grid grid-cols-1 sm:grid-cols-1 gap-4">
              {[
                { Icon: Github, href: 'https://github.com', label: 'GitHub', desc: 'View projects' },
                { Icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn', desc: 'Connect' },
                { Icon: Mail, href: 'mailto:your@email.com', label: 'Email', desc: 'Contact' }
              ].map(({ Icon, href, label, desc }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-3 p-3 rounded-xl hover:bg-neutral-50 transition-all duration-300 group"
                >
                  <div className="p-2 bg-neutral-900 rounded-xl text-white group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-medium text-neutral-900">{label}</h4>
                    <p className="text-sm text-neutral-600">{desc}</p>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;