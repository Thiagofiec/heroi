import React from "react";
import { CriarHeroi } from "./CriarHeroi"
import { PegarUltimoId } from "./PegarUltimoId"
import { AtualizarHeroi} from "./AtualizarHeroi"
 

export class Heroi{

    constructor({nome,classe,nivel,img, tipo}, salvar = true){
        
        this.nome = nome;
        this.classe = classe;
        this.nivel = nivel;
        this.xp = 0;
        this.xpMax = 100 + 50 * (this.nivel - 1)  
        this.img = img;
        this.tipo = tipo;
        
        if (salvar) {
            this.ativo = true;
            CriarHeroi(
            this.nome,
            this.classe,
            this.nivel,
            this.xp,
            this.xpMax,
            this.img,
            this.tipo,
            this.ativo

        )
        }
        
        }

    static fromJSON(dados){
        const heroi = new Heroi(dados, false)

        heroi.id = dados.id;
        heroi.xp = dados.xp;
        heroi.xpMax = dados.xpMax;
        heroi.ativo = dados.ativo;

        return heroi
    }

    SetXp(valor = 50){
    if (typeof valor !== "number" || isNaN(valor)) return

    this.xp += valor

    while (this.xp >= this.xpMax) {
        this.xp -= this.xpMax
        this.nivel += 1

        if (this.nivel >= 100) {
            this.nivel = 100
            this.xp = 0
            break
        }

        this.xpMax = 100 + 50 * (this.nivel - 1)
    }

    AtualizarHeroi({
        id:this.id,
        nivel:this.nivel,
        xp:this.xp,
        xpMax:this.xpMax})
}

    Recrutar(){
        return alert(`Heroi ${this.nome} foi recrutado 
            `)
    }

    Excluir(){
        this.ativo = false 
        AtualizarHeroi({
            id: this.id,
            ativo: this.ativo
        })
    }

    SetStatus(){
        null
    }
  }

export default Heroi;