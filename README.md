# Grapinz Tech Blog

A modern, dark-themed tech blog platform built with Next.js 16 and powered by [Cosmic](https://www.cosmicjs.com/docs) CMS. Inspired by the Grapinz Technology & Institution website, this application features a bold visual design with vibrant gradients, glass-morphism effects, and a fully responsive layout for showcasing technology articles.

## Features

- 📝 **10 Tech Blog Posts** — Rich content covering programming, UI/UX, VFX, AI, and more
- 🏷️ **Category Navigation** — Filter posts by technology categories
- 👤 **Author Profiles** — Dedicated pages for each content author
- 🔍 **Tag System** — Cross-reference articles by topic tags
- 📱 **Fully Responsive** — Mobile-first design that works on all devices
- ⚡ **Server-Side Rendering** — Lightning-fast page loads with Next.js 16 App Router
- 🎨 **Dark Theme** — Professional dark UI with vibrant gradient accents
- 🖼️ **Image Optimization** — imgix-powered image delivery for fast loading

## Clone this Project

Want to create your own version of this project with all the content and structure? Clone this Cosmic bucket and code repository to get started instantly:

[![Clone this Project](https://img.shields.io/badge/Clone%20this%20Project-29abe2?style=for-the-badge&logo=cosmic&logoColor=white)](https://app.cosmicjs.com/projects/new?clone_bucket=69d6336de286d037e50376b1&clone_repository=69d63551e286d037e503772a)

## Prompts

This application was built using the following prompts to generate the content structure and code:

### Content Model Prompt

> "Create content models for a blog with posts (including featured images, content, and tags), authors, and categories. The user is rebuilding an existing website and provided these design notes: 'Create 10 blog posts for a tech website'. Factor these preferences into the content structure."

### Code Generation Prompt

> "Build a Next.js application for a creative portfolio called 'My Blog'. The content is managed in Cosmic CMS with the following object types: categories, authors, posts. Create a beautiful, modern, responsive design with a homepage and pages for each content type. Use the design style, layout, and content structure from the Grapinz website as inspiration for the application. The user is rebuilding an existing website and wants these design improvements: 'Create 10 blog posts for a tech website'. Incorporate these preferences into the visual design, layout, and overall look and feel of the application."

The app has been tailored to work with your existing Cosmic content structure and includes all the features requested above.

## Technologies

- [Next.js 16](https://nextjs.org/) — React framework with App Router
- [Cosmic](https://www.cosmicjs.com/docs) — Headless CMS for content management
- [Tailwind CSS](https://tailwindcss.com/) — Utility-first CSS framework
- [TypeScript](https://www.typescriptlang.org/) — Type-safe JavaScript

## Getting Started

### Prerequisites

- [Bun](https://bun.sh/) (recommended) or Node.js 18+
- A [Cosmic](https://www.cosmicjs.com) account with your bucket configured

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd grapinz-tech-blog
```

2. Install dependencies:
```bash
bun install
```

3. Set up environment variables:
Create a `.env.local` file with:
```env
COSMIC_BUCKET_SLUG=your-bucket-slug
COSMIC_READ_KEY=your-read-key
COSMIC_WRITE_KEY=your-write-key
```

4. Run the development server:
```bash
bun dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Cosmic SDK Examples

### Fetching Posts
```typescript
import { cosmic } from '@/lib/cosmic'

const { objects: posts } = await cosmic.objects
  .find({ type: 'posts' })
  .props(['title', 'slug', 'metadata'])
  .depth(1)
```

### Fetching a Single Post by Slug
```typescript
const { object: post } = await cosmic.objects
  .findOne({ type: 'posts', slug: 'my-post-slug' })
  .props(['title', 'slug', 'metadata', 'content'])
  .depth(1)
```

### Fetching Categories
```typescript
const { objects: categories } = await cosmic.objects
  .find({ type: 'categories' })
  .props(['title', 'slug', 'metadata'])
```

## Cosmic CMS Integration

This application uses three Cosmic object types:

| Object Type | Description | Key Metafields |
|-------------|-------------|----------------|
| **Posts** | Blog articles | content, excerpt, featured_image, author, category, tags, published_date |
| **Authors** | Content creators | name, role, bio, avatar |
| **Categories** | Post categories | name, description |

Content is fetched server-side using the Cosmic SDK, ensuring fast page loads and SEO optimization.

## Deployment Options

### Vercel (Recommended)
1. Push your code to GitHub
2. Import your repository on [Vercel](https://vercel.com)
3. Add environment variables in the Vercel dashboard
4. Deploy!

### Netlify
1. Push your code to GitHub
2. Connect your repository on [Netlify](https://netlify.com)
3. Set build command to `bun run build`
4. Add environment variables in site settings
5. Deploy!

<!-- README_END -->