import { Component, OnInit } from '@angular/core';
import { UiServiceService } from '../../services/ui-service.service';
import { ModalController } from '@ionic/angular';
import { ModalProductPage } from '../modal-product/modal-product.page';
import { Category } from 'src/app/interfaces/interfaces';
import { MarketsService } from '../../services/markets.service';
import { ModalAddProductPage } from '../modal-add-product/modal-add-product.page';
import { Storage } from '@ionic/storage';
import { StorageService } from '../../services/storage.service';
import { BuyService } from '../../services/buy.service';

@Component({
  selector: 'app-tab4',
  templateUrl: 'tab4.page.html',
  styleUrls: ['tab4.page.scss']
})
export class Tab4Page implements OnInit {

  titulo = 'Productos';
  items = [];
  total = 0;

  constructor(
    private uiService: UiServiceService,
    private modalCtrl: ModalController,
    private marketsService: MarketsService,
    private storage: Storage,
    private storageService: StorageService,
    private buyService: BuyService
  ) { }

  ngOnInit() {
    this.uiService.dismissPresentLoading();
    this.loadDataStorage();

    this.storageService.newItem.subscribe(item => {
      this.items = [];
      this.loadDataStorage();
    });
  }

  async addProduct() {
    const modal = await this.modalCtrl.create({
      component: ModalAddProductPage,
    });
    return await modal.present();
  }

  saveItems() {
    const buy = {
      date: new Date(),
      store: 'ARA',
      total: this.total,
      geo: '90.90',
      items: this.items
    };
    this.buyService.saveBuy(buy).then(resp => {
      console.log(resp);
      // tslint:disable-next-line: no-string-literal
      if (!resp['ok']) {
        // tslint:disable-next-line: no-string-literal
        this.uiService.presentAlert(resp['message']);
        return;
      }
      // tslint:disable-next-line: no-string-literal
      this.uiService.presentAlert(resp['message']);
      this.storage.clear();
      this.items = [];
      this.total = 0;
    });
  }

  async loadDataStorage() {
    await this.storage.get('items').then(item => {
      this.items.push(...item);
      if (!this.items) {
        return;
      }
      this.items.forEach(x => {
        this.total += x.price * x.quantity;
      });
    });
  }

}
