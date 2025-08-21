// Simple script to create SVG placeholder images
// In a real project, you would use actual project screenshots

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const assetsPath = path.join(__dirname, '..', 'src', 'assets', 'img')

// Ensure assets/img directory exists
if (!fs.existsSync(assetsPath)) {
  fs.mkdirSync(assetsPath, { recursive: true })
}

// Generate SVG placeholders
const placeholders = [
  {
    name: 'kelvin-hero.webp',
    svg: createHeroImage()
  },
  {
    name: 'social-preview.jpg', 
    svg: createSocialPreview()
  },
  {
    name: 'gatangu-1.webp',
    svg: createProjectImage('Gatangu E-commerce', '#3B82F6', 'E-commerce Platform Homepage')
  },
  {
    name: 'gatangu-2.webp',
    svg: createProjectImage('Gatangu E-commerce', '#10B981', 'Product Catalog & Search')
  },
  {
    name: 'gatangu-3.webp',
    svg: createProjectImage('Gatangu E-commerce', '#8B5CF6', 'PWA Mobile Interface')
  },
  {
    name: 'churchfinance-1.webp',
    svg: createProjectImage('Church Finance', '#059669', 'Financial Dashboard')
  },
  {
    name: 'churchfinance-2.webp',
    svg: createProjectImage('Church Finance', '#7C3AED', 'Reports & Analytics')
  },
  {
    name: 'elderassist-1.webp',
    svg: createProjectImage('Elder Assist', '#45B7D1', 'Voice Recognition UI')
  },
  {
    name: 'elderassist-2.webp',
    svg: createProjectImage('Elder Assist', '#96CEB4', 'Dashboard Analytics')
  }
]

// Generate favicon.png from SVG
const faviconSvg = `
<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="32" height="32" rx="8" fill="url(#gradient)"/>
  <path d="M12 8h8v2h-8zm0 6h8v2h-8zm0 6h8v2h-8z" fill="white"/>
  <defs>
    <linearGradient id="gradient" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
      <stop stop-color="#3B82F6"/>
      <stop offset="1" stop-color="#8B5CF6"/>
    </linearGradient>
  </defs>
</svg>`

placeholders.forEach(({ name, svg }) => {
  // Convert SVG name to have proper extension
  const svgName = name.replace(/\.(webp|jpg|png)$/, '.svg')
  const filePath = path.join(assetsPath, svgName)
  
  fs.writeFileSync(filePath, svg)
  console.log(`Created placeholder: ${svgName}`)
})

// Create favicon.png (as SVG for now)
fs.writeFileSync(path.join(assetsPath, '..', 'icons', 'favicon.png'), faviconSvg)
console.log('Created favicon.png')

function createHeroImage() {
  return `
<svg width="400" height="400" viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="400" height="400" rx="20" fill="url(#heroGradient)"/>
  <circle cx="200" cy="150" r="60" fill="white" opacity="0.2"/>
  <rect x="150" y="240" width="100" height="6" rx="3" fill="white" opacity="0.3"/>
  <rect x="130" y="260" width="140" height="4" rx="2" fill="white" opacity="0.2"/>
  <rect x="160" y="280" width="80" height="4" rx="2" fill="white" opacity="0.2"/>
  
  <text x="200" y="340" text-anchor="middle" font-family="Arial, sans-serif" font-size="14" fill="white" opacity="0.7">Kelvin Maina</text>
  <text x="200" y="360" text-anchor="middle" font-family="Arial, sans-serif" font-size="12" fill="white" opacity="0.5">Software Engineer</text>
  
  <defs>
    <linearGradient id="heroGradient" x1="0" y1="0" x2="400" y2="400" gradientUnits="userSpaceOnUse">
      <stop stop-color="#3B82F6"/>
      <stop offset="0.5" stop-color="#8B5CF6"/>
      <stop offset="1" stop-color="#EC4899"/>
    </linearGradient>
  </defs>
</svg>`
}

function createSocialPreview() {
  return `
<svg width="1200" height="630" viewBox="0 0 1200 630" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="1200" height="630" fill="#111827"/>
  
  <!-- Background Pattern -->
  <circle cx="100" cy="100" r="40" fill="#3B82F6" opacity="0.1"/>
  <circle cx="1100" cy="530" r="60" fill="#8B5CF6" opacity="0.1"/>
  <circle cx="200" cy="500" r="30" fill="#10B981" opacity="0.1"/>
  
  <!-- Main Content -->
  <text x="600" y="250" text-anchor="middle" font-family="Arial, sans-serif" font-size="48" font-weight="bold" fill="white">Kelvin Maina</text>
  <text x="600" y="300" text-anchor="middle" font-family="Arial, sans-serif" font-size="24" fill="#9CA3AF">Software Engineer</text>
  <text x="600" y="350" text-anchor="middle" font-family="Arial, sans-serif" font-size="20" fill="#6B7280">Building fast, reliable web apps with Vue, TypeScript & Golang</text>
  
  <!-- Location -->
  <text x="600" y="420" text-anchor="middle" font-family="Arial, sans-serif" font-size="16" fill="#4B5563">📍 Nairobi, Kenya</text>
  
  <!-- Logo -->
  <rect x="550" y="480" width="100" height="40" rx="8" fill="url(#logoGradient)"/>
  <text x="600" y="505" text-anchor="middle" font-family="Arial, sans-serif" font-size="18" font-weight="bold" fill="white">KM</text>
  
  <defs>
    <linearGradient id="logoGradient" x1="550" y1="480" x2="650" y2="520" gradientUnits="userSpaceOnUse">
      <stop stop-color="#3B82F6"/>
      <stop offset="1" stop-color="#8B5CF6"/>
    </linearGradient>
  </defs>
</svg>`
}

function createProjectImage(projectName, color, description) {
  return `
<svg width="600" height="400" viewBox="0 0 600 400" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="600" height="400" fill="#F9FAFB"/>
  
  <!-- Browser Chrome -->
  <rect x="0" y="0" width="600" height="40" fill="#E5E7EB"/>
  <circle cx="20" cy="20" r="6" fill="#EF4444"/>
  <circle cx="40" cy="20" r="6" fill="#F59E0B"/>
  <circle cx="60" cy="20" r="6" fill="#10B981"/>
  
  <!-- URL Bar -->
  <rect x="100" y="12" width="400" height="16" rx="8" fill="white"/>
  <text x="110" y="23" font-family="Arial, sans-serif" font-size="10" fill="#6B7280">${projectName.toLowerCase()}.com</text>
  
  <!-- Main Content Area -->
  <rect x="0" y="40" width="600" height="360" fill="white"/>
  
  <!-- Header -->
  <rect x="0" y="40" width="600" height="80" fill="${color}" opacity="0.1"/>
  <rect x="40" y="60" width="200" height="16" rx="8" fill="${color}" opacity="0.3"/>
  <rect x="40" y="85" width="120" height="12" rx="6" fill="${color}" opacity="0.2"/>
  
  <!-- Navigation -->
  <rect x="40" y="140" width="80" height="8" rx="4" fill="#D1D5DB"/>
  <rect x="140" y="140" width="80" height="8" rx="4" fill="#D1D5DB"/>
  <rect x="240" y="140" width="80" height="8" rx="4" fill="${color}" opacity="0.6"/>
  
  <!-- Content Cards -->
  <rect x="40" y="170" width="160" height="100" rx="8" fill="#F3F4F6"/>
  <rect x="220" y="170" width="160" height="100" rx="8" fill="#F3F4F6"/>
  <rect x="400" y="170" width="160" height="100" rx="8" fill="${color}" opacity="0.1"/>
  
  <!-- Card Content -->
  <rect x="50" y="180" width="100" height="8" rx="4" fill="#9CA3AF"/>
  <rect x="50" y="195" width="80" height="6" rx="3" fill="#D1D5DB"/>
  <rect x="50" y="210" width="120" height="6" rx="3" fill="#D1D5DB"/>
  
  <!-- Footer -->
  <rect x="40" y="340" width="520" height="40" rx="8" fill="${color}" opacity="0.05"/>
  <text x="300" y="365" text-anchor="middle" font-family="Arial, sans-serif" font-size="12" fill="#6B7280">${description}</text>
</svg>`
}

console.log('Placeholder generation complete!')