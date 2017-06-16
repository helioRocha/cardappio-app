import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { DataService } from '../../services/data-service';

@Component({
  selector: 'view-lista',
  templateUrl: 'lista.html'
})
export class ListaView {


  estabelecimentos: FirebaseListObservable<any[]>;  
  estabArray: Array<any>;

  constructor(public navCtrl: NavController,  public db: AngularFireDatabase) {
    this.estabelecimentos = db.list('/estabelecimentos');
    this.estabArray = new Array;
    this.iniciarEstabelecimentos();
  }

  iniciarEstabelecimentos(){
    this.getDB('/estabelecimentos').subscribe( snapshot => {
      snapshot.forEach(redes => {
        this.getDB('/estabelecimentos/'+redes.key).subscribe(estabelecimento =>{
          estabelecimento.forEach(dados => {
            this.estabArray.push(dados);
          });
        });
      });
    });
  }

  getDB(url: string): FirebaseListObservable<any>{
    return this.db.list(url, {preserveSnapshot: true});
  }

  pesquisar(nome){

  }

}