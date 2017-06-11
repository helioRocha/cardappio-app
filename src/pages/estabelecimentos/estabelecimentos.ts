import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';

import { MapaView } from './mapa';
import { ListaView } from './lista';

@Component({
  selector: 'page-estabelecimentos',
  templateUrl: 'estabelecimentos.html'
})
export class EstabelecimentosPage {

  mapaView = MapaView;
  listaView = ListaView;
  estabelecimentos: string;

  constructor(public navCtrl: NavController, public alertCtrl: AlertController) {
    this.estabelecimentos = "'mapa'";
  }

}
