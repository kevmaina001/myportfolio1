# Kelvin Maina - Portfolio Website

A modern, animated personal portfolio website built with Vite, TypeScript, and Tailwind CSS. Features smooth animations, dark mode, responsive design, and perfect Lighthouse scores.

## 🚀 Live Demo

Visit the live site at: [https://kevmaina001.github.io](https://kevmaina001.github.io)

## ✨ Features

- **Modern Design**: Clean, minimal aesthetic with glassmorphism effects
- **Smooth Animations**: GSAP-powered animations with respect for `prefers-reduced-motion`
- **Dark/Light Mode**: Seamless theme switching with system preference detection
- **Responsive Design**: Optimized for all devices from mobile to desktop
- **Performance Optimized**: 90+ Lighthouse scores across all metrics
- **Accessibility First**: WCAG compliant with proper ARIA labels and keyboard navigation
- **SEO Ready**: Complete meta tags, JSON-LD schema, and social cards
- **Interactive Components**: Project carousels, contact form, case study modals
- **Progressive Enhancement**: Works without JavaScript for core functionality

## 🛠️ Tech Stack

- **Build Tool**: Vite 5
- **Language**: TypeScript
- **Styling**: Tailwind CSS 3
- **Animations**: GSAP with ScrollTrigger
- **Icons**: Lucide (lightweight SVG icons)
- **Deployment**: GitHub Pages via GitHub Actions

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/kevmaina001/portfolio.git
   cd portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Build for production**
   ```bash
   npm run build
   ```

5. **Preview production build**
   ```bash
   npm run preview
   ```

## 🚦 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with hot reload |
| `npm run build` | Build for production (outputs to `dist/`) |
| `npm run preview` | Preview production build locally |

## 📁 Project Structure

```
portfolio/
├── .github/
│   └── workflows/
│       └── pages.yml          # GitHub Actions deployment workflow
├── src/
│   ├── assets/
│   │   ├── css/
│   │   │   └── styles.css     # Main stylesheet with Tailwind
│   │   ├── img/               # Optimized images and placeholders
│   │   └── icons/             # SVG icons and favicon
│   └── ts/
│       ├── modules/           # Modular TypeScript components
│       │   ├── theme.ts       # Dark mode toggle functionality
│       │   ├── navigation.ts  # Navigation and scroll spy
│       │   ├── carousel.ts    # Project image carousels
│       │   ├── contact.ts     # Contact form handling
│       │   └── modal.ts       # Case study modals
│       └── main.ts            # Main entry point and animations
├── scripts/
│   └── generate-placeholders.js # Placeholder image generation
├── resume/                    # Resume PDF location
├── index.html                 # Main HTML file
├── robots.txt                 # SEO robots file
├── sitemap.xml               # SEO sitemap
└── README.md                 # This file
```

## 🎨 Customization

### Adding New Projects

1. **Update the HTML** in `index.html` projects section:
   ```html
   <article class="card card-hover">
     <div class="project-carousel" data-project="your-project">
       <!-- Add your project images -->
     </div>
     <!-- Add project details -->
   </article>
   ```

2. **Add project images** to `src/assets/img/`:
   - Use WebP format for optimal performance
   - Recommended size: 600x400px
   - Name them: `your-project-1.webp`, `your-project-2.webp`, etc.

3. **Add case study data** in `src/ts/modules/modal.ts`:
   ```typescript
   'your-project': {
     title: 'Your Project Name',
     problem: 'The challenge you solved...',
     approach: ['Step 1', 'Step 2', 'Step 3'],
     results: ['Result 1', 'Result 2'],
     technologies: ['Tech1', 'Tech2'],
     timeline: '2 months',
     role: 'Your Role'
   }
   ```

### Updating Personal Information

1. **Basic Info**: Edit the variables in `index.html`:
   - Name, tagline, bio, location
   - Contact information (email, phone, social links)
   - Meta tags and JSON-LD schema

2. **Experience**: Update the experience timeline section with your work history

3. **Skills**: Modify the technology badges in the About section

4. **Resume**: Replace `resume/kelvin-maina-resume.pdf` with your actual resume

### Styling Customization

1. **Colors**: Update the color palette in `tailwind.config.js`:
   ```javascript
   colors: {
     primary: { /* Your brand colors */ },
     accent: {
       blue: '#your-blue',
       violet: '#your-violet'
     }
   }
   ```

2. **Fonts**: Change fonts in `src/assets/css/styles.css`:
   ```css
   @import url('your-google-fonts-url');
   ```

3. **Animations**: Customize GSAP animations in `src/ts/main.ts`

## 🚀 Deployment

### GitHub Pages (Recommended)

This project includes automated GitHub Pages deployment via GitHub Actions.

1. **Push to GitHub**:
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Enable GitHub Pages**:
   - Go to repository Settings → Pages
   - Source: GitHub Actions
   - The workflow will automatically deploy on push to main

3. **Custom Domain** (Optional):
   - Add `CNAME` file with your domain
   - Configure DNS with your provider

### Manual Deployment

1. **Build the project**:
   ```bash
   npm run build
   ```

2. **Deploy the `dist/` folder** to any static hosting service:
   - Netlify: Drag and drop the `dist` folder
   - Vercel: Connect your GitHub repository
   - S3: Upload `dist` contents to your bucket

## 🔧 Performance Optimization

### Images
- All images are optimized with WebP/AVIF formats
- Responsive `srcset` for different screen sizes
- Lazy loading for non-critical images
- Preload hero image for faster LCP

### JavaScript
- Code splitting with Vite
- Tree shaking to remove unused code
- GSAP loaded as separate chunk
- Reduced motion respect throughout

### CSS
- Tailwind CSS purging removes unused styles
- Critical CSS inlined in HTML
- Font loading optimized with `font-display: swap`

### Lighthouse Scores Target
- **Performance**: 90+
- **Accessibility**: 95+
- **Best Practices**: 95+
- **SEO**: 100

## ♿ Accessibility Features

- Semantic HTML structure
- Proper heading hierarchy (h1-h6)
- ARIA labels and roles
- Keyboard navigation support
- Focus management
- Screen reader announcements
- Color contrast compliance
- Reduced motion support

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test accessibility and performance
5. Submit a pull request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 📞 Contact

- **Email**: hello@kelvinmaina.dev
- **LinkedIn**: [linkedin.com/in/kelvin-maina-460490241](https://www.linkedin.com/in/kelvin-maina-460490241)
- **GitHub**: [github.com/kevmaina001](https://github.com/kevmaina001)
- **Website**: [kevmaina001.github.io](https://kevmaina001.github.io)

---

⭐ **Star this repository if it helped you build your own portfolio!**