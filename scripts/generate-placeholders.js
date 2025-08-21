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
  const isGatangu = projectName.includes('Gatangu')
  const isChurch = projectName.includes('Church')
  const isElder = projectName.includes('Elder')
  
  if (isGatangu) {
    return createGatanguMockup(color, description)
  } else if (isChurch) {
    return createChurchFinanceMockup(color, description)
  } else if (isElder) {
    return createElderAssistMockup(color, description)
  }
  
  // Default fallback
  return createDefaultMockup(projectName, color, description)
}

function createGatanguMockup(color, description) {
  return `
<svg width="600" height="400" viewBox="0 0 600 400" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="600" height="400" fill="#F8FAFC"/>
  
  <!-- Browser Chrome -->
  <rect x="0" y="0" width="600" height="40" fill="#E2E8F0"/>
  <circle cx="20" cy="20" r="6" fill="#EF4444"/>
  <circle cx="40" cy="20" r="6" fill="#F59E0B"/>
  <circle cx="60" cy="20" r="6" fill="#10B981"/>
  
  <!-- URL Bar -->
  <rect x="100" y="12" width="400" height="16" rx="8" fill="white"/>
  <text x="110" y="23" font-family="Arial, sans-serif" font-size="10" fill="#6B7280">gatanguenterprise.com</text>
  
  <!-- Main Content -->
  <rect x="0" y="40" width="600" height="360" fill="white"/>
  
  <!-- Header with Logo Area -->
  <rect x="0" y="40" width="600" height="100" fill="#10B981" opacity="0.1"/>
  <rect x="40" y="60" width="120" height="20" rx="4" fill="#10B981" opacity="0.8"/>
  <text x="50" y="75" font-family="Arial, sans-serif" font-size="12" font-weight="bold" fill="white">GATANGU</text>
  
  <!-- Navigation -->
  <rect x="40" y="160" width="60" height="8" rx="4" fill="#64748B"/>
  <rect x="120" y="160" width="80" height="8" rx="4" fill="#64748B"/>
  <rect x="220" y="160" width="70" height="8" rx="4" fill="#10B981"/>
  <rect x="310" y="160" width="60" height="8" rx="4" fill="#64748B"/>
  
  <!-- Product Grid -->
  <rect x="40" y="190" width="120" height="120" rx="8" fill="#F1F5F9"/>
  <rect x="180" y="190" width="120" height="120" rx="8" fill="#F1F5F9"/>
  <rect x="320" y="190" width="120" height="120" rx="8" fill="#F1F5F9"/>
  <rect x="460" y="190" width="120" height="120" rx="8" fill="#F1F5F9"/>
  
  <!-- Product Images (represented as colored rectangles) -->
  <rect x="50" y="200" width="100" height="60" rx="4" fill="#22C55E"/>
  <rect x="190" y="200" width="100" height="60" rx="4" fill="#059669"/>
  <rect x="330" y="200" width="100" height="60" rx="4" fill="#16A34A"/>
  <rect x="470" y="200" width="100" height="60" rx="4" fill="#15803D"/>
  
  <!-- Product Names -->
  <rect x="50" y="275" width="80" height="6" rx="3" fill="#374151"/>
  <rect x="190" y="275" width="90" height="6" rx="3" fill="#374151"/>
  <rect x="330" y="275" width="70" height="6" rx="3" fill="#374151"/>
  <rect x="470" y="275" width="85" height="6" rx="3" fill="#374151"/>
  
  <!-- Prices -->
  <rect x="50" y="290" width="40" height="8" rx="4" fill="#10B981" opacity="0.8"/>
  <rect x="190" y="290" width="45" height="8" rx="4" fill="#10B981" opacity="0.8"/>
  <rect x="330" y="290" width="35" height="8" rx="4" fill="#10B981" opacity="0.8"/>
  <rect x="470" y="290" width="50" height="8" rx="4" fill="#10B981" opacity="0.8"/>
  
  <!-- Footer -->
  <rect x="0" y="340" width="600" height="60" fill="#F8FAFC"/>
  <text x="300" y="375" text-anchor="middle" font-family="Arial, sans-serif" font-size="12" fill="#6B7280">${description}</text>
</svg>`
}

function createChurchFinanceMockup(color, description) {
  return `
<svg width="600" height="400" viewBox="0 0 600 400" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="600" height="400" fill="#FEFEFE"/>
  
  <!-- Header -->
  <rect x="0" y="0" width="600" height="60" fill="#7C3AED" opacity="0.1"/>
  <rect x="40" y="20" width="150" height="20" rx="4" fill="#7C3AED" opacity="0.8"/>
  <text x="50" y="35" font-family="Arial, sans-serif" font-size="12" font-weight="bold" fill="white">Church Finance</text>
  
  <!-- Dashboard Grid -->
  <rect x="40" y="80" width="120" height="80" rx="8" fill="#EDE9FE"/>
  <rect x="180" y="80" width="120" height="80" rx="8" fill="#DDD6FE"/>
  <rect x="320" y="80" width="120" height="80" rx="8" fill="#C4B5FD"/>
  <rect x="460" y="80" width="120" height="80" rx="8" fill="#A78BFA"/>
  
  <!-- Charts Area -->
  <rect x="40" y="180" width="260" height="150" rx="8" fill="#F3F4F6"/>
  <rect x="320" y="180" width="260" height="150" rx="8" fill="#F3F4F6"/>
  
  <!-- Chart Lines -->
  <polyline points="60,250 100,230 140,240 180,220 220,200 260,190" stroke="#7C3AED" stroke-width="3" fill="none"/>
  <polyline points="340,280 380,260 420,270 460,250 500,230 540,220" stroke="#059669" stroke-width="3" fill="none"/>
  
  <text x="300" y="365" text-anchor="middle" font-family="Arial, sans-serif" font-size="12" fill="#6B7280">${description}</text>
</svg>`
}

function createElderAssistMockup(color, description) {
  return `
<svg width="600" height="400" viewBox="0 0 600 400" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="600" height="400" fill="#F0F9FF"/>
  
  <!-- Header -->
  <rect x="0" y="0" width="600" height="80" fill="#0EA5E9" opacity="0.1"/>
  <rect x="40" y="25" width="180" height="20" rx="4" fill="#0EA5E9" opacity="0.8"/>
  <text x="50" y="40" font-family="Arial, sans-serif" font-size="12" font-weight="bold" fill="white">Elder Assistant AI</text>
  
  <!-- Voice Interface -->
  <circle cx="300" cy="180" r="60" fill="#0EA5E9" opacity="0.2"/>
  <circle cx="300" cy="180" r="40" fill="#0EA5E9" opacity="0.4"/>
  <circle cx="300" cy="180" r="20" fill="#0EA5E9" opacity="0.8"/>
  
  <!-- Microphone Icon -->
  <rect x="290" y="165" width="20" height="30" rx="10" fill="#0EA5E9"/>
  <rect x="285" y="200" width="30" height="8" rx="4" fill="#0EA5E9"/>
  <rect x="297" y="208" width="6" height="15" fill="#0EA5E9"/>
  
  <!-- Status Cards -->
  <rect x="40" y="270" width="150" height="60" rx="8" fill="#DBEAFE"/>
  <rect x="220" y="270" width="150" height="60" rx="8" fill="#DCFCE7"/>
  <rect x="400" y="270" width="150" height="60" rx="8" fill="#FEF3C7"/>
  
  <!-- Status Icons -->
  <circle cx="70" cy="290" r="8" fill="#3B82F6"/>
  <circle cx="250" cy="290" r="8" fill="#22C55E"/>
  <circle cx="430" cy="290" r="8" fill="#F59E0B"/>
  
  <text x="300" y="375" text-anchor="middle" font-family="Arial, sans-serif" font-size="12" fill="#6B7280">${description}</text>
</svg>`
}

function createDefaultMockup(projectName, color, description) {
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
  
  <!-- Content Cards -->
  <rect x="40" y="170" width="160" height="100" rx="8" fill="#F3F4F6"/>
  <rect x="220" y="170" width="160" height="100" rx="8" fill="#F3F4F6"/>
  <rect x="400" y="170" width="160" height="100" rx="8" fill="${color}" opacity="0.1"/>
  
  <!-- Footer -->
  <rect x="40" y="340" width="520" height="40" rx="8" fill="${color}" opacity="0.05"/>
  <text x="300" y="365" text-anchor="middle" font-family="Arial, sans-serif" font-size="12" fill="#6B7280">${description}</text>
</svg>`
}

console.log('Placeholder generation complete!')