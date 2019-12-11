import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MarketComponent } from './market/market.component';
import { MarketsComponent } from './markets/markets.component';
import { IonicModule } from '@ionic/angular';
import { EmptyComponent } from './empty/empty.component';
import { HeadinguserComponent } from './headinguser/headinguser.component';



@NgModule({
  declarations: [
    MarketComponent,
    MarketsComponent,
    EmptyComponent,
    HeadinguserComponent
  ],
  exports: [
    MarketsComponent,
    HeadinguserComponent
  ],
  imports: [
    CommonModule,
    IonicModule
  ]
})
export class ComponentsModule { }
