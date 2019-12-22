import { Injectable } from '@angular/core';
import { AlertController, ToastController, PickerController, LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class UiServiceService {

  constructor(
    private alertCtrl: AlertController,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController
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

  async presentLoadingWithOptions() {
    const loading = await this.loadingCtrl.create({
      // duration: 1000,
      // tslint:disable-next-line: quotemark
      spinner: "lines",
      message: 'Please wait...',
    });
    return await loading.present();
  }

  dismissPresentLoading() {
    return this.loadingCtrl.dismiss();
  }

}
