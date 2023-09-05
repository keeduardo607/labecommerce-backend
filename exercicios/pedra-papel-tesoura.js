
if (process.argv.length !== 3) {
    console.log("Uso correto: node pedra-papel-tesoura.js [pedra|papel|tesoura]");
    process.exit(1); 
  }
  
  const suaEscolha = process.argv[2].toLowerCase(); 

  if (suaEscolha !== "pedra" && suaEscolha !== "papel" && suaEscolha !== "tesoura") {
    console.log("Escolha inválida. Escolha 'pedra', 'papel' ou 'tesoura'.");
    process.exit(1);
  }

  function escolhaAleatoriaComputador() {
    const escolhasPossiveis = ["pedra", "papel", "tesoura"];
    const indiceAleatorio = Math.floor(Math.random() * escolhasPossiveis.length);
    return escolhasPossiveis[indiceAleatorio];
  }
  
  const escolhaComputador = escolhaAleatoriaComputador();
  
  function determinarVencedor(escolhaJogador, escolhaComputador) {
    if (escolhaJogador === escolhaComputador) {
      return "Empate!";
    } else if (
      (escolhaJogador === "pedra" && escolhaComputador === "tesoura") ||
      (escolhaJogador === "papel" && escolhaComputador === "pedra") ||
      (escolhaJogador === "tesoura" && escolhaComputador === "papel")
    ) {
      return "Você ganhou!";
    } else {
      return "Você perdeu!";
    }
  }
  
  const resultado = determinarVencedor(suaEscolha, escolhaComputador);
  console.log(`Você escolheu ${suaEscolha} e o computador escolheu ${escolhaComputador}. ${resultado}`);
  