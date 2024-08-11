document.addEventListener('DOMContentLoaded', function() {
    const overlay = document.getElementById('result-overlay');
    const closeButton = document.getElementById('close-result');

    if (overlay && closeButton) {
        closeButton.addEventListener('click', function() {
            overlay.style.display = 'none';
        });
    }
});
