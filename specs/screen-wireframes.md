# Screen Wireframe Specification

## Screen 1: Title Screen
### Layout
- Centered content
- Logo: "CHAOS HISTORY" (pixel font, 48px)
- Subtitle: "A trivia game where wrong answers have consequences"
- "START GAME" button (primary, 200px wide)
- "LEADERBOARD" button (secondary)
- "HOW TO PLAY" button (text link)
- High score display (bottom right)
- Background: dark (#0d0d0d) with subtle particle effect

### Interactions
- Click START → Difficulty Selection
- Click LEADERBOARD → Leaderboard modal
- Click HOW TO PLAY → Instructions modal

---

## Screen 2: Difficulty Selection
### Layout
- Title: "SELECT DIFFICULTY"
- 4 difficulty cards (vertical stack):
  - Kids Mode: "No timer, silly consequences" (emoji: 👶)
  - Easy: "30 seconds, basic questions" (emoji: 🌱)
  - Medium: "20 seconds, mixed categories" (emoji: 🔥)
  - Hard: "15 seconds, niche knowledge" (emoji: 💀)
- Each card shows: emoji, name, description
- Back button (top left)

### Interactions
- Click card → Start game with that difficulty
- Click Back → Title screen

---

## Screen 3: Game Screen
### Layout (top to bottom)
- **Header Bar** (60px height)
  - Score (left): "1,250 pts"
  - Defcon indicator (center): "DEFCON 4" (colored)
  - Streak (right): "🔥 x3"
  
- **Timer Bar** (8px height, full width)
  - Fills from right to left
  - Color shifts green → yellow → red as time depletes

- **Question Area** (center)
  - Question number: "Question 7 / 100"
  - Question text: "Who painted the Mona Lisa?"
  - Category badge: "ART"

- **Answer Grid** (2x2, below question)
  - 4 answer buttons
  - Each shows answer text
  - Tap highlights with border
  - Correct = green flash
  - Wrong = red flash + shake

- **Consequences Overlay** (absolute, pointer-events: none)
  - Characters appear as overlays
  - Position varies by character type

### Interactions
- Tap answer → Check answer, update state
- Timer expires → Treat as wrong
- Game over → Transition to Game Over screen

---

## Screen 4: Game Over
### Layout (centered)
- "GAME OVER" title (large)
- Final score (48px, colored)
- Stats section:
  - Correct: 23
  - Wrong: 7
  - Best Streak: 5
- "PLAY AGAIN" button (primary)
- "SHARE" button (secondary)
- "MAIN MENU" button (text link)

### Interactions
- Click PLAY AGAIN → Difficulty Selection
- Click SHARE → Copy score link
- Click MAIN MENU → Title screen

---

## Modal: How to Play
### Layout
- Semi-transparent overlay
- Title: "How to Play"
- Bullet points:
  1. Select difficulty
  2. Answer questions before timer runs out
  3. Wrong answers spawn consequences
  4. More wrong = more chaos
  5. Try to survive the chaos!
- "GOT IT" button to close

---

## Modal: Leaderboard
### Layout
- Semi-transparent overlay
- Title: "Leaderboard"
- Top 10 scores (rank, name, score, date)
- "CLOSE" button

---

## Responsive Breakpoints
- Mobile: < 600px (1 column answers)
- Tablet: 600-900px (2 column answers)
- Desktop: > 900px (full layout)

*Spec Version: 1.0*