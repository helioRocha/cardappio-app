export class DadosEstabelecimento{
    nome: String;
    estado: String;
    cidade: String;
    bairro: String;
    logradouro: String;
    numero: Number;
    lat: Number;
    lng: Number;
    horario_funcionamento: String;
    
    setNome(nome: String){ this.nome = nome;  }
    getNome(){ return this.nome;  }
    setEstado(estado: String){  this.estado = estado;  }
    getEstado(){   return this.estado;  }
    setCidade(cidade: String){  this.cidade = cidade; }
    getCidade(){  return this.cidade;   }
    setBairro(bairro: String){ this.bairro = bairro;  }
    getBairro(){  return this.bairro;   }
    setLogradouro(logradouro: String){  this.logradouro = logradouro;   }
    getLogradouro(){  return this.logradouro;   }
    setNumero(numero: Number){ this.numero = numero;   }
    getNumero(){  return this.numero;   }
    setLat(lat: Number){ this.lat = lat; }
    getLat(){ return this.lat; }
    setLng(lng: Number){ this.lng = lng; }
    getLng(){ return this.lng; }
    setHorarioFuncionamento(horario: String){ this.horario_funcionamento = horario; }
    getHorarioFuncionamento(){ return this.horario_funcionamento; }
    
}
