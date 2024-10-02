// 👻🕯️ Spooky JavaScript for Haunted Manor 🕯️👻

document.addEventListener('DOMContentLoaded', () => {
    const startScreen = document.getElementById('start-screen');
    const gameContent = document.getElementById('game-content');
    const scareAudio = document.getElementById('scare-audio');
    const ghosts = document.querySelectorAll('.ghost');
    const muteButton = document.getElementById('mute-button');
    const accessibilityButton = document.getElementById('accessibility-button');
    let isMuted = false;
    let reducedMotion = false;

    // Function to start the game
    const startGame = () => {
        console.log('Starting the game...');
        startScreen.classList.add('hidden');
        gameContent.classList.remove('hidden');
        document.body.classList.add('immersive'); // Hide cursor for immersion
    };

    // Function to detect scroll down to start the game
    const handleScroll = () => {
        const scrollPosition = window.scrollY;
        if (scrollPosition > 50) { // Adjust the value as needed
            startGame();
            window.removeEventListener('scroll', handleScroll); // Remove listener after starting
        }
    };

    // Function to detect swipe up on mobile
    let touchStartY = 0;
    let touchEndY = 0;

    const handleTouchStart = (e) => {
        touchStartY = e.changedTouches[0].screenY;
    };

    const handleTouchEnd = (e) => {
        touchEndY = e.changedTouches[0].screenY;
        handleGesture();
    };

    const handleGesture = () => {
        if (touchStartY - touchEndY > 50) { // Swipe up
            startGame();
            // Remove event listeners after starting
            window.removeEventListener('touchstart', handleTouchStart);
            window.removeEventListener('touchend', handleTouchEnd);
        }
    };

    // Add event listeners for scroll and touch
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('touchstart', handleTouchStart);
    window.addEventListener('touchend', handleTouchEnd);

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
            console.log('Ghost clicked! Playing scare sound.');
            if (!isMuted) {
                scareAudio.play();
            }
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

    // Mute Button Functionality
    muteButton.addEventListener('click', () => {
        isMuted = !isMuted;
        document.getElementById('ambient-audio').muted = isMuted;
        document.getElementById('scare-audio').muted = isMuted;
        muteButton.textContent = isMuted ? '🔇' : '🔊';
    });

    // Accessibility Button Functionality
    accessibilityButton.addEventListener('click', () => {
        reducedMotion = !reducedMotion;
        document.body.classList.toggle('reduced-motion', reducedMotion);
        accessibilityButton.textContent = reducedMotion ? '🚫' : '♿';
    });

    // Reduce motion if accessibility is enabled
    const styleReducedMotion = document.createElement('style');
    styleReducedMotion.innerHTML = `
        .reduced-motion .ghost,
        .reduced-motion .fog,
        .reduced-motion .scroll-indicator {
            animation: none !important;
        }
    `;
    document.head.appendChild(styleReducedMotion);
});
