"use strict";
// Carregamos todos os lembretes do ficheiro
// Se reparares, os lembretes são um array de objetos, logo podemos usá-los diretamente e podemos percorrê-los com um forEach na vista.
const lembretes = require("../data/lembretes");

/**
 * Controlador de listagem: renderiza a vista "lembretes" com todos os itens.
 * @param req Pedido HTTP.
 * @param res Resposta HTTP (usa res.render).
 * @returns {void}
 */
function listarLembretes(req, res) {
    // Variáveis passadas para a vista "lembretes":
    // - tituloPagina: texto do título da página/lista
    // - lembretes: array completo com todos os lembretes
    res.render("lembretes", {
        tituloPagina: "Lembretes",
        lembretes,
    });
}

/**
 * Controlador de detalhe: encontra um lembrete pelo :id e mostra a vista "detalhe"
 * ou devolve um 404 específico quando não existe.
 * @param req Pedido HTTP com params.id numérico.
 * @param res Resposta HTTP (render ou 404).
 * @returns {void}
 */
function detalheLembrete(req, res) {
    const id = Number(req.params.id);
    const lembrete = lembretes.find((l) => l.id === id);

    if (!lembrete) {
        // Caso não exista, devolvemos uma página 404 específica
        return res.status(404).render("detalhe", {
            tituloPagina: "Lembrete não encontrado",
            lembrete: null,
        });
    }

    // Variáveis enviadas para a vista "detalhe":
    // - tituloPagina: título com o nome do lembrete
    // - lembrete: objeto completo a mostrar
    res.render("detalhe", {
        tituloPagina: `Detalhe · ${lembrete.titulo}`,
        lembrete,
    });
}

/**
 * Gera um novo ID incremental com base nos IDs existentes dos lembretes.
 * @returns Próximo ID disponível (max actual + 1 ou 1 se vazio).
 */
function gerarId() {
    const ids = lembretes.map((l) => l.id);
    const max = ids.length ? Math.max(...ids) : 0;
    return max + 1;
}

/**
 * Valida e normaliza os campos do formulário de lembrete.
 * @param body Objeto vindo de req.body.
 * @returns Arrays de erros e valores limpos de espaços.
 */
function validarFormulario(body) {
    const erros = [];
    const valores = {
        titulo: (body.titulo || "").trim(),
        data: (body.data || "").trim(),
        descricao: (body.descricao || "").trim(),
    };

    if (valores.titulo.length < 3) {
        erros.push(
            "O título é obrigatório e deve ter pelo menos 3 caracteres."
        );
    }
    if (!/^\d{4}-\d{2}-\d{2}$/.test(valores.data)) {
        erros.push("A data é obrigatória (formato YYYY-MM-DD).");
    }
    if (valores.descricao.length < 5) {
        erros.push(
            "A descrição é obrigatória e deve ter pelo menos 5 caracteres."
        );
    }

    return { erros, valores };
}

/**
 * Controlador GET do formulário de criação: renderiza "novo" com valores vazios.
 * @param req Pedido HTTP.
 * @param res Resposta HTTP (usa res.render).
 * @returns {void}
 */
function mostrarFormularioNovo(req, res) {
    // Variáveis esperadas pela vista "novo":
    // - tituloPagina: título do formulário
    // - erros: array de mensagens (pode vir vazio)
    // - valores: objeto com campos do formulário (para repovoar em caso de erro)
    res.render("novo", {
        tituloPagina: "Novo Lembrete",
        erros: [],
        valores: { titulo: "", data: "", descricao: "" },
    });
}

/**
 * Controlador POST de criação: valida dados, cria um lembrete em memória
 * e redireciona para a lista; em caso de erro re-renderiza o formulário com 400.
 * @param req Pedido HTTP com body do formulário.
 * @param res Resposta HTTP (render ou redirect).
 * @returns {void}
 */
function criarLembrete(req, res) {
    const { erros, valores } = validarFormulario(req.body);

    if (erros.length > 0) {
        // Em caso de erro, voltamos a mostrar o formulário,
        // mantendo os valores já preenchidos e as mensagens
        return res.status(400).render("novo", {
            tituloPagina: "Novo Lembrete",
            erros,
            valores,
        });
    }

    const novo = {
        id: gerarId(),
        titulo: valores.titulo,
        data: valores.data,
        descricao: valores.descricao,
    };

    lembretes.push(novo);
    res.redirect("/lembretes");
}

/**
 * Controlador de apagar: remove um lembrete pelo :id e redireciona de volta
 * à listagem; devolve 404 em caso de ID inexistente.
 * @param req Pedido HTTP com params.id numérico.
 * @param res Resposta HTTP (send 404 ou redirect).
 * @returns {void}
 */
function apagarLembrete(req, res) {
    const id = Number(req.params.id);
    const idx = lembretes.findIndex((l) => l.id === id);

    if (idx === -1) {
        return res.status(404).send("Lembrete não encontrado.");
    }

    lembretes.splice(idx, 1);
    res.redirect("/lembretes");
}

// Exportar o controlador para ser usado nas rotas
module.exports = {
    listarLembretes,
    detalheLembrete,
    mostrarFormularioNovo,
    criarLembrete,
    apagarLembrete,
};