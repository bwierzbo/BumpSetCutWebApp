# BumpSetCut Web App - Build Instructions

This guide provides step-by-step Claude commands to build the complete marketing website.

---

## Overview

We'll build a modern, responsive marketing website using **Next.js 14** with:
- App Router (modern Next.js architecture)
- TypeScript
- Tailwind CSS (styling)
- Responsive design (mobile-first)
- SEO optimized
- Fast deployment to Vercel (free hosting)

---

## Prerequisites

Ensure you have:
- Node.js 18+ installed (`node --version`)
- npm or yarn package manager
- Git installed

---

## Quick Start Commands

Copy and paste these commands in order:

### 1. Initialize Next.js Project

```bash
cd ~/Code/BumpSetCutWebApp
npx create-next-app@latest . --typescript --tailwind --app --no-src-dir --import-alias "@/*"
```

**When prompted, choose:**
- TypeScript: Yes
- ESLint: Yes
- Tailwind CSS: Yes
- `app/` directory: Yes
- Customize default import alias: No
- Would you like to use Turbopack: No

### 2. Install Additional Dependencies

```bash
npm install framer-motion lucide-react
```

**Packages:**
- `framer-motion`: Smooth animations
- `lucide-react`: Beautiful icon library

### 3. Create Directory Structure

```bash
mkdir -p app/faq app/privacy app/terms app/community-guidelines
mkdir -p components/sections components/ui
mkdir -p public/images public/videos
```

---

## File Creation Commands

Use Claude to create these files in order:

### Step 1: Configuration Files

**File:** `tailwind.config.ts`
```claude
Update tailwind.config.ts with brand colors and custom animations
```

**File:** `app/layout.tsx`
```claude
Create root layout with metadata, font loading, and analytics placeholder
```

**File:** `app/globals.css`
```claude
Create global styles with brand colors and smooth scrolling
```

---

### Step 2: Reusable UI Components

**File:** `components/ui/Button.tsx`
```claude
Create Button component with variants (primary, secondary, outline) and sizes
```

**File:** `components/ui/Container.tsx`
```claude
Create Container component for consistent page width and padding
```

**File:** `components/ui/Section.tsx`
```claude
Create Section component for consistent vertical spacing
```

**File:** `components/ui/AppStoreBadge.tsx`
```claude
Create App Store badge component with proper Apple asset link
```

---

### Step 3: Section Components

**File:** `components/sections/Hero.tsx`
```claude
Create Hero section with headline, subheadline, CTA buttons, and hero image placeholder
```

**File:** `components/sections/Features.tsx`
```claude
Create Features section with 6 feature cards using grid layout
```

**File:** `components/sections/HowItWorks.tsx`
```claude
Create HowItWorks section with 3-step visual flow
```

**File:** `components/sections/Pricing.tsx`
```claude
Create Pricing section with Free and Pro plan cards
```

**File:** `components/sections/Testimonials.tsx`
```claude
Create Testimonials section with 3 testimonial cards
```

**File:** `components/sections/FAQ.tsx`
```claude
Create FAQ section with accordion component for questions/answers
```

**File:** `components/sections/CTA.tsx`
```claude
Create bottom CTA section with download button
```

**File:** `components/sections/Footer.tsx`
```claude
Create Footer with links, contact info, and social media icons
```

**File:** `components/sections/Header.tsx`
```claude
Create Header/Navbar with logo, navigation links, and mobile menu
```

---

### Step 4: Page Components

**File:** `app/page.tsx`
```claude
Create homepage that imports and renders all sections in order:
- Header
- Hero
- Features
- HowItWorks
- Pricing
- Testimonials
- FAQ
- CTA
- Footer
```

**File:** `app/faq/page.tsx`
```claude
Create dedicated FAQ page with all 20+ questions from WEBSITE_CONTENT.md
```

**File:** `app/privacy/page.tsx`
```claude
Create Privacy Policy page by converting legal/PRIVACY_POLICY.md to React component
```

**File:** `app/terms/page.tsx`
```claude
Create Terms of Service page by converting legal/TERMS_OF_SERVICE.md to React component
```

**File:** `app/community-guidelines/page.tsx`
```claude
Create Community Guidelines page (needs content - placeholder for now)
```

---

### Step 5: Metadata and SEO

**File:** `app/metadata.ts`
```claude
Create shared metadata configuration with Open Graph tags, Twitter cards, and structured data
```

**File:** `public/robots.txt`
```claude
Create robots.txt to allow search engine crawling
```

**File:** `public/sitemap.xml`
```claude
Create sitemap.xml with all page URLs
```

---

### Step 6: Assets and Content

**File:** `lib/content.ts`
```claude
Create content constants file with all copy from WEBSITE_CONTENT.md (features, FAQ, etc.)
```

**File:** `lib/utils.ts`
```claude
Create utility functions for className merging and animations
```

---

## Development Commands

### Run Development Server

```bash
npm run dev
```

Open http://localhost:3000 to view the site.

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm start
```

---

## Deployment to Vercel (Free)

### Option 1: Deploy via Vercel CLI

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
cd ~/Code/BumpSetCutWebApp
vercel
```

**Follow prompts:**
1. Login to Vercel (creates account if needed)
2. Link to existing project? No
3. Project name: bumpsetcut
4. Directory: ./
5. Override settings? No

Your site will be live at `https://bumpsetcut.vercel.app`

### Option 2: Deploy via GitHub

1. Push code to GitHub:
```bash
cd ~/Code/BumpSetCutWebApp
git init
git add .
git commit -m "Initial BumpSetCut website"
gh repo create bumpsetcut-website --public --source=. --push
```

2. Visit https://vercel.com
3. Click "New Project"
4. Import from GitHub: `bumpsetcut-website`
5. Click "Deploy"

Your site deploys automatically on every push.

---

## Custom Domain Setup

Once deployed to Vercel:

1. Purchase domain (bumpsetcut.com) from Namecheap, Google Domains, etc.
2. Go to Vercel project → Settings → Domains
3. Add domain: `bumpsetcut.com`
4. Update DNS records at your registrar:
   - Type: `A`, Name: `@`, Value: `76.76.21.21`
   - Type: `CNAME`, Name: `www`, Value: `cname.vercel-dns.com`
5. Wait for DNS propagation (5-60 minutes)

---

## Environment Variables

If you add analytics or other services:

```bash
# Create .env.local file
echo "NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX" >> .env.local
echo "NEXT_PUBLIC_APP_STORE_URL=https://apps.apple.com/..." >> .env.local
```

Add these in Vercel dashboard → Settings → Environment Variables.

---

## Content Updates

All content is centralized in `lib/content.ts`. To update:

1. Edit `lib/content.ts`
2. Save file
3. Development server auto-reloads
4. Push to GitHub (if using Git deployment)

No need to edit individual components.

---

## Image Assets

Add images to `public/images/`:

```bash
# App icon
public/images/app-icon.png

# Screenshots
public/images/screenshots/
  - iphone-home.png
  - iphone-swipe.png
  - iphone-library.png

# Features
public/images/features/
  - ai-detection.png
  - tiktok-viewer.png
  - organization.png

# Hero
public/images/hero-demo.mp4 (or .gif)
```

Reference in components:
```tsx
<Image src="/images/app-icon.png" alt="BumpSetCut" width={120} height={120} />
```

---

## Testing Checklist

Before going live:

- [ ] Test on mobile (responsive design)
- [ ] Test all navigation links
- [ ] Verify App Store link (when available)
- [ ] Test FAQ accordions
- [ ] Check page load speed (should be <2s)
- [ ] Verify privacy/terms links work
- [ ] Test contact email links
- [ ] Check social media links
- [ ] Verify SEO meta tags (view source)
- [ ] Test on Safari, Chrome, Firefox

---

## Performance Optimization

Next.js handles most optimization automatically, but ensure:

1. **Images:** Use `next/image` component (automatic optimization)
2. **Fonts:** Use `next/font` for Google Fonts (automatic subsetting)
3. **Code splitting:** Automatic with App Router
4. **Lazy loading:** Use `dynamic` import for heavy components

```tsx
import dynamic from 'next/dynamic';
const HeavyComponent = dynamic(() => import('./HeavyComponent'));
```

---

## Analytics Setup (Optional)

### Google Analytics

1. Create GA4 property at https://analytics.google.com
2. Get Measurement ID (G-XXXXXXXXXX)
3. Add to `app/layout.tsx`:

```tsx
import Script from 'next/script'

export default function RootLayout({ children }) {
  return (
    <html>
      <head>
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');
          `}
        </Script>
      </head>
      <body>{children}</body>
    </html>
  )
}
```

---

## Maintenance

### Regular Updates

```bash
# Update dependencies monthly
npm update

# Check for security vulnerabilities
npm audit fix
```

### Content Updates

Edit `lib/content.ts` and push. Vercel auto-deploys.

### Blog Setup (Future)

To add a blog:

```bash
mkdir -p app/blog
npm install contentlayer next-contentlayer
```

Create `posts/` directory with Markdown files. Contentlayer converts to JSON.

---

## Troubleshooting

### Build Fails

```bash
# Clear Next.js cache
rm -rf .next
npm run build
```

### Styles Not Loading

```bash
# Rebuild Tailwind
npm run build
```

### Vercel Deployment Fails

Check Vercel logs:
1. Go to Vercel dashboard
2. Click project → Deployments
3. Click failed deployment → View Function Logs

---

## Cost Breakdown

**Free (Vercel Hobby Plan):**
- Hosting: Free
- SSL: Free
- Bandwidth: 100GB/month free
- Builds: Unlimited
- Custom domain: Free (you pay registrar ~$12/year)

**Upgrade Needed When:**
- Traffic > 100GB/month
- Need team collaboration
- Want advanced analytics

**Estimated Costs:**
- Domain: $12/year (bumpsetcut.com)
- Email (optional): $6/user/month (Google Workspace)
- Total: ~$12-$84/year

---

## Next Steps After Website Launch

1. **Submit to Product Hunt** (free marketing)
2. **Post in volleyball subreddits** (r/volleyball, r/beachvolleyball)
3. **Reach out to volleyball bloggers** for reviews
4. **Create demo video** and post to YouTube, TikTok
5. **Email volleyball clubs** offering team trials
6. **Run App Store ads** (optional, $100/month starting budget)

---

## Complete Build Command Sequence

Run these in order for a fully functional site:

```bash
# 1. Create project
cd ~/Code/BumpSetCutWebApp
npx create-next-app@latest . --typescript --tailwind --app --no-src-dir

# 2. Install dependencies
npm install framer-motion lucide-react

# 3. Create directories
mkdir -p app/faq app/privacy app/terms app/community-guidelines
mkdir -p components/sections components/ui
mkdir -p public/images public/videos

# 4. Use Claude to create all files (see sections above)

# 5. Run development server
npm run dev

# 6. Test locally at localhost:3000

# 7. Deploy to Vercel
vercel

# 8. Add custom domain in Vercel dashboard
```

---

## Claude Code Workflow

To build this website with Claude Code:

1. **Open Claude Code** in this directory
2. **Ask Claude to create each file** in order from Step 2 (UI components first)
3. **Review each component** in browser as it's built
4. **Iterate on design** (colors, spacing, animations)
5. **Test responsive design** by resizing browser
6. **Deploy** when satisfied

**Example prompts:**

> "Create the Hero section component with headline 'Never Miss a Rally Again' and two CTA buttons"

> "Create the Features section with 6 feature cards in a responsive grid"

> "Update the color scheme to use volleyball orange (#FF6B35) as the primary color"

> "Make the FAQ section use an accordion pattern with smooth animations"

---

## File Structure Reference

```
BumpSetCutWebApp/
├── app/
│   ├── layout.tsx              # Root layout with metadata
│   ├── page.tsx                # Homepage
│   ├── globals.css             # Global styles
│   ├── faq/page.tsx            # FAQ page
│   ├── privacy/page.tsx        # Privacy policy
│   ├── terms/page.tsx          # Terms of service
│   └── community-guidelines/page.tsx
├── components/
│   ├── ui/
│   │   ├── Button.tsx
│   │   ├── Container.tsx
│   │   ├── Section.tsx
│   │   └── AppStoreBadge.tsx
│   └── sections/
│       ├── Header.tsx
│       ├── Hero.tsx
│       ├── Features.tsx
│       ├── HowItWorks.tsx
│       ├── Pricing.tsx
│       ├── Testimonials.tsx
│       ├── FAQ.tsx
│       ├── CTA.tsx
│       └── Footer.tsx
├── lib/
│   ├── content.ts              # All website content
│   └── utils.ts                # Utility functions
├── public/
│   ├── images/
│   ├── videos/
│   ├── robots.txt
│   └── sitemap.xml
├── tailwind.config.ts
├── package.json
├── tsconfig.json
└── WEBSITE_CONTENT.md          # Content reference
```

---

## Support

If you encounter issues:

1. **Next.js Docs:** https://nextjs.org/docs
2. **Tailwind Docs:** https://tailwindcss.com/docs
3. **Vercel Support:** https://vercel.com/support
4. **Claude Code:** Ask Claude to help debug!

---

Ready to build! Start with the Quick Start Commands and use Claude to create each component.
