// main.js - Entry point and router

// State
let gameState = {
  score: 0,
  streak: 0,
  bestStreak: 0,
  defcon: 5,
  difficulty: 'medium',
  questionNum: 0,
  questionsAnswered: 0,
  correctAnswers: 0,
  wrongAnswers: []
};

// Questions data
let allQuestions = [];
let currentQuestion = null;

// Initialize game
async function init() {
  console.log('Initializing Chaos History...');
  
  // Load questions
  try {
    const response = await fetch('data/questions.json');
    allQuestions = await response.json();
    console.log('Loaded questions:', allQuestions.length);
  } catch (e) {
    console.error('Failed to load questions:', e);
  }
  
  // Set up event listeners
  setupEventListeners();
  
  // Load high score
  loadHighScore();
  
  // Show title screen
  showScreen('title');
}

// Set up button event listeners
function setupEventListeners() {
  // Title screen buttons
  document.getElementById('start-btn')?.addEventListener('click', () => {
    showScreen('difficulty');
  });
  
  document.getElementById('leaderboard-btn')?.addEventListener('click', () => {
    console.log('Show leaderboard');
    alert('Leaderboard coming soon!');
  });
  
  document.getElementById('how-to-play-btn')?.addEventListener('click', () => {
    console.log('Show how to play');
    alert('How to Play:\n1. Select difficulty\n2. Answer questions\n3. Wrong answers spawn consequences\n4. Try to survive!');
  });
  
  // Difficulty screen buttons
  document.querySelectorAll('.difficulty-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const difficulty = e.target.dataset.difficulty;
      startGame(difficulty);
    });
  });
  
  document.getElementById('back-btn')?.addEventListener('click', () => {
    showScreen('title');
  });
  
  // Answer buttons (will be used in game)
  document.querySelectorAll('.answer-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const answerIndex = parseInt(e.target.dataset.index);
      handleAnswer(answerIndex);
    });
  });
  
  // Game over buttons
  document.getElementById('play-again-btn')?.addEventListener('click', () => {
    showScreen('difficulty');
  });
  
  document.getElementById('share-btn')?.addEventListener('click', () => {
    console.log('Share score');
    alert(`Score: ${gameState.score}\nShare coming soon!`);
  });
  
  document.getElementById('main-menu-btn')?.addEventListener('click', () => {
    showScreen('title');
  });
}

// Switch screens
function showScreen(screenName) {
  const screens = document.querySelectorAll('.screen');
  screens.forEach(screen => {
    screen.classList.remove('active');
  });
  
  const targetScreen = document.getElementById(`${screenName}-screen`);
  if (targetScreen) {
    targetScreen.classList.add('active');
  }
}

// Start game with difficulty
function startGame(difficulty) {
  console.log('Starting game with difficulty:', difficulty);
  
  gameState = {
    score: 0,
    streak: 0,
    bestStreak: 0,
    defcon: 5,
    difficulty: difficulty,
    questionNum: 0,
    questionsAnswered: 0,
    correctAnswers: 0,
    wrongAnswers: []
  };
  
  updateGameDisplay();
  showScreen('game');
  
  // Load first question
  loadNextQuestion();
}

// ===== CONSEQUENCES SYSTEM =====

// Character definitions
const characters = {
  napoleon: {
    name: 'Napoleon',
    category: 'history',
    catchphrases: ["Perhaps you should have studied more...", "Have you considered you might be wrong?"],
    spawnPosition: { top: '10%', right: '10%' }
  },
  einstein: {
    name: 'Einstein',
    category: 'science',
    catchphrases: ["Actually, E=mc² is more of a guideline...", "Did you even study physics?"],
    spawnPosition: { top: '20%', left: '10%' }
  },
  triviaGnome: {
    name: 'Trivia Gnome',
    category: 'general',
    catchphrases: ["Wrong again, mortal.", "The gnomes are displeased."],
    spawnPosition: { bottom: '10%', right: '20%' }
  },
  paintingJudge: {
    name: 'Painting Judge',
    category: 'art',
    catchphrases: ["This is not proper composition.", "The art world is disappointed."],
    spawnPosition: { top: '15%', right: '15%' }
  },
  sportsCommentator: {
    name: 'Sports Commentator',
    category: 'sports',
    catchphrases: ["And that's another miss...", "The crowd goes mild."],
    spawnPosition: { bottom: '15%', left: '10%' }
  }
};

// Active characters
let activeCharacters = [];

// Calculate Defcon
function calculateDefcon(wrongCount) {
  if (wrongCount === 0) return 5;
  if (wrongCount === 1) return 4;
  if (wrongCount <= 3) return 3;
  if (wrongCount <= 5) return 2;
  return 1;
}

// Spawn consequence
function spawnConsequence(questionCategory) {
  const categoryCharacters = Object.entries(characters).filter(([key, char]) => char.category === questionCategory);
  const characterKey = categoryCharacters.length > 0 
    ? categoryCharacters[Math.floor(Math.random() * categoryCharacters.length)][0] 
    : 'triviaGnome';
  
  const character = characters[characterKey];
  
  // Create element
  const container = document.getElementById('consequences-container') || document.createElement('div');
  container.id = 'consequences-container';
  document.body.appendChild(container);
  
  const charEl = document.createElement('div');
  charEl.className = 'consequence-character';
  charEl.style.cssText = `position:fixed;${character.spawnPosition.top ? 'top:'+character.spawnPosition.top:''};${character.spawnPosition.bottom?'bottom:'+character.spawnPosition.bottom:''};${character.spawnPosition.left?'left:'+character.spawnPosition.left:''};${character.spawnPosition.right?'right:'+character.spawnPosition.right:''};background:#1a1a1a;border:2px solid #e63946;border-radius:12px;padding:12px;max-width:200px;z-index:100;animation:spawnIn 0.5s ease-out`;
  
  const catchphrase = character.catchphrases[Math.floor(Math.random() * character.catchphrases.length)];
  charEl.innerHTML = `<div style="font-weight:bold;margin-bottom:8px">${character.name}</div><div style="color:#888;font-style:italic;font-size:14px">${catchphrase}</div>`;
  
  container.appendChild(charEl);
  
  // Remove after 5 seconds
  setTimeout(() => {
    charEl.style.animation = 'spawnOut 0.5s ease-in';
    setTimeout(() => charEl.remove(), 500);
  }, 5000);
}

// ===== HANDLE ANSWER =====
function handleAnswer(answerIndex) {
  console.log('Answer selected:', answerIndex);
  
  // Get selected answer
  const selectedAnswer = document.querySelectorAll('.answer-btn')[answerIndex].textContent;
  const correctAnswer = currentQuestion.correct;
  
  // Check if correct
  if (selectedAnswer === correctAnswer) {
    // CORRECT ANSWER
    console.log('Correct!');
    gameState.correctAnswers++;
    gameState.streak++;
    gameState.bestStreak = Math.max(gameState.bestStreak, gameState.streak);
    
    // Scoring: base 100 + streak bonus
    const streakBonus = Math.min(gameState.streak * 10, 50);
    const points = 100 + streakBonus;
    gameState.score += points;
    
    // Visual feedback
    document.querySelectorAll('.answer-btn')[answerIndex].classList.add('correct');
  } else {
    // WRONG ANSWER
    console.log('Wrong! Correct was:', correctAnswer);
    gameState.wrongAnswers.push(currentQuestion.id);
    gameState.streak = 0;
    gameState.defcon = calculateDefcon(gameState.wrongAnswers.length);
    
    // SPAWN CONSEQUENCE
    spawnConsequence(currentQuestion.category);
    
    // Visual feedback
    document.querySelectorAll('.answer-btn')[answerIndex].classList.add('wrong');
  }
  
  gameState.questionNum++;
  gameState.questionsAnswered++;
  
  updateGameDisplay();
  
  // Check if game over (10 questions)
  if (gameState.questionNum >= 10) {
    endGame();
    return;
  }
  
  // Load next question after delay
  setTimeout(() => {
    loadNextQuestion();
  }, 1000);
}

// End game
function endGame() {
  console.log('Game over! Score:', gameState.score);
  
  // Save high score
  const highScore = localStorage.getItem('chaosHistory_highScore') || 0;
  if (gameState.score > highScore) {
    localStorage.setItem('chaosHistory_highScore', gameState.score);
  }
  
  // Update game over screen
  document.getElementById('final-score').textContent = gameState.score;
  document.getElementById('correct-count').textContent = gameState.correctAnswers;
  document.getElementById('wrong-count').textContent = gameState.wrongAnswers.length;
  document.getElementById('best-streak').textContent = gameState.bestStreak;
  
  showScreen('gameOver');
}

// Load next question
function loadNextQuestion() {
  // Get random question based on difficulty
  const availableQuestions = allQuestions.filter(q => 
    q.difficulty === gameState.difficulty || q.difficulty === 'easy'
  );
  
  if (availableQuestions.length === 0) {
    // No questions left - end game
    endGame();
    return;
  }
  
  // Pick random question
  const randomIndex = Math.floor(Math.random() * availableQuestions.length);
  currentQuestion = availableQuestions[randomIndex];
  
  // Remove from pool to avoid repeats
  const idx = allQuestions.indexOf(currentQuestion);
  if (idx > -1) allQuestions.splice(idx, 1);
  
  // Update display
  document.getElementById('question-number').textContent = 
    `Question ${gameState.questionNum + 1} / 10`;
  document.getElementById('question-text').textContent = currentQuestion.question;
  document.getElementById('category-badge').textContent = currentQuestion.category.toUpperCase();
  
  // Shuffle answers
  const answers = [currentQuestion.correct, ...currentQuestion.wrong];
  shuffleArray(answers);
  
  document.querySelectorAll('.answer-btn').forEach((btn, i) => {
    btn.textContent = answers[i];
    btn.classList.remove('correct', 'wrong');
  });
  
  // Reset timer
  resetTimer();
}

// Shuffle array
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
}

// Timer
let timerInterval = null;
let timeRemaining = 30000;

function resetTimer() {
  clearInterval(timerInterval);
  timeRemaining = 30000;
  
  const timerFill = document.getElementById('timer-fill');
  
  timerInterval = setInterval(() => {
    timeRemaining -= 100;
    const percent = (timeRemaining / 30000) * 100;
    timerFill.style.width = `${percent}%`;
    
    // Color changes
    if (percent < 25) {
      timerFill.style.backgroundColor = 'var(--defcon-1)';
    } else if (percent < 50) {
      timerFill.style.backgroundColor = 'var(--defcon-3)';
    } else {
      timerFill.style.backgroundColor = 'var(--success)';
    }
    
    if (timeRemaining <= 0) {
      clearInterval(timerInterval);
      handleTimeout();
    }
  }, 100);
}

function handleTimeout() {
  console.log('Time out!');
  gameState.wrongAnswers.push(gameState.questionNum);
  gameState.questionNum++;
  gameState.questionsAnswered++;
  gameState.streak = 0;
  gameState.defcon = Math.max(1, gameState.defcon - 1);
  
  updateGameDisplay();
  loadNextQuestion();
}

// Update game display
function updateGameDisplay() {
  document.getElementById('score-display').textContent = `${gameState.score} pts`;
  document.getElementById('defcon-display').textContent = `DEFCON ${gameState.defcon}`;
  document.getElementById('streak-display').textContent = `🔥 x${gameState.streak}`;
}

// Load high score from LocalStorage
function loadHighScore() {
  const highScore = localStorage.getItem('chaosHistory_highScore') || 0;
  const highScoreEl = document.getElementById('high-score-display');
  if (highScoreEl) {
    highScoreEl.textContent = `High Score: ${highScore}`;
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', init);