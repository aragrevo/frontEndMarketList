import { Injectable } from '@angular/core';
import { AlertController, ToastController, PickerController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class UiServiceService {

  constructor(
    private alertCtrl: AlertController,
    private toastCtrl: ToastController
  ) { }

  async presentAlert(message: string) {
    const alert = await this.alertCtrl.create({
      message
      // buttons: ['OK']
    });

    await alert.present();
  }

  async presentToast(message: string, position: any = 'top') {
    const toast = await this.toastCtrl.create({
      message,
      position,
      duration: 1000
    });
    toast.present();
  }

}
