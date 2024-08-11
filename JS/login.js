document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has('loggedIn') && urlParams.get('loggedIn') === 'true') {
        document.getElementById('login-overlay').style.display = 'none';
    }
});