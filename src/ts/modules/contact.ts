class ContactForm {
  private form: HTMLFormElement | null = null
  private submitButton: HTMLButtonElement | null = null
  private originalButtonText: string = ''

  constructor() {
    this.init()
  }

  private init() {
    this.form = document.getElementById('contact-form') as HTMLFormElement
    this.submitButton = this.form?.querySelector('button[type="submit"]') as HTMLButtonElement
    
    if (this.form) {
      this.originalButtonText = this.submitButton?.textContent || 'Send Message'
      this.setupFormHandling()
      this.setupValidation()
    }
  }

  private setupFormHandling() {
    if (!this.form) return

    this.form.addEventListener('submit', (e) => {
      e.preventDefault()
      this.handleSubmit()
    })
  }

  private setupValidation() {
    if (!this.form) return

    const inputs = this.form.querySelectorAll('input, textarea')
    inputs.forEach(input => {
      input.addEventListener('blur', () => {
        this.validateField(input as HTMLInputElement | HTMLTextAreaElement)
      })
      
      input.addEventListener('input', () => {
        this.clearFieldError(input as HTMLInputElement | HTMLTextAreaElement)
      })
    })
  }

  private validateField(field: HTMLInputElement | HTMLTextAreaElement): boolean {
    const value = field.value.trim()
    const fieldName = field.getAttribute('name') || field.id
    let isValid = true
    let errorMessage = ''

    // Clear previous errors
    this.clearFieldError(field)

    // Required field validation
    if (field.hasAttribute('required') && !value) {
      isValid = false
      errorMessage = `${this.getFieldLabel(fieldName)} is required`
    }

    // Email validation
    if (field.type === 'email' && value) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(value)) {
        isValid = false
        errorMessage = 'Please enter a valid email address'
      }
    }

    // Name validation
    if (fieldName === 'name' && value) {
      if (value.length < 2) {
        isValid = false
        errorMessage = 'Name must be at least 2 characters long'
      }
    }

    // Message validation
    if (fieldName === 'message' && value) {
      if (value.length < 10) {
        isValid = false
        errorMessage = 'Message must be at least 10 characters long'
      }
    }

    if (!isValid) {
      this.showFieldError(field, errorMessage)
    }

    return isValid
  }

  private validateForm(): boolean {
    if (!this.form) return false

    const fields = this.form.querySelectorAll('input, textarea')
    let isFormValid = true

    fields.forEach(field => {
      const fieldValid = this.validateField(field as HTMLInputElement | HTMLTextAreaElement)
      if (!fieldValid) {
        isFormValid = false
      }
    })

    return isFormValid
  }

  private showFieldError(field: HTMLInputElement | HTMLTextAreaElement, message: string) {
    field.classList.add('border-red-500', 'dark:border-red-400')
    field.classList.remove('border-gray-300', 'dark:border-gray-600')
    
    // Remove existing error message
    const existingError = field.parentElement?.querySelector('.field-error')
    if (existingError) {
      existingError.remove()
    }

    // Add error message
    const errorDiv = document.createElement('div')
    errorDiv.className = 'field-error text-red-500 dark:text-red-400 text-sm mt-1'
    errorDiv.textContent = message
    field.parentElement?.appendChild(errorDiv)
  }

  private clearFieldError(field: HTMLInputElement | HTMLTextAreaElement) {
    field.classList.remove('border-red-500', 'dark:border-red-400')
    field.classList.add('border-gray-300', 'dark:border-gray-600')
    
    const errorDiv = field.parentElement?.querySelector('.field-error')
    if (errorDiv) {
      errorDiv.remove()
    }
  }

  private getFieldLabel(fieldName: string): string {
    const labels = {
      name: 'Name',
      email: 'Email',
      message: 'Message'
    }
    return labels[fieldName as keyof typeof labels] || fieldName
  }

  private async handleSubmit() {
    if (!this.form || !this.submitButton) return

    // Validate form
    if (!this.validateForm()) {
      this.showFormMessage('Please fix the errors above', 'error')
      return
    }

    // Get form data
    const formData = new FormData(this.form)
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      message: formData.get('message')
    }

    // Show loading state
    this.setSubmitButtonState('loading')

    try {
      // Create mailto link as fallback
      const subject = encodeURIComponent(`Portfolio Contact from ${data.name}`)
      const body = encodeURIComponent(
        `Name: ${data.name}\nEmail: ${data.email}\n\nMessage:\n${data.message}`
      )
      const mailtoLink = `mailto:kmaina102@gmail.com?subject=${subject}&body=${body}`

      // You can replace this with your preferred form handling service
      // For now, we'll use mailto as a fallback
      window.location.href = mailtoLink

      // Show success message
      this.showFormMessage('Thank you! Your message has been sent.', 'success')
      this.form.reset()
      
    } catch (error) {
      console.error('Error sending message:', error)
      this.showFormMessage('Sorry, there was an error sending your message. Please try again.', 'error')
    } finally {
      this.setSubmitButtonState('default')
    }
  }

  private setSubmitButtonState(state: 'default' | 'loading') {
    if (!this.submitButton) return

    switch (state) {
      case 'loading':
        this.submitButton.disabled = true
        this.submitButton.innerHTML = `
          <svg class="animate-spin -ml-1 mr-3 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Sending...
        `
        break
      
      case 'default':
        this.submitButton.disabled = false
        this.submitButton.innerHTML = `
          ${this.originalButtonText}
          <svg class="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/>
          </svg>
        `
        break
    }
  }

  private showFormMessage(message: string, type: 'success' | 'error') {
    // Remove existing messages
    const existingMessage = this.form?.querySelector('.form-message')
    if (existingMessage) {
      existingMessage.remove()
    }

    // Create message element
    const messageDiv = document.createElement('div')
    messageDiv.className = `form-message p-4 rounded-lg mb-6 ${
      type === 'success' 
        ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 border border-green-200 dark:border-green-800' 
        : 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300 border border-red-200 dark:border-red-800'
    }`
    messageDiv.textContent = message

    // Insert message at the top of the form
    this.form?.insertBefore(messageDiv, this.form.firstChild)

    // Auto-remove success messages after 5 seconds
    if (type === 'success') {
      setTimeout(() => {
        messageDiv.remove()
      }, 5000)
    }
  }
}

// Copy email to clipboard functionality nuuu
document.addEventListener('DOMContentLoaded', () => {
  const emailLinks = document.querySelectorAll('a[href^="mailto:"]')
  
  emailLinks.forEach(link => {
    link.addEventListener('click', async (e) => {
      e.preventDefault()
      
      const email = link.getAttribute('href')?.replace('mailto:', '') || ''
      
      try {
        await navigator.clipboard.writeText(email)
        
        // Show toast notification
        showToast('Email copied to clipboard!')
        
      } catch (err) {
        // Fallback: open mailto
        window.location.href = link.getAttribute('href') || ''
      }
    })
  })
})

function showToast(message: string) {
  // Remove existing toast
  const existingToast = document.getElementById('toast')
  if (existingToast) {
    existingToast.remove()
  }

  // Create toast
  const toast = document.createElement('div')
  toast.id = 'toast'
  toast.className = 'fixed bottom-4 right-4 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 px-4 py-2 rounded-lg shadow-lg z-50 transition-all duration-300 transform translate-y-2 opacity-0'
  toast.textContent = message

  document.body.appendChild(toast)

  // Animate in
  requestAnimationFrame(() => {
    toast.classList.remove('translate-y-2', 'opacity-0')
  })

  // Auto-remove after 3 seconds
  setTimeout(() => {
    toast.classList.add('translate-y-2', 'opacity-0')
    setTimeout(() => {
      toast.remove()
    }, 300)
  }, 3000)
}

// Initialize contact form
new ContactForm()

export { ContactForm }