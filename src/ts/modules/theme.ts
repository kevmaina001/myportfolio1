class ThemeManager {
  private theme: 'light' | 'dark' = 'light'
  private toggleButton: HTMLElement | null = null
  private sunIcon: HTMLElement | null = null
  private moonIcon: HTMLElement | null = null

  constructor() {
    this.init()
  }

  private init() {
    this.toggleButton = document.getElementById('theme-toggle')
    this.sunIcon = document.getElementById('sun-icon')
    this.moonIcon = document.getElementById('moon-icon')

    // Get stored theme or default to system preference
    this.theme = this.getStoredTheme() || this.getSystemTheme()
    this.applyTheme(this.theme)
    this.updateIcons()

    // Add event listener
    this.toggleButton?.addEventListener('click', () => {
      this.toggleTheme()
    })

    // Listen for system theme changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
      if (!localStorage.getItem('theme')) {
        this.theme = e.matches ? 'dark' : 'light'
        this.applyTheme(this.theme)
        this.updateIcons()
      }
    })
  }

  private getStoredTheme(): 'light' | 'dark' | null {
    const stored = localStorage.getItem('theme')
    return stored === 'light' || stored === 'dark' ? stored : null
  }

  private getSystemTheme(): 'light' | 'dark' {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  }

  private applyTheme(theme: 'light' | 'dark') {
    const html = document.documentElement
    
    if (theme === 'dark') {
      html.classList.add('dark')
    } else {
      html.classList.remove('dark')
    }

    // Update meta theme-color
    const metaThemeColor = document.querySelector('meta[name="theme-color"]')
    if (metaThemeColor) {
      metaThemeColor.setAttribute('content', theme === 'dark' ? '#111827' : '#3b82f6')
    }

    this.theme = theme
  }

  private updateIcons() {
    if (!this.sunIcon || !this.moonIcon) return

    if (this.theme === 'dark') {
      this.sunIcon.classList.add('hidden')
      this.moonIcon.classList.remove('hidden')
    } else {
      this.sunIcon.classList.remove('hidden')
      this.moonIcon.classList.add('hidden')
    }
  }

  private toggleTheme() {
    const newTheme = this.theme === 'light' ? 'dark' : 'light'
    
    // Add transition class for smooth theme switching
    document.documentElement.classList.add('theme-transitioning')
    
    this.applyTheme(newTheme)
    this.updateIcons()
    
    // Store preference
    localStorage.setItem('theme', newTheme)
    
    // Remove transition class after animation
    setTimeout(() => {
      document.documentElement.classList.remove('theme-transitioning')
    }, 300)

    // Optional: Add a subtle animation to the toggle button
    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      this.animateToggle()
    }
  }

  private animateToggle() {
    if (!this.toggleButton) return
    
    this.toggleButton.style.transform = 'scale(0.9)'
    setTimeout(() => {
      this.toggleButton!.style.transform = 'scale(1)'
    }, 150)
  }

  public getCurrentTheme(): 'light' | 'dark' {
    return this.theme
  }
}

// Add CSS for smooth theme transitions
const style = document.createElement('style')
style.textContent = `
  .theme-transitioning,
  .theme-transitioning *,
  .theme-transitioning *:before,
  .theme-transitioning *:after {
    transition: background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease !important;
    transition-delay: 0s !important;
  }
`
document.head.appendChild(style)

// Initialize theme manager
new ThemeManager()

export { ThemeManager }