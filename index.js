"use strict";
const app = require("./src/app"); // importa a app Express já configurada

const PORT = 3000; // porta onde o servidor vai ouvir

app.listen(PORT, () => {
    console.log(`Servidor a correr em http://localhost:${PORT}`);
});