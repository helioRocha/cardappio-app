export class Rede {
    id: string;
    nome: string;

    constructor(){
        
    }

    getId(){
        return this.id;
    }
    getNome(){
        return this.nome;
    }

    setId(id: string){
        this.id = id;
    }
    setNome(nome: string){
        this.nome = nome;
    }
}