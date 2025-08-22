interface GitHubRepo {
  id: number
  name: string
  full_name: string
  description: string | null
  html_url: string
  clone_url: string
  homepage: string | null
  language: string | null
  stargazers_count: number
  forks_count: number
  created_at: string
  updated_at: string
  pushed_at: string
  private: boolean
  fork: boolean
  archived: boolean
  topics: string[]
}


class GitHubRepositories {
  private readonly username: string = 'kevmaina001'
  private readonly apiUrl: string = 'https://api.github.com'
  private repos: GitHubRepo[] = []
  private loading: boolean = false
  
  constructor() {
    this.init()
  }

  private async init() {
    await this.loadRepositories()
    this.renderRepositories()
    this.setupEventListeners()
  }

  private async fetchWithAuth(url: string): Promise<Response> {
    const headers: HeadersInit = {
      'Accept': 'application/vnd.github.v3+json',
      'User-Agent': 'Portfolio-Website'
    }

    // For private repositories, you would need to add an authorization header
    // This would require a personal access token stored securely
    // For demo purposes, we'll try without auth first and show public repos
    
    return fetch(url, { headers })
  }

  private async loadRepositories(): Promise<void> {
    if (this.loading) return
    
    this.loading = true
    this.showLoadingState()

    try {
      // First, try to get public repositories
      const publicResponse = await this.fetchWithAuth(
        `${this.apiUrl}/users/${this.username}/repos?sort=updated&per_page=100`
      )
      
      if (!publicResponse.ok) {
        throw new Error(`GitHub API error: ${publicResponse.status}`)
      }
      
      const publicRepos: GitHubRepo[] = await publicResponse.json()
      
      // For private repositories, you would need authentication
      // This is a placeholder for where private repo fetching would happen
      
      // Filter out forks and archived repos, sort by last updated
      this.repos = publicRepos
        .filter(repo => !repo.fork && !repo.archived)
        .sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime())
        
    } catch (error) {
      console.error('Failed to load repositories:', error)
      this.showErrorState(error instanceof Error ? error.message : 'Unknown error')
    } finally {
      this.loading = false
    }
  }


  private renderRepositories(): void {
    const container = document.getElementById('github-repositories')
    if (!container || this.loading) return

    if (this.repos.length === 0) {
      container.innerHTML = this.getEmptyState()
      return
    }

    const reposHtml = this.repos.map(repo => this.renderRepository(repo)).join('')
    
    container.innerHTML = `
      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        ${reposHtml}
      </div>
      <div class="text-center mt-8">
        <p class="text-sm text-gray-500 dark:text-gray-400">
          Showing ${this.repos.length} public repositories. 
          <span class="text-gray-400">Private repositories require authentication.</span>
        </p>
      </div>
    `
  }

  private renderRepository(repo: GitHubRepo): string {
    const lastUpdated = this.formatDate(repo.updated_at)
    const language = repo.language || 'Unknown'
    const description = repo.description || 'No description available'
    
    return `
      <article class="card card-hover">
        <div class="flex items-start justify-between mb-4">
          <div class="flex items-center gap-2">
            <svg class="w-5 h-5 text-gray-600 dark:text-gray-300" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
            </svg>
            <h3 class="text-lg font-display font-semibold truncate">${repo.name}</h3>
            ${repo.private ? '<span class="px-2 py-1 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300 text-xs rounded">Private</span>' : ''}
          </div>
          <div class="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
            ${repo.stargazers_count > 0 ? `
              <div class="flex items-center gap-1">
                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
                <span>${repo.stargazers_count}</span>
              </div>
            ` : ''}
            ${repo.forks_count > 0 ? `
              <div class="flex items-center gap-1">
                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M6 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6zM18 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6zM12 2a3 3 0 0 0-3 3v1.17A3 3 0 0 0 6 9v6a3 3 0 0 0 3 3v1a3 3 0 0 0 6 0v-1a3 3 0 0 0 3-3V9a3 3 0 0 0-3-3V5a3 3 0 0 0-3-3z"/>
                </svg>
                <span>${repo.forks_count}</span>
              </div>
            ` : ''}
          </div>
        </div>
        
        <p class="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2">${description}</p>
        
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
            <div class="flex items-center gap-2">
              <div class="w-3 h-3 rounded-full ${this.getLanguageColor(language)}"></div>
              <span>${language}</span>
            </div>
            <span>Updated ${lastUpdated}</span>
          </div>
          
          <div class="flex items-center gap-2">
            <a href="${repo.html_url}" target="_blank" rel="noopener noreferrer" 
               class="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
               aria-label="View repository">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
              </svg>
            </a>
            ${repo.homepage ? `
              <a href="${repo.homepage}" target="_blank" rel="noopener noreferrer"
                 class="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                 aria-label="View live site">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9"/>
                </svg>
              </a>
            ` : ''}
          </div>
        </div>
        
        ${repo.topics.length > 0 ? `
          <div class="mt-4 flex flex-wrap gap-2">
            ${repo.topics.slice(0, 3).map(topic => 
              `<span class="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 text-xs rounded">${topic}</span>`
            ).join('')}
            ${repo.topics.length > 3 ? `<span class="text-xs text-gray-500 dark:text-gray-400">+${repo.topics.length - 3} more</span>` : ''}
          </div>
        ` : ''}
      </article>
    `
  }

  private showLoadingState(): void {
    const container = document.getElementById('github-repositories')
    if (!container) return

    container.innerHTML = `
      <div class="flex items-center justify-center py-12">
        <div class="flex items-center gap-3">
          <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
          <span class="text-gray-600 dark:text-gray-300">Loading repositories...</span>
        </div>
      </div>
    `
  }

  private showErrorState(message: string): void {
    const container = document.getElementById('github-repositories')
    if (!container) return

    container.innerHTML = `
      <div class="text-center py-12">
        <div class="w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg class="w-8 h-8 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
          </svg>
        </div>
        <h3 class="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">Failed to load repositories</h3>
        <p class="text-gray-600 dark:text-gray-300 mb-4">${message}</p>
        <button onclick="location.reload()" class="btn-secondary">
          <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
          </svg>
          Try Again
        </button>
      </div>
    `
  }

  private getEmptyState(): string {
    return `
      <div class="text-center py-12">
        <div class="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg class="w-8 h-8 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
          </svg>
        </div>
        <h3 class="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">No repositories found</h3>
        <p class="text-gray-600 dark:text-gray-300">No repositories are available to display.</p>
      </div>
    `
  }

  private formatDate(dateString: string): string {
    const date = new Date(dateString)
    const now = new Date()
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000)
    
    if (diffInSeconds < 60) return 'just now'
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`
    if (diffInSeconds < 2592000) return `${Math.floor(diffInSeconds / 86400)}d ago`
    if (diffInSeconds < 31536000) return `${Math.floor(diffInSeconds / 2592000)}mo ago`
    return `${Math.floor(diffInSeconds / 31536000)}y ago`
  }

  private getLanguageColor(language: string): string {
    const colors: { [key: string]: string } = {
      'JavaScript': 'bg-yellow-400',
      'TypeScript': 'bg-blue-600',
      'Python': 'bg-blue-500',
      'Java': 'bg-red-500',
      'C++': 'bg-pink-500',
      'C#': 'bg-purple-500',
      'PHP': 'bg-indigo-500',
      'Ruby': 'bg-red-600',
      'Go': 'bg-cyan-500',
      'Rust': 'bg-orange-600',
      'Swift': 'bg-orange-500',
      'Kotlin': 'bg-purple-600',
      'Dart': 'bg-blue-400',
      'HTML': 'bg-orange-500',
      'CSS': 'bg-blue-500',
      'Vue': 'bg-green-500',
      'React': 'bg-blue-400',
      'Angular': 'bg-red-600'
    }
    return colors[language] || 'bg-gray-400'
  }

  private setupEventListeners(): void {
    // Add refresh button functionality
    const refreshBtn = document.getElementById('refresh-repos')
    if (refreshBtn) {
      refreshBtn.addEventListener('click', async () => {
        await this.loadRepositories()
        this.renderRepositories()
      })
    }
  }

  public async refresh(): Promise<void> {
    await this.loadRepositories()
    this.renderRepositories()
  }
}

// Initialize GitHub repositories
document.addEventListener('DOMContentLoaded', () => {
  new GitHubRepositories()
})

export { GitHubRepositories }