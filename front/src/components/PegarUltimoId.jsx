
export async function PegarUltimoId(){
    try {
    const resposta = await fetch("http://localhost:3001/HeroiId", {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      },
      
    });

    if (!resposta.ok) {
        const texto = await resposta.text();
        console.error("Erro do servidor:", texto);
        return;
        }

const dados = await resposta.json();
const dadosProc = Number(dados["id"])
return dadosProc
//return dados   
  } catch (erro) {
    console.error("Erro ao procurar Id:", erro);
  }
}

export default PegarUltimoId;
