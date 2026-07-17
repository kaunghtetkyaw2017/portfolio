# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Static portfolio website for a DevOps Engineer (Kaung Htet Kyaw). No build tools, bundlers, or package managers — just plain HTML, CSS, and JavaScript files served directly.

## Development

Open `index.html` in a browser or use any static file server (e.g., `python3 -m http.server`). No build step required.

## Architecture

**Three files, single-page application:**

- `index.html` — All sections in one file: hero, about, skills, pipeline, projects (horizontal scroll), certifications, contact form, footer
- `style.css` — CSS custom properties (design tokens) in `:root`, clean light aesthetic with emerald accent, responsive breakpoints at 1024px/768px/480px
- `script.js` — Modular init functions called on `DOMContentLoaded`: navbar, scroll reveal, count-up stats, horizontal scroll drag, contact form (Web3Forms API), scroll progress bar

**Key patterns:**

- All interactivity is vanilla JS with no dependencies
- Clean light design: emerald accent (#10b981), Syne display + DM Sans body + DM Mono mono fonts, floating blob backgrounds
- Split-screen hero with outlined text effect (-webkit-text-stroke) and stats cards
- Scroll progress bar at top of page
- Animations use `IntersectionObserver` for scroll-triggered reveal effects with staggered delays
- Projects section uses horizontal scrolling with drag-to-scroll and mouse wheel support
- Contact form submits to Web3Forms API — requires replacing `YOUR_ACCESS_KEY_HERE` in `index.html` with a real key
- Design tokens (colors, fonts, spacing) are centralized in CSS `:root` variables
