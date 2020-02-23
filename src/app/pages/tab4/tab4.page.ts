import { Component, OnInit } from '@angular/core';
import { UiServiceService } from '../../services/ui-service.service';
import { ModalController } from '@ionic/angular';
import { ModalProductPage } from '../modal-product/modal-product.page';
import { Category } from 'src/app/interfaces/interfaces';
import { MarketsService } from '../../services/markets.service';
import { ModalAddProductPage } from '../modal-add-product/modal-add-product.page';
import { Storage } from '@ionic/storage';
import { StorageService } from '../../services/storage.service';

@Component({
  selector: 'app-tab4',
  templateUrl: 'tab4.page.html',
  styleUrls: ['tab4.page.scss']
})
export class Tab4Page implements OnInit {

  titulo = 'Productos';
  categories: Category[] = [];
  items = [];
  total = 0;

  constructor(
    private uiService: UiServiceService,
    private modalCtrl: ModalController,
    private marketsService: MarketsService,
    private storage: Storage,
    private storageService: StorageService
  ) { }

  ngOnInit() {
    this.uiService.dismissPresentLoading();
    this.marketsService.getCategories().subscribe(resp => {
      this.categories.push(...resp.categories);
      this.loadDataStorage();
    });

    this.storageService.newItem.subscribe(item => {
      this.items = [];
      // this.items.push(...item);
      // console.log(this.items);
      this.loadDataStorage();
    });
  }

  async addProduct() {
    const modal = await this.modalCtrl.create({
      component: ModalAddProductPage,
    });
    return await modal.present();
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

  saveItems() {
    console.log('saveds');
  }

  async loadDataStorage() {
    await this.storage.get('items').then(item => {
      this.items.push(...item);
      this.items.forEach(x => {
        this.total += x.price * x.quantity;
      });
    });
  }

}
