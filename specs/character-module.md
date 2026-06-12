# Character Module Specification

## Required Fields
| Field | Type | Description |
|-------|------|-------------|
| name | string | Character name (e.g., "Napoleon") |
| sprite | string | SVG or image path |
| animations | array | ['idle', 'talk', 'angry'] |
| catchphrases | array | Voice lines |
| spawnPosition | object | { top, left, right, bottom } |
| category | string | What triggers this character |
| triggerType | string | category/timer/streak/combo |

## Character List
| Character | Trigger | Category | Catchphrases |
|----------|---------|----------|--------------|
| Napoleon | Wrong history | history | "Perhaps you should have studied more..." |
| Einstein | Wrong science | science | "Actually, E=mc² is more of a guideline..." |
| Trivia Gnome | Wrong general | general | "Wrong again, mortal." |
| Historical Union | 3+ wrong streak | streak | "We strike for accuracy!" |
| Map Glitch | Wrong geography | geography | "That's not where that is..." |
| Painting Judge | Wrong art | art | "This is not proper composition." |
| Sports Commentator | Wrong sports | sports | "And that's another miss..." |
| Panic Napoleon | Timer < 50% | timer | "Hurry up, time is running out!" |

## Example Module
```js
// js/characters/napoleon.js
export const napoleon = {
  name: 'Napoleon',
  sprite: 'data:image/svg+xml;base64,...',
  animations: ['idle', 'talk', 'angry'],
  catchphrases: [
    "Perhaps you should have studied more...",
    "Have you considered you might be wrong?",
    "Are you sure about that?",
    "History remembers the correct answers."
  ],
  spawnPosition: { top: '10%', right: '10%' },
  category: 'history',
  triggerType: 'category'
}
```

## Spawn Logic
- Category trigger: Wrong answer in category spawns matching character
- Timer trigger: Timer below threshold spawns panic character
- Streak trigger: Consecutive wrong triggers escalation
- Combo trigger: Same category twice triggers special event

## Animation States
- idle: Default breathing animation
- talk: Mouth moving, speech bubble visible
- angry: Red tint, faster movement
- spawn: Fade in from position
- despawn: Fade out

*Spec Version: 1.0*