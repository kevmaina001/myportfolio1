class Navigation {
  private mobileMenuToggle: HTMLElement | null = null
  private mobileMenu: HTMLElement | null = null
  private isMenuOpen: boolean = false

  constructor() {
    this.init()
  }

  private init() {
    this.mobileMenuToggle = document.getElementById('mobile-menu-toggle')
    this.mobileMenu = document.getElementById('mobile-menu')

    this.setupMobileMenu()
    this.setupScrollSpy()
    this.setupActiveNavigation()
  }

  private setupMobileMenu() {
    if (!this.mobileMenuToggle || !this.mobileMenu) return

    this.mobileMenuToggle.addEventListener('click', () => {
      this.toggleMobileMenu()
    })

    // Close mobile menu when clicking on links
    const mobileLinks = this.mobileMenu.querySelectorAll('a[href^="#"]')
    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        this.closeMobileMenu()
      })
    })

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
      if (this.isMenuOpen && 
          !this.mobileMenu?.contains(e.target as Node) && 
          !this.mobileMenuToggle?.contains(e.target as Node)) {
        this.closeMobileMenu()
      }
    })

    // Close mobile menu on escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.isMenuOpen) {
        this.closeMobileMenu()
      }
    })
  }

  private toggleMobileMenu() {
    if (this.isMenuOpen) {
      this.closeMobileMenu()
    } else {
      this.openMobileMenu()
    }
  }

  private openMobileMenu() {
    if (!this.mobileMenu || !this.mobileMenuToggle) return

    this.isMenuOpen = true
    this.mobileMenu.classList.remove('hidden')
    this.mobileMenuToggle.setAttribute('aria-expanded', 'true')
    
    // Update icon
    const icon = this.mobileMenuToggle.querySelector('svg')
    if (icon) {
      icon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>'
    }

    // Prevent body scroll
    document.body.style.overflow = 'hidden'
  }

  private closeMobileMenu() {
    if (!this.mobileMenu || !this.mobileMenuToggle) return

    this.isMenuOpen = false
    this.mobileMenu.classList.add('hidden')
    this.mobileMenuToggle.setAttribute('aria-expanded', 'false')
    
    // Update icon
    const icon = this.mobileMenuToggle.querySelector('svg')
    if (icon) {
      icon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>'
    }

    // Restore body scroll
    document.body.style.overflow = ''
  }

  private setupScrollSpy() {
    const sections = document.querySelectorAll('section[id]')
    
    const observerOptions = {
      rootMargin: '-20% 0% -80% 0%'
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id')
          this.updateActiveNavigation(id)
        }
      })
    }, observerOptions)

    sections.forEach(section => observer.observe(section))
  }

  private setupActiveNavigation() {
    const navLinks = document.querySelectorAll('nav a[href^="#"]')
    
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        const href = (link as HTMLAnchorElement).getAttribute('href')
        if (href) {
          const id = href.substring(1) // Remove #
          this.updateActiveNavigation(id)
        }
      })
    })
  }

  private updateActiveNavigation(activeId: string | null) {
    const navLinks = document.querySelectorAll('nav a[href^="#"]')
    
    navLinks.forEach(link => {
      const href = (link as HTMLAnchorElement).getAttribute('href')
      const id = href?.substring(1) // Remove #
      
      if (id === activeId) {
        link.classList.add('text-primary-600', 'dark:text-primary-400')
        link.classList.remove('text-gray-600', 'dark:text-gray-300')
      } else {
        link.classList.remove('text-primary-600', 'dark:text-primary-400')
        link.classList.add('text-gray-600', 'dark:text-gray-300')
      }
    })
  }
}

// Initialize navigation
document.addEventListener('DOMContentLoaded', () => {
  new Navigation()
})

export { Navigation }