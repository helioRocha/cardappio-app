import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { SuperTabsModule } from 'ionic2-super-tabs';

import { FavoritosPage } from '../pages/favoritos/favoritos';
import { CheckinPage } from '../pages/checkin/checkin';
import { MapaPage } from '../pages/mapa/mapa';
import { TabsPage } from '../pages/tabs/tabs';

// Import the AF2 Modules
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';

//Services
import { DataService } from '../services/data-service';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Network } from '@ionic-native/network';
import { Geolocation } from '@ionic-native/geolocation';
import { HttpModule} from '@angular/http';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';

// AF2 Settings
export const firebaseConfig = {
  apiKey: "AIzaSyCcAlOaliIlgSVnz-KoUkZOG9xbRybpqX4",
  authDomain: "cardappio-60ff4.firebaseapp.com",
  databaseURL: "https://cardappio-60ff4.firebaseio.com",
  storageBucket: "cardappio-60ff4.appspot.com",
  messagingSenderId: "586001503807"
};

@NgModule({
  declarations: [
    MyApp,
    FavoritosPage,
    CheckinPage,
    MapaPage,
    TabsPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    SuperTabsModule.forRoot(),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    FavoritosPage,
    CheckinPage,
    MapaPage,
    TabsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Network,
    BarcodeScanner,
    DataService,
    Geolocation,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
