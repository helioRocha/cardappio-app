import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-mapa',
  templateUrl: 'mapa.html'
})
export class MapaPage {

  titulo = "Mapa";
  icone = 'navigation';

  constructor(public navCtrl: NavController) {

  }

}
