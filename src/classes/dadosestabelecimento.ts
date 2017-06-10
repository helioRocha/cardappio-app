export class DadosEstabelecimento{
    nome: String;
    rua: String;
    numero: Number;
    bairro: String;
    cidade: String;
    estado: String;
    lat: Number;
    lng: Number;
    setNome(n: String){ this.nome = n;  }
    getNome(){ return this.nome;  }
    setRua(r: String){  this.rua = r;   }
    getRua(){  return this.rua;   }
    setNumero(n: Number){ this.numero = n;   }
    getNumero(){  return this.numero;   }
    setBairro(b: String){ this.bairro = b;  }
    getBairro(){  return this.bairro;   }
    setCidade(c: String){  this.cidade = c; }
    getCidade(){  return this.cidade;   }
    setEstado(e: String){  this.estado = e;  }
    getEstado(){   return this.estado;  }
    setLat(lat: Number){ this.lat = lat; }
    getLat(){ return this.lat; }
    setLng(lng: Number){ this.lng = lng; }
    getLng(){ return this.lng; }
    
}
