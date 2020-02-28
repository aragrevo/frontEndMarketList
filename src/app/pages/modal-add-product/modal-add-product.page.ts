import { Component, OnInit, Input } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';
import { MarketsService } from '../../services/markets.service';
import { UiServiceService } from '../../services/ui-service.service';
import { ModalComparePage } from '../modal-compare/modal-compare.page';
import { StorageService } from '../../services/storage.service';
import { Storage } from '@ionic/storage';
import { ModalProductPage } from '../modal-product/modal-product.page';

@Component({
  selector: 'app-modal-add-product',
  templateUrl: './modal-add-product.page.html',
  styleUrls: ['./modal-add-product.page.scss'],
})
export class ModalAddProductPage implements OnInit {

  products = [];
  categories = [];
  textToSearch = '';

  constructor(
    private modalCtrl: ModalController,
    private marketsService: MarketsService,
    private alertCtrl: AlertController,
    private uiService: UiServiceService,
    private storageService: StorageService,
    private storage: Storage
  ) { }

  ngOnInit() {
    this.marketsService.getProducts().subscribe(resp => {
      this.products = [...resp];
    });

    this.marketsService.getCategories().subscribe(resp => {
      this.categories.push(...resp.categories);
    });
  }

  dismissModal() {
    this.modalCtrl.dismiss();
  }

  searchProduct(event) {
    this.textToSearch = event.detail.value;
  }

  async selectedProduct(item) {
    const alert = await this.alertCtrl.create({
      header: item.product,
      subHeader: item.subcategory.subcategory,
      message: 'This is an alert message.',
      inputs: [
        {
          name: 'gramaje',
          label: 'gramaje',
          type: 'number',
          placeholder: 'Gramaje'
        },
        {
          name: 'price',
          type: 'number',
          label: 'precio',
          placeholder: 'Precio'
        },
        {
          name: 'unit',
          type: 'number',
          label: 'cantidad',
          min: 0,
          max: 10,
          placeholder: 'Unidad'
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
          handler: async (x) => {
            if (x.price === '') {
              this.uiService.presentAlert('Sin datos para comparar');
              return;
            }
            if (x.unit === '' && x.gramaje === '') {
              this.uiService.presentAlert('Sin datos para comparar');
              return;
            }
            if (x.unit !== '' && x.gramaje !== '') {
              this.uiService.presentAlert('Gramaje o Unidades, no los dos');
              return;
            }
            const modalCompare = await this.modalCtrl.create({
              component: ModalComparePage,
              componentProps: {
                x,
                item
              }
            });

            await modalCompare.present();

            const { data } = await modalCompare.onDidDismiss();
            this.addItemStorage(data);
          }
        }
      ]
    });

    await alert.present();
  }

  async addItemStorage(item) {
    const itemsUser = await this.storage.get('items').then(it => {
      return it;
    });

    console.log(itemsUser);
    if (!itemsUser) {
      this.storageService.saveItem([{ ...item }]);
      return;
    }

    itemsUser.push(item);
    await this.storageService.saveItem(itemsUser);

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
