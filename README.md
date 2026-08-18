# ⚡ Pokémon Explorer

A clean, modern, editorial-style Pokédex web application built with **Next.js 14 (App Router)**, **TypeScript**, **Tailwind CSS**, and the public **PokéAPI**.

![Next.js](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

---

## 🌟 Key Features

### 🎴 Core Functionality
- **Responsive Card Grid**: Clean 4-column desktop, 2-column tablet, and 1-column mobile layout.
- **Type-Based Color System**: Pastel background badges paired with high-contrast text and custom top accent borders corresponding to each Pokémon's primary type.
- **Paginated Load More**: Append 20 Pokémon at a time seamlessly without replacing state.
- **Exact Name Search**: Real-time search with a dedicated, user-friendly "Pokémon Not Found" state for 404 responses.
- **Type Filter Dropdown**: Filter grid content by all 18 official Pokémon types (e.g., Fire, Water, Grass, Electric) with colored visual indicators.
- **Detailed View Route**: Full page view at `/pokemon/[name]` featuring official high-res artwork, physical stats, abilities, first 10 moves, and animated stat bars.

### 🚀 Bonus Features
- **⚔️ Pokémon Comparison**: Select any 2 Pokémon directly from grid cards to compare their base stats side-by-side with color-coded comparison bars at `/compare`.
- **🧬 Interactive Evolution Chain**: Visual, step-by-step evolution sequence on the detail page with branching support (e.g., Eevee).
- **🕒 Recently Viewed Strip**: Persistent horizontal scrollable bar on the homepage showing your last 5 visited Pokémon.
- **❤️ Favorites System**: Heart toggle on each card with `localStorage` persistence.
- **📊 Multi-Field Sorting**: Sort grid by ID, Name (A-Z), Attack, Speed, or HP.
- **🌙 Dark Mode Support**: Complete dark theme toggle with `localStorage` persistence and system preferences check.
- **⌨️ Keyboard Accessibility**: Full focus rings and `Escape` key navigation back to the homepage.

---

## 🛠️ Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **API**: [PokéAPI](https://pokeapi.co/) (REST API, no authentication required)

---

## 📁 Project Structure

```
pokemon-explorer/
├── src/
│   ├── app/
│   │   ├── compare/
│   │   │   └── page.tsx           # Side-by-side Pokémon comparison page
│   │   ├── pokemon/
│   │   │   └── [name]/
│   │   │       ├── page.tsx       # Server component for fetching detail data
│   │   │       └── DetailClient.tsx # Client detail UI (stats, evolution chain)
│   │   ├── globals.css            # Tailwind directives & CSS variables
│   │   ├── layout.tsx             # Root layout with dark mode support
│   │   └── page.tsx               # Homepage grid, search, filters & controls
│   ├── components/
│   │   ├── CompareButton.tsx      # Floating bottom bar when 2 Pokémon are selected
│   │   ├── DarkModeToggle.tsx     # Sun/Moon theme switcher
│   │   ├── ErrorState.tsx         # User-friendly error message component
│   │   ├── EvolutionChain.tsx     # Step-by-step evolution sequence
│   │   ├── LoadingSkeleton.tsx    # Card shape skeleton loaders
│   │   ├── PokemonCard.tsx        # Grid card item with badges & action triggers
│   │   ├── PokemonGrid.tsx        # Responsive grid layout wrapper
│   │   ├── RecentlyViewed.tsx     # Homepage recent visits carousel
│   │   ├── SearchBar.tsx          # Input search bar with clear button
│   │   ├── SortDropdown.tsx       # Multi-field sorting dropdown
│   │   ├── StatBar.tsx            # Animated base stat progress bar
│   │   └── TypeFilter.tsx         # Type selection dropdown with color dots
│   ├── hooks/
│   │   ├── useCompare.ts          # State management for comparison selection
│   │   ├── useFavorites.ts        # LocalStorage synced favorites hook
│   │   ├── usePokemonList.ts      # Core hook for pagination, filtering & sorting
│   │   └── useRecentlyViewed.ts   # LocalStorage synced recent visits hook
│   ├── lib/
│   │   └── typeColors.ts          # Complete type-to-color mapping dictionary
│   ├── services/
│   │   └── pokemonApi.ts          # Centralized, typed PokéAPI fetch handlers
│   └── types/
│       └── pokemon.ts             # TypeScript interfaces for API & app state
├── next.config.mjs                # Next.js configuration & image domains
├── tailwind.config.ts             # Tailwind configuration & dark mode setup
└── package.json
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18.x or later installed
- npm or yarn

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/optimusprimeleader345/Pokemon-.git
   cd Pokemon-/pokemon-explorer
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Run the development server**:
   ```bash
   npm run dev
   ```

4. **Open in browser**:
   Navigate to [http://localhost:3000](http://localhost:3000).

---

## 🧪 Build & Type Check

To check for TypeScript or build errors:

```bash
npx tsc --noEmit
npm run build
```

---

## 📜 License

This project is licensed under the [MIT License](LICENSE).
