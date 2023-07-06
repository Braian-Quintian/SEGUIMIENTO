import { createServer } from 'http';
import fs from 'fs';
import https from 'https';

const config = {
  hostname: 'nasa.com',
  port: 3000
};

const apiKey = 'FkIw9aQ7EJrI27ZoSRVSNvn5Djo4RYYoRw6iRmhZ';
const startDate = '2023-07-01';
const endDate = '2023-07-04';

const appHttp = createServer((req, res) => {
  req.url === '/asteroids'
    ? fetchAsteroidsData()
      .then(asteroids => {
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(asteroids));
      })
      .catch(() => res.end('Error al obtener los datos de los asteroides'))
    : fs.readFile(`.${req.url}`, 'utf-8', (error, content) => {
      error ? res.end('Error al obtener los datos') : res.end(content);
    });
});

const fetchAsteroidsData = () =>
  new Promise(resolve => {
    const apiUrl = `https://api.nasa.gov/neo/rest/v1/feed?start_date=${startDate}&end_date=${endDate}&api_key=${apiKey}`;
    https.get(apiUrl, response => {
      let data = '';

      response.on('data', chunk => {
        data += chunk;
      });

      response.on('end', () => {
        resolve(JSON.parse(data));
      });
    });
  }).then(asteroidData => extractAsteroids(asteroidData));

const extractAsteroids = asteroidData => {
  return Object.values(asteroidData.near_earth_objects).flatMap(dateAsteroids =>
    dateAsteroids.map(asteroid => {
      const { name, estimated_diameter, close_approach_data, is_potentially_hazardous_asteroid } = asteroid;
      const size = estimated_diameter.kilometers.estimated_diameter_max;
      const velocity = close_approach_data[0].relative_velocity.kilometers_per_hour;
      const approachDate = close_approach_data[0].close_approach_date;
      return { name, size, velocity, approachDate, is_potentially_hazardous_asteroid };
    })
  );
};

appHttp.listen(config.port, config.hostname, () => {
  console.log(`Servidor en ejecución en http://${config.hostname}:${config.port}`);
});