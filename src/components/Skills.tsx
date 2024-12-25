"use client"

import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Code2, Server, Database, Cloud, Sparkles, Gauge, Trophy, Clock } from 'lucide-react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const SkillsSection = () => {
  const skillsRef = useRef<HTMLElement>(null);
  const [activeTab] = useState('expertise');

  const expertise = [
    {
      icon: Code2,
      title: "Frontend Development",
      description: "Specialized in building responsive, performant web applications with modern frameworks",
      skills: ["React", "Next.js", "TypeScript"],
      experience: "5+ years",
      keyProjects: ["E-commerce Platform", "SaaS Dashboard"],
      highlight: "Reduced load times by 60% for major e-commerce client"
    },
    {
      icon: Server,
      title: "Backend Development",
      description: "Building scalable server architectures and RESTful APIs",
      skills: ["Node.js", "Python", "Java"],
      experience: "4+ years",
      keyProjects: ["Payment Processing System", "API Gateway"],
      highlight: "Handled 1M+ daily requests for financial services client"
    },
    {
      icon: Database,
      title: "Database Architecture",
      description: "Designing efficient database schemas and optimizing queries",
      skills: ["MongoDB", "PostgreSQL", "Redis"],
      experience: "4+ years",
      keyProjects: ["Real-time Analytics Platform"],
      highlight: "Improved query performance by 75%"
    },
    {
      icon: Cloud,
      title: "Cloud & DevOps",
      description: "Cloud infrastructure and CI/CD pipeline implementation",
      skills: ["AWS", "Docker", "Git"],
      experience: "3+ years",
      keyProjects: ["Cloud Migration Project"],
      highlight: "Reduced deployment time by 80%"
    }
  ];

  useEffect(() => {
    if (!skillsRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(".bento-box",
        { 
          opacity: 0,
          y: 20,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: skillsRef.current,
            start: "top center+=100",
          }
        }
      );
    }, skillsRef);

    return () => ctx.revert();
  }, [activeTab]);

  return (
    <section id="skills" ref={skillsRef} className="py-24 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Technical Expertise
          </h2>
          <p className="text-lg text-gray-600">
            Delivering scalable solutions with modern technologies and best practices
          </p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {[
            { icon: Trophy, label: "Projects Delivered", value: "50+" },
            { icon: Clock, label: "Years Experience", value: "5+" },
            { icon: Sparkles, label: "Success Rate", value: "98%" },
            { icon: Gauge, label: "Client Satisfaction", value: "4.9/5" }
          ].map((metric, index) => (
            <div key={index} className="bento-box bg-white rounded-xl shadow-md p-6 text-center">
              <metric.icon className="w-8 h-8 mx-auto mb-3 text-gray-900" />
              <div className="text-2xl font-bold text-gray-900 mb-1">{metric.value}</div>
              <div className="text-sm text-gray-600">{metric.label}</div>
            </div>
          ))}
        </div>

        {/* Main Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {expertise.map((area, index) => (
            <div
              key={index}
              className="bento-box bg-white rounded-xl shadow-md p-8 hover:shadow-lg transition-all duration-300"
            >
              <div className="flex items-center mb-6">
                <area.icon className="w-8 h-8 text-gray-900 mr-4" />
                <h3 className="text-xl font-semibold text-gray-900">{area.title}</h3>
              </div>
              
              <p className="text-gray-600 mb-6">{area.description}</p>
              
              <div className="space-y-4">
                <div>
                  <div className="text-sm font-medium text-gray-500 mb-2">Core Technologies</div>
                  <div className="flex flex-wrap gap-2">
                    {area.skills.map((skill, skillIndex) => (
                      <span
                        key={skillIndex}
                        className="px-3 py-1 bg-gray-100 text-gray-900 rounded-full text-sm font-medium"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div>
                  <div className="text-sm font-medium text-gray-500 mb-2">Experience</div>
                  <div className="text-gray-900">{area.experience}</div>
                </div>
                
                <div>
                  <div className="text-sm font-medium text-gray-500 mb-2">Key Achievement</div>
                  <div className="text-gray-900 font-medium">{area.highlight}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Currently Learning Section */}
        <div className="mt-12 text-center">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Continuous Learning
          </h3>
          <div className="flex flex-wrap justify-center gap-3">
            {["Web3", "AI Integration", "Cloud Native Architecture"].map((skill, index) => (
              <span
                key={index}
                className="px-4 py-2 bg-gray-100 text-gray-900 rounded-full text-sm font-medium"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;