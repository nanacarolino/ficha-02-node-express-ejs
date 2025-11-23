"use strict"; // modo estrito do JS
/*
    O modo estrito ajuda a evitar erros comuns, tais como:
    - Uso de variáveis não declaradas
    - Sobrescrever propriedades não configuráveis
    - Eliminar variáveis não elimináveis

    É uma boa prática usar "use strict" no início dos ficheiros JS, sobretudo em ambientes de desenvolvimento.

*/
const lembretes = require("../data/lembretes");

/**
 * Calcula estatísticas base (total, atrasados, próximos 7 dias e próxima data)
 * sobre a lista de lembretes.
 * @param {{ id:number, titulo:string, data:string, descricao:string }[]} lista Lista de lembretes com datas no formato YYYY-MM-DD.
 * @returns {{ total:number, atrasados:number, proximos7:number, proximaData:(string|null) }} Objeto agregado para o dashboard.
 */
function calcularEstatisticas(lista) {
    const hoje = new Date(); // data atual
    hoje.setHours(0, 0, 0, 0); // definir horas a 00:00 para comparar só datas

    const msPorDia = 24 * 60 * 60 * 1000; // milissegundos por dia
    const daquiA7 = new Date(hoje.getTime() + 7 * msPorDia); // data daqui a 7 dias

    let atrasados = 0;
    let proximos7 = 0;
    const futurasOuHoje = [];

    // Percorrer a lista de lembretes e calcular estatísticas
    for (const l of lista) {
        const data = new Date(l.data);
        data.setHours(0, 0, 0, 0);

        if (data < hoje) {
            atrasados++;
        } else {
            futurasOuHoje.push(data);
            if (data <= daquiA7) proximos7++;
        }
    }

    // Ordenar datas futuras e hoje para encontrar a próxima data
    futurasOuHoje.sort((a, b) => a - b);
    const proximaData =
        futurasOuHoje.length > 0
            ? futurasOuHoje[0].toISOString().slice(0, 10)
            : null;

    // Devolver objeto com estatísticas
    // O objeto tem as propriedades: total, atrasados, proximos7, proximaData
    return { total: lista.length, atrasados, proximos7, proximaData };
}

/**
 * Controlador da home: agrega estatísticas e renderiza a vista "home".
 * @param req Pedido HTTP.
 * @param res Resposta HTTP (usa res.render).
 * @returns {void}
 */
function mostrarHome(req, res) {
    const stats = calcularEstatisticas(lembretes);
    const mensagem =
        "Bem-vindo à tua Agenda de Estudos! Organiza o teu tempo e mantém tudo sob controlo.";

    // Variáveis enviadas para a vista "home":
    // - tituloPagina: aparece no <title> e no cabeçalho
    // - mensagem: texto introdutório do hero
    // - stats: objeto com números para o resumo (_statsSummary)
    res.render("home", {
        tituloPagina: "Agenda de Estudos",
        mensagem,
        stats,
    });
}

module.exports = { mostrarHome };