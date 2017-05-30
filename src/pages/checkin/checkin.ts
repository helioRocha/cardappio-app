import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-checkin',
  templateUrl: 'checkin.html'
})
export class CheckinPage {

  titulo = 'Check-In';
  icone = 'qr-scanner';

  constructor(public navCtrl: NavController) {

  }

}
