import { Component, ViewChild } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';


declare var google;
@Component({
  selector: 'page-favoritos',
  templateUrl: 'favoritos.html'
})
export class FavoritosPage {

  titulo = "Favoritos";
  icone = 'star';

  constructor(public navCtrl: NavController, public geolocation: Geolocation) {

  }
  ionViewDidLoad(){

  }
  

}
