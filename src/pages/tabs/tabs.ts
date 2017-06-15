import { Component } from '@angular/core';

import { CheckinPage } from '../checkin/checkin';
import { HomePage } from '../home/home';
import { EstabelecimentosPage } from '../estabelecimentos/estabelecimentos';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = CheckinPage;
  tab3Root = EstabelecimentosPage;

  constructor() {

  }
}
