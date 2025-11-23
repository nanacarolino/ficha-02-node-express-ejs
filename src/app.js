"use strict";
const express = require("express");
const path = require("path");

const app = express();

/* ---------------------------------------------------------------------------
    1 Motor de templates (EJS)
--------------------------------------------------------------------------- */
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

/* ---------------------------------------------------------------------------
    2 Pasta pública (ficheiros estáticos)
--------------------------------------------------------------------------- */
app.use(express.static(path.join(__dirname, "..", "public")));

/* ---------------------------------------------------------------------------
    3 Middleware para processar formulários (req.body)
--------------------------------------------------------------------------- */
app.use(express.urlencoded({ extended: true }));

/* ---------------------------------------------------------------------------
    5 Encaminhamento das rotas principais
--------------------------------------------------------------------------- */
const homeRoutes = require("./routes/homeRoutes");
const lembretesRoutes = require("./routes/lembretesRoutes");

app.use("/", homeRoutes);
app.use("/lembretes", lembretesRoutes);

// Por agora só temos a rota principal ("/")
app.use("/", homeRoutes);

/* ---------------------------------------------------------------------------
    4 Página 404 (caso nenhuma rota seja encontrada)
--------------------------------------------------------------------------- */
app.use((req, res) => {
    res.status(404).render("404", { tituloPagina: "Página não encontrada" });
});

module.exports = app;


