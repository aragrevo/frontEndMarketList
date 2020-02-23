import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModalAddProductPage } from './modal-add-product.page';
import { PipesModule } from '../../pipes/pipes.module';
import { ModalComparePage } from '../modal-compare/modal-compare.page';
import { ModalComparePageModule } from '../modal-compare/modal-compare.module';

@NgModule({
  entryComponents: [
    ModalComparePage
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    PipesModule,
    ModalComparePageModule
  ],
  declarations: [ModalAddProductPage]
})
export class ModalAddProductPageModule { }
