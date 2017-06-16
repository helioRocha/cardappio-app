import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { AngularFireDatabase } from 'angularfire2/database';
import { Mesa } from '../../classes/mesa';
import { Utils } from '../../classes/utils';


@Component({
  selector: 'page-estabelecimento-details',
  templateUrl: 'estabelecimento-details.html',
})
export class EstabelecimentoDetails {

   mesaescolhida: Mesa;
   estabelecimento: FirebaseObjectObservable<any>;
   estabelecimentoData: Object;
   estabKey: string;
   produtosArray: Array<any>;
   idmesa: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public db: AngularFireDatabase, private utils: Utils) {
    this.estabelecimento = navParams.get('estabelecimento');
    this.estabKey = navParams.get('estabKey');
    this.idmesa = navParams.get('idmesa');
    this.produtosArray = new Array;
    this.mesaescolhida = new Mesa();
  }
  ionViewDidLoad(){ // espera carregar a view
    this.iniciarCadapios(); 
  }
  iniciarCadapios(){
    this.db.list('/mesas/'+this.estabKey+'/'+this.idmesa).subscribe( data => {
        data.forEach(mesa => {
          this.mesaescolhida.key = mesa.key;
          this.mesaescolhida.numero = mesa.val().numero;
          this.mesaescolhida.status = mesa.val().status;
        });
    });
   console.log(this.mesaescolhida);
   this.estabelecimento = this.db.object('/estabelecimentos/-Kmb-c0vLJkXbLdaEXmk/'+this.estabKey, { preserveSnapshot: true});
    this.estabelecimento.subscribe(data => {
      this.estabelecimentoData = data.val();
    });
    this.getDB('/cardapios/'+this.estabKey).subscribe( snapshot => {
      snapshot.forEach(cardapio => {
        this.getDB('/cardapios/'+this.estabKey+'/'+cardapio.key).subscribe( tipoCardapio => {
          tipoCardapio.forEach(dadosCardapio => {
            this.produtosArray.push(dadosCardapio);
          })
        });
      });
    });
  }

  getDB(url: string): FirebaseListObservable<any>{
    return this.db.list(url, {preserveSnapshot: true});
  }
 

}
