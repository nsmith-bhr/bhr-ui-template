# BambooHR UI Template - Project Status

## Tech Stack
- React + Vite + TypeScript + Tailwind CSS v4
- Font Awesome icons + Lucide icons
- Custom fonts: Fields (headlines), Inter (body)
- Design tokens defined in `src/index.css`
- React Router for navigation

## Pages Completed

### 1. Home (`src/pages/Home/`)
- Dashboard with gridlets
- Welcome section

### 2. My Info (`src/pages/MyInfo/`)
- Personal information form with multiple sections
- Job information, contact details, emergency contacts
- Avatar display with user info
- Mock data: Employee profile information

### 3. Directory/People (`src/pages/People/`)
- Employee cards with search, grouping by name/department/location/division, department filtering
- Mock data: 23 employees with realistic avatars from pravatar.cc

### 4. Hiring (`src/pages/Hiring/`)
- Job openings table with tabs (Job openings, Candidates, Talent pools)
- Status filter dropdown (Draft and open, Open only, Draft only)
- Mock data: 6 job openings

### 5. Analytics/Reports (`src/pages/Reports/`)
- Sidebar navigation with 13 categories
- AI question input using TextArea component with gradient border
- Suggestion question cards
- Insights section with 3 cards
- Recently viewed reports table (16 reports)
- Layout: Header at top spanning full width, sidebar + main content below

### 6. Files (`src/pages/Files/`)
- Sidebar with category navigation (All files, Signature Templates, Benefits Docs, Payroll, Trainings, Company Policies)
- File list with working checkboxes and select all
- Sort dropdown with actual sorting (Name A-Z/Z-A, Date Recent/Oldest, Size Largest/Smallest)
- Light green highlight on selected rows (#f0f9ed)
- File icons colored by type (red=PDF, blue=image, purple=audio)
- Mock data: 16 files in `src/data/files.ts`

### 7. Payroll (`src/pages/Payroll/`)
- **Responsive date selector** with ResizeObserver-based card visibility:
  - Cards are 160px wide with 20px minimum gap
  - Cards disappear completely (not partially) when viewport shrinks
  - Remaining cards redistribute using justify-between
  - Arrow button (40x40px circular) fixed on right
  - Grey 2px horizontal line behind all cards
  - Selected card: beige background (`--surface-neutral-xx-weak`) with green border
  - Active date number box: solid green background with white text
  - Idle date number box: light beige background with green text
  - Notification badge positioned at top-right of icon box
- **Stats cards** (horizontal layout matching Card/Info Figma component):
  - 48x48px icon boxes with `--surface-neutral-xx-weak` background
  - Value: 18px semibold, Label: 13px regular
  - Stats: 88 people, $1,234 extra pay, 113 timesheets
- **Functional reminders** section with working checkboxes and strikethrough on completion
- **Updates section** with arrows-rotate (refresh) icon, no grey background container
- **Right sidebar**: Start payroll button (48px, 18px text), 44x44px icon containers, global button styles
- **Dark mode support**: All colors use CSS variables that swap via `:root.dark`
- Mock data: 12 payroll dates (Jan-April), stats, reminders, details in `src/data/payrollData.ts`

### 8. Settings (`src/pages/Settings/`)
- Two-column layout: Left sidebar (280px) + Main content card
- **Left sidebar**: 27 settings navigation categories with icons and hover states (green text + white background)
- **Main content**: White card with Account section
- Account header with company name, account #, URL, and owner info
- Vertical sub-tabs (Account Info, Billing, ACA Settings, etc.) with selected state (light gray background)
- **My Subscription section**: Pro package card, Add-Ons (Payroll, Time Tracking), Job Postings + File Storage combined card
- **Available Upgrades**: Elite, Benefits Administration, Global Employment cards with light gray icon backgrounds
- Supercharge Your Workflow promotional card
- Data section with data center location
- Mock data: Settings nav items, account info, subscription details in `src/data/settingsData.ts`
- Settings gear icon in GlobalHeader shows selected state (gray background + green icon) when on /settings

## Reusable Components Created

### TextArea (`src/components/TextArea/`)
- AI-themed input with gradient border
- Gradient: `linear-gradient(93deg, #87C276 0%, #7AB8EE 33.65%, #C198D4 66.83%, #F2A766 96.15%)`
- Circle-arrow-up submit icon
- Props: placeholder, state, note, hasValue, hasLabel

### Icon (`src/components/Icon/`)
- Wraps Font Awesome + Lucide icons
- **Settings page icons**: lock, thumbs-up, heart, sliders, bell, spa, palette, door-open, door-closed, chart-line, plane, graduation-cap, shield, check-circle, link
- **Payroll page icons**: chevron-right, arrows-rotate (refresh icon for Updates section)
- **Other icons**: folder, chevron-down, arrow-up-from-bracket, table-cells, arrow-down-to-line, trash-can, file, file-audio, image, circle-info
- Supports `style` prop for custom colors
- Lucide icons: PanelLeftOpen, PanelLeftClose, Home, UserCircle, Users, IdCard, PieChart, FileText, CircleDollarSign, Sun, Moon

### ProgressBar (`src/components/ProgressBar/`)
- Created for Settings page (not yet implemented in UI)
- Horizontal bar with fill percentage
- Props: value, max, label, color

### GlobalHeader (`src/components/GlobalHeader/`)
- Logo, search bar, utility icons (inbox, help, settings)
- Settings gear icon shows selected state when on /settings (gray background + green icon)
- Uses `useLocation` to detect current route

### GlobalNav (`src/components/GlobalNav/`)
- Collapsible left navigation with 7 items: Home, My Info, People, Hiring, Reports, Files, Payroll
- Selected state: Gray background + green icon + bold text
- Theme toggle button (sun/moon icon)
- Account section with avatar
- Expand/collapse functionality with localStorage persistence

## Global Styles (`src/index.css`)

### H1 Style
```css
h1 {
  font-family: 'Fields', system-ui, sans-serif;
  font-size: 44px;
  font-weight: 700;
  line-height: 52px;
  color: #2e7918;
  margin: 0;
}
```

### Design Tokens
- Primary green: `--color-primary-strong: #2e7918`
- Surface colors, border colors, text colors all defined as CSS variables
- Spacing and radius tokens available
- **Dark mode variables** in `:root.dark` selector:
  - `--surface-neutral-white: #1a1a1a`
  - `--surface-neutral-xx-weak: #242422`
  - `--border-neutral-x-weak: #424039`
  - `--text-neutral-strong: #d5d0cd`

## Key Data Files
- `src/data/employees.ts` - 23 employees with departments, divisions, locations
- `src/data/jobOpenings.ts` - 6 job openings
- `src/data/analytics.ts` - Insights, reports, suggestion questions
- `src/data/files.ts` - 16 files with categories and types
- `src/data/payrollData.ts` - 12 payroll dates (Jan-April for wide screens), stats, reminders (with functional checkboxes), details
- `src/data/settingsData.ts` - Settings navigation items (27 categories), account info, subscription, add-ons, upgrades

## Layout Patterns

### Analytics/Files Layout
```
┌─────────────────────────────────────────────────┐
│ Header: H1 title + action buttons (full width)  │
├─────────────────────────────────────────────────┤
│ Sidebar (280px) │ Main Content (flex-1)         │
│ - Categories    │ - Content sections            │
│ - pl-8 padding  │ - pr-10 pl-6 pb-10 padding    │
└─────────────────────────────────────────────────┘
- Gray background extends behind entire page including sidebar
- No border between sidebar and content
```

## Git Repository
- Remote: https://github.com/mattcmorrell/bhr-ui-mcp.git
- All changes committed and pushed

## Dark Mode Implementation
- Uses CSS variables defined in `src/index.css` with `:root.dark` selector
- All components should use CSS variables like `var(--surface-neutral-white)` instead of hardcoded colors
- Do NOT use Tailwind `dark:` prefix classes - they don't work correctly with this setup
- Variables automatically swap values when `.dark` class is on root element

## Responsive Patterns

### Date Selector (Payroll page)
```tsx
const CARD_WIDTH = 160;
const MIN_GAP = 20;
const BUTTON_WIDTH = 40;

// ResizeObserver calculates how many cards fit
const availableWidth = containerWidth - BUTTON_WIDTH - MIN_GAP;
const maxCards = Math.floor((availableWidth + MIN_GAP) / (CARD_WIDTH + MIN_GAP));
const visibleDates = payrollDates.slice(0, visibleCardCount);

// Cards use justify-between to distribute evenly
<div className="flex items-center justify-between flex-1">
  {visibleDates.map(...)}
</div>
```

## Next Steps
1. Fix Files page card structure (move header inside card)
2. Compare with Figma for any other discrepancies
3. Continue building remaining pages (MyInfo if needed)
