# Game State Specification

## Core State Fields
| Field | Type | Default | Description |
|-------|------|---------|-------------|
| questionNum | number | 1 | Current question index |
| score | number | 0 | Total score |
| streak | number | 0 | Current correct streak |
| bestStreak | number | 0 | Best streak achieved |
| defcon | number | 5 | Current Defcon level (5-1) |
| timer | number | 30000 | Timer in ms |
| difficulty | string | 'medium' | Current difficulty |
| activeConsequences | array | [] | Currently active consequences |
| gameOver | boolean | false | Game over flag |
| questionsAnswered | number | 0 | Total questions answered |
| correctAnswers | number | 0 | Total correct |
| wrongAnswers | array | [] | Array of wrong question IDs |
| categoryStreak | object | {} | Per-category streak tracking |
| startTime | number | Date.now() | Game start timestamp |

## State Transitions
```
┌─────────────┐
│  START     │
└──────┬──────┘
       │ start game
       ▼
┌─────────────┐
│  PLAYING   │◄────────────────┐
└──────┬──────┘               │
       │ answer              │
       ▼ (correct)           │
┌─────────────┐              │
│  CORRECT    │───────────────┘
└──────┬──────┘
       │ (wrong)
       ▼
┌─────────────┐
│  WRONG      │
└──────┬──────┘
       │
       ▼ (consequence triggers)
┌─────────────┐
│ GAME_OVER  │
└─────────────┘
```

## Defcon Levels
| Level | Condition | Visual |
|-------|-----------|--------|
| 5 | No consequences | Green |
| 4 | 1 consequence | Yellow |
| 3 | 2-3 consequences | Orange |
| 2 | 4-5 consequences | Red-Orange |
| 1 | 6+ consequences | Red (max chaos) |

## Persistence
- Save to LocalStorage on game over
- Load previous high score on start
- No mid-game save (prevents cheating)

## API
```js
// State management
function startGame(difficulty) {
  gameState = { ...default, difficulty }
}

function answerQuestion(answerIndex) {
  // validate, update score, trigger consequences
}

function nextQuestion() {
  gameState.questionNum++
}

function gameOver() {
  saveToLocalStorage(gameState)
}
```

*Spec Version: 1.0*