class ThemeManager {
  private theme: 'light' | 'dark' = 'dark'
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

    // Get stored theme or default to dark mode
    this.theme = this.getStoredTheme() || 'dark'
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
    
    // Simplified theme switching with minimal DOM manipulation
    this.applyTheme(newTheme)
    this.updateIcons()
    
    // Store preference
    localStorage.setItem('theme', newTheme)

    // Lightweight button feedback - CSS handles the transition
    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      this.animateToggle()
    }
  }

  private animateToggle() {
    if (!this.toggleButton) return
    
    // Use CSS class instead of direct style manipulation for better performance
    this.toggleButton.classList.add('theme-toggle-active')
    setTimeout(() => {
      this.toggleButton!.classList.remove('theme-toggle-active')
    }, 150)
  }

  public getCurrentTheme(): 'light' | 'dark' {
    return this.theme
  }
}

// Add optimized CSS for theme toggle feedback
const style = document.createElement('style')
style.textContent = `
  .theme-toggle-active {
    transform: scale(0.9);
    transition: transform 0.15s ease;
  }
`
document.head.appendChild(style)

// Initialize theme manager
new ThemeManager()

export { ThemeManager }