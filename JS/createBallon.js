function createBalloons() {
    const container = document.querySelector('.balloon-container');

    for (let i = 0; i < 20; i++) { // Create 20 balloons
        const balloon = document.createElement('div');
        balloon.classList.add('balloon');
        balloon.style.left = `${Math.random() * 100}%`; // Random horizontal position
        container.appendChild(balloon);

        // Remove balloon after animation to clean up
        balloon.addEventListener('animationend', () => {
            balloon.remove();
        });
    }
}

