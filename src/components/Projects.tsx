'use client'

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import { ExternalLink, Code, Timer, BarChart3 } from 'lucide-react';

const PortfolioSection = () => {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const worksRef = useRef<(HTMLDivElement | null)[]>([]);

  const works = [
    {
      title: "Enterprise E-commerce Platform",
      type: "Full-stack Development",
      description: "Built a scalable e-commerce platform handling 50,000+ monthly transactions. Implemented real-time inventory management, advanced analytics dashboard, and AI-powered product recommendations. Achieved 40% improvement in checkout conversion rate.",
      image: "/images/pexels-mart-production-7667442.jpg",
      tech: ["Next.js", "Node.js", "MongoDB", "Redis", "Docker", "AWS", "Stripe"],
      link: "#",
      metrics: {
        duration: "6 months",
        role: "Lead Developer",
        impact: [
          "99.9% uptime SLA maintained",
          "3x faster page load times",
          "$2M+ monthly GMV processed"
        ]
      }
    },
    {
      title: "FinTech Analytics Suite",
      type: "Data Visualization & Analytics",
      description: "Developed a comprehensive financial analytics platform processing 1M+ daily transactions. Features include real-time market data integration, predictive modeling, and automated reporting. Reduced data processing time by 75%.",
      image: "/images/pexels-artempodrez-5716032.jpg",
      tech: ["React", "D3.js", "PostgreSQL", "Python", "TensorFlow", "WebSocket", "AWS"],
      link: "#",
      metrics: {
        duration: "4 months",
        role: "Frontend Developer",
        impact: [
          "85% reduction in analysis time",
          "100+ custom visualizations",
          "Used by 50+ financial analysts"
        ]
      }
    },
    {
      title: "Healthcare Management System",
      type: "Enterprise Solution",
      description: "Architected a HIPAA-compliant healthcare platform serving 200+ medical professionals. Implemented secure patient records management, appointment scheduling, and integrated billing system. Reduced administrative overhead by 60%.",
      image: "/images/flat-design-medical-care-landing-page_23-2149177716.avif",
      tech: ["React", "Java Spring", "Azure", "PostgreSQL", "OAuth2", "Kubernetes", "RabbitMQ"],
      link: "#",
      metrics: {
        duration: "8 months",
        role: "Full-stack Developer",
        impact: [
          "100K+ patient records managed",
          "30% increase in staff efficiency",
          "Zero security incidents"
        ]
      }
    }
  ];

  useEffect(() => {
    if (typeof window !== 'undefined') {
      gsap.registerPlugin(ScrollTrigger);
    }

    const ctx = gsap.context(() => {
      // Pin the header
      gsap.to(headerRef.current, {
        scrollTrigger: {
          trigger: headerRef.current,
          start: 'top top',
          endTrigger: sectionRef.current,
          end: 'bottom top',
          pin: true,
          pinSpacing: false
        }
      });

      // Animate each work item
      worksRef.current.forEach((work) => {
        if (!work) return;

        gsap.fromTo(
          work,
          { yPercent: 10 },
          {
            yPercent: 0,
            scrollTrigger: {
              trigger: work,
              start: 'top 80%',
              end: 'bottom 20%',
              scrub: 1
            }
          }
        );

        // Parallax effect for the image
        const image = work.querySelector('.work-image');
        if (image) {
          gsap.fromTo(
            image,
            { yPercent: 5 },
            {
              yPercent: -5,
              scrollTrigger: {
                trigger: work,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 1
              }
            }
          );
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);
  
  return (
    <section ref={sectionRef} className="min-h-screen bg-white" id='projects'>
      <div ref={headerRef} className="py-8 bg-white z-50">
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          <h2 className="section-title text-4xl md:text-5xl font-bold text-gray-900">
            Selected Works
          </h2>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 md:px-8">
        <div className="-space-y-2">
          {works.map((work, index) => (
            <div
              key={index}
              ref={(el) => { worksRef.current[index] = el; }}
              className="min-h-screen flex items-center"
            >
              <div
                className={`grid md:grid-cols-2 gap-8 md:gap-12 items-center ${
                  index % 2 === 0 ? '' : 'md:grid-flow-dense'
                }`}
              >
                <div className="work-image relative h-64 md:h-96 rounded-lg overflow-hidden">
                  <Image
                    src={work.image}
                    alt={work.title}
                    layout="fill"
                    objectFit="cover" // `objectFit` is not available, so now use style for object-fit
                    style={{ objectFit: 'cover' }}
                    className="transition-transform duration-700"
                    loading="lazy" // Lazy load image
                  />
                </div>

                <div className="work-content space-y-6">
                  <div>
                    <p className="text-indigo-600 font-medium mb-2">{work.type}</p>
                    <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
                      {work.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">{work.description}</p>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {work.tech.map((tech, idx) => (
                      <span
                        key={idx}
                        className="tech-tag px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center gap-6 text-sm text-gray-500">
                      <div className="metric-item flex items-center gap-2">
                        <Timer size={16} />
                        <span>{work.metrics.duration}</span>
                      </div>
                      <div className="metric-item flex items-center gap-2">
                        <Code size={16} />
                        <span>{work.metrics.role}</span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      {work.metrics.impact.map((impact, idx) => (
                        <div key={idx} className="metric-item flex items-center gap-2 text-sm text-gray-600">
                          <BarChart3 size={16} className="text-indigo-600" />
                          <span>{impact}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <a
                    href={work.link}
                    className="inline-flex items-center gap-2 text-indigo-600 font-medium hover:text-indigo-700 transition-colors"
                  >
                    View Project <ExternalLink size={16} />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PortfolioSection;
