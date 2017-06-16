import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { DataService } from '../../services/data-service';
import { EstabelecimentoDetails } from '../estabelecimento-details/estabelecimento-details';

@Component({
  selector: 'view-lista',
  templateUrl: 'lista.html'
})
export class ListaView {


  estabelecimentos: FirebaseListObservable<any[]>;  
  estabArray: Array<any>;
  originalEstabArray: Array<any>;

  constructor(public navCtrl: NavController,  public db: AngularFireDatabase) {
    this.estabelecimentos = db.list('/estabelecimentos');
    this.estabArray = new Array;
    this.originalEstabArray = new Array;
    this.iniciarEstabelecimentos();
    this.estabArray = this.originalEstabArray;
  }

  iniciarEstabelecimentos(){
    this.getDB('/estabelecimentos').subscribe( snapshot => {
      snapshot.forEach(redes => {
        this.getDB('/estabelecimentos/'+redes.key).subscribe(estabelecimento =>{
          estabelecimento.forEach(dados => {
            this.originalEstabArray.push(dados);
          });
        });
      });
    });
  }

  getDB(url: string): FirebaseListObservable<any>{
    return this.db.list(url, {preserveSnapshot: true});
  }

  showOptions(estabelecimento, estabKey){
    this.navCtrl.push(EstabelecimentoDetails, {estabelecimento, estabKey});
  }

  pesquisar(nome){
    let term: string = nome.target.value || '';
    console.log(term);
    if (term.trim() === '' || term.trim().length < 3){
      this.estabArray = this.originalEstabArray;
    }else{
      this.estabArray = [];
      this.originalEstabArray.forEach(element => {
          let aux: string = element.val().nome;
          if( aux.toLowerCase().includes(term.toLowerCase())){
            this.estabArray.push(element);
           }
      });

    }

  }

}