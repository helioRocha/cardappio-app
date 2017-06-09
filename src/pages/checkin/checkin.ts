import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';

@Component({
  selector: 'page-checkin',
  templateUrl: 'checkin.html'
})
export class CheckinPage {
  titulo = 'Check-In';
  icone = 'qr-scanner';
  public myImage: string;

  constructor(public navCtrl: NavController, public bcScan: BarcodeScanner, public alertCtrl: AlertController) {

  }
  ionViewDidLoad(){
    this.lerqrcode();
    
  }

  /*
  Aqui o código deve estar no formado x_y, onde x é o identificador do estabelecimento, e y é o identificador da mesa
  verificar a compatibilidade com os ddos retornados do firebase
  */

  lerqrcode(){
      let dados: any;
        this.bcScan.scan().then((barcodeData) => {
            dados = barcodeData.text;
            // criar teste para checar a integridade dos dados antes de enviar para o checkin
            this.checkin(dados.split("_")[0], dados.split("_")[1]);
        }, (err) => {
            console.log("Erro: " + err);
        });
  }
  checkin(estab: string, mesa: string){
    this.showAlert(estab, mesa); // debug apenas
    // TODO: enviar dados para o servidor
    // TODO: solicitar aprovacao do gerente
    
  }
  
  /*
  Apenas para debug, mas pode ser aproveitado no futuro
  */
  showAlert(estab: string, mesa: string) {
    let confirm = this.alertCtrl.create({
        title: 'CheckIn',
        message: 'Estabelecimento: ' + estab + ' , Mesa: ' + mesa,
        buttons: [
          {
            text: 'OK',
            handler: () => {
              /* fazer algo */
            }
          }
        ]
      });
      confirm.present();
  }
 

 /* acho que dá pra gente criar aqui uma função pra gerar as imagens do QR code, 
  a principio elas seriam geradas por este api aí embaixo, logicamente isso deve estar diponível no
  modulo do administrador
  */
  qrcodegen(){
  
   this.myImage = '<img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&amp;data=1001_1002"/>';

  }

}
