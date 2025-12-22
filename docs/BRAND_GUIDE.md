# Unity Community Church - Brand Guide

> **Version:** 1.0.0  
> **Created:** December 22, 2025  
> **Purpose:** Frontend theming and visual identity

---

## Color Palette

| Name             | Value                          | Usage                                  |
| ---------------- | ------------------------------ | -------------------------------------- |
| **Royal Purple** | `rgb(90, 12, 119)` / `#5A0C77` | Primary brand color, CTAs, accents     |
| **Soft Cream**   | `#FDF8F3`                      | Backgrounds, cards, light surfaces     |
| **Pure White**   | `#FFFFFF`                      | Text on dark, elevated cards, overlays |
| **Charcoal**     | `#1A1A1A`                      | Primary text, headings                 |
| **Muted Black**  | `#0D0D0D`                      | Dark mode backgrounds, footer          |

### CSS Variables

```css
:root {
  /* Primary */
  --color-primary: rgb(90, 12, 119);
  --color-primary-light: rgb(120, 40, 150);
  --color-primary-dark: rgb(60, 8, 80);

  /* Neutrals */
  --color-cream: #fdf8f3;
  --color-white: #ffffff;
  --color-charcoal: #1a1a1a;
  --color-black: #0d0d0d;

  /* Semantic */
  --color-background: var(--color-cream);
  --color-surface: var(--color-white);
  --color-text: var(--color-charcoal);
  --color-text-muted: #6b6b6b;
}
```

---

## Glassmorphism

All interactive surfaces (navigation, buttons, modals, cards) should utilize **glassmorphism** for a modern, premium aesthetic.

### Core Properties

```css
.glass {
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 12px;
  box-shadow: 0 8px 32px rgba(90, 12, 119, 0.1);
}
```

### Variants

| Variant    | Background Alpha | Blur   | Use Case                       |
| ---------- | ---------------- | ------ | ------------------------------ |
| **Light**  | `0.25`           | `8px`  | Cards on cream backgrounds     |
| **Medium** | `0.15`           | `12px` | Floating nav, modals           |
| **Dark**   | `0.08`           | `16px` | Overlays on images, hero areas |

---

## Navigation (Scrolling)

The nav bar should transition to a glassmorphic state on scroll:

```css
.nav {
  position: fixed;
  top: 0;
  transition: background 0.3s ease, backdrop-filter 0.3s ease;
}

.nav--scrolled {
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid rgba(90, 12, 119, 0.1);
  box-shadow: 0 2px 20px rgba(0, 0, 0, 0.05);
}
```

---

## Buttons

### Primary Button (Glass + Purple)

```css
.btn-primary {
  background: linear-gradient(135deg, rgb(90, 12, 119), rgb(120, 40, 150));
  color: #ffffff;
  border: none;
  border-radius: 8px;
  padding: 12px 28px;
  font-weight: 600;
  box-shadow: 0 4px 15px rgba(90, 12, 119, 0.3);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(90, 12, 119, 0.4);
}
```

### Secondary Button (Glass Outline)

```css
.btn-secondary {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(8px);
  border: 1px solid rgba(90, 12, 119, 0.3);
  color: var(--color-primary);
  border-radius: 8px;
  padding: 12px 28px;
  font-weight: 600;
  transition: all 0.2s ease;
}

.btn-secondary:hover {
  background: rgba(90, 12, 119, 0.1);
  border-color: var(--color-primary);
}
```

---

## Typography

| Element     | Font  | Weight | Size     |
| ----------- | ----- | ------ | -------- |
| **H1**      | Inter | 700    | 3rem     |
| **H2**      | Inter | 600    | 2.25rem  |
| **H3**      | Inter | 600    | 1.5rem   |
| **Body**    | Inter | 400    | 1rem     |
| **Caption** | Inter | 400    | 0.875rem |

```css
body {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  color: var(--color-charcoal);
  line-height: 1.6;
}
```

---

## Cards

```css
.card {
  background: rgba(255, 255, 255, 0.6);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.06);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 40px rgba(90, 12, 119, 0.12);
}
```

---

## Dark Mode (Optional)

```css
[data-theme='dark'] {
  --color-background: #0d0d0d;
  --color-surface: #1a1a1a;
  --color-text: #f5f5f5;
  --color-text-muted: #a0a0a0;
}

[data-theme='dark'] .glass {
  background: rgba(30, 30, 30, 0.6);
  border: 1px solid rgba(255, 255, 255, 0.08);
}
```

---

## Quick Reference

| Component       | Key Style                                    |
| --------------- | -------------------------------------------- |
| **Nav**         | Fixed, glass on scroll, subtle shadow        |
| **Buttons**     | Purple gradient (primary), glass (secondary) |
| **Cards**       | Glass surface, lift on hover                 |
| **Backgrounds** | Soft cream (`#FDF8F3`)                       |
| **Text**        | Charcoal (`#1A1A1A`), Inter font             |
| **Accents**     | Royal Purple `rgb(90, 12, 119)`              |

---

> **Maintained By:** Jordan Daniel
