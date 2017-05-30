import { Component } from '@angular/core';

import { FavoritosPage } from '../favoritos/favoritos';
import { CheckinPage } from '../checkin/checkin';
import { MapaPage } from '../mapa/mapa';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = MapaPage;
  tab2Root = CheckinPage;
  tab3Root = FavoritosPage;

  constructor() {

  }
}
