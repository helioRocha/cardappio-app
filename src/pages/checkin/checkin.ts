import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { DataService } from '../../services/data-service';
import { Estabelecimento } from '../../classes/estabelecimento';

@Component({
  selector: 'page-checkin',
  templateUrl: 'checkin.html'
})
export class CheckinPage {
  titulo = 'Check-In';
  icone = 'qr-scanner';
  public myImage: string[];
  private estabelecimentos: Estabelecimento[];

  constructor(public navCtrl: NavController, 
  public bcScan: BarcodeScanner, 
  private db: DataService,
  public alertCtrl: AlertController) {
      this.myImage = []; 
      this.estabelecimentos = [];
  }
  ionViewDidLoad(){
    this.lerqrcode(true);
    
  }

  /*
  Aqui o código deve estar no formado x_y, onde x é o identificador do estabelecimento, e y é o identificador da mesa
  verificar a compatibilidade com os ddos retornados do firebase
  */

  lerqrcode(checkin:boolean){
      let dados: any;
        this.bcScan.scan().then((barcodeData) => {
            dados = barcodeData.text;
            // criar teste para checar a integridade dos dados antes de enviar para o checkin
            if(checkin){
              this.checkin(dados.split("_")[0], dados.split("_")[1]);
            }else{
              this.checkout(dados.split("_")[0], dados.split("_")[1]);
            }
        }, (err) => {
            console.log("Erro: " + err);
        });
  }
  checkin(estab: string, mesa: string){
    this.showAlert(estab, mesa); // debug apenas
    this.db.updateMesa(estab, mesa, "aguardando");
    // TODO: enviar dados para o servidor
    // TODO: solicitar aprovacao do gerente
    
  }
  checkout(estab: string, mesa: string){
    this.db.updateMesa(estab, mesa, "livre");
  }
  
  /*
  Apenas para debug, mas pode ser aproveitado no futuro
  */
  showAlert(estab: string, mesa: string) {
    let confirm = this.alertCtrl.create({
        title: 'CheckIn',
        message: 'Efetuando CheckIn na mesa ' + mesa + ' do ' + estab,
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
   this.db.setLimit(6);
   this.db.getRedes().subscribe(redes => {
          redes.forEach(rede => {
            this.db.getEstabelecimentos(rede.key).subscribe(stabs => {
              stabs.forEach(stab => {
                  let mesas = stab.val().mesas; 

                  for(let key in mesas){
                      let mesa = stab.val().mesas[key];
                      let cor: string;
                      if(mesa.status === "livre"){
                          cor = "000000";
                      }else{
                          cor = "0000ff";
                      }
                      this.myImage.push('https://api.qrserver.com/v1/create-qr-code/?size=150x150&color='+cor+'&data='+stab.key+'_'+key);
                  }
              });
            });
          });
   });
 
  }

}
