import { Injectable } from '@angular/core';
import { AlertController, ToastController, PickerController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class UiServiceService {

  constructor(
    private alertCtrl: AlertController,
    private toastCtrl: ToastController,
    private pickerCtrl: PickerController
  ) { }

  async presentAlert(message: string) {
    const alert = await this.alertCtrl.create({
      message,
      buttons: ['OK']
    });

    await alert.present();
  }

  async presentToast(message: string) {
    const toast = await this.toastCtrl.create({
      message,
      position: 'top',
      duration: 1500
    });
    toast.present();
  }

  async presentPicker(name: string) {
    const picker = await this.pickerCtrl.create({
      animated: true,
      buttons: [{
        text: 'Cancelar',
        role: 'cancel'
      }, {
        text: 'Guardar',
        handler: (val) => {
          console.log('Clicked Save. ', val);
        }
      }],
      columns: [
        {
          name,
          prefix: 'Cantidad',
          options: [
            { text: '1', value: 1 },
            { text: '2', value: 2 },
            { text: '3', value: 3 }
          ]
        }
      ],
    });
    picker.present();
  }
}
