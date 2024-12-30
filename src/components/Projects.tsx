"use client"

import React, { useState } from 'react';
import Image from 'next/image';
import { Users, BarChart3, Clock, Award, ArrowRight } from 'lucide-react';

const ProjectsSection = () => {
  const [activeCategory, setActiveCategory] = useState('all');

  // Project data remains the same
  const projects = [
    {
      title: "Enterprise E-commerce Platform",
      subtitle: "Full-stack Digital Transformation",
      description: "Developed a scalable e-commerce solution for a retail client with 100K+ monthly users.",
      image: "/api/placeholder/400/300",
      category: "web",
      metrics: [
        { icon: Users, label: "Active Users", value: "100K+" },
        { icon: BarChart3, label: "Sales Increase", value: "45%" },
        { icon: Clock, label: "Load Time", value: "0.8s" }
      ],
      technologies: ["React", "Node.js", "MongoDB", "AWS"],
      outcomes: [
        "Increased conversion rate by 45%",
        "Reduced page load time by 60%",
        "Implemented real-time inventory management"
      ],
      duration: "6 months",
      client: "Major Retail Brand",
      featured: true,
      testimonial: {
        quote: "The platform transformed our digital presence and significantly boosted our online sales.",
        author: "John Smith",
        role: "Director of E-commerce"
      }
    },
    {
      title: "Financial Analytics Dashboard",
      subtitle: "Data Visualization & Analytics",
      description: "Built a real-time analytics platform for financial data processing and visualization.",
      image: "/api/placeholder/400/300",
      category: "analytics",
      metrics: [
        { icon: Clock, label: "Processing Time", value: "-75%" },
        { icon: Users, label: "Daily Users", value: "5K+" },
        { icon: BarChart3, label: "Data Points", value: "1M+" }
      ],
      technologies: ["Next.js", "Python", "PostgreSQL", "Docker"],
      outcomes: [
        "Reduced data processing time by 75%",
        "Automated report generation saving 20 hours/week",
        "Integrated machine learning predictions"
      ],
      duration: "4 months",
      client: "Financial Services Firm",
      featured: true
    },
    {
      title: "Healthcare Management System",
      subtitle: "Secure Patient Management",
      description: "Developed a HIPAA-compliant healthcare management system for patient data.",
      image: "/api/placeholder/400/300",
      category: "healthcare",
      metrics: [
        { icon: Users, label: "Patients Managed", value: "50K+" },
        { icon: Clock, label: "Time Saved", value: "30%" },
        { icon: Award, label: "Compliance", value: "100%" }
      ],
      technologies: ["React", "Java", "PostgreSQL", "Azure"],
      outcomes: [
        "Achieved HIPAA compliance certification",
        "Reduced administrative time by 30%",
        "Implemented secure patient data management"
      ],
      duration: "8 months",
      client: "Regional Healthcare Provider",
      featured: false
    }
  ];

  const categories = [
    { id: 'all', label: 'All Projects' },
    { id: 'web', label: 'Web Applications' },
    { id: 'analytics', label: 'Analytics' },
    { id: 'healthcare', label: 'Healthcare' }
  ];

  const filteredProjects = projects.filter(project => 
    activeCategory === 'all' || project.category === activeCategory
  );

  return (
    <section id="projects" className="py-24 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Featured Projects
          </h2>
          <p className="text-lg text-gray-600">
            Delivering impactful solutions across industries
          </p>
        </div>

        {/* Updated responsive categories */}
        <div className="mb-16 px-4 sm:px-0">
          <div className="flex flex-wrap justify-center gap-2 sm:gap-4">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-4 sm:px-6 py-2 sm:py-2.5 rounded-full text-sm font-medium transition-all duration-300 whitespace-nowrap
                  ${
                    activeCategory === category.id
                      ? 'bg-gray-900 text-gray-50 shadow-md'
                      : 'bg-white text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                  }
                  flex-grow sm:flex-grow-0 basis-[calc(50%-0.5rem)] sm:basis-auto
                `}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {filteredProjects.map((project, index) => (
            <div
              key={index}
              className={`bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300
                ${project.featured && filteredProjects.length > 2 ? 'lg:col-span-2' : ''}`}
            >
              <div className="grid grid-cols-1 lg:grid-cols-2">
                <div className="relative h-64 lg:h-full">
                  <Image
                    src="/api/placeholder/600/400"
                    alt={project.title}
                    layout="fill"
                    objectFit="cover"
                  />
                  {project.featured && (
                    <div className="absolute top-4 right-4 bg-gray-900 text-gray-50 px-4 py-1 rounded-full text-sm font-medium">
                      Featured Project
                    </div>
                  )}
                </div>
                
                <div className="p-8">
                  <div className="mb-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {project.title}
                    </h3>
                    <p className="text-sm font-medium text-gray-500 mb-3">
                      {project.subtitle}
                    </p>
                    <p className="text-gray-600">
                      {project.description}
                    </p>
                  </div>

                  <div className="grid grid-cols-3 gap-4 mb-6">
                    {project.metrics.map((metric, idx) => (
                      <div key={idx} className="text-center">
                        <metric.icon className="w-5 h-5 mx-auto mb-1 text-gray-900" />
                        <div className="text-lg font-bold text-gray-900">{metric.value}</div>
                        <div className="text-xs text-gray-500">{metric.label}</div>
                      </div>
                    ))}
                  </div>

                  <div className="mb-6">
                    <div className="text-sm font-medium text-gray-500 mb-2">Technologies</div>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech, techIndex) => (
                        <span
                          key={techIndex}
                          className="px-3 py-1 bg-gray-100 text-gray-900 rounded-full text-sm font-medium"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mb-6">
                    <div className="text-sm font-medium text-gray-500 mb-2">Key Outcomes</div>
                    <ul className="space-y-2">
                      {project.outcomes.map((outcome, idx) => (
                        <li key={idx} className="flex items-start">
                          <ArrowRight className="w-4 h-4 text-gray-900 mt-1 mr-2 flex-shrink-0" />
                          <span className="text-gray-600 text-sm">{outcome}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {project.testimonial && (
                    <blockquote className="border-l-4 border-gray-900 pl-4 mb-6">
                      <p className="text-sm text-gray-600 italic mb-2">{project.testimonial.quote}</p>
                      <footer className="text-sm">
                        <strong className="text-gray-900">{project.testimonial.author}</strong>
                        <span className="text-gray-500"> — {project.testimonial.role}</span>
                      </footer>
                    </blockquote>
                  )}

                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">
                      <strong className="text-gray-900">Duration:</strong> {project.duration}
                    </span>
                    <span className="text-gray-500">
                      <strong className="text-gray-900">Client:</strong> {project.client}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;