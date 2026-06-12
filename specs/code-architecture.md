# Code Architecture Specification

## File Structure
```
chaos-history/
├── index.html              # Entry point
├── SPECS.md               # This file
├── css/
│   ├── base.css          # Reset, CSS variables, typography
│   ├── screens.css      # Screen-specific styles
│   ├── components.css   # Reusable components (buttons, cards)
│   ├── effects.css      # Animations, consequences
│   └── responsive.css    # Media queries
├── js/
│   ├── main.js          # Entry point, router
│   ├── game.js          # Core game loop
│   ├── state.js         # State management
│   ├── questions.js     # Question loading/parsing
│   ├── consequences.js  # Spawn logic
│   ├── timer.js         # Countdown logic
│   ├── scoring.js       # Scoring formulas
│   └── ui.js            # DOM updates
├── data/
│   └── questions.json   # Question bank
└── assets/
    └── sprites/         # Character images (SVG)
```

## Module Responsibilities

### main.js
- Entry point
- Router between screens
- Initialize game

### game.js
- Core game loop
- Handle answer logic
- Trigger consequences on wrong
- Manage game over state

### state.js
- gameState object
- State transitions
- LocalStorage persistence

### questions.js
- Load questions.json
- Filter by difficulty
- Shuffle and select
- Track used questions

### consequences.js
- Determine which character spawns
- Manage spawn positions
- Handle escalation logic
- Manage Defcon levels

### timer.js
- Countdown logic
- RequestAnimationFrame for smooth display
- Panic mode trigger

### scoring.js
- Calculate score formula
- Streak multiplier
- Chaos bonus

### ui.js
- DOM updates
- Screen transitions
- Animation triggers
- Visual feedback

## Data Flow
```
User Input → main.js → game.js → state.js (update)
                            ↓
                     questions.js (get question)
                            ↓
                     timer.js (start countdown)
                            ↓
                     User answers → game.js → state.js (check answer)
                            ↓
                     Correct → scoring.js → ui.js
                            ↓
                     Wrong → consequences.js → ui.js
```

## No External Dependencies
- Vanilla JavaScript (ES6+)
- No frameworks
- No build tools
- No CSS frameworks

## Browser Support
- Chrome 80+
- Firefox 75+
- Safari 13+
- Edge 80+

*Spec Version: 1.0*