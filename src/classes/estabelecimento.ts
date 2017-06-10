import {DadosEstabelecimento} from './dadosestabelecimento';
export class Estabelecimento{
    id: string;
    dados: DadosEstabelecimento;
    constructor() {
      this.dados = new DadosEstabelecimento();
    }

    getId(){
      return this.id;
    }

    setId(id:any){
      this.id = id;
    }
}