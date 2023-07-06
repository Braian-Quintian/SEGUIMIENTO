abrir una terminal y colocar
npm init -y
para que se cargue el archivo package.json

luego en la terminal ejecutar este comando:
npm install nodemon


luego ejecutar este comando:
npm install http


entra en el archivo package.json y cambie la linea de scripts por esta:
"scripts": {
    "dev": "nodemon --quiet server/servidor.js"
},
//En mi caso donde tengo el archivo de mi servidor es en una carpeta server/servidor.js

luego ejecutar el comando:
npm run dev
