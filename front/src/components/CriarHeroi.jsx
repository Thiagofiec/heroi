
export async function testarGetHerois() {
  try {
    const resposta = await fetch("http://localhost:3001/Herois");
    console.log(resposta)
    const dados = await resposta.json();
    
    console.log("Lista de heróis:", dados);
    return dados;
  } catch (erro) {
    console.error("Erro ao buscar heróis:", erro);
  }
}

export async function GetHeroiPorId(id) {
  try {
    const resposta = await fetch(`http://localhost:3001/Herois/${id}`);

    const dados = await resposta.json();

    console.log("Herói encontrado:", dados);
  } catch (erro) {
    console.error("Erro ao buscar herói:", erro);
  }
}

export async function CriarHeroi(
  nome,
  classe,
  nivel,
  xp,
  xpMax,
  img,
  tipo,
  ativo
) {
  try {
    const resposta = await fetch("http://localhost:3001/Heroi", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        nome: nome,
        classe: classe,
        nivel: nivel,
        xp: xp,
        xpMax: xpMax,
        img: img,
        tipo: tipo,
        ativo: ativo
      })
    });

    if (!resposta.ok) {
        const texto = await resposta.text();
        console.error("Erro do servidor:", texto);
        return;
        }

const dados = await resposta.json();

    console.log("Herói criado:", dados);
  } catch (erro) {
    console.error("Erro ao criar herói:", erro);
  }
}

export async function testarDeletarHeroi(id) {
  try {
    const resposta = await fetch(`http://localhost:3001/Herois/${id}`, {
      method: "DELETE"
    });

    const dados = await resposta.json();

    console.log("Resultado:", dados);
  } catch (erro) {
    console.error("Erro ao deletar:", erro);
  }
}


export default CriarHeroi;
