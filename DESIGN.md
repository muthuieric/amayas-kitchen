---
name: Amaya's Swahili Kitchen Design System
version: 1.0.0
colors:
  primary: "#EA580C"
  primary-hover: "#C2410C"
  primary-foreground: "#FFFFFF"
  accent: "#B91C1C"
  accent-foreground: "#FFFFFF"
  neutral-background: "#F9FAFB"
  neutral-card: "#FFFFFF"
  neutral-foreground: "#0F172A"
  neutral-muted: "#64748B"
  neutral-border: "#E2E8F0"
  whatsapp: "#25D366"
  whatsapp-hover: "#128C7E"
  whatsapp-foreground: "#FFFFFF"
  surface: "#FFFFFF"
  on-surface: "#0F172A"
typography:
  display-hero:
    fontFamily: Archivo
    fontSize: 48px
    fontWeight: 900
    lineHeight: 1.1
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Archivo
    fontSize: 32px
    fontWeight: 900
    lineHeight: 1.2
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Archivo
    fontSize: 24px
    fontWeight: 800
    lineHeight: 1.25
    letterSpacing: -0.01em
  body-lg:
    fontFamily: DM Sans
    fontSize: 18px
    fontWeight: 400
    lineHeight: 1.6
  body-md:
    fontFamily: DM Sans
    fontSize: 15px
    fontWeight: 400
    lineHeight: 1.5
  body-sm:
    fontFamily: DM Sans
    fontSize: 13px
    fontWeight: 400
    lineHeight: 1.4
  label-bold:
    fontFamily: DM Sans
    fontSize: 12px
    fontWeight: 700
    letterSpacing: 0.05em
rounded:
  sm: 6px
  md: 10px
  lg: 16px
  xl: 24px
  full: 9999px
spacing:
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 32px
  xxl: 48px
components:
  card:
    backgroundColor: "{colors.neutral-card}"
    rounded: "{rounded.lg}"
    padding: 16px
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.primary-foreground}"
    rounded: "{rounded.md}"
    padding: 12px
---

# Amaya's Swahili Kitchen — UX & Design Specification

## Overview
Amaya's Swahili Kitchen delivers authentic coastal Kenyan dining and takeaway in Kilimani, Nairobi. 
The experience is rooted in *Ukarimu wa Pwani* (warm coastal hospitality): rich aroma of cardamom, saffron, and coconut, paired with modern, effortless digital hospitality.

## Senior UX Principles
1. **Zero-Friction Discovery**: Diners must find, inspect, customize, and order their desired coastal dish within 3 clicks or 10 seconds.
2. **Thumb-Zone Ergonomics**: On mobile devices, all primary actions (ordering, opening cart, adjusting quantities, confirming booking) reside within natural thumb reach.
3. **Progressive Disclosure**: High-level clarity first (dish name, price, spice tag), with deeper culinary context (ingredients, pairing, notes) available via interactive quick-view.
4. **Context-Aware Feedback**: Every state transition (adding to cart, filtering, booking submission) provides tactile feedback with zero ambiguity.
5. **No AI-Purple Clichés**: Warm terracotta, saffron gold, deep coastal slate, and fresh WhatsApp emerald. Clean, grounded, authentic.

## Layout & Spatial System
- Responsive container: max-width 72rem (1152px) with horizontal padding fluid between 16px (mobile) and 24px (desktop).
- Touch target minimum: 44px x 44px for all interactable elements.
- Sticky interaction bars anchored to bottom on mobile viewport (`bottom-safe`).

## Components & Interactions
- **Dish Cards & Customizer**: Dual action pattern — instant add for repeat diners, full detail sheet for diners exploring spices and options.
- **Cart & Ordering Drawer**: Delivery/Pickup toggle, Nairobi area auto-calculator, and rich WhatsApp checkout generator.
- **Reservation Engine**: Real-time slot selection, guest stepper, and seating zone choice.
