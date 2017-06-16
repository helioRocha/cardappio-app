import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

import { MapaView } from './mapa';
import { ListaView } from './lista';

@Component({
  selector: 'page-estabelecimentos',
  templateUrl: 'estabelecimentos.html'
})
export class EstabelecimentosPage {

  mapaView = MapaView;
  listaView = ListaView;

  
  constructor(public navCtrl: NavController, public alertCtrl: AlertController, public db: AngularFireDatabase) {
    
  }


}
