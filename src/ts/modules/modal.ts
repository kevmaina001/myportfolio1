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
    gatangu: {
      title: 'Gatangu - E-commerce PWA Platform',
      problem: 'Local farmers needed an accessible platform to sell produce directly to customers with offline capabilities and seamless payment integration.',
      approach: [
        'Built progressive web app with offline-first approach using service workers',
        'Integrated Paystack payment gateway for secure transactions',
        'Implemented real-time order management and WhatsApp integration',
        'Created responsive design optimized for mobile users in rural areas',
        'Added image optimization and lazy loading for faster load times',
        'Built admin panel for inventory and order management'
      ],
      results: [
        'Offline functionality enabling sales even with poor connectivity',
        'Mobile-first design improving user experience by 60%',
        'WhatsApp integration increasing customer engagement by 45%',
        'Fast loading times under 3 seconds on slow networks',
        'Successful payment processing with 99.5% uptime'
      ],
      technologies: ['React', 'Node.js', 'Express', 'MongoDB', 'PWA', 'Paystack API'],
      timeline: '4 months',
      role: 'Full Stack Developer'
    },
    khisa: {
      title: 'Khisa Foundation - Community Impact Platform',
      problem: 'The Khisa Foundation needed a modern web presence to showcase their community programs and increase engagement for their pad drives, mentorship, and digital literacy initiatives.',
      approach: [
        'Built responsive website with Next.js for optimal performance',
        'Implemented modern design focused on social impact storytelling',
        'Created interactive program showcases for pad drives and mentorship',
        'Added donation integration and volunteer sign-up functionality',
        'Optimized for accessibility and mobile-first user experience',
        'Integrated social media and community engagement features'
      ],
      results: [
        'Modern web presence increasing community awareness by 40%',
        'Mobile-optimized design improving engagement on all devices',
        'Clear program information increasing volunteer sign-ups',
        'Professional platform building trust with donors and partners',
        'Accessible design ensuring inclusivity for all community members'
      ],
      technologies: ['React', 'Next.js', 'Tailwind CSS', 'Vercel', 'TypeScript'],
      timeline: '3 months',
      role: 'Frontend Developer & Social Impact'
    },
    churchfinance: {
      title: 'Ackamune Fund Manager - Financial Dashboard',
      problem: 'Religious organizations needed a comprehensive financial management system for tracking income, expenses, and generating detailed reports with real-time analytics.',
      approach: [
        'Designed RESTful API with role-based access control',
        'Implemented double-entry bookkeeping system with audit trails',
        'Built comprehensive reporting dashboard with data visualizations',
        'Created multi-tenant architecture supporting multiple organizations',
        'Added email notifications for financial alerts and approvals',
        'Developed responsive frontend with real-time updates'
      ],
      results: [
        'Automated financial reporting saving 20+ hours per month',
        'Multi-tenant system serving multiple church organizations',
        'Audit trail ensuring complete financial transparency',
        'Real-time dashboard providing instant financial insights',
        'Role-based permissions ensuring data security and compliance'
      ],
      technologies: ['Node.js', 'React', 'MongoDB', 'Express', 'JWT', 'Chart.js'],
      timeline: '6 months',
      role: 'Lead Full Stack Developer'
    },
    joygardens: {
      title: 'Joy Gardens School - Educational Excellence Platform',
      problem: 'Joy Gardens School needed a modern, engaging website to showcase their academic programs, connect with parents, and provide interactive learning resources for students.',
      approach: [
        'Designed responsive educational website with Next.js and React',
        'Created interactive academic program showcases and course catalogs',
        'Built student portal with assignment tracking and grade access',
        'Implemented parent-teacher communication features',
        'Added event calendar and school news management system',
        'Optimized for performance with fast loading on all devices'
      ],
      results: [
        'Modern educational platform improving school-parent communication',
        'Student portal increasing academic engagement and organization',
        'Mobile-responsive design serving parents and students everywhere',
        'Fast loading times ensuring accessibility across different connections',
        'Professional online presence attracting new student enrollments'
      ],
      technologies: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Vercel'],
      timeline: '4 months',
      role: 'Frontend Developer & UI/UX Design'
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
        <div class="grid md:grid-cols-3 gap-6 p-6 bg-gray-50 dark:bg-gray-900/50 rounded-xl">
          <div>
            <h4 class="font-display font-semibold text-gray-900 dark:text-gray-100 mb-2">Role</h4>
            <p class="text-gray-600 dark:text-gray-300">${data.role}</p>
          </div>
          <div>
            <h4 class="font-display font-semibold text-gray-900 dark:text-gray-100 mb-2">Timeline</h4>
            <p class="text-gray-600 dark:text-gray-300">${data.timeline}</p>
          </div>
          <div>
            <h4 class="font-display font-semibold text-gray-900 dark:text-gray-100 mb-2">Technologies</h4>
            <div class="flex flex-wrap gap-1">
              ${data.technologies.map(tech => 
                `<span class="px-2 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 rounded text-xs">${tech}</span>`
              ).join('')}
            </div>
          </div>
        </div>

        <!-- Problem -->
        <section>
          <h3 class="text-2xl font-display font-bold text-gray-900 dark:text-gray-100 mb-4">The Challenge</h3>
          <p class="text-gray-600 dark:text-gray-300 leading-relaxed">${data.problem}</p>
        </section>

        <!-- Approach -->
        <section>
          <h3 class="text-2xl font-display font-bold text-gray-900 dark:text-gray-100 mb-4">My Approach</h3>
          <ul class="space-y-3">
            ${data.approach.map(item => 
              `<li class="flex items-start gap-3">
                <div class="w-2 h-2 bg-primary-500 rounded-full mt-2 flex-shrink-0"></div>
                <span class="text-gray-600 dark:text-gray-300">${item}</span>
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