import { createServer } from 'http';
import fetch from 'node-fetch';

const appHttp = createServer(async (req, res) => {
  if (req.url === '/') {
    try {
      const response = await fetch('http://127.127.127.127:3000/index.html');
      const data = await response.text();
      console.log(data);
      res.end('Hola');
    } catch (error) {
      console.error(error);
      res.end('Error al obtener los datos');
    }
  } else {
    res.end('Ruta no encontrada');
  }
});

const config = {
  hostname: '127.127.127.127',
  port: 3000
};

appHttp.listen(config.port, config.hostname, () => {
  console.log(`Server running at http://${config.hostname}:${config.port}`);
});
