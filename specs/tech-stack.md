# Detailed Tech Stack Specification

## Core Technologies
| Technology | Version | Purpose |
|------------|---------|---------|
| HTML5 | - | Semantic markup |
| CSS3 | - | Styling, animations, grid |
| JavaScript | ES2020+ | Logic, no transpilation |
| LocalStorage | - | Persistence |

## No Dependencies
- ❌ No framework (React, Vue, etc.)
- ❌ No build tools (Webpack, Vite, etc.)
- ❌ No CSS framework (Tailwind, Bootstrap)
- ❌ No external libraries

## Why Vanilla?
1. **Simplicity** - No learning curve
2. **Performance** - No bloat
3. **Debugging** - Easy to trace
4. **Deployment** - Just open index.html

## CSS Architecture
### Variables
```css
:root {
  --bg-primary: #0d0d0d;
  --bg-secondary: #1a1a1a;
  --text-primary: #f0f0f0;
  --text-muted: #888888;
  --accent: #e63946;
  --accent-secondary: #f4a261;
  --success: #2a9d8f;
  --defcon-5: #2a9d8f;
  --defcon-4: #e9c46a;
  --defcon-3: #f4a261;
  --defcon-2: #e76f51;
  --defcon-1: #e63946;
}
```

### Layout
- CSS Grid for answer buttons (2x2)
- Flexbox for header/layout
- CSS custom properties for theming

### Animations
- CSS transitions for hover states
- CSS keyframes for consequence spawns
- No JS animation libraries

## JavaScript Architecture
### ES6+ Features Used
- const/let (not var)
- Arrow functions
- Template literals
- Destructuring
- Modules (import/export)
- async/await
- Classes for state management

### No Transpilation
- Target modern browsers only
- No Babel needed

## Hosting
| Service | Purpose |
|--------|---------|
| GitHub Pages | Free hosting |
| Custom domain | Optional |

## Development Tools
| Tool | Purpose |
|------|---------|
| VS Code | Editor |
| Chrome DevTools | Debugging |
| git | Version control |

## Performance Targets
| Metric | Target |
|--------|--------|
| First Contentful Paint | < 1s |
| Time to Interactive | < 2s |
| Bundle Size | < 100KB |
| Questions Load | < 500ms |

*Spec Version: 1.0*