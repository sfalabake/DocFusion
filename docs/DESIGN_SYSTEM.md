# Design System - PDFLeader Pro

## 🎨 Design Philosophy

**Inspired by**: Adobe, Canva, Notion, Figma, Linear, Apple

**Core Principles**:
1. **Clarity** - Every element has a clear purpose
2. **Consistency** - Unified design language
3. **Accessibility** - WCAG AA compliant
4. **Performance** - Animations enhance, don't hinder
5. **Simplicity** - Minimal cognitive load
6. **Professional** - Enterprise-grade appearance

---

## 🎭 Color Palette

### Light Mode

#### Primary Colors
```
Primary Blue: #2563EB
Primary Light: #3B82F6
Primary Dark: #1E40AF
Primary Lighter: #DBEAFE (for backgrounds)
Primary Lightest: #F0F9FF (for subtle backgrounds)
```

#### Secondary Colors
```
Success Green: #10B981
Warning Orange: #F59E0B
Danger Red: #EF4444
Info Purple: #8B5CF6
```

#### Neutral Colors
```
White: #FFFFFF
Gray 50: #F9FAFB
Gray 100: #F3F4F6
Gray 200: #E5E7EB
Gray 300: #D1D5DB
Gray 400: #9CA3AF
Gray 500: #6B7280
Gray 600: #4B5563
Gray 700: #374151
Gray 800: #1F2937
Gray 900: #111827
Black: #000000
```

### Dark Mode

#### Primary
```
Primary Blue: #3B82F6
Primary Light: #60A5FA
Primary Dark: #1E40AF
Background: #0F172A
Surface: #1E293B
Surface Light: #334155
Border: #475569
Text Primary: #F1F5F9
Text Secondary: #CBD5E1
```

---

## ✍️ Typography

### Font Families

```css
/* Display/Headings */
font-family: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;

/* Body/UI */
font-family: "Inter", system-ui, sans-serif;

/* Monospace (for code) */
font-family: "Fira Code", "Monaco", monospace;
```

### Type Scale

| Size | Weight | Line Height | Use Case |
|------|--------|-------------|----------|
| 32px | 700 | 1.2 | Display 1 (Landing hero) |
| 28px | 700 | 1.2 | Display 2 (Page titles) |
| 24px | 600 | 1.3 | H1 (Section headers) |
| 20px | 600 | 1.4 | H2 (Subsection headers) |
| 16px | 600 | 1.5 | H3 (Card titles) |
| 14px | 500 | 1.5 | H4 (Form labels) |
| 14px | 400 | 1.5 | Body (Main text) |
| 12px | 400 | 1.4 | Small (Helper text) |
| 11px | 400 | 1.4 | Tiny (Captions) |

### Tailwind Implementation

```tailwind
/* Headings */
.h1 { @apply text-4xl font-bold leading-tight; }
.h2 { @apply text-3xl font-semibold leading-snug; }
.h3 { @apply text-2xl font-semibold leading-normal; }
.h4 { @apply text-xl font-semibold; }

/* Body */
.body-large { @apply text-base leading-relaxed; }
.body { @apply text-sm leading-relaxed; }
.caption { @apply text-xs leading-normal text-gray-600; }
```

---

## 📐 Spacing System

Based on 4px grid:

```
4px:  xs
8px:  sm
12px: md
16px: lg
20px: xl
24px: 2xl
32px: 3xl
40px: 4xl
48px: 5xl
64px: 6xl
```

### Usage

```
Padding: p-{value}
Margin: m-{value}
Gap: gap-{value}
```

**Example**:
- Component padding: `p-4` (16px)
- Section spacing: `my-8` (32px vertical)
- Grid gap: `gap-6` (24px)

---

## 🔲 Shadows

### Light Mode

```css
/* Elevation 1: Subtle hover states */
box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);

/* Elevation 2: Floating elements, dropdowns */
box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
            0 2px 4px -1px rgba(0, 0, 0, 0.06);

/* Elevation 3: Modals, popovers */
box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
            0 4px 6px -2px rgba(0, 0, 0, 0.05);

/* Elevation 4: Important modals */
box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1),
            0 10px 10px -5px rgba(0, 0, 0, 0.04);
```

### Dark Mode

```css
/* Same but with adjusted opacity */
box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.3),
            0 2px 4px -1px rgba(0, 0, 0, 0.15);
```

### Tailwind

```tailwind
.shadow-sm: box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
.shadow: box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
.shadow-md: box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
.shadow-lg: box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
```

---

## 🎪 Rounded Corners

```
2px:  rounded-sm   (for minimal rounding)
4px:  rounded      (default, buttons, inputs)
6px:  rounded-md   (cards, panels)
8px:  rounded-lg   (modals, larger cards)
12px: rounded-xl   (hero sections)
16px: rounded-2xl  (large featured areas)
50%:  rounded-full (avatars, circles)
```

---

## 🎬 Animations

### Timing
```
Fast:    150ms (interactions, small changes)
Normal:  300ms (default transitions)
Slow:    500ms (important transitions)
Slowest: 700ms (entrances, featured animations)
```

### Easing Functions
```
ease-in:     cubic-bezier(0.4, 0, 1, 1)      (slow start)
ease-out:    cubic-bezier(0, 0, 0.2, 1)      (slow end)
ease-in-out: cubic-bezier(0.4, 0, 0.2, 1)    (smooth)
ease-linear: cubic-bezier(0, 0, 1, 1)        (constant)
```

### Common Animations

```css
/* Fade in */
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}
animation: fadeIn 300ms ease-out;

/* Slide up */
@keyframes slideUp {
  from { transform: translateY(16px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}
animation: slideUp 300ms ease-out;

/* Scale in */
@keyframes scaleIn {
  from { transform: scale(0.95); opacity: 0; }
  to { transform: scale(1); opacity: 1; }
}
animation: scaleIn 200ms ease-out;

/* Pulse (subtle) */
@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.7; }
}
animation: pulse 2s ease-in-out infinite;
```

### Framer Motion Examples

```typescript
// Page entrance
const pageVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3 } }
};

// Button hover
const buttonVariants = {
  hover: { scale: 1.02 },
  tap: { scale: 0.98 }
};

// Stagger children
const containerVariants = {
  visible: {
    transition: { staggerChildren: 0.1 }
  }
};
```

---

## 🧩 Component Specifications

### Buttons

#### Primary Button
```
Background: #2563EB (Primary Blue)
Text: White
Padding: 12px 20px (md size)
Font: 14px semi-bold
Border Radius: 6px
Transition: 150ms ease-out

States:
- Default: Blue background
- Hover: Slightly darker blue + subtle shadow
- Active: Even darker blue
- Disabled: Gray background, reduced opacity
- Loading: Show spinner
```

#### Secondary Button
```
Background: Transparent
Border: 1px solid #D1D5DB
Text: #374151
Hover: Light gray background

Similar sizing and transitions as Primary
```

#### Icon Button
```
Size: 40px × 40px
Icon Size: 20px × 20px
Border Radius: 6px
Background: Transparent
Hover: #F3F4F6 background

No padding needed, uses flex center
```

### Input Fields

#### Text Input
```
Height: 40px
Padding: 12px 14px
Border: 1px solid #E5E7EB
Border Radius: 6px
Font: 14px regular

States:
- Default: Gray border
- Focus: Blue border (#2563EB) + subtle blue shadow
- Hover: Slightly darker gray border
- Error: Red border (#EF4444)
- Disabled: Lighter background, cursor not-allowed

Placeholder: #9CA3AF (Gray 400)
```

#### Label
```
Font: 14px semi-bold (#374151)
Margin Bottom: 8px
Asterisk for required fields (color: #EF4444)
```

### Cards

#### Standard Card
```
Background: White (light) / #1E293B (dark)
Border: 1px solid #E5E7EB (light) / #334155 (dark)
Border Radius: 8px
Padding: 20px
Box Shadow: Subtle shadow

Hover: Slight lift effect (shadow increase)
```

#### File Card (Dashboard)
```
Width: 100% in grid (3 columns)
Aspect Ratio: 4:3 or 5:4
Background: White / Dark
Border: 1px solid light border
Border Radius: 8px

Components:
- Thumbnail image top
- File name below
- Metadata (date, size)
- Hover: Show actions (edit, delete, share)
- Right-click: Context menu
```

### Modals

#### Modal Container
```
Background: White (light) / #1E293B (dark)
Border Radius: 12px
Box Shadow: Large shadow (elevation 4)
Width: 90vw, max-width: 600px
Max Height: 90vh
Overflow: auto

Overlay:
- Background: rgba(0, 0, 0, 0.5)
- Backdrop Blur: 4px (optional)

Animation: Scale in + fade in (200ms)
```

#### Modal Content
```
Header: Title (24px bold) + close button
Body: Main content (scrollable)
Footer: Action buttons (Submit, Cancel)

Padding: 24px
Close Button: Top right
```

### Tooltips & Popovers

```
Background: #1F2937 (light mode dark) / #374151 (dark mode)
Text: White / Light text
Padding: 8px 12px
Border Radius: 6px
Font: 12px regular
Arrow: Small triangle pointing to trigger

Show: On hover (100ms delay) or focus
Hide: On mouse leave or blur
```

### Notifications (Toasts)

```
Width: 100%, max-width 400px
Position: Bottom right (with 20px margin)
Padding: 16px
Border Radius: 8px
Box Shadow: Subtle shadow

Types:
- Success: Green (#10B981) background
- Error: Red (#EF4444) background
- Info: Blue (#2563EB) background
- Warning: Orange (#F59E0B) background

Auto-dismiss: 4 seconds
Dismissable: X button on right
Stack: Max 3 visible, queue additional
```

### Loading States

```
Page Loading: Skeleton screens (preferred over spinners)
Component Loading: Spinner overlay
Button Loading: Disable + show spinner inside
File Upload: Progress bar

Skeleton: #E5E7EB background, animate pulse
Spinner: 24px × 24px, blue color, smooth rotation
```

### Dropdowns & Menus

```
Width: Min 200px, max 400px
Max Height: 60vh (scrollable)
Background: White / Dark
Border: 1px solid border color
Border Radius: 8px
Box Shadow: Elevation 2

Items:
- Padding: 12px 16px
- Font: 14px regular
- Hover: Light background highlight
- Active: Blue accent left border
- Disabled: Reduced opacity, cursor not-allowed

Keyboard Navigation: Arrow keys, Enter
```

---

## 🎬 Page Layouts

### Dashboard Layout
```
┌─────────────────────────────────────┐
│  Logo    Search    Notifications User │
├────────┬─────────────────────────────┤
│        │                             │
│ Sidebar│  Main Content               │
│        │  (Files grid or list)       │
│        │                             │
│        │                             │
└────────┴─────────────────────────────┘
```

### Editor Layout
```
┌─────────────────────────────────────┐
│  File Name    Toolbar    Share  ⋮   │
├────┬─────────────────────────┬─────┤
│    │                         │     │
│Page│      PDF Canvas         │Prop │
│s   │      (Main Editing)     │erty │
│    │                         │     │
│    │                         │     │
└────┴─────────────────────────┴─────┘
```

### Responsive Breakpoints

```
Mobile:  0px - 640px   (single column)
Tablet:  640px - 1024px (2 columns)
Desktop: 1024px+       (3+ columns)

Sidebar:
- Desktop: 240px width, always visible
- Tablet: 240px width, collapsible
- Mobile: Full width overlay

Properties Panel:
- Desktop: 320px width, right side
- Tablet: Slide-out panel
- Mobile: Bottom sheet or overlay
```

---

## ♿ Accessibility

### WCAG AA Compliance

1. **Color Contrast**
   - Text on background: 4.5:1 minimum
   - Large text (18px+): 3:1 minimum
   - UI components: 3:1 minimum

2. **Focus Indicators**
   - Outline: 2px solid #2563EB
   - Visible on keyboard navigation
   - Not removed on hover

3. **Keyboard Navigation**
   - All interactive elements accessible via Tab
   - Logical tab order
   - Escape key closes modals/dropdowns
   - Arrow keys for lists/menus
   - Enter/Space for activation

4. **Screen Readers**
   - ARIA labels on icon buttons
   - ARIA live regions for dynamic content
   - Form labels associated with inputs
   - Semantic HTML where possible

5. **Form Accessibility**
   ```html
   <label for="email">Email *</label>
   <input 
     id="email"
     type="email"
     placeholder="you@example.com"
     required
     aria-invalid="false"
   />
   <span id="email-error" role="alert">Invalid email</span>
   ```

---

## 🌙 Dark Mode Implementation

### Using Tailwind Dark Mode

```
// tailwind.config.js
module.exports = {
  darkMode: 'class',
  theme: { ... }
}

// Applied to root element
<html class="dark">
```

### Color Variables

```css
:root {
  --background: white;
  --surface: #F9FAFB;
  --text-primary: #111827;
  --text-secondary: #6B7280;
  --border: #E5E7EB;
}

html.dark {
  --background: #0F172A;
  --surface: #1E293B;
  --text-primary: #F1F5F9;
  --text-secondary: #CBD5E1;
  --border: #334155;
}
```

---

## 📱 Mobile Design

### Touch Targets
```
Minimum: 44px × 44px
Recommended: 48px × 48px
Spacing between: 8px minimum
```

### Mobile Navigation
```
Hamburger menu for navigation
Bottom tab bar for primary sections
Swipe gestures for common actions
Haptic feedback for interactions
```

### Responsive Typography
```
Desktop: 16px base
Tablet:  15px base
Mobile:  14px base

Headings scale proportionally
```

---

## 🎨 Design Tokens (CSS Variables)

```css
:root {
  /* Colors */
  --color-primary: #2563EB;
  --color-success: #10B981;
  --color-warning: #F59E0B;
  --color-danger: #EF4444;
  
  /* Spacing */
  --spacing-xs: 4px;
  --spacing-sm: 8px;
  --spacing-md: 16px;
  --spacing-lg: 24px;
  
  /* Typography */
  --font-family: "Inter", system-ui;
  --font-size-base: 16px;
  --font-size-sm: 14px;
  
  /* Border Radius */
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 12px;
  
  /* Shadows */
  --shadow-sm: 0 1px 2px 0 rgba(0,0,0,0.05);
  --shadow-md: 0 4px 6px -1px rgba(0,0,0,0.1);
  
  /* Transitions */
  --transition-fast: 150ms ease-out;
  --transition-normal: 300ms ease-out;
}
```

---

## 📊 Component Library Checklist

Essential Components:
- [ ] Button (primary, secondary, icon)
- [ ] Input (text, email, password, number)
- [ ] Select / Dropdown
- [ ] Checkbox
- [ ] Radio Button
- [ ] Toggle Switch
- [ ] Card
- [ ] Modal / Dialog
- [ ] Toast / Notification
- [ ] Tooltip / Popover
- [ ] Tabs
- [ ] Accordion
- [ ] Breadcrumbs
- [ ] Pagination
- [ ] Skeleton Loader
- [ ] Spinner
- [ ] Avatar
- [ ] Badge / Tag
- [ ] Progress Bar
- [ ] Slider
- [ ] Date Picker
- [ ] Color Picker

---

**Status**: Phase 1 ✅ - Design System complete  
**Next**: Technology decisions and beginning development setup
