# HelpGuide - Color Neutralization Summary

## Icons Updated to Gray (#666)
✅ BookOpen - Header icon
✅ Play - Quick Start Guide
✅ Target - Interface Overview  
✅ FileSpreadsheet - Working with the Spreadsheet
❌ CheckCircle - Task System (#9c27b0 → #666)
❌ MessageSquare - AI Tutor (#e91e63 → #666)
❌ FileText - Reflection & Submission (#ff5722 → #666)
❌ Lightbulb - Scenario Panel (#ffc107 → #666)
❌ Award - Tips & Best Practices (#00bcd4 → #666)
❌ ArrowRight - Troubleshooting (#f44336 → #666)
❌ Target - Keyboard Shortcuts (#607d8b → #666)

## CSS Styles to Neutralize

###Header (keep gradient for buttons only)
- `.help-header` background: gradient → solid gray `#f5f5f5` or white
- `.help-icon` background: keep white, border: add gray border

### Interface Items
- `.interface-item` background: gradient → solid `#f8f9fa`
- `.interface-item` border-left: `#1a73e8` → `#999`

### Formula Items
- `.formula-item` border-left: `#4caf50` → `#999`
- `code` color: `#d32f2f` → `#666`

### Task Groups
- `.task-group` border-left: `#9c27b0` → `#999`

### Info/Warning Boxes
- `.info-box` background: `#e3f2fd` → `#f5f5f5`
- `.info-box` border-left: `#2196f3` → `#999`
- `.info-box` color: `#1565c0` → `#666`

- `.warning-box` background: `#fff3e0` → `#f5f5f5`
- `.warning-box` border-left: `#ff9800` → `#999`
- `.warning-box` color: `#e65100` → `#666`

### Question Badges
- `.question-badge` background: `#f3e5f5` → `#f5f5f5`
- `.question-badge` color: `#6a1b9a` → `#666`
- `.question-badge` border: `#9c27b0` → `#999`

### Tip Cards
- `.tip-card` hover border-color: `#1a73e8` → `#999`
- `.tip-card` hover box-shadow: blue → gray

### Trouble Items
- `.trouble-item` background: `#fef5f5` → `#f5f5f5`
- `.trouble-item` border-left: `#f44336` → `#999`
- `.trouble-item h4` color: `#c62828` → `#666`

### Buttons (Keep functional)
- `.close-help-btn` gradient → solid `#666`
- `.close-help-btn:hover` → darken to `#555`

## Summary
Total icon colors to change: 8 remaining
Total CSS rules to neutralize: ~20+ color/gradient references
