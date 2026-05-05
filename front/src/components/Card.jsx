import {Heroi} from "./Heroi"
 

export function Card({ heroi, onDelete,onXpPlus}) {


  const cardStyle = {
    border: '1px solid #ddd',
    borderRadius: '12px',
    padding: '16px',
    margin: '10px',
    boxShadow: '0 4px 8px rgba(0, 0 , 0.1)',
    textAlign: 'center',
    width: '200px'
  };

  return (
    <div style={cardStyle}>
      <div className="flex justify-center mb-4">
      
      </div>

      <img
        src={heroi.img}
        alt={Number(heroi.id)}
        onError={(e) => {
          e.currentTarget.onerror = null;
        }}
        style={{ width: "100%", borderRadius: "8px" }}
      />

      <h2>{heroi.nome} LV {heroi.nivel}</h2>
      <p>Classe: {heroi.classe}</p>

      <button
        type="button"
        //onClick={handleRecrutar}
        className="
          relative inline-flex items-center justify-center
          px-5 py-2.5 text-sm font-semibold text-white
          rounded-xl
          bg-gradient-to-r from-emerald-400 via-emerald-500 to-emerald-600
          shadow-lg shadow-emerald-500/30
          hover:scale-[1.03] hover:shadow-emerald-500/50
          active:scale-[0.97]
          transition-all duration-200
          focus:outline-none focus:ring-4 focus:ring-emerald-300
        "
      >
        Recrutar ⚔️
      </button> 

      <button
        type="button"
        onClick={onDelete}
        className="
          relative inline-flex items-center justify-center
          mt-2 px-5 py-2.5 text-sm font-semibold text-white
          rounded-xl
          bg-gradient-to-r from-red-400 to-red-600
          shadow-md shadow-red-500/30
          hover:scale-[1.03] hover:shadow-red-500/50
          active:scale-[0.97]
          transition-all duration-200
          focus:outline-none focus:ring-4 focus:ring-red-300
         "
      >
        Excluir ☠️
      </button>

      {heroi.nivel < 100 ? (
  <>
    <p>{heroi.xpMax - heroi.xp} até o próximo nível</p>

    <button
      className="mt-2 px-3 py-1 bg-indigo-600 text-white rounded"
      onClick={onXpPlus}
    >
      +100 XP | -50 ouro
    </button>
  </>
) : (
  <button
    className="mt-2 px-3 py-1 bg-indigo-600 text-white rounded"
  >
    Poder máximo adquirido
  </button>
)}
    </div>
  );
}

export default Card;