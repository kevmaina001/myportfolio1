import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './modules/theme'
import './modules/navigation'
import './modules/carousel'
import './modules/contact'
import './modules/modal'

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger)

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', () => {
  initAnimations()
  initScrollTriggers()
})

function initAnimations() {
  // Hero section staged reveal
  const heroLines = document.querySelectorAll('[data-aos="hero-line"]')
  const heroTagline = document.querySelector('[data-aos="hero-tagline"]')
  const heroCtas = document.querySelector('[data-aos="hero-ctas"]')
  const heroSocials = document.querySelector('[data-aos="hero-socials"]')
  const heroImage = document.querySelector('[data-aos="hero-image"]')
  const statCards = document.querySelectorAll('[data-aos="stat-card"]')

  // Set initial states with GPU acceleration hints
  gsap.set([heroLines, heroTagline, heroCtas, heroSocials], { 
    opacity: 0, 
    y: 30,
    force3D: true
  })
  gsap.set(heroImage, { 
    opacity: 0, 
    scale: 0.9,
    force3D: true
  })
  gsap.set(statCards, { 
    opacity: 0, 
    scale: 0.8,
    force3D: true
  })

  // Create optimized timeline with shorter durations
  const tl = gsap.timeline({ delay: 0.3 })
  
  tl.to(heroLines[0], { 
    duration: 0.5, 
    opacity: 1, 
    y: 0, 
    ease: "power2.out" 
  })
  .to(heroLines[1], { 
    duration: 0.5, 
    opacity: 1, 
    y: 0, 
    ease: "power2.out" 
  }, "-=0.3")
  .to(heroTagline, { 
    duration: 0.5, 
    opacity: 1, 
    y: 0, 
    ease: "power2.out" 
  }, "-=0.3")
  .to(heroCtas, { 
    duration: 0.5, 
    opacity: 1, 
    y: 0, 
    ease: "power2.out" 
  }, "-=0.3")
  .to(heroSocials, { 
    duration: 0.5, 
    opacity: 1, 
    y: 0, 
    ease: "power2.out" 
  }, "-=0.3")
  .to(heroImage, { 
    duration: 0.6, 
    opacity: 1, 
    scale: 1, 
    ease: "power2.out" 
  }, "-=0.4")
  .to(statCards, { 
    duration: 0.4, 
    opacity: 1, 
    scale: 1, 
    ease: "back.out(1.4)",
    stagger: 0.1 
  }, "-=0.3")
}

function initScrollTriggers() {
  // Respect reduced motion preference
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
  
  if (prefersReducedMotion.matches) {
    return // Skip animations if user prefers reduced motion
  }

  // Section headers animation - optimized
  const sectionHeaders = document.querySelectorAll('section h2')
  sectionHeaders.forEach(header => {
    gsap.fromTo(header, 
      { 
        opacity: 0, 
        y: 30,
        force3D: true
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: "power2.out",
        scrollTrigger: {
          trigger: header,
          start: "top 85%",
          once: true,
          fastScrollEnd: true
        }
      }
    )
  })

  // Cards animation on scroll - batch process for better performance
  const cards = document.querySelectorAll('.card')
  if (cards.length > 0) {
    ScrollTrigger.batch(cards, {
      onEnter: (elements) => {
        gsap.fromTo(elements, 
          {
            opacity: 0,
            y: 30,
            force3D: true
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.4,
            ease: "power2.out",
            stagger: 0.05
          }
        )
      },
      start: "top 90%",
      once: true
    })
  }

  // Experience timeline animation - optimized
  const timelineItems = document.querySelectorAll('#experience .relative')
  timelineItems.forEach((item, index) => {
    const card = item.querySelector('.card')
    if (card) {
      gsap.fromTo(card,
        {
          opacity: 0,
          x: index % 2 === 0 ? -30 : 30,
          force3D: true
        },
        {
          opacity: 1,
          x: 0,
          duration: 0.5,
          ease: "power2.out",
          scrollTrigger: {
            trigger: item,
            start: "top 85%",
            once: true,
            fastScrollEnd: true
          }
        }
      )
    }
  })

  // Tech stack badges animation - simplified
  const techBadges = document.querySelectorAll('#about .flex-wrap span')
  if (techBadges.length > 0) {
    gsap.fromTo(techBadges,
      {
        opacity: 0,
        y: 20,
        force3D: true
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.3,
        ease: "power2.out",
        stagger: 0.05,
        scrollTrigger: {
          trigger: techBadges[0],
          start: "top 85%",
          once: true,
          fastScrollEnd: true
        }
      }
    )
  }

  // Parallax effect for background elements
  gsap.to('.bg-mesh', {
    backgroundPosition: '50% 0%',
    ease: "none",
    scrollTrigger: {
      trigger: "#hero",
      start: "top bottom",
      end: "bottom top",
      scrub: true
    }
  })

  // Header background on scroll
  const header = document.querySelector('header')
  ScrollTrigger.create({
    start: "top -100",
    end: 99999,
    toggleClass: {
      className: "scrolled",
      targets: header
    }
  })
}

// Optimize card hover with CSS-only approach - remove heavy JS animations
// Hover effects are now handled by optimized CSS transitions in styles.css

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (this: HTMLAnchorElement, e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute('href')!)
    
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      })
    }
  })
})