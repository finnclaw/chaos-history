// main.js - Entry point and router
// VERSION: CLEAN

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

// Questions
let allQuestions = [];
let currentQuestion = null;

// Initialize
async function init() {
  console.log('INIT');
  
  // Load questions
  try {
    const response = await fetch('data/questions.json');
    allQuestions = await response.json();
  } catch (e) {
    console.error('Load failed:', e);
  }
  
  // Setup events
  setupEvents();
  
  // Show title
  showScreen('title');
}

// Setup all event listeners
function setupEvents() {
  console.log('SETUP EVENTS');
  
  // Start button
  document.getElementById('start-btn').onclick = () => showScreen('difficulty');
  
  // Difficulty buttons
  document.querySelectorAll('.difficulty-btn').forEach(btn => {
    btn.onclick = () => startGame(btn.dataset.difficulty);
  });
  
  // Back button
  document.getElementById('back-btn').onclick = () => showScreen('title');
  
  // Answer buttons
  document.querySelectorAll('.answer-btn').forEach((btn, i) => {
    btn.onclick = () => handleAnswer(i);
  });
  
  // Game over buttons
  document.getElementById('play-again-btn').onclick = () => showScreen('difficulty');
  document.getElementById('main-menu-btn').onclick = () => showScreen('title');
  
  console.log('EVENTS READY');
}

// Show screen
function showScreen(name) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.getElementById(name + '-screen').classList.add('active');
}

// Start game
function startGame(difficulty) {
  console.log('START:', difficulty);
  gameState = { score: 0, streak: 0, bestStreak: 0, defcon: 5, difficulty, questionNum: 0, questionsAnswered: 0, correctAnswers: 0, wrongAnswers: [] };
  updateDisplay();
  showScreen('game');
  loadQuestion();
}

// Load question
function loadQuestion() {
  const q = allQuestions[Math.floor(Math.random() * allQuestions.length)];
  currentQuestion = q;
  
  document.getElementById('question-number').textContent = `Question ${gameState.questionNum + 1} / 10`;
  document.getElementById('question-text').textContent = q.question;
  document.getElementById('category-badge').textContent = q.category.toUpperCase();
  
  const answers = [q.correct, ...q.wrong].sort(() => Math.random() - 0.5);
  document.querySelectorAll('.answer-btn').forEach((btn, i) => {
    btn.textContent = answers[i];
  });
  
  resetTimer();
}

// Handle answer
function handleAnswer(index) {
  const selected = document.querySelectorAll('.answer-btn')[index].textContent;
  const correct = currentQuestion.correct;
  
  if (selected === correct) {
    gameState.correctAnswers++;
    gameState.streak++;
    gameState.score += 100 + Math.min(gameState.streak * 10, 50);
    document.querySelectorAll('.answer-btn')[index].style.background = 'var(--success)';
  } else {
    gameState.wrongAnswers.push(currentQuestion.id);
    gameState.streak = 0;
    gameState.defcon = Math.max(1, gameState.defcon - 1);
    spawnConsequence(currentQuestion.category);
    document.querySelectorAll('.answer-btn')[index].style.background = 'var(--accent)';
  }
  
  gameState.questionNum++;
  updateDisplay();
  
  if (gameState.questionNum >= 10) {
    endGame();
  } else {
    setTimeout(loadQuestion, 1000);
  }
}

// Update display
function updateDisplay() {
  document.getElementById('score-display').textContent = gameState.score + ' pts';
  document.getElementById('defcon-display').textContent = 'DEFCON ' + gameState.defcon;
  document.getElementById('streak-display').textContent = '🔥 x' + gameState.streak;
}

// End game
function endGame() {
  const hs = localStorage.getItem('chaosHistory_highScore') || 0;
  if (gameState.score > hs) localStorage.setItem('chaosHistory_highScore', gameState.score);
  
  document.getElementById('final-score').textContent = gameState.score;
  document.getElementById('correct-count').textContent = gameState.correctAnswers;
  document.getElementById('wrong-count').textContent = gameState.wrongAnswers.length;
  document.getElementById('best-streak').textContent = gameState.bestStreak;
  
  showScreen('gameOver');
}

// Timer
let timerInterval;
function resetTimer() {
  clearInterval(timerInterval);
  let time = 30000;
  const fill = document.getElementById('timer-fill');
  
  timerInterval = setInterval(() => {
    time -= 100;
    fill.style.width = (time / 30000 * 100) + '%';
    if (time <= 0) {
      clearInterval(timerInterval);
      handleAnswer(-1); // timeout = wrong
    }
  }, 100);
}

// Consequence spawn
function spawnConsequence(category) {
  const chars = {
    history: { name: 'Napoleon', msg: "Perhaps you should have studied more..." },
    science: { name: 'Einstein', msg: "Actually, E=mc² is more of a guideline..." },
    sports: { name: 'Sports Commentator', msg: "The crowd goes mild." },
    art: { name: 'Painting Judge', msg: "This is not proper composition." },
    geography: { name: 'Map Glitch', msg: "That's not where that is..." }
  };
  
  const char = chars[category] || chars.sports;
  
  const div = document.createElement('div');
  div.style.cssText = 'position:fixed;top:20%;right:10%;background:#1a1a1a;border:2px solid #e63946;border-radius:12px;padding:16px;z-index:100;';
  div.innerHTML = `<div style="color:#e63946;font-weight:bold;margin-bottom:8px">${char.name}</div><div style="color:#888;font-style:italic">${char.msg}</div>`;
  document.body.appendChild(div);
  
  setTimeout(() => div.remove(), 5000);
}

// Start
init();