import React from 'react';
import { Mail, Github, Linkedin, ArrowRight } from 'lucide-react';

const About = () => {
  return (
    <section id="about" className="min-h-screen flex items-center justify-center bg-white py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Grid Container */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Column - Image */}
          <div className="order-2 lg:order-1">
            <div className="relative">
              {/* Decorative Background */}
              <div className="absolute -top-4 -left-4 w-full h-full bg-gray-100 rounded-lg"></div>
              {/* Main Image Container */}
              <div className="relative aspect-[4/5] w-full bg-gray-200 rounded-lg overflow-hidden">
                <img
                  src="/api/placeholder/600/750"
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Experience Badge */}
              <div className="absolute -right-4 bottom-4 bg-gray-900 text-white py-3 px-6 rounded-lg shadow-xl">
                <p className="text-sm font-medium">4+ Years Experience</p>
              </div>
            </div>
          </div>

          {/* Right Column - Content */}
          <div className="order-1 lg:order-2 space-y-8">
            {/* Section Title */}
            <div>
              <h2 className="text-sm font-semibold text-gray-500 tracking-wider uppercase">About Me</h2>
              <h3 className="mt-2 text-3xl sm:text-4xl font-bold text-gray-900 leading-tight">
                Crafting Digital Experiences Through Code
              </h3>
            </div>

            {/* Main Content */}
            <div className="space-y-6">
              <p className="text-gray-600 text-lg leading-relaxed">
                I&apos;m a frontend developer passionate about creating intuitive and performant web applications. 
                With expertise in modern JavaScript frameworks and UI/UX principles, I transform ideas into 
                seamless digital experiences.
              </p>

              {/* Key Skills */}
              <div className="space-y-4">
                <h4 className="text-gray-900 font-semibold">Core Technologies</h4>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    'React/Next.js', 
                    'TypeScript',
                    'Tailwind CSS',
                    'Node.js'
                  ].map((skill) => (
                    <div key={skill} className="flex items-center space-x-2">
                      <div className="w-1.5 h-1.5 bg-gray-900 rounded-full" />
                      <span className="text-gray-600">{skill}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA Section */}
              <div className="pt-6">
                <a 
                  href="#contact"
                  className="inline-flex items-center space-x-2 bg-gray-900 text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors"
                >
                  <span>Let&apos;s work together</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Social Links */}
            <div className="pt-8 border-t border-gray-200">
              <div className="flex items-center space-x-6">
                {[
                  { Icon: Github, href: 'https://github.com', label: 'GitHub' },
                  { Icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
                  { Icon: Mail, href: 'mailto:your@email.com', label: 'Email' }
                ].map(({ Icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
                  >
                    <Icon className="w-5 h-5" />
                    <span className="text-sm font-medium">{label}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;