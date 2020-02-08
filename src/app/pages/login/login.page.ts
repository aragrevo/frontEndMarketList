import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { IonSlides, NavController } from '@ionic/angular';
import { UserService } from '../../services/user.service';
import { UiServiceService } from 'src/app/services/ui-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  @ViewChild('slidesPrincipal', { static: true }) slides: IonSlides;
  @ViewChild('slidesAvatar', { static: true }) slidesAvatar: IonSlides;

  avatars = [
    {
      img: 'av-1.png',
      selected: true
    },
    {
      img: 'av-2.png',
      selected: false
    },
    {
      img: 'av-3.png',
      selected: false
    },
    {
      img: 'av-4.png',
      selected: false
    },
    {
      img: 'av-5.png',
      selected: false
    },
    {
      img: 'av-6.png',
      selected: false
    },
    {
      img: 'av-7.png',
      selected: false
    },
    {
      img: 'av-8.png',
      selected: false
    },
  ];

  loginUser = {
    name: 'Test'
  };

  logupUser = {
    name: 'Test',
    avatar: 'av-2.png'
  };

  constructor(
    private userService: UserService,
    private navCtrl: NavController,
    private uiService: UiServiceService) { }

  ngOnInit() {
    this.slides.lockSwipes(true);

  }

  async login(formLogin: NgForm) {
    if (formLogin.invalid) {
      return;
    }

    const validated = await this.userService.login(this.loginUser.name);

    if (!validated) {
      this.uiService.dismissPresentLoading();
      this.uiService.presentAlert('Usuario incorrecto');
      return;
    }

    this.uiService.presentToast(`Bienvenido ${this.loginUser.name}`);

    if (this.userService.getUser().profile === 'person') {
      this.navCtrl.navigateRoot('main/tabs/tab1', { animated: true });
      return;
    }
    this.navCtrl.navigateRoot('main/tabs/tab4', { animated: true });
  }

  async logup(formLogup: NgForm) {
    if (formLogup.invalid) { return; }

    let text: number;
    await this.slidesAvatar.getActiveIndex().then(index => {
      text = index;
    });

    this.logupUser.avatar = `av-${text + 1}.png`;
    console.log('Nuevo :', this.logupUser);

    const validated = await this.userService.logup(this.logupUser.name, this.logupUser.avatar);

    if (!validated) {
      this.uiService.presentAlert('Usuario ya existe!!');
      return;
    }

    this.uiService.presentToast(`Bienvenido ${this.logupUser.name}`);
    this.navCtrl.navigateRoot('main/tabs/tab1', { animated: true });

  }

  moveSlideNext() {
    this.slides.lockSwipes(false);
    this.slides.slideNext();
    this.slides.lockSwipes(true);
  }

  showLogup() {
    this.slides.lockSwipes(false);
    this.slides.slideTo(2);
    this.slides.lockSwipes(true);
  }

  goSlideHome() {
    this.slides.lockSwipes(false);
    this.slides.slideTo(0);
    this.slides.lockSwipes(true);
  }

}
