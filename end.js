const username = document.getElementById('username');
const saveScoreBtn = document.getElementById('saveScoreBtn');
const finalScore = document.getElementById('finalScore');
const mostRecentScore = localStorage.getItem('mostRecentScore');

const highScores = JSON.parse(localStorage.getItem('highScores')) || [];

const MAX_HIGH_SCORES = 5;

finalScore.innerText = mostRecentScore;

window.addEventListener('load', () => {
    finalScore.classList.add('congratulate');
    launchConfetti();
    launchPaperBlast();

    const totalTimeDisplay = document.getElementById('totalTimeDisplay');
    const totalTime = localStorage.getItem('totalTime');
    console.log('totalTime from localStorage:', totalTime);
    if (totalTimeDisplay && totalTime) {
        const seconds = Math.floor(totalTime / 1000);
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        totalTimeDisplay.innerText = `Total Time: ${minutes}m ${remainingSeconds}s`;
    } else {
        console.log('totalTimeDisplay element or totalTime is missing');
    }
});

function launchPaperBlast() {
    const confettiContainer = document.getElementById('confetti-container');
    const finalScore = document.getElementById('finalScore');
    const colors = ['#FFC700', '#FF0000', '#2E3192', '#41BBC7', '#7F8C8D'];
    const numConfetti = 50;
    const rect = finalScore.getBoundingClientRect();

    for (let i = 0; i < numConfetti; i++) {
        const confetti = document.createElement('div');
        confetti.classList.add('confetti');
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.width = (Math.random() * 8 + 4) + 'px';
        confetti.style.height = confetti.style.width;
        confetti.style.borderRadius = '50%';
        confetti.style.position = 'fixed';
        confetti.style.left = rect.left + rect.width / 2 + 'px';
        confetti.style.top = rect.top + rect.height / 2 + 'px';
        confettiContainer.appendChild(confetti);

        const angle = Math.random() * 2 * Math.PI;
        const distance = Math.random() * 150 + 50;
        const x = Math.cos(angle) * distance;
        const y = Math.sin(angle) * distance;

        confetti.animate([
            { transform: 'translate(0, 0) rotate(0deg)', opacity: 1 },
            { transform: `translate(${x}px, ${y}px) rotate(360deg)`, opacity: 0 }
        ], {
            duration: 1500,
            easing: 'ease-out',
            fill: 'forwards'
        });

        setTimeout(() => {
            confetti.remove();
        }, 1500);
    }
}

function launchConfetti() {
    const confettiContainer = document.getElementById('confetti-container');
    const colors = ['#FFC700', '#FF0000', '#2E3192', '#41BBC7', '#7F8C8D'];
    const numConfetti = 100;

    for (let i = 0; i < numConfetti; i++) {
        const confetti = document.createElement('div');
        confetti.classList.add('confetti');
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.left = Math.random() * 100 + 'vw';
        confetti.style.animationDelay = (Math.random() * 3) + 's';
        confetti.style.width = (Math.random() * 8 + 4) + 'px';
        confetti.style.height = confetti.style.width;
        confetti.style.borderRadius = '50%';
        confettiContainer.appendChild(confetti);

        // Remove confetti after animation
        confetti.addEventListener('animationend', () => {
            confetti.remove();
        });
    }
}

username.addEventListener('keyup', () => {
    saveScoreBtn.disabled = !username.value;
});

saveHighScore = (e) => {
    e.preventDefault();

    const score = {
        score: mostRecentScore,
        name: username.value,
    };
    highScores.push(score);
    highScores.sort((a, b) => b.score - a.score);
    highScores.splice(5);

    localStorage.setItem('highScores', JSON.stringify(highScores));
    window.location.assign('/');
};
