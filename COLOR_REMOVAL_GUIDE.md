# Color Removal Implementation Guide

## Goal
Remove ALL colors and gradients from the entire app, keeping only neutral grays and whites. Buttons should remain functional with hover states using gray tones.

## Color Mapping (Old → New)

### Primary Colors
- `#1a73e8` (Blue) → `#666` or `#999` (Gray)
- `#4caf50` (Green) → `#666` or `#888` (Gray)
- `#ff9800` (Orange) → `#999` (Gray)
- `#ff5252` (Red) → `#e0e0e0` (Light Gray)
- `#e3f2fd` (Light Blue) → `#f5f5f5` (Light Gray)

### Backgrounds
- Colored backgrounds → White `#ffffff` or Light Gray `#f5f5f5` or `#f8f9fa`
- Gradient backgrounds → Solid gray or white

### Borders
- Colored borders → `#d0d0d0` or `#e0e0e0` (Gray)

### Text
- Colored text → `#333` (Dark Gray) or `#666` (Medium Gray) or `#999` (Light Gray)

### Badges & Indicators
- Green badges → Gray badges `#f5f5f5` bg with `#666` text
- Orange badges → Gray badges
- Blue badges → Gray badges
- Red badges → Gray badges `#e0e0e0`

### Icons
- Colored icons → Gray `#666` or `#999`

### Hover States (Buttons Only)
- Keep functional: Light gray background `#e0e0e0` or `#eeeeee`
- Text can darken: `#666` → `#333`

## Components to Update

1. **ScenarioPanel.tsx** ✅ STARTED
   - Sidebar background: blue → gray
   - Sidebar icons: white → gray
   - Task badges: red/green/blue → gray
   - Progress bars: gradient → gray
   - Hint boxes: orange → gray

2. **AI TutorChat.tsx**
   - Chat header: blue → gray
   - Message bubbles: blue → gray
   - Bot icon: blue → gray
   - Send button: blue → gray

3. **Excel Cell.tsx**
   - Selected cell: blue → gray

4. **SpreadsheetToolbar.tsx**
   - Primary buttons: blue → gray
   - Icons: blue → gray

5. **ImportDialog.tsx**
   - Icons: blue → gray
   - Info boxes: blue → gray
   - Buttons: blue → gray

6. **ReflectionArea.tsx**
   - Borders: blue/orange → gray
   - Submit button: gradient → gray
   - Progress indicator: orange/green → gray

7. **WelcomeModal.tsx**
   - Icons: blue/green/orange → gray
   - Feature highlights: colored → gray

8. **HelpGuide.tsx**
   - Section highlights: blue/green/orange → gray
   - Icons: colored → gray

9. **WorksheetTabs.tsx**
   - Active tab: blue → gray

10. **ResetDialog.tsx**
    - Warning box: orange → gray

11. **CompletionPage.tsx**
    - Success icon: green → gray
    - Award icon: orange → gray

12. **Main.tsx**
    - Chat toggle button: blue → gray

## Implementation Strategy

For each component:
1. Replace all hex colors with gray equivalents
2. Remove gradient backgrounds
3. Keep borders and structural elements
4. Ensure buttons have hover states (gray-based)
5. Test readability and usability

## Testing Checklist
- [ ] All colored backgrounds removed
- [ ] All colored text replaced with gray
- [ ] All colored icons replaced with gray
- [ ] All gradients removed
- [ ] Buttons still have hover states
- [ ] App is fully functional
- [ ] UI is readable and professional
