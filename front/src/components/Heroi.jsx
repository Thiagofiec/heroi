import React from "react";
import { CriarHeroi } from "./CriarHeroi"
import { PegarUltimoId } from "./PegarUltimoId"
 

export class Heroi{

    constructor({nome,classe,nivel,img, tipo}, salvar = true){
        
        this.nome = nome;
        this.classe = classe;
        this.nivel = nivel;
        this.xp = 0;
        this.xpMax = 100 + 50 * (this.nivel - 1)  
        this.img = img;
        this.tipo = tipo;
        this.ativo = true;
        
        if (salvar) {
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

    SetXp(valor){
        this.xp += valor
        
        if(this.xp >= this.xpMax){            
            this.xp -= this.xpMax
            this.nivel += 1
            this.xpMax += 50
            return alert(`Subiu para o nivel ${this.nivel}`)       
        }
    }

    Recrutar(){
        return alert(`Heroi ${this.nome} foi recrutado 
            `)
    }

    Excluir(){
        this.ativo = false 
    }

    SetStatus(){
        null
    }
  }

export default Heroi;