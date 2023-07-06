document.addEventListener('DOMContentLoaded', () => {
    const table = document.getElementById('asteroidsTable');
    getAsteroidsData().then(asteroids => {
        asteroids.forEach(asteroid => {
            const row = table.insertRow();
            row.insertCell().textContent = asteroid.name;
            row.insertCell().textContent = asteroid.size;
            row.insertCell().textContent = asteroid.velocity;
            row.insertCell().textContent = asteroid.approachDate;
            row.insertCell().textContent = asteroid.is_potentially_hazardous_asteroid;
        });
    }).catch(error => console.error(error));
});

function getAsteroidsData() {
    return fetch('/asteroids')
        .then(response => response.json())
        .catch(error => console.error(error));
}