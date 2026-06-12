# Question Data Structure Specification

## Required Fields
| Field | Type | Description |
|-------|------|-------------|
| id | string | Unique identifier (e.g., "hist-001") |
| question | string | The question text |
| correct | string | The correct answer |
| wrong | array[3] | Three plausible wrong answers |
| category | string | Category (see list) |
| difficulty | string | easy/medium/hard |
| year | number? | Year relevant to question |
| funFact | string? | Fun fact shown after answer |
| explanation | string? | Why correct is correct |
| hint | string? | Hint for easy mode |

## Categories
- history
- science
- geography
- art
- sports
- general

## Difficulty Levels
- easy: Basic knowledge, longer timer
- medium: Mixed, standard timer
- hard: Niche, shorter timer
- expert: v2+ only

## Example Question
```json
{
  "id": "art-001",
  "question": "Who painted the Mona Lisa?",
  "correct": "Leonardo da Vinci",
  "wrong": ["Michelangelo", "Raphael", "Donatello"],
  "category": "art",
  "difficulty": "easy",
  "year": 1503,
  "funFact": "It took Leonardo 4 years to paint the Mona Lisa.",
  "explanation": "Michelangelo sculpted David, didn't paint Mona Lisa.",
  "hint": "Think Renaissance Italy"
}
```

## Validation Rules
- All required fields must be present
- wrong array must have exactly 3 items
- No duplicate answers (correct cannot match any wrong)
- Question text must be 10-500 characters
- All 4 answers must be plausible

## File Structure
- questions.json (main bank)
- questions-history.json
- questions-science.json
- questions-geography.json
- questions-art.json
- questions-sports.json
- questions-general.json

*Spec Version: 1.0*