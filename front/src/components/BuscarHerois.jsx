import {Heroi} from "./Heroi"

export async function BuscarHerois() {
    try {
        const resposta = await fetch("http://localhost:3001/Herois", {
          method: "GET",
          headers: {
            "Content-Type": "application/json"
          }})

          if (!resposta.ok) {
            const texto = await resposta.text();
            console.error("Erro do servidor:", texto);
            return;
            }

          const dados = await resposta.json()

          const herois = dados.map(h => Heroi.fromJSON(h))
          console.log("a",herois)
          return herois
    
    } catch (erro) {
    console.error("Erro ao buscar heróis:", erro);
  }
}

export default BuscarHerois
