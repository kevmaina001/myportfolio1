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

  // Set initial states
  gsap.set([heroLines, heroTagline, heroCtas, heroSocials], { 
    opacity: 0, 
    y: 30 
  })
  gsap.set(heroImage, { 
    opacity: 0, 
    scale: 0.9 
  })
  gsap.set(statCards, { 
    opacity: 0, 
    scale: 0.8 
  })

  // Create timeline
  const tl = gsap.timeline({ delay: 0.5 })
  
  tl.to(heroLines[0], { 
    duration: 0.8, 
    opacity: 1, 
    y: 0, 
    ease: "power2.out" 
  })
  .to(heroLines[1], { 
    duration: 0.8, 
    opacity: 1, 
    y: 0, 
    ease: "power2.out" 
  }, "-=0.4")
  .to(heroTagline, { 
    duration: 0.8, 
    opacity: 1, 
    y: 0, 
    ease: "power2.out" 
  }, "-=0.4")
  .to(heroCtas, { 
    duration: 0.8, 
    opacity: 1, 
    y: 0, 
    ease: "power2.out" 
  }, "-=0.4")
  .to(heroSocials, { 
    duration: 0.8, 
    opacity: 1, 
    y: 0, 
    ease: "power2.out" 
  }, "-=0.4")
  .to(heroImage, { 
    duration: 1, 
    opacity: 1, 
    scale: 1, 
    ease: "power2.out" 
  }, "-=0.6")
  .to(statCards, { 
    duration: 0.6, 
    opacity: 1, 
    scale: 1, 
    ease: "back.out(1.7)",
    stagger: 0.2 
  }, "-=0.4")
}

function initScrollTriggers() {
  // Respect reduced motion preference
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
  
  if (prefersReducedMotion.matches) {
    return // Skip animations if user prefers reduced motion
  }

  // Section headers animation
  const sectionHeaders = document.querySelectorAll('section h2')
  sectionHeaders.forEach(header => {
    gsap.fromTo(header, 
      { 
        opacity: 0, 
        y: 50 
      },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: header,
          start: "top 80%",
          once: true
        }
      }
    )
  })

  // Cards animation on scroll
  const cards = document.querySelectorAll('.card')
  cards.forEach((card, index) => {
    gsap.fromTo(card,
      {
        opacity: 0,
        y: 60,
        scale: 0.95
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: card,
          start: "top 85%",
          once: true
        },
        delay: index * 0.1
      }
    )
  })

  // Experience timeline animation
  const timelineItems = document.querySelectorAll('#experience .relative')
  timelineItems.forEach((item, index) => {
    gsap.fromTo(item.querySelector('.card'),
      {
        opacity: 0,
        x: index % 2 === 0 ? -50 : 50,
        scale: 0.9
      },
      {
        opacity: 1,
        x: 0,
        scale: 1,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: item,
          start: "top 80%",
          once: true
        }
      }
    )
  })

  // Tech stack badges animation
  const techBadges = document.querySelectorAll('#about .flex-wrap span')
  gsap.fromTo(techBadges,
    {
      opacity: 0,
      scale: 0.8,
      y: 20
    },
    {
      opacity: 1,
      scale: 1,
      y: 0,
      duration: 0.6,
      ease: "back.out(1.7)",
      stagger: 0.1,
      scrollTrigger: {
        trigger: techBadges[0],
        start: "top 80%",
        once: true
      }
    }
  )

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

// Add card hover effects
document.addEventListener('DOMContentLoaded', () => {
  const cards = document.querySelectorAll('.card-hover')
  
  cards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        gsap.to(card, {
          y: -8,
          duration: 0.3,
          ease: "power2.out"
        })
      }
    })
    
    card.addEventListener('mouseleave', () => {
      if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        gsap.to(card, {
          y: 0,
          duration: 0.3,
          ease: "power2.out"
        })
      }
    })
  })
})

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