# QuesMint Frontend System (Master AI Design File)

## PURPOSE
You are building QuesMint, a premium AI-powered quiz generation SaaS platform.

The frontend MUST feel:
- modern
- polished
- premium
- responsive
- startup-grade
- clean
- fast
- intelligent

The design quality should resemble:
- Linear
- Vercel
- Perplexity
- Notion AI
- modern AI SaaS products

The UI must NEVER feel like:
- a college project
- template spam
- cluttered dashboard
- random AI-generated UI
- outdated bootstrap admin panel

---

# PRIMARY GOAL
The product should look like:
"A funded AI startup product ready for real users."

Every UI decision should prioritize:
1. clarity
2. spacing
3. hierarchy
4. consistency
5. responsiveness
6. accessibility
7. subtle polish

---

# TECH STACK
Always use:

- Next.js 15 App Router
- TypeScript
- Tailwind CSS
- shadcn/ui
- Framer Motion
- Lucide Icons

Preferred Architecture:
- reusable components
- modular folder structure
- clean naming
- scalable design system

---

# GLOBAL DESIGN SYSTEM

## VISUAL STYLE
Design aesthetic:
- minimal AI SaaS
- dark mode first
- elegant gradients
- premium whitespace
- modern typography
- soft contrast
- subtle depth

The interface should feel:
- calm
- intelligent
- futuristic
- clean
- productive

---

# COLOR SYSTEM

## PRIMARY COLORS
Use elegant modern SaaS colors.

Avoid:
- oversaturated neon
- rainbow gradients
- random accent colors

Preferred palette style:
- neutral dark backgrounds
- soft violet/blue accents
- muted grays
- subtle highlights

Examples:
- background: zinc/slate/neutral
- accent: violet/indigo/blue
- success: emerald
- danger: red
- warning: amber

---

# TYPOGRAPHY
Typography must feel premium.

Rules:
- strong hierarchy
- readable spacing
- avoid giant paragraphs
- avoid tiny text

Use:
- bold headlines
- muted secondary text
- balanced line height
- clean spacing

Preferred look:
- modern SaaS typography
- crisp and professional

---

# SPACING RULES
Spacing consistency is CRITICAL.

Rules:
- generous whitespace
- avoid cramped layouts
- use consistent padding
- balanced vertical rhythm

Preferred spacing:
- cards: p-6 to p-8
- sections: py-20+
- gaps: gap-4 / gap-6 / gap-8

Never:
- overcrowd UI
- stack elements too tightly
- create uneven spacing

---

# BORDER RADIUS
Use modern rounded corners.

Preferred:
- rounded-xl
- rounded-2xl

Avoid:
- sharp corners everywhere
- extreme cartoon rounding

---

# SHADOWS
Shadows should be soft and subtle.

Use:
- soft depth
- elegant hover elevation

Avoid:
- harsh dark shadows
- excessive glow
- floating neon effects

---

# GLASSMORPHISM RULES
Glass effects should be minimal.

Allowed:
- subtle navbar blur
- soft translucent overlays

Avoid:
- heavy blur everywhere
- unreadable transparent cards

---

# ANIMATION SYSTEM

## GENERAL ANIMATION RULES
Animations MUST feel:
- smooth
- subtle
- premium
- intentional

Animations should improve UX.

Never animate just for decoration.

---

# FRAMER MOTION RULES
Preferred animations:
- fade-in
- slide-up
- scale-hover
- smooth page transitions
- staggered card reveals

Timing:
- 200ms to 400ms
- smooth easing

Avoid:
- bouncing everywhere
- excessive rotation
- distracting motion
- laggy animations
- chaotic entrances

---

# HOVER STATES
Every interactive element should feel responsive.

Use:
- slight scale
- subtle glow
- soft elevation
- smooth transitions

Avoid:
- dramatic hover explosions
- flashy color swaps

---

# LOADING STATES (MANDATORY)
Every async action MUST have:
- skeleton loading
- loading indicators
- graceful transitions
- optimistic feel

The app should NEVER feel frozen.

---

# SKELETON LOADING SYSTEM (VERY IMPORTANT)

ALL major components MUST include skeleton states.

Examples:
- dashboard cards
- quiz cards
- upload sections
- analytics widgets
- leaderboard items
- tables
- history pages
- AI generation states

Skeleton rules:
- use shimmer effect
- maintain layout structure
- prevent layout shift
- match final component dimensions
- smooth appearance/disappearance

Skeleton aesthetic:
- subtle
- elegant
- modern
- low contrast

NEVER:
- use plain ugly loaders
- leave blank screens
- show spinner-only pages

Preferred UX:
- immediate skeleton feedback
- progressive loading
- graceful reveal animations

---

# PAGE TRANSITIONS
Page transitions should feel smooth.

Use:
- subtle fade transitions
- smooth route changes
- elegant content reveal

Avoid:
- excessive transition delays
- dramatic cinematic effects

---

# RESPONSIVENESS
The app MUST be fully responsive.

Required support:
- mobile
- tablet
- laptop
- desktop
- ultrawide

Rules:
- mobile-first
- adaptive spacing
- collapsible navigation
- responsive grids
- avoid overflow issues

Never:
- break layouts on small screens
- use desktop-only UI

---

# ACCESSIBILITY
Accessibility is mandatory.

Requirements:
- keyboard navigation
- sufficient contrast
- readable text
- semantic HTML
- aria labels when needed
- visible focus states

Avoid:
- inaccessible color combinations
- unreadable small text

---

# COMPONENT RULES
All components MUST be:
- reusable
- modular
- cleanly structured
- scalable
- readable

Avoid:
- giant monolithic components
- duplicated code
- inline chaos

---

# UI COMPONENT STYLE GUIDE

## BUTTONS
Buttons should feel premium.

Primary buttons:
- clean gradients
- strong contrast
- smooth hover transitions

Secondary buttons:
- muted backgrounds
- elegant borders

Avoid:
- childish gradients
- giant oversized buttons

---

## CARDS
Cards should feel modern.

Use:
- soft borders
- subtle shadows
- elegant spacing
- hover polish

Cards should NEVER feel:
- cluttered
- cramped
- flat and lifeless

---

## INPUTS
Inputs should feel premium and modern.

Use:
- soft borders
- good padding
- smooth focus states
- subtle glow/focus rings

Avoid:
- default browser styles
- outdated form UI

---

## MODALS
Modals should:
- blur background slightly
- animate smoothly
- feel lightweight

Avoid:
- huge clunky modal windows

---

## TABLES
Tables must:
- remain readable
- support responsive overflow
- include hover states
- include loading skeletons

Avoid:
- cramped columns
- excessive borders

---

# LANDING PAGE REQUIREMENTS
The landing page should feel premium and conversion-focused.

Sections:
1. Navbar
2. Hero section
3. Social proof
4. Features
5. AI workflow
6. Testimonials
7. CTA section
8. Footer

---

# HERO SECTION RULES
Hero section MUST include:
- strong AI-focused headline
- clear subheadline
- animated CTA
- visual AI preview
- premium spacing
- responsive layout

Hero should feel:
- aspirational
- modern
- intelligent

---

# DASHBOARD DESIGN RULES
Dashboard must feel:
- productive
- organized
- premium
- fast

Include:
- collapsible sidebar
- analytics cards
- recent quizzes
- quick actions
- upload area
- AI generation panel

Dashboard MUST include:
- loading skeletons
- animated transitions
- empty states
- hover interactions

---

# QUIZ GENERATION PAGE
This is the CORE experience.

It should feel magical.

Features:
- drag-and-drop upload
- AI generation progress
- animated generation states
- streaming feedback
- elegant loading skeletons
- smooth reveal animations

The generation experience should feel:
- alive
- intelligent
- responsive

---

# EMPTY STATES
Every empty state should:
- look intentional
- guide the user
- include CTA actions
- feel polished

Never:
- show blank containers
- show broken layouts

---

# ERROR STATES
Errors should feel graceful.

Use:
- friendly messaging
- retry buttons
- subtle styling

Avoid:
- scary technical messages
- ugly alerts

---

# DARK MODE
Dark mode is PRIMARY.

The entire design system should prioritize dark mode aesthetics.

Requirements:
- elegant contrast
- readable text
- premium backgrounds
- soft accent colors

Avoid:
- pure black everywhere
- harsh contrast

---

# PERFORMANCE RULES
Performance matters.

Avoid:
- unnecessary re-renders
- giant animation libraries
- excessive blur
- unoptimized images
- layout thrashing

Prioritize:
- smooth UX
- fast loading
- responsive interactions

---

# CODE QUALITY RULES
Code must be:
- clean
- readable
- typed properly
- maintainable
- scalable

Always:
- separate components
- use reusable utilities
- use proper naming
- avoid messy logic

---

# FILE STRUCTURE
Preferred structure:

/app
/components
/components/ui
/components/dashboard
/components/landing
/components/skeletons
/lib
/hooks
/styles

---

# SKELETON COMPONENTS (MANDATORY)
Create dedicated skeleton components for:

- QuizCardSkeleton
- DashboardCardSkeleton
- AnalyticsSkeleton
- SidebarSkeleton
- UploadSkeleton
- TableSkeleton
- HeroSkeleton
- QuizGenerationSkeleton

All skeletons must:
- use shimmer animation
- match real layouts
- support dark mode
- animate smoothly

---

# USER EXPERIENCE PHILOSOPHY
The user should always feel:
- guided
- confident
- productive
- impressed

The app should feel:
- premium
- effortless
- modern
- intelligent

---

# IMPORTANT FINAL RULES
ALWAYS:
- prioritize clean UX
- maintain consistency
- include loading skeletons
- make layouts responsive
- use subtle animations
- keep spacing elegant
- make UI feel premium

NEVER:
- generate cluttered UI
- use inconsistent spacing
- overanimate
- use outdated styling
- ignore loading states
- create generic admin dashboards
- use random colors
- create visually noisy layouts

---

# AI GENERATION INSTRUCTION
Before generating ANY frontend code:
1. follow this design system
2. maintain consistency
3. prioritize UX quality
4. include loading skeletons
5. use premium SaaS aesthetics
6. ensure responsiveness
7. keep components modular
8. add polished interactions

The frontend should feel like a real modern AI startup product.

