const express = require("express");
const fs = require("fs");
const cors = require("cors");

const app = express();
const PORT = 3001;
const caminhoHerois = "./Herois.json";
const caminhoClasses = "./Classes.json"
const caminhoteste = "./log.json";

// middlewares
app.use(express.json());
app.use(cors());

// função auxiliar pra ler arquivo
function lerDados(caminho) {
  const data = fs.readFileSync(caminho);

  return JSON.parse(data);
}

function lerDadosTeste() {
  const data = fs.readFileSync(caminhoteste);

  return JSON.parse(data);
}

// função auxiliar pra salvar arquivo
function salvarDados(dados) {
  fs.writeFileSync(caminhoHerois, JSON.stringify(dados, null, 2));
}

function salvarDadosTeste(dados) {
  fs.writeFileSync(caminhoteste, JSON.stringify(dados, null, 2));
}

//
// ROTAS
//

// 🔹 GET - todos os heróis
app.get("/Herois", (req, res) => {
  const dados = lerDados(caminhoHerois);
  res.json(dados.Herois);

});

// GET - Classes

app.get("/classes", (req,res) => {
  const dados = lerDados(caminhoClasses);
  res.json(dados.Classes);  
})

// 🔹 GET - herói por ID
app.get("/Herois/:id", (req, res) => {
  const id = parseInt(req.params.id);

  const dados = lerDados(caminhoHerois);
  const heroi = dados.Herois.find(h => h.id === id);

  if (!heroi) {
    return res.status(404).json({ erro: "Herói não encontrado" });
  }

  res.json(heroi);
});

// 🔹 POST - criar herói
app.post("/Heroi", (req, res) => {
  const dados = lerDados(caminhoHerois);
  const novoHeroi = req.body

  // gerar ID automático
  novoHeroi.id = dados.Herois.length > 0
    ? dados.Herois[dados.Herois.length - 1].id + 1
    : 0;

  dados.Herois.push(novoHeroi);

  salvarDados(dados);

  res.status(201).json(novoHeroi);
});

app.patch("/Heroi/:id", (req, res) => {
  //colocar validaçoes dps 
  const id = parseInt(req.params.id);
  const dadosNovos = req.body

  const json = lerDados(caminhoHerois);
  const dados = json.Herois;

  const index = dados.findIndex(h => h.id == id)

  if (index === -1) {
    return res.status(404).json({ erro: "Herói não encontrado" })
  }

  dados[index] = {
      ...dados[index],
      ...dadosNovos     
  }

  salvarDados(json);

  res.json(dados[index])
})

app.get("/HeroiId", (req, res) => {
  const dados = lerDados(caminho);
  
  const id = dados.Herois[dados.Herois.length - 1].id

   res.json({ id }); 
})



// 🔹 DELETE - remover herói
app.delete("/Herois/:id", (req, res) => {
  const id = parseInt(req.params.id);

  const dados = lerDados(caminho);
  const novaLista = dados.Herois.filter(h => h.id !== id);

  if (novaLista.length === dados.Herois.length) {
    return res.status(404).json({ erro: "Herói não encontrado" });
  }

  dados.Herois = novaLista;

  salvarDados(dados);

  res.json({ mensagem: "Herói removido" });
});
//
// INICIAR SERVIDOR
//
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});


