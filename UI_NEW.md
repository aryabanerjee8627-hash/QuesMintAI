# QuesMint - UI Makeover Specification (UI_NEW)

This document serves as the master design reference for the QuesMint system makeover, combining the high-end aesthetic of the provided inspiration with the "Fresh Mint & Rich Navy" brand palette.

## 🎨 Brand Color Palette

| Role | Color Name | Hex | Usage |
| :--- | :--- | :--- | :--- |
| **Primary Brand** | Fresh Mint | `#3DD9B3` | Logos, primary actions, active states. |
| **Primary Hover** | Deep Mint | `#2CC29F` | Button hover states, links. |
| **Accent Glow** | Cyan Mint | `#7FFFD4` | Outer glows, gradients, highlights. |
| **Background** | Rich Navy | `#0F172A` | Main app background, deep sections. |
| **Surface** | Slate Dark | `#111827` | Card backgrounds, sidebars, modals. |
| **Card Border** | Soft Slate | `#1F2937` | Component borders, separators. |
| **Main Text** | Off White | `#F8FAFC` | Headings, primary body text. |
| **Secondary Text**| Cool Gray | `#94A3B8` | Muted descriptions, metadata. |

---

## 🖼️ Visual Strategy (Based on Inspiration)

### 1. Landing Page (`Landing_inspo.jpg`)
*   **Background:** Deep "Rich Navy" with a dynamic **Interactive Network/Plexus** overlay in "Fresh Mint".
*   **Typography:** Bold, tracking-tighter headings in "Off White".
*   **Hero CTA:** A minimalist, outlined or solid "Fresh Mint" button centered in the plexus.
*   **Feel:** Scientific, connected, intelligent.

### 2. Main Dashboard (`Mainpage_inspo.jpg` & `Background.jpg`)
*   **Layout:** High-contrast card-based layout with **Glassmorphism** effects.
*   **Cards:** "Slate Dark" with 10-20px backdrop blur, `bg-opacity-40`, and a 1px border of `white/5` or "Soft Slate".
*   **Sidebar:** Floating or semi-transparent sidebar with "Fresh Mint" active indicators.
*   **Glow Effects:** Subtle radial gradients (`Accent Glow`) behind key cards to create depth.
*   **Corners:** Ultra-rounded corners (`rounded-2xl` to `rounded-[2rem]`).

### 3. Loading & Transitions (`Loader.jpg`)
*   **Skeletons:** Smooth pulsing animation using "Soft Slate" to "Slate Dark" gradients.
*   **Transitions:** Fast but fluid (200ms) ease-in-out transitions for all hover and state changes.

---

## 🛠️ Implementation Guidelines

### Tailwind Config Extensions
```javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#3DD9B3', // Fresh Mint
          hover: '#2CC29F',   // Deep Mint
          glow: '#7FFFD4',    // Cyan Mint
        },
        navy: {
          DEFAULT: '#0F172A', // Rich Navy
          surface: '#111827', // Slate Dark
          border: '#1F2937',  // Soft Slate
        },
        text: {
          main: '#F8FAFC',    // Off White
          muted: '#94A3B8',   // Cool Gray
        }
      },
      backdropBlur: {
        xs: '2px',
      }
    }
  }
}
```

### Key UI Components
*   **Buttons:**
    *   *Solid:* `bg-primary text-navy font-bold uppercase tracking-widest hover:bg-primary-hover transition-all`
    *   *Outline:* `border-2 border-primary text-primary hover:bg-primary hover:text-navy transition-all`
*   **Cards:**
    *   `bg-navy-surface/40 backdrop-blur-xl border border-white/5 rounded-3xl shadow-2xl`
*   **Active Indicator:**
    *   Vertical bar: `w-1 h-6 bg-primary rounded-r-full shadow-[0_0_10px_#3DD9B3]`

---

## 🚫 Style Anti-Patterns
*   **No Emojis:** Use Lucide/SVG icons only.
*   **No Pure Black:** Always use "Rich Navy" or "Slate Dark".
*   **No Sharp Corners:** Everything must feel organic and rounded.
*   **No Instant Changes:** All interactions must have a hover state and transition.
