import { Component, OnInit } from '@angular/core';
import { UiServiceService } from '../../services/ui-service.service';
import { ModalController, AlertController } from '@ionic/angular';
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
    private buyService: BuyService,
    private alertCtrl: AlertController
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

  async confirmSaveItems() {

    const alert = await this.alertCtrl.create({
      header: 'Prompt!',
      inputs: [
        {
          name: 'store',
          type: 'text',
          placeholder: 'Tienda'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Ok',
          handler: (data) => {
            console.log('Confirm Ok', data);
            if (data.store === '') {
              this.uiService.presentAlert('Tienda, por favor');
              return;
            }
            this.saveItems(data.store);
          }
        }
      ]
    });

    await alert.present();

  }

  saveItems(store: string) {
    const buy = {
      date: new Date(),
      store,
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
    this.total = 0;
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

  async removeItem(itemToRemove) {
    const confirm = await this.uiService.confirmAlert(`Desea retirar ${itemToRemove.product}?`).then(resp => {
      return resp;
    });
    if (!confirm) {
      return;
    }
    const itemUser = await this.storage.get('items').then(items => {
      const index = items.findIndex(element => element._id === itemToRemove._id);
      this.uiService.presentToast(`${items[index].product} eliminado`, 'middle');
      items.splice(index, 1);
      return items;
    });
    this.storageService.saveItem(itemUser);
  }

}
