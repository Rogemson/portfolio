'use client'
import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import { ChevronDown } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger, TextPlugin } from 'gsap/all';
import { useMemo } from 'react';

const techStack = [
  { name: 'React', image: '/images/react.png', x: '15%', y: '20%' },
  { name: 'Node.js', image: '/images/node.png', x: '75%', y: '15%' },
  { name: 'TypeScript', image: '/images/typescript.png', x: '85%', y: '65%' },
  { name: 'Python', image: '/images/python.png', x: '10%', y: '70%' },
  { name: 'Django', image: '/images/django.png', x: '20%', y: '45%' },
  { name: 'PostgreSQL', image: '/images/postgresql.png', x: '70%', y: '40%' },
  { name: 'Next.js', image: '/images/nextjs.png', x: '60%', y: '75%' },
  { name: 'TailwindCSS', image: '/images/tailwind.png', x: '25%', y: '85%' },
];

export default function Home() {
  const [isMenuOpen] = useState(false)
  const typingTexts = useMemo(() => ["Web Applications", "REST APIs", "Dynamic UIs", "UI/UX Design"], [])
  const [currentTextIndex, setCurrentTextIndex] = useState(0)
  
  const heroRef = useRef(null)
  const headlineRef = useRef(null)
  const nameRef = useRef(null)
  const summaryRef = useRef(null)
  const ctaRef = useRef(null)
  const typingRef = useRef(null)
  const typingTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const typingAnimationRef = useRef<gsap.core.Tween | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      gsap.registerPlugin(ScrollTrigger, TextPlugin)
    }

    // Get all tech stack elements with proper typing
    const techElements = gsap.utils.toArray<HTMLDivElement>('.floating-tech')

    // Initial floating animation
    techElements.forEach((element) => {
      gsap.to(element, {
        y: "random(-20, 20)",
        duration: gsap.utils.random(2, 3),
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      })

      // Add hover animations with proper typing
      const handleMouseEnter = () => {
        gsap.to(element, {
          scale: 1.2,
          duration: 0.3,
          ease: "back.out(1.7)"
        })
      }

      const handleMouseLeave = () => {
        gsap.to(element, {
          scale: 1,
          duration: 0.3,
          ease: "back.out(1.7)"
        })
      }

      // Add event listeners
      element.addEventListener('mouseenter', handleMouseEnter)
      element.addEventListener('mouseleave', handleMouseLeave)
    })

    // Exit animation timeline
    const exitTl = gsap.timeline({
      scrollTrigger: {
        trigger: heroRef.current,
        start: "top top",
        end: "+=500",
        scrub: 1,
      }
    })

    // Add exit animations for each tech element
    techElements.forEach((element, i) => {
      const direction = i % 2 === 0 ? -100 : 100
      exitTl.to(element, {
        x: `${direction}vw`,
        y: gsap.utils.random(-100, 100),
        opacity: 0,
        rotate: gsap.utils.random(-90, 90),
        duration: 1,
        ease: "power1.in"
      }, 0)
    })

    return () => {
      // Clean up event listeners with proper typing
      techElements.forEach((element) => {
        element.removeEventListener('mouseenter', () => {})
        element.removeEventListener('mouseleave', () => {})
      })
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])

    useEffect(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } })
  
      tl.from(headlineRef.current, {
        duration: 1,
        y: 50,
        opacity: 0
      })
      .from(nameRef.current, {
        duration: 1,
        y: 30,
        opacity: 0
      }, "-=0.5")
      .from(summaryRef.current, {
        duration: 1,
        y: 30,
        opacity: 0
      }, "-=0.7")
      .from(ctaRef.current, {
        duration: 0.8,
        y: 20,
        opacity: 0
      }, "-=0.5")

    // Parallax effect
    const parallaxAnimation = gsap.to(".hero-background", {
      scrollTrigger: {
        trigger: heroRef.current,
        start: "top top",
        end: "bottom top",
        scrub: 1
      },
      y: 100,
      opacity: 0.5
    })

    // Cleanup function
    return () => {
      tl.kill()
      parallaxAnimation.kill()
      if (ScrollTrigger.getAll().length > 0) {
        ScrollTrigger.getAll().forEach(trigger => trigger.kill())
      }
    }
  }, [])

  // Typing animation with proper cleanup
  useEffect(() => {
    const typeAnimation = () => {
      if (typingRef.current) {
        typingAnimationRef.current = gsap.to(typingRef.current, {
          duration: 2,
          text: {
            value: `I build ${typingTexts[currentTextIndex]}`,
            delimiter: ""
          },
          ease: "none",
          onComplete: () => {
            typingTimeoutRef.current = setTimeout(() => {
              setCurrentTextIndex((prev) => (prev + 1) % typingTexts.length)
            }, 2000)
          }
        })
      }
    }

    typeAnimation()

    // Cleanup function
    return () => {
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current)
      }
      if (typingAnimationRef.current) {
        typingAnimationRef.current.kill()
      }
    }
  }, [currentTextIndex, typingTexts])

  // Mobile menu animation
  useEffect(() => {
    if (isMenuOpen) {
      const menuAnimation = gsap.from(".mobile-menu-item", {
        duration: 0.5,
        x: -50,
        opacity: 0,
        stagger: 0.1,
        ease: "power2.out"
      })

      return () => {
        menuAnimation.kill()
      }
    }
  }, [isMenuOpen])

  useEffect(() => {
    // Previous animations remain the same...
    gsap.from(heroRef.current, {
      duration: 1,
      y: 60,
      opacity: 0,
      ease: "power3.out",
      delay: 0.5 // Delay hero animation until after navbar
    })
  }, [])

  return (
    <div className="bg-gray-50 min-h-screen" id='home'>
      {/* Hero Section */}
      <section 
        ref={heroRef} 
        className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100"
      >
        {/* Background Pattern */}
        <div className="hero-background absolute inset-0 opacity-10">
          <div className="grid grid-cols-12 gap-4 w-full h-full">
            {[...Array(48)].map((_, i) => (
              <div key={i} className="border border-gray-200 rounded-lg"></div>
            ))}
          </div>
        </div>

        {/* Floating Tech Stack */}
        {techStack.map((tech, index) => (
          <div
            key={index}
            className="floating-tech absolute hidden md:flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow-md cursor-pointer transform hover:shadow-lg transition-shadow"
            style={{
              left: tech.x,
              top: tech.y,
              zIndex: 1,
              backdropFilter: 'blur(8px)',
              backgroundColor: 'rgba(255, 255, 255, 0.9)',
            }}
          >
              <Image
                src={tech.image}
                alt={tech.name}
                width={24}
                height={24}
                className="object-contain" // Adjust size if needed
              />
              <span className="text-gray-700 whitespace-nowrap">{tech.name}</span>
          </div>
        ))}

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            {/* Headline */}
            <h1 
              ref={headlineRef}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6"
            >
              Crafting Seamless Web Solutions
            </h1>

            {/* Name and Title */}
            <div 
              ref={nameRef}
              className="text-2xl md:text-3xl text-gray-700 mb-4"
            >
              Hi, I&apos;m <span className="text-gray-900 font-semibold">Rogemson Molina</span>
              <br />
              Full-Stack Web Developer
            </div>

            {/* Summary */}
            <p 
              ref={summaryRef}
              className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto mb-8"
            >
              Specializing in building modern, scalable web applications 
              with cutting-edge technologies and best practices.
            </p>

            {/* Typing Animation */}
            <div 
              ref={typingRef}
              className="text-xl md:text-2xl text-gray-800 font-mono mb-8 h-8"
            >
              I build web applications
            </div>

            {/* CTA Buttons */}
            <div 
              ref={ctaRef}
              className="flex justify-center gap-4 mb-12"
            >
              <a 
                href="#projects"
                className="px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
              >
                View My Work
              </a>
              <a 
                href="#contact"
                className="px-6 py-3 border-2 border-gray-900 text-gray-900 rounded-lg hover:bg-gray-100 transition-colors"
              >
                Contact Me
              </a>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 animate-bounce">
              <ChevronDown className="text-gray-400" size={32} />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
