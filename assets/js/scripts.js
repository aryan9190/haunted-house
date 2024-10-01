// 👻🕯️ Spooky JavaScript for Haunted Manor 🕯️👻

document.addEventListener('DOMContentLoaded', () => {
    const startScreen = document.getElementById('start-screen');
    const gameContent = document.getElementById('game-content');
    const scareAudio = document.getElementById('scare-audio');
    const ghosts = document.querySelectorAll('.ghost');

    // Function to start the game
    const startGame = () => {
        startScreen.classList.add('hidden');
        gameContent.classList.remove('hidden');
        document.body.style.cursor = 'none'; // Hide cursor for immersion
    };

    // Listen for Enter key to start
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            startGame();
        }
    });

    // Function to move ghosts randomly
    const moveGhostRandomly = (ghost) => {
        const maxX = window.innerWidth - ghost.offsetWidth;
        const maxY = window.innerHeight - ghost.offsetHeight;
        const randomX = Math.floor(Math.random() * maxX);
        const randomY = Math.floor(Math.random() * maxY);
        ghost.style.transform = `translate(${randomX}px, ${randomY}px)`;
    };

    // Initial random movement
    ghosts.forEach(ghost => {
        moveGhostRandomly(ghost);
        // Move ghosts every 5 seconds
        setInterval(() => {
            moveGhostRandomly(ghost);
        }, 5000);
    });

    // Ghost click event to scare the user
    ghosts.forEach(ghost => {
        ghost.addEventListener('click', () => {
            scareAudio.play();
            flashScreen();
        });
    });

    // Function to flash the screen on scare
    const flashScreen = () => {
        const flash = document.createElement('div');
        flash.classList.add('flash');
        document.body.appendChild(flash);
        setTimeout(() => {
            flash.remove();
        }, 500);
    };

    // Adding flash styles dynamically
    const style = document.createElement('style');
    style.innerHTML = `
        .flash {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: #fff;
            opacity: 1;
            z-index: 2000;
            animation: flashEffect 0.5s forwards;
        }

        @keyframes flashEffect {
            from { opacity: 1; }
            to { opacity: 0; }
        }
    `;
    document.head.appendChild(style);
});
