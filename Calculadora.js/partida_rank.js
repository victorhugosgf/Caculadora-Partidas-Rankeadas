function calculadoraPartidasRankeadas(pontuacaoEquipeA, pontuacaoEquipeB, resultado) {
    const diferencaDePontos = pontuacaoEquipeA - pontuacaoEquipeB;

    const diferencaAjustada = Math.max(-400, Math.min(diferencaDePontos, 400));

    let fatorK;
    if (diferencaAjustada > 0) {
        fatorK = 32 + Math.floor(diferencaAjustada / 50);
    } else {
        fatorK = 32 - Math.floor(Math.abs(diferencaAjustada) / 50);
    }

    const probabilidadeVitoriaA = 1 / (1 + Math.pow(10, diferencaAjustada / 400));

    let variacaoPontosA, variacaoPontosB;
    if (resultado === "vitoria") {
        variacaoPontosA = fatorK * (1 - probabilidadeVitoriaA);
        variacaoPontosB = -fatorK * (1 - probabilidadeVitoriaA);
    } else if (resultado === "derrota") {
        variacaoPontosA = -fatorK * (1 - probabilidadeVitoriaA);
        variacaoPontosB = fatorK * (1 - probabilidadeVitoriaA);
    } else {
        variacaoPontosA = variacaoPontosB = 0;  
    }

    const novaPontuacaoA = pontuacaoEquipeA + variacaoPontosA;
    const novaPontuacaoB = pontuacaoEquipeB + variacaoPontosB;

    return [novaPontuacaoA, novaPontuacaoB];
}

const pontuacaoEquipeA = 1200;
const pontuacaoEquipeB = 1100;
const resultado = "vitoria";
const [novaPontuacaoA, novaPontuacaoB] = calculadoraPartidasRankeadas(pontuacaoEquipeA, pontuacaoEquipeB, resultado);

console.log("Nova pontuação da equipe A:", novaPontuacaoA);
console.log("Nova pontuação da equipe B:", novaPontuacaoB);
