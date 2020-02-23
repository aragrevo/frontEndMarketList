import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab4Page } from './tab4.page';
import { ComponentsModule } from '../../components/components.module';
import { ModalProductPage } from '../modal-product/modal-product.page';
import { ModalProductPageModule } from '../modal-product/modal-product.module';
import { ModalAddProductPageModule } from '../modal-add-product/modal-add-product.module';
import { ModalAddProductPage } from '../modal-add-product/modal-add-product.page';

@NgModule({
  entryComponents: [
    ModalProductPage,
    ModalAddProductPage
  ],
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ComponentsModule,
    ModalProductPageModule,
    ModalAddProductPageModule,
    RouterModule.forChild([{ path: '', component: Tab4Page }])
  ],
  declarations: [Tab4Page]
})
export class Tab4PageModule { }
