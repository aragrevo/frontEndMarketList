import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MarketComponent } from './market/market.component';
import { MarketsComponent } from './markets/markets.component';
import { IonicModule } from '@ionic/angular';
import { EmptyComponent } from './empty/empty.component';
import { HeadinguserComponent } from './headinguser/headinguser.component';
import { SubcategoriesComponent } from './subcategories/subcategories.component';
import { HeaderComponent } from './header/header.component';
import { ProductsComponent } from './products/products.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    MarketComponent,
    MarketsComponent,
    EmptyComponent,
    HeadinguserComponent,
    SubcategoriesComponent,
    ProductsComponent,
    HeaderComponent
  ],
  exports: [
    MarketsComponent,
    HeadinguserComponent,
    SubcategoriesComponent,
    ProductsComponent,
    HeaderComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule
  ]
})
export class ComponentsModule { }
