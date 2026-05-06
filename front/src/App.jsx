import { useEffect, useState } from "react"
import { Heroi } from "./components/Heroi"
import { Card } from "./components/Card"
import {BuscarHerois} from "./components/BuscarHerois"
import {BuscarClasses} from "./components/BuscarClasses"




export function App() {

  // const h5 = new Heroi({nome: "heroi10",classe: "guerreiro",nivel: 3,img: "./assets/Paladin.svj",tipo: "dps",status: "ativo"})
  
  // const herois = [h5]


  
  function setOuroStorage(){
    localStorage.setItem("ouro", 100)
  }

 const [herois, setHerois] = useState([])
 const [classes,setClasses] = useState([])
 const [ouro,setOuro] = useState(() => {
 const ouro = localStorage.getItem("ouro");
  return ouro || setOuroStorage()});
 const [party, setParty] = useState(() => {
  const party = localStorage.getItem("party");
  return party ? JSON.parse(party) : [];
});

 useEffect(() =>{
  BuscarHerois().then(dados => {
    const listaHerois = dados.map(h => Heroi.fromJSON(h));
    setHerois(listaHerois)
  })
 }, [])

  useEffect(() =>{
  BuscarClasses().then(dados => {
    setClasses(dados)
  })
  }, [])

  useEffect(() => {
    localStorage.setItem("ouro", ouro)
  }, [ouro])

  useEffect(() => {
    localStorage.setItem("party", JSON.stringify(party))
  }, [party])

  // menu cheat
  
  const [menuRoubo, setMenuRoubo] = useState(false)
  const [ouroRoubo, setOuroRoubo] = useState(0)

  function roubarOuro() {
      setOuro(ouroRoubo)
  }  
 // cadastro de novo heroi
  const [menuNHAberto, setMenuNHAberto] = useState(false);
  const [nome,setNome] = useState('')
  const [filtro, setFiltro] = useState(0)
  const [classe,setClasse] = useState(1)
  const [nivel,setNivel] = useState(0)


  function comprarHeroi() {
    let custo = 100
    for (let i = 0; i < nivel; i++) {
      custo += 50 * i
    }

    return custo
  }

  function novoHeroi(e) {
    e.preventDefault();

     const preco = comprarHeroi()

    if(ouro - preco < 0){
    alert(`Ouro insuficiente para este heroi, preço:${preco}` )
      return
    } 

    let tipo = ''
    let classeNome = ''

    

    if(nome.length < 3){
      alert("Heroi com este nome não pode ser encontrado, procure por um nome mais extenso")
      return
    }

    if(nome.length > 20){
      alert("Heroi com este nome não pode ser encontrado, procure por um nome menos extenso")
      return
    }

    if(nivel > 100 || nivel < 1) {
      console.log("nivel invalido")
      return
    }

    setOuro(prev => prev - preco)
    const img = "a"

    const encontrada = classes.find(c => c.id === Number(classe));
    if (encontrada) {
      tipo =encontrada.tipo
      classeNome =encontrada.nome}


    const novo = new Heroi({
      nome: nome,
      classe: classeNome,
      nivel: nivel,
      img: img,
      tipo: tipo});

      setHerois(prev => [...prev, novo])

      setNome('')
      setClasse(1)
      setNivel(0)
  }

  // Bloquear scroll do fundo
  useEffect(() => {
    if (menuNHAberto) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [menuNHAberto]);

  useEffect(() => {
    if (menuRoubo) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [menuRoubo]);

  function recrutarHeroi(heroi){
    console.log("a")

    if (party.length >= 4){
      alert('PARTY cheia')
      return
    }
    setParty(prev => [...prev,heroi])
    console.log(party)
  }

  function mostrarParty() {
    alert(`${party}`)
  }
  
  function uparHeroi(id, valor = 100) {
    if( ouro < 50 ){
      alert("ouro insufuciente")
      return
    }

    setOuro(ouro - 50)
    
    setHerois(prev =>
      prev.map(h => {
        if (h.id !== id) return h

        const atualizado = Heroi.fromJSON(h)
        atualizado.SetXp(valor)
        return atualizado
      })
    )
  }

  function excluirHeroi(id) {
    setHerois(prev =>
      prev.map(h => {
        if (h.id !== id) return h

        const atualizado = Heroi.fromJSON(h)
        atualizado.Excluir()
        return atualizado
      })
    )
  }

  

  return (
    <> 
    <p>{ouro}</p>

    <select value={filtro} onChange={(e) => setFiltro(e.target.value)}>
      <option value="0">Todos</option>
      <option value="dps">Dano</option>
      <option value="tank">Tank</option>
      <option value="suporte">Suporte</option>

    </select>

    <div>
      {herois.filter(heroi => heroi.ativo == true)
      .filter(heroi => filtro == 0 ? true : heroi.tipo == filtro )
      .map(heroi => (
        <Card key={heroi.id} heroi={heroi}
        onRecruit={() => recrutarHeroi(heroi)}
        onXpPlus={() => uparHeroi(heroi.id, 100)}
        onDelete={() => excluirHeroi(heroi.id)} />
      ))}

      <button onClick={() => setMenuNHAberto(true)}>novo heroi</button>

      {menuNHAberto && (
        <>
          {/* Overlay escuro */}
          <div
            className="fixed inset-0 bg-black/50 z-40"
            onClick={() => setMenuNHAberto(false)}
          ></div>

          {/* Modal / Menu */}
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-xl shadow-xl w-80">
              <h2 className="text-xl font-bold mb-4">Novo Heroi</h2>

              <form onSubmit={novoHeroi}>
                <label>nome</label>
                <input value={nome} type="text" onChange={(e) => setNome(e.target.value)}/>
                <label>classe</label>
                <select value={classe} onChange={(e) => setClasse(Number(e.target.value))}>
                  {classes.map(classe => (
                    <option key={classe.id} value={classe.id}>{classe.nome}</option>
                  ))}
                </select>
                <input value={nivel} type="number" min={1} max={100}  onChange={(e) => setNivel(Number(e.target.value))}/>
                <button type="submit">criar personagem</button>
              </form>
              <button
                onClick={() => setMenuNHAberto(false)}
                className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
              >
                Fechar
              </button>
            </div>
          </div>
        </>
      )}
      <p>-------------------------</p>
      <button onClick={mostrarParty}>ver party</button>
    </div> 
    <button onClick={() => setMenuRoubo(true)}>menu de cheats</button>
    {menuRoubo && (
      <>
      {/* Overlay escuro */}
          <div
            className="fixed inset-0 bg-black/50 z-40"
            onClick={() => setMenuRoubo(false)}
          ></div>

          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-xl shadow-xl w-80">
              <h2 className="text-xl font-bold mb-4">menu de cheats</h2>

              <form onSubmit={roubarOuro}>
                <label>dinheiro</label>
                <input value={ouroRoubo} type="number" onChange={(e) => setOuroRoubo(e.target.value)}/>
                
                <button type="submit">adicionar dinheiro</button>
              </form>
              <button
                onClick={() => setMenuRoubo(false)}
                className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
              >
                Fechar
              </button>
            </div>
          </div>
      </>
    )}

    </>
  )
}

export default App;
