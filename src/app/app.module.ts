import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { SuperTabsModule } from 'ionic2-super-tabs';

import { FavoritosPage } from '../pages/favoritos/favoritos';
import { CheckinPage } from '../pages/checkin/checkin';
import { MapaPage } from '../pages/mapa/mapa';
import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Network } from '@ionic-native/network';
import { Geolocation } from '@ionic-native/geolocation';
import { HttpModule} from '@angular/http';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';

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
    SuperTabsModule.forRoot()
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
    Geolocation,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
