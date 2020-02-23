import { Component, OnInit, Input } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';
import { UiServiceService } from '../../services/ui-service.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-modal-compare',
  templateUrl: './modal-compare.page.html',
  styleUrls: ['./modal-compare.page.scss'],
})
export class ModalComparePage implements OnInit {

  @Input() x;
  @Input() item;

  product = {};

  constructor(
    private modalCtrl: ModalController,
    private alertCtrl: AlertController,
    private uiService: UiServiceService
  ) { }

  ngOnInit() {
    this.product = {
      _id: this.item._id,
      product: this.item.product,
      ...this.x
    };
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
