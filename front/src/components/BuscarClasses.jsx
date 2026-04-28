export async function BuscarClasses() {
    try {
        const resposta = await fetch("http://localhost:3001/classes", {
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
           
          return dados
    
    } catch (erro) {
    console.error("Erro ao buscar classes:", erro);
  }
}

export default BuscarClasses