class ProjectCarousel {
  private carousels: NodeListOf<Element>
  private touchStartX: number = 0
  private touchEndX: number = 0
  private currentSlides: Map<string, number> = new Map()

  constructor() {
    this.carousels = document.querySelectorAll('.project-carousel')
    this.init()
  }

  private init() {
    this.carousels.forEach((carousel, index) => {
      const projectId = carousel.getAttribute('data-project') || `project-${index}`
      this.currentSlides.set(projectId, 0)
      
      this.setupCarousel(carousel as HTMLElement, projectId)
      this.setupTouchHandling(carousel as HTMLElement, projectId)
      this.setupKeyboardHandling(carousel as HTMLElement, projectId)
    })
  }

  private setupCarousel(carousel: HTMLElement, projectId: string) {
    const track = carousel.querySelector('.carousel-track') as HTMLElement
    const prevBtn = carousel.querySelector('.carousel-prev') as HTMLElement
    const nextBtn = carousel.querySelector('.carousel-next') as HTMLElement
    const dots = carousel.querySelectorAll('.carousel-dot') as NodeListOf<HTMLElement>
    const slides = track.querySelectorAll('img')

    if (!track || slides.length <= 1) return

    // Set up navigation buttons
    prevBtn?.addEventListener('click', (e) => {
      e.stopPropagation()
      this.goToPreviousSlide(carousel, projectId)
    })

    nextBtn?.addEventListener('click', (e) => {
      e.stopPropagation()
      this.goToNextSlide(carousel, projectId)
    })

    // Set up dot indicators
    dots.forEach((dot, index) => {
      dot.addEventListener('click', (e) => {
        e.stopPropagation()
        this.goToSlide(carousel, projectId, index)
      })
    })

    // Auto-play (pause on hover)
    let autoPlayInterval: NodeJS.Timeout | null = null
    
    const startAutoPlay = () => {
      if (slides.length > 1) {
        autoPlayInterval = setInterval(() => {
          this.goToNextSlide(carousel, projectId, true)
        }, 5000)
      }
    }

    const stopAutoPlay = () => {
      if (autoPlayInterval) {
        clearInterval(autoPlayInterval)
        autoPlayInterval = null
      }
    }

    // Start auto-play initially
    startAutoPlay()

    // Pause auto-play on hover
    carousel.addEventListener('mouseenter', stopAutoPlay)
    carousel.addEventListener('mouseleave', startAutoPlay)

    // Pause auto-play when user interacts
    carousel.addEventListener('click', () => {
      stopAutoPlay()
      setTimeout(startAutoPlay, 8000) // Resume after 8 seconds
    })

    // Update initial state
    this.updateCarousel(carousel, projectId)
  }

  private setupTouchHandling(carousel: HTMLElement, projectId: string) {
    carousel.addEventListener('touchstart', (e) => {
      this.touchStartX = e.touches[0].clientX
    })

    carousel.addEventListener('touchend', (e) => {
      this.touchEndX = e.changedTouches[0].clientX
      this.handleSwipe(carousel, projectId)
    })
  }

  private setupKeyboardHandling(carousel: HTMLElement, projectId: string) {
    carousel.setAttribute('tabindex', '0')
    
    carousel.addEventListener('keydown', (e) => {
      switch (e.key) {
        case 'ArrowLeft':
          e.preventDefault()
          this.goToPreviousSlide(carousel, projectId)
          break
        case 'ArrowRight':
          e.preventDefault()
          this.goToNextSlide(carousel, projectId)
          break
      }
    })
  }

  private handleSwipe(carousel: HTMLElement, projectId: string) {
    const swipeThreshold = 50
    const swipeDistance = this.touchEndX - this.touchStartX

    if (Math.abs(swipeDistance) < swipeThreshold) return

    if (swipeDistance > 0) {
      this.goToPreviousSlide(carousel, projectId)
    } else {
      this.goToNextSlide(carousel, projectId)
    }
  }

  private goToPreviousSlide(carousel: HTMLElement, projectId: string) {
    const track = carousel.querySelector('.carousel-track') as HTMLElement
    const slides = track.querySelectorAll('img')
    const currentSlide = this.currentSlides.get(projectId) || 0
    
    const newSlide = currentSlide > 0 ? currentSlide - 1 : slides.length - 1
    this.goToSlide(carousel, projectId, newSlide)
  }

  private goToNextSlide(carousel: HTMLElement, projectId: string, _isAutoPlay = false) {
    const track = carousel.querySelector('.carousel-track') as HTMLElement
    const slides = track.querySelectorAll('img')
    const currentSlide = this.currentSlides.get(projectId) || 0
    
    const newSlide = currentSlide < slides.length - 1 ? currentSlide + 1 : 0
    this.goToSlide(carousel, projectId, newSlide)
  }

  private goToSlide(carousel: HTMLElement, projectId: string, slideIndex: number) {
    const track = carousel.querySelector('.carousel-track') as HTMLElement
    const slides = track.querySelectorAll('img')
    
    if (slideIndex < 0 || slideIndex >= slides.length) return

    this.currentSlides.set(projectId, slideIndex)
    this.updateCarousel(carousel, projectId)
  }

  private updateCarousel(carousel: HTMLElement, projectId: string) {
    const track = carousel.querySelector('.carousel-track') as HTMLElement
    const slides = track.querySelectorAll('img')
    const dots = carousel.querySelectorAll('.carousel-dot') as NodeListOf<HTMLElement>
    const currentSlide = this.currentSlides.get(projectId) || 0

    // Move track
    const translateX = -(currentSlide * 100)
    track.style.transform = `translateX(${translateX}%)`

    // Update dots
    dots.forEach((dot, index) => {
      if (index === currentSlide) {
        dot.classList.add('bg-white')
        dot.classList.remove('bg-white/60')
      } else {
        dot.classList.remove('bg-white')
        dot.classList.add('bg-white/60')
      }
    })

    // Update aria-labels for accessibility
    slides.forEach((slide, index) => {
      if (index === currentSlide) {
        slide.setAttribute('aria-current', 'true')
      } else {
        slide.removeAttribute('aria-current')
      }
    })

    // Announce slide change to screen readers
    this.announceSlideChange(currentSlide, slides.length)
  }

  private announceSlideChange(currentSlide: number, totalSlides: number) {
    // Create or update live region for screen reader announcements
    let liveRegion = document.getElementById('carousel-live-region')
    if (!liveRegion) {
      liveRegion = document.createElement('div')
      liveRegion.id = 'carousel-live-region'
      liveRegion.setAttribute('aria-live', 'polite')
      liveRegion.setAttribute('aria-atomic', 'true')
      liveRegion.className = 'sr-only'
      document.body.appendChild(liveRegion)
    }

    liveRegion.textContent = `Slide ${currentSlide + 1} of ${totalSlides}`
  }
}

// Initialize carousels when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new ProjectCarousel()
})

export { ProjectCarousel }