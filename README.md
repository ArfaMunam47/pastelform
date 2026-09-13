<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://ai.google.dev/static/site-assets/images/share-ais-513315318.png" />
</div>

<div align="center">

# ✨ Pastel & Form

### 2026 Furniture Studio · A Premium Frontend Showcase

**Sculptural furniture. Soft pastel stages. Fluid 3D motion.**

![React 19](https://img.shields.io/badge/React-19-61DAFB) ![TypeScript 5.8](https://img.shields.io/badge/TypeScript-5.8-3178C6) ![Vite 6](https://img.shields.io/badge/Vite-6-646CFF) ![Tailwind CSS 4](https://img.shields.io/badge/Tailwind_CSS-4-38BDF8) ![Motion 12](https://img.shields.io/badge/Motion-12-E1241C)

</div>

---

> A cinematic, gallery grade digital showroom where every piece of furniture is staged like a sculpture, orbiting on its own pastel gradient stage with fluid parallax, tactile shadows and soft 3D depth.

**Pastel & Form** is not a template — it is a complete **premium frontend showcase experience**. Built as a living exhibition, it presents a curated 20 piece furniture collection across 21 categories, all rendered through an immersive 3D product showcase system: isolated transparent renders, floating depths, gradient light stages and motion that feels physical.

## ✨ Key Features

| | |
| --- | --- |
| 🎬 **3D Product Showcase** | Isolated cut out renders staged on floating gradient platforms with layered contact shadows for a true dimensional feel. |
| ✨ **Pastel Stage System** | 8 engineered mood surfaces — cream, lavender, mint, powder, peach, sage, butter and rose — each with its own gradient depth and light quality. |
| 🎞 **Fluid Motion Design** | Motion (Framer Motion) powered reveals, scroll parallax, magnetic hover effects and spring physics throughout the whole journey. |
| 🛍 **Full Commerce Flow** | Slide out shopping bag, saved collection wishlist, live search overlay, product detail modal with color variants and micro interaction toasts. |
| 🗂 **Curated Catalog** | 20 signature pieces in sofas, armchairs, lighting and more — each with color variants, artisan materials and editorial stories. |
| 📐 **Editorial Layouts** | Asymmetric stage galleries, large format hero features, horizontal carousels and full bleed brand manifesto spreads. |
| 🖌 **Artisan Typography** | Soft clay 3D type treatments, embossed display headlines and a refined pairing of Fredoka with Outfit Sans. |
| ⚡ **Modern Stack** | React 19, TypeScript, Vite 6 and Tailwind CSS 4 — designed and developed for performance and clarity. |
---

## 🎬 The Experience

The page unfolds like a designed exhibition, section by section. Scroll through 13 cinematic acts:

| # | Act | What you see |
| --- | --- | --- |
| 1 | **Editorial Navigation** | A minimal glass header with cart, saved collection and instant search. |
| 2 | **Hero Stage** | The hero sofa floating on a 3D style pastel stage with layered depth. |
| 3 | **Featured Gallery** | An asymmetric composition of three distinct product stage pods. |
| 4 | **Category Experience** | Tactile pastel surfaces introducing the furniture categories. |
| 5 | **Signature Collection** | The full 20 piece index with live filtering by category and search. |
| 6 | **New Arrivals** | A horizontal carousel of the latest sculptural pieces. |
| 7 | **Editorial Showcase** | A large format feature on the Venezia Fluted Tambour Credenza. |
| 8 | **Best Sellers** | A curated rail of the most loved designs. |
| 9 | **Furniture by Material** | Travertine, bouclé, oak, ceramic, brass and smoked glass, up close. |
| 10 | **Curated Collections** | The Serene Living Pavilion mood collection. |
| 11 | **Manifesto** | The brand and design philosophy, rendered like a printed spread. |
| 12 | **Call to Action** | An immersive 3D lighting finale with a full stage experience. |
| 13 | **Premium Footer** | Collection index, philosophy and a path back to the top. |

Layered on top of the page: a **product detail modal**, a **slide out shopping bag**, a **wishlist drawer**, a **search overlay** and **toast notifications** that keep every interaction alive.

## ⚙️ Tech Stack

| Layer | Choice |
| --- | --- |
| 🎨 Frontend | React 19 · TypeScript 5.8 · Vite 6 |
| 🧩 Styling | Tailwind CSS 4 with custom pastel design tokens |
| 🎬 Motion | Motion 12 (Framer Motion ecosystem) |
| 🔤 Typography | Fredoka (display) · Outfit + Plus Jakarta Sans (body) |
| 🧰 Icons | lucide-react |
| 🎉 Extras | canvas-confetti for celebratory micro moments |
| 🖥 Runtime | Express for the local server layer · dotenv for secrets |

## 📁 Project Structure

```text
furniture-website/
├── index.html                  # Document shell, meta & font loading
├── metadata.json               # AI Studio app metadata
├── vite.config.ts              # Vite + React + Tailwind plugins
├── tsconfig.json               # TypeScript configuration
├── package.json                # Dependencies & scripts
├── .env.example                # GEMINI_API_KEY & APP_URL template
└── src/
    ├── main.tsx                # React entry point
    ├── App.tsx                 # Global state, layout & section orchestration
    ├── index.css               # Tailwind v4 + pastel design token system
    ├── types.ts                # Product, CartItem, ColorVariant & filter types
    ├── assets/
    │   ├── images/             # Editorial photography
    │   └── isolated/           # 3D style isolated product renders
    ├── data/
    │   └── products.ts         # The complete 20 piece catalog
    └── components/
        ├── Navbar.tsx                  # Editorial glass navigation
        ├── HeroSection.tsx             # 3D spotlight hero stage
        ├── FeaturedGallery.tsx         # Asymmetric stage pods
        ├── CategoryExperience.tsx      # Pastel category surfaces
        ├── ProductGrid.tsx             # Signature collection grid + filters
        ├── NewArrivalsCarousel.tsx     # Horizontal reveal carousel
        ├── EditorialShowcase.tsx       # Large format product feature
        ├── EditorialFeatureSection.tsx # Editorial pull feature
        ├── BestSellersSection.tsx      # Bestseller rail
        ├── MaterialSection.tsx         # Material storytelling
        ├── CuratedCollectionsSection.tsx # Curated mood collections
        ├── ManifestoSection.tsx        # Brand philosophy spread
        ├── CallToActionSection.tsx     # Immersive 3D lighting finale
        ├── FinalShowcaseSection.tsx    # Closing hero act
        ├── Footer.tsx                  # Premium collection footer
        ├── ProductCard.tsx             # Reusable product card
        ├── ProductDetailModal.tsx      # Detail + color variants + checkout
        ├── CartDrawer.tsx              # Slide out shopping bag
        ├── SearchModal.tsx             # Live search overlay
        ├── WishlistModal.tsx           # Saved collection drawer
        └── Toast.tsx                   # Micro interaction notifications
```

## 🚀 Getting Started

**Prerequisites:** Node.js 18+

```bash
# 1. Install dependencies
npm install

# 2. Configure environment
cp .env.example .env.local
#   → set GEMINI_API_KEY to your Gemini API key

# 3. Start the premium experience
npm run dev
```

Open <http://localhost:3000> to walk through the exhibition. By default the shopping bag and saved collection come pre seeded so every stage of the journey, from browse to checkout, is alive on first load.

## 📜 Scripts

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the dev server on port 3000 |
| `npm run build` | Production build |
| `npm run preview` | Preview the production build |
| `npm run lint` | Type check with `tsc --noEmit` |
| `npm run clean` | Remove build artifacts |

## 🛠 Customizing the Catalog

Every product lives in [`src/data/products.ts`](src/data/products.ts). Each piece supports its own name, editorial story, artisan material, dimensions, feature list, lead time and **multiple color variants** — each variant carrying its own stage gradient, tag color and product image. The whole showroom updates the moment you add a piece.

---

<div align="center">

**Crafted with care for the love of form, color and motion.**

© 2026 Pastel & Form Studio

</div>
