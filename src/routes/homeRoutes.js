"use strict";
const express = require("express");
const router = express.Router();
const homeController = require("../controllers/homeController");

// Rota principal da aplicação (dashboard/resumo)
router.get("/", homeController.mostrarHome);

module.exports = router;