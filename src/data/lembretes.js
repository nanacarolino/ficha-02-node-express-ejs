"use strict";
/**
 * @fileoverview
 * Dados simulados da aplicação.
 *
 * Nesta primeira ficha, os dados são apenas um array de objetos JavaScript.
 * Este ficheiro serve como uma "base de dados falsa" — os dados não são guardados de forma permanente.
 *
 * Mais tarde poderemos trocar este ficheiro por um ficheiro JSON
 * ou por uma base de dados real (MongoDB, por exemplo).
 */

const lembretes = [
    {
        id: 1,
        titulo: "Estudar JavaScript",
        data: "2025-10-07",
        descricao: "Rever funções e objetos.",
    },
    {
        id: 2,
        titulo: "Ficha de Node.js",
        data: "2025-10-10",
        descricao: "Implementar MVC e partials.",
    },
    {
        id: 3,
        titulo: "Revisão de EJS",
        data: "2025-10-12",
        descricao: "Praticar includes e partials.",
    },
    {
        id: 4,
        titulo: "Projeto Final",
        data: "2025-11-01",
        descricao: "Começar a planear o projeto.",
    },
    {
        id: 5,
        titulo: "Reunião com a equipa",
        data: "2025-10-05",
        descricao: "Discutir progresso e próximos passos.",
    },
    {
        id: 6,
        titulo: "Enviar relatório",
        data: "2025-10-03",
        descricao: "Enviar o relatório semanal ao professor.",
    },
    {
        id: 7,
        titulo: "Backup dos ficheiros",
        data: "2025-10-08",
        descricao: "Fazer backup dos ficheiros do projeto.",
    },
    {
        id: 8,
        titulo: "Ler documentação do Express",
        data: "2025-10-15",
        descricao: "Compreender middleware e roteamento.",
    },
    {
        id: 9,
        titulo: "Praticar Git",
        data: "2025-10-04",
        descricao: "Fazer commits e push para o repositório remoto.",
    },
    {
        id: 10,
        titulo: "Configurar ambiente de desenvolvimento",
        data: "2025-10-02",
        descricao: "Instalar Node.js, npm e VSCode.",
    },
    {
        id: 11,
        titulo: "Revêr conceitos de HTTP",
        data: "2025-10-06",
        descricao: "Entender métodos, status codes e headers.",
    },
    {
        id: 12,
        titulo: "Assistir a tutoriais online",
        data: "2025-10-09",
        descricao: "Procurar vídeos sobre Node.js e Express.",
    },
    {
        id: 13,
        titulo: "Planear funcionalidades do app",
        data: "2025-10-11",
        descricao: "Definir o que a aplicação deve fazer.",
    },
    {
        id: 14,
        titulo: "Testar endpoints",
        data: "2025-10-14",
        descricao: "Usar Postman para testar as rotas da API.",
    },
];

module.exports = lembretes;
