import { Component, OnInit } from '@angular/core';
import { UiServiceService } from '../../services/ui-service.service';
import { ModalController } from '@ionic/angular';
import { ModalProductPage } from '../modal-product/modal-product.page';
import { Category } from 'src/app/interfaces/interfaces';
import { MarketsService } from '../../services/markets.service';

@Component({
  selector: 'app-tab4',
  templateUrl: 'tab4.page.html',
  styleUrls: ['tab4.page.scss']
})
export class Tab4Page implements OnInit {

  titulo = 'Productos';
  categories: Category[] = [];

  constructor(
    private uiService: UiServiceService,
    private modalCtrl: ModalController,
    private marketsService: MarketsService) { }

  ngOnInit() {
    this.uiService.dismissPresentLoading();
    this.marketsService.getCategories().subscribe(resp => {
      this.categories.push(...resp.categories);
    });
  }

  async createProduct() {
    const modal = await this.modalCtrl.create({
      component: ModalProductPage,
      componentProps: {
        categories: this.categories
      }
    });
    return await modal.present();
  }

}
