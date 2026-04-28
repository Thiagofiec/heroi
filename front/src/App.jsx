import { useEffect, useState } from "react"
import { Heroi } from "./components/Heroi"
import { Card } from "./components/Card"
import {BuscarHerois} from "./components/BuscarHerois"
import {BuscarClasses} from "./components/BuscarClasses"




export function App() {

  // const h5 = new Heroi({nome: "heroi10",classe: "guerreiro",nivel: 3,img: "./assets/Paladin.svj",tipo: "dps",status: "ativo"})
  
  // const herois = [h5]


  
 const [herois, setHerois] = useState([])
 const [classes,setClasses] = useState([])
 const [ouro,setOuro] = useState(100);

 useEffect(() =>{
  BuscarHerois().then(dados => {
    const listaHerois = dados.map(h => Heroi.fromJSON(h));
    setHerois(listaHerois)
  })
 }, [])

  useEffect(() =>{
  BuscarClasses().then(dados => {
    setClasses(...classes, dados)
  })
  }, [])
  
 // cadastro de novo heroi
  const [menuNHAberto, setMenuNHAberto] = useState(false);
  const [nome,setNome] = useState('')
  const [classe,setClasse] = useState(1)
  const [classeNome,setClasseNome] = useState()
  const [tipo,setTipo] = useState('')
  const [nivel,setNivel] = useState(0)

  useEffect(() =>{
    
    setClasseNome(classes.forEach(c => {
      if(c.id === classe){
        
        const cl = c.nome
        return cl
      }
    }))
  }, classe )

    useEffect(() =>{
    
    setTipo(classes.forEach(c => {
      if(c.id === classe){
        
        const cl = c.tipo
        return cl
      }
    }))
  }, classe )


  function novoHeroi(e) {
    e.preventDefault();

    const preco = 10 * nivel 

    if(ouro - preco < 0){
      return
    }

    

    if(nome.length < 3){
      console.log("nome muito curto")
      return
    }

    if(nivel > 100 || nivel < 1) {
      console.log("nivel invalido")
      return
    }

    setOuro[ouro - preco]
    const img = "a"
    
    classes

    // classes.forEach(c => {
    //   if(c.id === classe){
        
    //     setTipo(c.tipo)
    //     setClasse(c.nome)
    //     return
    //   }
    // });

    const novo = new Heroi({
      nome,
      classeNome,
      nivel,
      img,
      tipo});

      setHerois(...herois, novo)

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

  

  return (
    <> 
    <div>
      {herois.map(heroi => (
        <Card key={heroi.id} value={heroi} heroi={heroi} />
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
                <select value={classe} onChange={(e) => setClasse(e.target.value)}>
                  {classes.map(classe => (
                    <option key={classe.id} value={classe.id}>{classe.nome}</option>
                  ))}
                </select>
                <input value={nivel} type="number" min={1} max={100}  onChange={(e) => setNivel(e.target.value)}/>
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
    </div> 

    </>
  )
}

export default App;
