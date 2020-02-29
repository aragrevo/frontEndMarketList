import { Component, OnInit, Input } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';
import { MarketsService } from '../../services/markets.service';
import { UiServiceService } from '../../services/ui-service.service';
import { ModalComparePage } from '../modal-compare/modal-compare.page';
import { StorageService } from '../../services/storage.service';
import { Storage } from '@ionic/storage';
import { ModalProductPage } from '../modal-product/modal-product.page';
import { BuyService } from '../../services/buy.service';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-modal-add-product',
  templateUrl: './modal-add-product.page.html',
  styleUrls: ['./modal-add-product.page.scss'],
})
export class ModalAddProductPage implements OnInit {

  products = [];
  newProducts = [];
  categories = [];
  textToSearch = '';
  data = false;

  constructor(
    private modalCtrl: ModalController,
    private marketsService: MarketsService,
    private alertCtrl: AlertController,
    private uiService: UiServiceService,
    private storageService: StorageService,
    private storage: Storage,
    private buyService: BuyService
  ) { }

  ngOnInit() {
    this.marketsService.getProducts().subscribe(resp => {
      this.products = [...resp];
      this.getBuys().then(() => this.data = true);
    });

    this.marketsService.getCategories().subscribe(resp => {
      this.categories.push(...resp.categories);
    });
  }

  async getBuys() {
    const buys = await this.products.forEach(async product => {
      await this.buyService.getItem(product._id).subscribe(resp => {
        // tslint:disable-next-line: no-string-literal
        if (resp['count'] === 0) {
          this.newProducts.push(product);
        } else {
          // tslint:disable-next-line: no-string-literal
          resp['buys'].forEach((value, index) => {
            const item = value.items.filter(itemIn => {
              if (itemIn._id === product._id) {
                return true;
              }
            });

            // Si el item ya existe en newProduct
            if (this.newProducts.includes(item[0])) {
              return;
            }
            const newItem = {
              _id: item[0]._id,
              product: item[0].product,
              gramaje: item[0].gramaje,
              price: item[0].price,
              unit: item[0].unit,
              subcategory: product.subcategory.subcategory
            };
            this.newProducts.push(newItem);
          });
        }
      });
    });
    await buys;
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
      subHeader: JSON.stringify(item),
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
            if (!data) {
              return;
            }
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
