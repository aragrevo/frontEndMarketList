import { Component, OnInit, Input } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';
import { UiServiceService } from '../../services/ui-service.service';
import { map } from 'rxjs/operators';
import { BuyService } from 'src/app/services/buy.service';

@Component({
  selector: 'app-modal-compare',
  templateUrl: './modal-compare.page.html',
  styleUrls: ['./modal-compare.page.scss'],
})
export class ModalComparePage implements OnInit {

  @Input() x;
  @Input() item;
  // tslint:disable-next-line: max-line-length
  imageBest = 'https://previews.123rf.com/images/anatolir/anatolir1712/anatolir171200836/91728950-logotipo-del-mejor-precio-ilustraci%C3%B3n-simple-del-mejor-logo-de-vector-de-precio-para-web.jpg';

  product = {};
  buys = [];
  currentBuy = {
    ratio: '',
    price: '',
    gramaje: '',
    unit: ''
  };
  lastBuy = {
    date: '',
    price: '',
    gramaje: '',
    unit: '',
    store: '',
    ratio: ''
  };
  bestBuy = {
    date: '',
    price: '',
    gramaje: '',
    unit: '',
    store: '',
    ratio: ''
  };
  bestItem = {};

  constructor(
    private modalCtrl: ModalController,
    private alertCtrl: AlertController,
    private uiService: UiServiceService,
    private buyService: BuyService
  ) { }

  async ngOnInit() {
    this.product = {
      _id: this.item._id,
      product: this.item.product,
      ...this.x
    };
    this.buyService.getItem(this.item._id).subscribe(resp => {
      // tslint:disable-next-line: no-string-literal
      this.buys = [...resp['buys']].map((value, index) => {
        const item = value.items.filter(x => {
          if (x._id === this.item._id) {
            return true;
          }
        });

        const ratios = (item[0].gramaje === '') ? item[0].price / item[0].unit : item[0].price / item[0].gramaje;

        return {
          date: value.date,
          store: value.store,
          geo: value.geo,
          _id: item[0]._id,
          product: item[0].product,
          gramaje: item[0].gramaje,
          price: item[0].price,
          unit: item[0].unit,
          ratio: ratios
        };
      });

      let bestPrice = 0;
      let saveIndex = 0;
      this.buys.forEach((buy, index) => {
        if (index === 0) {
          bestPrice = buy.ratio;
        }
        if (buy.ratio <= bestPrice) {
          bestPrice = buy.ratio;
          saveIndex = index;
        }
      });

      const currentRatio = (this.x.gramaje === '') ? this.x.price / this.x.unit : this.x.price / this.x.gramaje;

      this.currentBuy = { ...this.x, ratio: currentRatio };

      this.bestBuy = { ...this.buys[saveIndex] };
      this.lastBuy = { ...this.buys[this.buys.length - 1] };
      this.bestItem = (this.currentBuy.ratio < this.bestBuy.ratio) ? this.currentBuy : this.bestBuy;
    });

  }

  dismissModal() {
    this.modalCtrl.dismiss();
  }

  async insertQuantity() {
    const alert = await this.alertCtrl.create({
      header: 'Cantidad',
      message: 'This is an alert message.',
      inputs: [
        {
          name: 'quantity',
          type: 'number',
          min: 0,
          max: 10,
          placeholder: 'Cantidad'
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
          handler: async (data) => {
            if (data.quantity === '') {
              this.uiService.presentAlert('Ingrese cantidad');
              return;
            }
            this.product = { ...this.product, ...data };
            console.log('Confirm Ok', this.product);
            this.modalCtrl.dismiss(this.product);
          }
        }
      ]
    });

    await alert.present();
  }

}

