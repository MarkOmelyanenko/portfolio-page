# Portfolio Page Analysis

A single-page personal site for **Mark Omelyanenko**, a graduate / final-year Computer Science student. It presents identity, skills, work history, education, a filterable project gallery, and a contact form. Live URL (from `package.json`): [https://MarkOmelyanenko.github.io/portfolio-page/](https://MarkOmelyanenko.github.io/portfolio-page/).

This document describes **what** the site does and **how** it is implemented.

---

## 1. What the site is

The page is a **one-page scroll site**, not a multi-route SPA. There is no React Router. `App` stacks section components in a fixed order; each section has an `id` so the nav, hero buttons, and footer can jump to it with `scrollIntoView`.

Visitor flow:

1. Land on a full-viewport hero with name, title, and two CTAs.
2. Read about, skills, experience, and education.
3. Browse projects by category and technology, open a detail modal, jump to GitHub or a live demo.
4. Send a message or follow social links.

Content is **static in source**. There is no CMS, API, or database for the portfolio itself. Project metadata, skills, jobs, and education live as JavaScript arrays inside the components.

---

## 2. Tech stack and tooling

| Layer | Choice | Role |
| --- | --- | --- |
| UI library | React 19 | Component tree, state, forms |
| Bundler | Vite 6 | Dev server, production build, GitHub Pages `base` path |
| Styling | Tailwind CSS 4 (`@tailwindcss/vite`) | Utility classes; almost all layout and color |
| Motion | Framer Motion 12 | Entrance, hover, modal, and background animation |
| Email | EmailJS (`@emailjs/browser`) | Browser-side contact form delivery |
| Deploy | `gh-pages` | `npm run deploy` publishes `dist/` to GitHub Pages |
| Lint | ESLint 9 + React Hooks / Refresh plugins | JS/JSX lint |

Supporting files:

- `index.html` — HTML shell, favicon, viewport, mounts `#root`.
- `src/main.jsx` — `createRoot`, `StrictMode`, wraps `App` in `ThemeProvider`.
- `vite.config.js` — React + Tailwind plugins; `base: "/portfolio-page"` so assets resolve under the GitHub Pages subpath.

The UI helpers in `src/components/ui/` (`button.jsx`, `card.jsx`) are small local wrappers, not a full shadcn/ui install. `@shadcn/ui` is listed in dependencies but is not used as a generated component system.

---

## 3. Architecture

```
index.html
  └── src/main.jsx
        └── ThemeProvider
              └── App
                    ├── Navigation        (fixed header)
                    ├── Hero              #home
                    ├── About             #about
                    ├── Skills            #skills
                    ├── Experience        #experience
                    ├── Education         #education
                    ├── ProjectsLanding   #projects  + ProjectModal
                    ├── Contact           #contact
                    └── Footer
```

**Routing:** none. Section IDs plus `document.getElementById(...).scrollIntoView({ behavior: "smooth", block: "start" })`.

**Theme:** `ThemeContext` exists and is mounted, but **no section imports `useTheme` or `ThemeToggle`**. `ThemeToggle.jsx` is unused. Most UI uses hardcoded Tailwind `gray-*` / `cyan-*` classes, so the CSS variables in `index.css` (`html.light` vs `:root`) do not restyle the page. The visual design is a dark gray + cyan/blue gradient look.

**Leftover:** `src/ColorPicker.jsx` is not imported. The Color Picker demo visitors see is a **prebuilt static app** under `public/projects/React/color-picker-app/`.

---

## 4. Page sections — what and how

### 4.1 Navigation (`src/components/Navigation.jsx`)

**What:** Fixed top bar. Logo (“Portfolio”) scrolls home. Desktop: horizontal links. Mobile: hamburger that opens a full-screen overlay menu.

**How:**

- Scroll listener sets `isScrolled` (`window.scrollY > 50`) so the bar goes from transparent to `bg-gray-900/95 backdrop-blur-md`.
- The same listener finds which section the viewport is in (`scrollY + 100` vs each section’s `offsetTop` / `offsetHeight`) and highlights that link (`text-cyan-400 bg-gray-800`).
- Mobile menu: `AnimatePresence` overlay, body `overflow: hidden` while open, Escape to close, auto-close at `md` breakpoint (`innerWidth >= 768`).
- Accessibility: `aria-expanded`, `aria-controls`, `aria-label`, overlay `role="dialog"` + `aria-modal`.
- `scroll-margin-top: 5rem` on `section[id]` in `index.css` keeps headings below the fixed nav.

### 4.2 Hero (`src/components/Hero.jsx`)

**What:** Full-height intro: greeting, “Graduate Software Engineer”, short pitch, “View My Work” / “Get In Touch”, bouncing “Scroll to explore”.

**How:**

- Two large blurred circles (`bg-cyan-500` / `bg-blue-500` + `blur-3xl`) loop scale/opacity with Framer Motion for a glow background.
- Staggered `initial` / `animate` on heading, subtitle, and buttons (delays 0.2–0.8s).
- CTAs call `scrollToSection("projects")` and `scrollToSection("contact")`.
- Title uses `bg-clip-text text-transparent` with a blue–cyan gradient.

### 4.3 About (`src/components/About.jsx`)

**What:** Bio plus two cards: “Principles” and “What I care about”. Positions the author as a final-year CS student (Java/Spring Boot, React, SQL/NoSQL, interest in quantitative finance / kdb+/q).

**How:** Two-column grid (`md:grid-cols-2`). Parent `staggerChildren: 0.2`; children fade/slide up with `whileInView` and `viewport={{ once: true }}` so animations run once.

### 4.4 Skills (`src/components/Skills.jsx`)

**What:** Six groups — Frontend, Backend, Databases, Testing, Data Engineering, Tools & Others — rendered as chips.

**How:** `skillCategories` array mapped into cards. Category cards stagger in; each chip has a delayed scale-in (`categoryIndex * 0.1 + skillIndex * 0.05`) and hover scale. Alternate section background (`bg-gray-800`) vs About (`bg-gray-900`) for visual rhythm.

### 4.5 Experience (`src/components/Experience.jsx`)

**What:** Timeline of work. Currently one role: Junior Software Engineer at SynergySoft (May–August 2025, remote), with bullet responsibilities.

**How:** Vertical line (`absolute` + `bg-gray-700`) and a cyan dot. Cards alternate left/right on desktop (`index % 2` + `md:flex-row-reverse`). On small screens, content sits to the right of the line (`pl-16`). Enter animation slides from left or right.

The layout is ready for more entries without a structure change.

### 4.6 Education (`src/components/Education.jsx`)

**What:** Two degrees/programs (PUT Computer Science; Erasmus+ at University of Mons) and a volunteering block (Erasmus Buddy / ESN).

**How:** Two cards in a grid, then a centered volunteering card. Same hover border/scale pattern as other sections.

### 4.7 Projects (`src/ProjectsLanding.jsx` + `src/components/ProjectModal.jsx`)

This is the largest feature.

**What:** Projects grouped by type, filterable by technology, with a detail modal and GitHub/demo links.

**Groups in data:**

| Group | Examples |
| --- | --- |
| Full-Stack Web Applications | Crypto Exchange Simulator, Mini Marketplace Platform, Movie reviews and trailers |
| React Projects | Color Picker, To Do List (hosted from `public/`) |
| Telegram Bots | Crypto Telegram Bot |
| HTML & CSS | Marta Up, Space Tourism, Films landings |
| Vanilla JS | Calculator, Counter, Dice Roller, Password Generator, Temperature Converter |
| Big Data Projects | Airflow/Hadoop/Hive pipeline; Spark food-orders project |
| AI Projects | Fire detection (PyTorch); image retrieval (CNN/ViT) |
| Quant Data Projects | Order-book imbalance, mean-reversion backtester, kdb+/q tick analysis |

**How data is modeled:** Each project can have `title`, `image`, `github` or `githubFrontend`/`githubBackend`, `demo`, `description`, `features[]`, `technologies[]`. Full-stack apps often have long feature lists and live Cloudflare tunnel demos. Smaller HTML/JS apps point at static files under `/portfolio-page/projects/...`. Some (bots, big data, quant) have no screenshot (`image: null`) and no demo.

**How filtering works:**

1. `allTechnologies` is a sorted unique set of every tech string across all projects.
2. `selectedFilter` state (`"All"` or a tech name).
3. `useMemo` keeps groups whose `project.technologies` include the filter (or all groups when filter is `"All"`). Empty groups are dropped.

Filter chips: horizontal scroll on mobile (scrollbar hidden), wrap + center on `sm+`. Active chip is cyan on dark text.

**How cards work:** Responsive grid (`1 / 2 / 3` columns). Card click opens the modal. GitHub/Demo `<a>` use `stopPropagation` so they do not also open the modal. Cards show the first three tech tags plus a `+N` overflow badge.

**How the modal works:** `ProjectModal` receives `project`, `isOpen`, `onClose`. `AnimatePresence` + backdrop (`bg-black/80 backdrop-blur-sm`). Shows image, description, features, all tech pills, and links. Close via X or backdrop click. High `z-index` (`z-[200]`) so it sits above the nav.

**How demos are hosted:** Vite copies `public/` to the site root. HTML/CSS/JS and prebuilt React apps in `public/projects/` are real pages, not React routes. Full-stack demos use external URLs (Cloudflare tunnels).

### 4.8 Contact (`src/components/Contact.jsx`)

**What:** Name / email / message form, email address, GitHub / LinkedIn / mailto icons.

**How:**

- Controlled inputs (`formData` + `handleChange`).
- Submit: `emailjs.send` with Vite env vars `VITE_EMAILJS_SERVICE_ID`, `VITE_EMAILJS_TEMPLATE_ID`, `VITE_EMAILJS_PUBLIC_KEY` (placeholders if unset).
- Template fields: `name`, `from_name`, `from_email`, `message`, `to_email` (visitor, for auto-reply), `reply_to` (owner inbox).
- UI states: `isSubmitting`, `success`, `error`, `config_error` (empty recipient). Status messages auto-clear.
- Native `required` / `type="email"`; cyan focus ring.

No backend: EmailJS runs in the browser. Keys must be present at **build** time for GitHub Pages.

### 4.9 Footer (`src/components/Footer.jsx`)

**What:** Brand blurb, the same section links, contact email, social icons, dynamic copyright year (`new Date().getFullYear()`).

**How:** Three-column grid on `md+`. Quick links reuse the same `scrollIntoView` helper.

---

## 5. Visual and interaction design

**Look:** Dark slate backgrounds (`gray-900` / `gray-800` / `gray-950`), cyan and blue as accent. Section titles share a gradient heading + 24px underline bar. Cards: rounded-xl, gray border, cyan border on hover.

**Motion (Framer Motion):**

- Section titles: fade + translateY when they enter the viewport (`once: true`).
- Hero: looping background blobs and a bouncing scroll cue.
- Skills / projects: hover scale and cyan box-shadow glow.
- Modal and mobile nav: enter/exit with `AnimatePresence`.

**Responsive behavior:** Tailwind breakpoints (`sm` / `md` / `lg`). Nav collapses to a hamburger below `md`. Experience timeline stacks on small screens. Project filters scroll horizontally on phones. Headings use `break-words` where long titles could overflow.

**Global CSS (`src/index.css`):** Tailwind import, light/dark CSS variables (mostly unused by components), `overflow-x: hidden` on `html`/`body`, 0.3s transitions on background/color/border, `scroll-margin-top` for in-page anchors.

---

## 6. Embedded mini-projects (`public/projects/`)

These are **standalone sites** shipped with the portfolio, not React components of `App`.

| Path | Kind |
| --- | --- |
| `public/projects/React/color-picker-app/` | Prebuilt Vite React app (`index.html` + hashed JS/CSS) |
| `public/projects/React/to-do-app/` | Same pattern |
| `public/projects/HTML&CSS/martaup-landing/` | Multi-file landing (HTML, CSS, JS, images) |
| `public/projects/HTML&CSS/space-tourism-landing/` | Landing + Slick/Fancybox assets |
| `public/projects/HTML&CSS/films-pages/` | Multi-page Bootstrap site (films, serials, news, contact, …) |
| `public/projects/JS/*` | Small vanilla apps (calculator, counter, dice, password, temperature) |

Opening “Demo” on those cards navigates to another HTML document on the same GitHub Pages host.

---

## 7. Build and deploy

Scripts in `package.json`:

- `npm run dev` — Vite dev server.
- `npm run build` — production bundle into `dist/`.
- `npm run preview` — preview the production build.
- `npm run deploy` — `predeploy` builds, then `gh-pages -d dist`.

`homepage` and Vite `base` are both `/portfolio-page`, matching a project-site URL: `https://<user>.github.io/portfolio-page/`.

Asset URLs in `ProjectsLanding` are written with that prefix (e.g. `/portfolio-page/projects/cryptoapp.png`), so they work on Pages and would be wrong if the app were served from `/`.

---

## 8. How content is updated

There is no admin UI. To change copy or add a project:

- Bio → `About.jsx`
- Skills list → `skillCategories` in `Skills.jsx`
- Job → `experiences` in `Experience.jsx`
- School / volunteering → `Education.jsx`
- Project → object in `projectGroups` in `ProjectsLanding.jsx`; screenshot under `public/` (or `public/projects/`)
- Contact / socials → `Contact.jsx` and `Footer.jsx`

Filters update automatically from `technologies` arrays.

---

## 9. Implementation notes (from the current code)

These are facts about the current implementation, useful if you extend the site:

1. **Theme is incomplete.** Provider + CSS variables + `ThemeToggle` exist; the toggle is not rendered, and sections do not use the CSS variables, so the site stays dark.
2. **`Button` variants.** Hero passes `variant="outline"`, but `button.jsx` only special-cases `"secondary"`. Outline styling comes from extra `className` on that instance; the helper always applies a solid blue/gray base class as well.
3. **`Card` is a thin wrapper.** It does not merge `className`; nested gray backgrounds in project cards are from both `Card` and the surrounding `motion.div`.
4. **EmailJS depends on env at build time.** Missing `VITE_*` values fall back to placeholder IDs and the form will fail until configured.
5. **Scroll spy is offset-based.** A single `scroll` listener (not throttled/rAF) compares `scrollY + 100` to section boxes. It works for this page length; Intersection Observer would be the more modern equivalent.
6. **Modal has no Escape handler.** The mobile nav does; the project modal closes via backdrop or the X button only.
7. **Some project metadata looks copy-pasted.** Example: To Do List GitHub URL currently points at the color-picker-app tree.
8. **Images in project cards have no `loading`/`fetchpriority`.** Screenshots are standard `<img>` tags; LCP on first paint is the hero text, not those images.

---

## 10. Summary

The portfolio is a **Vite + React 19 + Tailwind 4** single-page site with **Framer Motion** and a **data-driven projects gallery**. Navigation is in-page scrolling with a scroll-spy header. Content is authored as JS arrays. Smaller works are shipped as static files in `public/`; larger works are linked out to GitHub and live demos. Contact is a client-side EmailJS form. Deploy target is GitHub Pages under `/portfolio-page`.

What you see is a dark, cyan-accented personal landing page: intro → credentials → filterable work → contact, implemented as stacked React sections rather than a routed app.
