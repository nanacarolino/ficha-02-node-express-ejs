"use strict";
const express = require("express");
const router = express.Router();
const lembretesController = require("../controllers/lembretesController");

// CREATE (form)
router.get("/novo/form", lembretesController.mostrarFormularioNovo);

// READ (lista principal de lembretes)
router.get("/", lembretesController.listarLembretes);

// READ (detalhe de um lembrete por ID)
router.get("/:id", lembretesController.detalheLembrete);

// CREATE (guardar novo lembrete)
router.post("/", lembretesController.criarLembrete);

// DELETE (apagar via POST simples)
router.post("/:id/apagar", lembretesController.apagarLembrete);

module.exports = router;