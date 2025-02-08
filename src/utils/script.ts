export const handleSpotifyLogin = () => {
    try {
        localStorage.setItem('returnPath', window.location.pathname);
        window.location.href = 'http://localhost:3000/login';
    } catch (error) {
        console.error("Can't redirect to spotify login", error);
    }
};