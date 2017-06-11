import { Component, ViewChild } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { Network } from '@ionic-native/network';
import { Estabelecimento } from '../../classes/estabelecimento';
import { Rede } from '../../classes/Rede';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { DataService } from '../../services/data-service';


declare var google;
@Component({
  selector: 'view-mapa',
  templateUrl: 'mapa.html'
})
export class MapaView {

  @ViewChild('map') mapElement;
  private map: any;
  private estabelecimentos: Estabelecimento[];
  private redes: Rede[];
  keyEstAtivo: any;
  infowindow : any;
  marker: any;
  latUsuario: any;  // para receber a posição do usuário (latitude)
  lngUsuario: any;  // para receber a posição do usuário (longitude)
  private connectionStatus: boolean = true;

  constructor(public navCtrl: NavController, 
              public alertCtrl: AlertController,
              public geolocation: Geolocation, 
              public network: Network, 
              public http: Http,
              private db: DataService) {
      this.estabelecimentos = [];
      this.infowindow = [];
      this.marker = [];
  }

  // Ações realizadas ao iniciar o mapa
  ionViewDidLoad(){
      // Se há conexão com internet
      this.network.onConnect()
          .subscribe(data => {
            this.connectionStatus = true;
          }, error => console.error(error));

      // Se não há conexão com internet
      this.network.onDisconnect()
          .subscribe(data => {
            this.connectionStatus = false;
            this.showAlert();
          }, error => console.error(error));

      // Caso esteja conectado, carregamos o mapa   
      if(this.connectionStatus){
        this.initMap();
      }
      
  }

  // Carrega mapa e variáveis necessárias
  initMap(){
    // TODO: tem que ver o caso em que a posição não foi encontrada

    // Coordenadas default somente para iniciar o mapa
    let latLng = new google.maps.LatLng(-3.7449157, -38.5764296);
    let mapOptions = {
      center: latLng,
      disableDefaultUI: true,
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    }

    // Carrega mapa
    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

    // Pegamos posição atual e recentramos o mapa
    this.getPosition();

    // Carega dados do mapa
    this.loadData();
  }

  getPosition() {
    this.geolocation.getCurrentPosition()
        .then((position) => {
            let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
            this.latUsuario = position.coords.latitude;
            this.lngUsuario = position.coords.longitude
            this.map.setCenter(latLng);
        }, (err) => {
            console.log(err);
            // TODO: Apresentar Alert de erro
        });
  }

  //TODO: função para reconhecer cliques dentro do infowindow, para por exemplo carregar a rota
  loadData(){
      // Carrega estabelecimentos a 500 metros de distância do local atual (quando não forem carregados os dados locais)
      // TODO: fazer com que seja dinâmico, ou seja, quando o zoom do mapa for alterado, o raio também deve ser alterado
      let raio = 500;

      //TODO: Fazer consulta com LIMIT, para prevenir overflow quando houver muitos estabelecimentos
      this.db.getEstabelecimentos()
          .subscribe(snapshots => {
            snapshots.forEach(snapshot => {
                          let estab = new Estabelecimento();
                          estab.setId(snapshot.key);
                          estab.dados.setNome(snapshot.val().nome);
                          estab.dados.setLat(snapshot.val().localizacao.latitude);
                          estab.dados.setLng(snapshot.val().localizacao.longitude);
                          this.estabelecimentos.push(estab);
                      });

                      // Adiciona marcadores ao mapa para cada estabelecimento
                      this.addMarker();
          });
                  
  }
  
  // Adiciona marcadores ao mapa para cada estabelecimento
  addMarker() {
    this.estabelecimentos.forEach((estab, index) => {
      let latLng = new google.maps.LatLng(estab.dados.getLat(), estab.dados.getLng());
      let tmpmarker = new google.maps.Marker({
        map: this.map,
        icon: 'assets/icon/cardappio.png',
        animation: google.maps.Animation.DROP,
        position: latLng
      });
      this.marker.push(tmpmarker);

      /* TODO: ver uma forma de usar template para o infowindow depois */
      let desc = estab.dados.getNome();
      let dist = this.calcdist(this.latUsuario, this.lngUsuario, estab.dados.getLat(), estab.dados.getLng());
      let content =   "<div id=\"infowindow\"><h3>" + 
                      desc + 
                      "<br></h3>À " + 
                      dist + 
                      " metros<div id=\"ifowindowsbuttons\"><img src=\"assets/icon/cardappio.png\"></div></div>";       
              
      let tmpinfowindow = new google.maps.InfoWindow({
          content: content
      })

      this.infowindow.push(tmpinfowindow);
      google.maps.event.addListener(this.marker[index], 'click', () => {
          this.infowindow[index].open(this.map, this.marker[index]);
          this.keyEstAtivo = index;
      });
      
    });
  }

  tracarota(){
    if(this.keyEstAtivo){ // gambiarra feiona, tem que consertar mas não consegui um jeito ainda
        let latDest = this.estabelecimentos[this.keyEstAtivo].dados.getLat();
        let lngDest = this.estabelecimentos[this.keyEstAtivo].dados.getLng();
        let nome = this.estabelecimentos[this.keyEstAtivo].dados.getNome();
        let label = encodeURI(nome.toString()); // encode the label!
        window.open('geo:'+ latDest +', ' + lngDest +'?q='+ latDest +', ' + lngDest + '(' + label + ')', '_system');
        
    }else{
        this.showAlertNoSelect();
    }
  }

  // Métodos auxiliares

  // Converte Graus para Radiano
  degreesToRadians(degrees) {
    return degrees * Math.PI / 180;
  }

  // Calcula distância
  calcdist(lat1, lng1, lat2, lng2) {
    var earthRadiusKm = 6371;

    var dLat = this.degreesToRadians(lat2-lat1);
    var dLng = this.degreesToRadians(lng2-lng1);

    lat1 = this.degreesToRadians(lat1);
    lat2 = this.degreesToRadians(lat2);

    var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.sin(dLng/2) * Math.sin(dLng/2) * Math.cos(lat1) * Math.cos(lat2); 
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 

    // retorno em metros
    return (earthRadiusKm * c * 1000).toFixed(0);
  }

  // TODO: Separar em uma classe, pois deve ser usado em vários locais
  showAlert() {
  let confirm = this.alertCtrl.create({
      title: 'Sem conexão com internet?',
      message: 'é necessário ativar sua conexão com internet',
      buttons: [
        {
          text: 'Sair',
          handler: () => {
            /* fchar o app */
          }
        },
        {
          text: 'Ativar',
          handler: () => {
            /* Abrir configuração de rede */
          }
        }
      ]
    });
    confirm.present();
  }

  showAlertNoSelect() {
      let confirm = this.alertCtrl.create({
      title: 'Selecione um Destino',
      message: 'é necessário selecionar um destino para traçar a rota',
      buttons: [
        {
          text: 'OK',
          handler: () => {
          }
        }
      ]
    });
    confirm.present(); 
  }
}
