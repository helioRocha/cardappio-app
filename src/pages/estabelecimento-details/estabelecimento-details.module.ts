import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EstabelecimentoDetails } from './estabelecimento-details';

@NgModule({
  declarations: [
    EstabelecimentoDetails
  ],
  imports: [
    IonicPageModule.forChild(EstabelecimentoDetails)
  ],
  exports: [
    EstabelecimentoDetails
  ]
})
export class EstabelecimentoDetailsModule {}
