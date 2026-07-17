# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Static portfolio website for a DevOps Engineer (Kaung Htet Kyaw). No build tools, frameworks, or dependencies — pure HTML/CSS/JS served directly.

## Development

Open `index.html` in a browser or use any static file server:

```bash
# Python
python3 -m http.server 8000

# Node (if available)
npx serve .
```

No build step, no tests, no linting configured.

## Architecture

Three files, no dependencies:

- **index.html** — Single-page layout with sections: hero, about, skills, CI/CD pipeline visualization, projects, certifications, contact form
- **script.js** — All interactivity: particle canvas background, terminal typing animation, typed-text effect in hero, scroll-reveal (IntersectionObserver), pipeline stage animation, stat counter animation, contact form handler
- **style.css** — Design system via CSS custom properties (`:root`), responsive breakpoints at 1024px/768px/480px

## Key Patterns

- **Animations**: All JS-driven animations use `requestAnimationFrame` or `IntersectionObserver` — no animation libraries
- **Terminal effect**: Cycles through predefined kubectl/terraform/docker/helm commands with typed output (see `initTerminal()` commands array)
- **Scroll reveal**: Elements get `.reveal` class added by JS, then `.visible` on intersection — CSS handles the opacity/transform transition
- **Color system**: Cyan (`#00d4ff`) primary, purple (`#7c3aed`) secondary, green (`#10b981`) tertiary — all defined as CSS vars
- **Fonts**: Inter (sans) + JetBrains Mono (mono) loaded from Google Fonts
- **Responsive**: Hero terminal hidden below 1024px; nav collapses to hamburger below 768px; grids collapse to single column on mobile
