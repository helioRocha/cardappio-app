import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-favoritos',
  templateUrl: 'favoritos.html'
})
export class FavoritosPage {

  titulo = "Favoritos";
  icone = 'star';

  constructor(public navCtrl: NavController) {

  }

}
