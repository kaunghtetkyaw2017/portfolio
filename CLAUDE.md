# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Static portfolio website for a DevOps Engineer (Kaung Htet Kyaw). No build tools, bundlers, or package managers — just plain HTML, CSS, and JavaScript files served directly.

## Development

Open `index.html` in a browser or use any static file server (e.g., `python3 -m http.server`). No build step required.

## Architecture

**Three files, single-page application:**

- `index.html` — All sections in one file: hero, about, skills, CI/CD pipeline visualization, projects, certifications, education, contact form, footer
- `style.css` — CSS custom properties (design tokens) in `:root`, responsive breakpoints at 1024px/768px/480px
- `script.js` — Modular init functions called on `DOMContentLoaded`: particles canvas, navbar, terminal animation, typed text effect, scroll reveal, pipeline animation, count-up stats, contact form (Web3Forms API)

**Key patterns:**

- All interactivity is vanilla JS with no dependencies
- Animations use `IntersectionObserver` for scroll-triggered effects (reveal, pipeline, counters)
- Terminal in hero section cycles through DevOps commands (kubectl, terraform, docker, helm) with typing animation
- Contact form submits to Web3Forms API — requires replacing `YOUR_ACCESS_KEY_HERE` in `index.html:664` with a real key
- Design tokens (colors, fonts, spacing, radii) are centralized in CSS `:root` variables
