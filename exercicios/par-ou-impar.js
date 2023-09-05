
if (process.argv.length !== 4) {
    console.log("Uso correto: node par-ou-impar.js [par|impar] [número]");
    process.exit(1); 
  }
  
  const suaEscolha = process.argv[2].toLowerCase(); 
  const seuNumero = parseInt(process.argv[3]);
  
  if (suaEscolha !== "par" && suaEscolha !== "impar") {
    console.log("Escolha inválida. Escolha 'par' ou 'impar'.");
    process.exit(1);
  }
  
  function gerarNumeroAleatorio() {
    return Math.floor(Math.random() * 6);
  }
  
  const numeroComputador = gerarNumeroAleatorio();
  
  function ehPar(numero) {
    return numero % 2 === 0;
  }
  
  const resultado = seuNumero + numeroComputador;
  if ((suaEscolha === "par" && ehPar(resultado)) || (suaEscolha === "impar" && !ehPar(resultado))) {
    console.log(`Você escolheu ${suaEscolha} e o computador escolheu ${suaEscolha === "par" ? "impar" : "par"}. O resultado foi ${resultado}. Você ganhou!`);
  } else {
    console.log(`Você escolheu ${suaEscolha} e o computador escolheu ${suaEscolha === "par" ? "impar" : "par"}. O resultado foi ${resultado}. Você perdeu!`);
  }
  