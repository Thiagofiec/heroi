export async function AtualizarHeroi({
  id,
  nivel = null,
  xp = null,
  xpMax = null,
  ativo = null
}) {
  try {
    const body = {};

    if (nivel !== null) body.nivel = nivel;
    if (xp !== null) body.xp = xp;
    if (xpMax !== null) body.xpMax = xpMax;
    if (ativo !== null) body.ativo = ativo;

    const resposta = await fetch(`http://localhost:3001/Heroi/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    });

    if (!resposta.ok) {
        const texto = await resposta.text();
        console.error("Erro do servidor:", texto);
        return;
        }

  } catch (erro) {
    console.error("Erro ao atualizar herói:", erro);
  }
}

export default AtualizarHeroi