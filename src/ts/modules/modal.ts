interface CaseStudyData {
  [key: string]: {
    title: string
    problem: string
    approach: string[]
    results: string[]
    technologies: string[]
    timeline: string
    role: string
  }
}

class CaseStudyModal {
  private modal: HTMLElement | null = null
  private modalTitle: HTMLElement | null = null
  private modalContent: HTMLElement | null = null
  private closeButton: HTMLElement | null = null
  private overlay: HTMLElement | null = null
  private isOpen: boolean = false

  private caseStudyData: CaseStudyData = {
    'isp-billing': {
      title: 'ISP Billing System',
      problem: 'Small and growing internet service providers often manage subscribers, invoices, payments, and support status across disconnected tools. The system brings those operations into one focused workflow so teams can see customer state, billing activity, and follow-up work faster.',
      approach: [
        'Designed around the core ISP workflow: packages, subscribers, invoices, payments, and account status.',
        'Built dashboard views that surface billing activity, pending work, and customer records without requiring spreadsheet reconciliation.',
        'Kept the product modular so payment and network integrations can be added as deployment needs become clearer.'
      ],
      results: [
        'Centralized subscriber and billing operations into a single product experience.',
        'Created a foundation for payment tracking, operational reporting, and future ISP-specific integrations.'
      ],
      technologies: ['TypeScript', 'Vue/Nuxt', 'Tailwind CSS', 'Billing workflows'],
      timeline: 'Product build',
      role: 'Lead Developer'
    }
  }

  constructor() {
    this.init()
  }

  private init() {
    this.modal = document.getElementById('case-study-modal')
    this.modalTitle = document.getElementById('case-study-title')
    this.modalContent = document.getElementById('case-study-content')
    this.closeButton = document.getElementById('close-modal')
    this.overlay = this.modal?.querySelector('[aria-hidden="true"]') || null

    this.setupEventListeners()
  }

  private setupEventListeners() {
    // Case study buttons
    const caseStudyButtons = document.querySelectorAll('.case-study-btn')
    caseStudyButtons.forEach(button => {
      button.addEventListener('click', (e) => {
        e.preventDefault()
        const projectId = button.getAttribute('data-project')
        if (projectId) {
          this.openModal(projectId)
        }
      })
    })

    // Close button
    this.closeButton?.addEventListener('click', () => {
      this.closeModal()
    })

    // Close on overlay click
    this.overlay?.addEventListener('click', () => {
      this.closeModal()
    })

    // Close on escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.isOpen) {
        this.closeModal()
      }
    })
  }

  private openModal(projectId: string) {
    const data = this.caseStudyData[projectId]
    if (!data || !this.modal) return

    // Populate modal content
    this.populateModal(data)

    // Show modal
    this.modal.classList.remove('hidden')
    document.body.style.overflow = 'hidden'
    this.isOpen = true

    // Focus management
    this.closeButton?.focus()

    // Animate in (optional)
    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      this.animateIn()
    }
  }

  private closeModal() {
    if (!this.modal) return

    this.modal.classList.add('hidden')
    document.body.style.overflow = ''
    this.isOpen = false

    // Return focus to trigger button
    const activeButton = document.querySelector('.case-study-btn:focus-visible') as HTMLElement
    activeButton?.focus()
  }

  private populateModal(data: CaseStudyData[string]) {
    if (!this.modalTitle || !this.modalContent) return

    this.modalTitle.textContent = data.title

    this.modalContent.innerHTML = `
      <div class="space-y-8">
        <!-- Overview -->
        <div class="grid md:grid-cols-3 gap-6 p-6 bg-slate-50 dark:bg-white/[0.04] rounded-lg">
          <div>
            <h4 class="font-display font-semibold text-gray-900 dark:text-gray-100 mb-2">Role</h4>
            <p class="text-slate-600 dark:text-slate-300">${data.role}</p>
          </div>
          <div>
            <h4 class="font-display font-semibold text-gray-900 dark:text-gray-100 mb-2">Timeline</h4>
            <p class="text-slate-600 dark:text-slate-300">${data.timeline}</p>
          </div>
          <div>
            <h4 class="font-display font-semibold text-gray-900 dark:text-gray-100 mb-2">Technologies</h4>
            <div class="flex flex-wrap gap-1">
              ${data.technologies.map(tech => 
                `<span class="px-2 py-1 bg-teal-100 dark:bg-teal-400/10 text-teal-700 dark:text-teal-300 rounded text-xs">${tech}</span>`
              ).join('')}
            </div>
          </div>
        </div>

        <!-- Problem -->
        <section>
          <h3 class="text-2xl font-display font-bold text-gray-900 dark:text-gray-100 mb-4">The Challenge</h3>
          <p class="text-slate-600 dark:text-slate-300 leading-relaxed">${data.problem}</p>
        </section>

        <!-- Approach -->
        <section>
          <h3 class="text-2xl font-display font-bold text-gray-900 dark:text-gray-100 mb-4">My Approach</h3>
          <ul class="space-y-3">
            ${data.approach.map(item => 
              `<li class="flex items-start gap-3">
                <div class="w-2 h-2 bg-teal-500 rounded-full mt-2 flex-shrink-0"></div>
                <span class="text-slate-600 dark:text-slate-300">${item}</span>
              </li>`
            ).join('')}
          </ul>
        </section>

        <!-- Results -->
        <section>
          <h3 class="text-2xl font-display font-bold text-gray-900 dark:text-gray-100 mb-4">Results & Impact</h3>
          <div class="grid sm:grid-cols-2 gap-4">
            ${data.results.map(result => 
              `<div class="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
                <div class="flex items-start gap-3">
                  <svg class="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                  </svg>
                  <span class="text-green-800 dark:text-green-300 font-medium">${result}</span>
                </div>
              </div>`
            ).join('')}
          </div>
        </section>

        <!-- Call to Action -->
        <section class="text-center pt-8 border-t border-gray-200 dark:border-gray-700">
          <h3 class="text-xl font-display font-semibold text-gray-900 dark:text-gray-100 mb-4">
            Want to discuss your project?
          </h3>
          <a href="#contact" class="btn-primary" onclick="document.getElementById('case-study-modal').classList.add('hidden'); document.body.style.overflow = '';">
            Get in Touch
            <svg class="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
            </svg>
          </a>
        </section>
      </div>
    `
  }

  private animateIn() {
    if (!this.modal) return
    
    const modalContent = this.modal.querySelector('.relative') as HTMLElement
    if (modalContent) {
      // Set initial state
      modalContent.style.transform = 'scale(0.95)'
      modalContent.style.opacity = '0'
      
      // Animate in
      requestAnimationFrame(() => {
        modalContent.style.transition = 'all 0.2s ease-out'
        modalContent.style.transform = 'scale(1)'
        modalContent.style.opacity = '1'
      })
    }
  }

  public addCaseStudy(projectId: string, data: CaseStudyData[string]) {
    this.caseStudyData[projectId] = data
  }
}

// Initialize modal
document.addEventListener('DOMContentLoaded', () => {
  new CaseStudyModal()
})

export { CaseStudyModal }
