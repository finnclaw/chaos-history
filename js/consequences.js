// consequences.js - Consequence system

// Character definitions
const characters = {
  napoleon: {
    name: 'Napoleon',
    category: 'history',
    catchphrases: [
      "Perhaps you should have studied more...",
      "Have you considered you might be wrong?",
      "History remembers the correct answers."
    ],
    spawnPosition: { top: '10%', right: '10%' }
  },
  einstein: {
    name: 'Einstein',
    category: 'science',
    catchphrases: [
      "Actually, E=mc² is more of a guideline...",
      "Did you even study physics?",
      "Science requires precision."
    ],
    spawnPosition: { top: '20%', left: '10%' }
  },
  triviaGnome: {
    name: 'Trivia Gnome',
    category: 'general',
    catchphrases: [
      "Wrong again, mortal.",
      "The gnomes are displeased.",
      "Perhaps next time."
    ],
    spawnPosition: { bottom: '10%', right: '20%' }
  },
  paintingJudge: {
    name: 'Painting Judge',
    category: 'art',
    catchphrases: [
      "This is not proper composition.",
      "The art world is disappointed.",
      "A for effort, F for accuracy."
    ],
    spawnPosition: { top: '15%', right: '15%' }
  },
  sportsCommentator: {
    name: 'Sports Commentator',
    category: 'sports',
    catchphrases: [
      "And that's another miss...",
      "The crowd goes mild.",
      "Not your finest moment."
    ],
    spawnPosition: { bottom: '15%', left: '10%' }
  },
  panicNapoleon: {
    name: 'Panic Napoleon',
    category: 'timer',
    catchphrases: [
      "Hurry up! Time is running out!",
      "The clock awaits no one!",
      "Make haste!"
    ],
    spawnPosition: { top: '5%', left: '50%' }
  }
};

// Active consequences
let activeCharacters = [];

// Spawn consequence based on wrong answer
function spawnConsequence(questionCategory, timerLow = false) {
  // Determine which character to spawn
  let characterKey;
  
  if (timerLow) {
    characterKey = 'panicNapoleon';
  } else {
    // Pick character based on category
    const categoryCharacters = Object.entries(characters).filter(([key, char]) => 
      char.category === questionCategory && key !== 'panicNapoleon'
    );
    
    if (categoryCharacters.length > 0) {
      const randomIndex = Math.floor(Math.random() * categoryCharacters.length);
      characterKey = categoryCharacters[randomIndex][0];
    } else {
      characterKey = 'triviaGnome';
    }
  }
  
  const character = characters[characterKey];
  
  // Add to active list
  activeCharacters.push({
    key: characterKey,
    ...character,
    spawnTime: Date.now()
  });
  
  // Create DOM element
  createCharacterElement(characterKey, character);
  
  return character;
}

// Create character element in DOM
function createCharacterElement(key, character) {
  const container = document.getElementById('consequences-container');
  if (!container) return;
  
  const charEl = document.createElement('div');
  charEl.className = 'consequence-character';
  charEl.id = `char-${key}`;
  charEl.style.position = 'absolute';
  charEl.style[character.spawnPosition.top ? 'top' : 'bottom'] = character.spawnPosition.top || character.spawnPosition.bottom;
  charEl.style[character.spawnPosition.left ? 'left' : 'right'] = character.spawnPosition.left || character.spawnPosition.right;
  charEl.style.animation = 'spawnIn 0.5s ease-out';
  
  // Pick random catchphrase
  const catchphrase = character.catchphrases[Math.floor(Math.random() * character.catchphrases.length)];
  
  charEl.innerHTML = `
    <div class="character-sprite">${character.name}</div>
    <div class="character-speech">${catchphrase}</div>
  `;
  
  container.appendChild(charEl);
  
  // Remove after 5 seconds
  setTimeout(() => {
    charEl.style.animation = 'spawnOut 0.5s ease-in';
    setTimeout(() => {
      charEl.remove();
      activeCharacters = activeCharacters.filter(c => c.key !== key);
    }, 500);
  }, 5000);
}

// Clear all consequences
function clearConsequences() {
  activeCharacters = [];
  const container = document.getElementById('consequences-container');
  if (container) {
    container.innerHTML = '';
  }
}

// Get current Defcon based on wrong answers
function calculateDefcon(wrongCount) {
  if (wrongCount === 0) return 5;
  if (wrongCount === 1) return 4;
  if (wrongCount <= 3) return 3;
  if (wrongCount <= 5) return 2;
  return 1;
}

export { spawnConsequence, clearConsequences, calculateDefcon, characters };