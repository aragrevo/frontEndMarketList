import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Storage } from '@ionic/storage';
import { User } from '../interfaces/interfaces';
import { NavController } from '@ionic/angular';
import { UiServiceService } from './ui-service.service';

const URL = environment.url;

@Injectable({
  providedIn: 'root'
})
export class UserService {

  token: string = null;
  private user: User = {};

  constructor(
    private http: HttpClient,
    private storage: Storage,
    private navCtrl: NavController,
    private uiService: UiServiceService
  ) { }

  login(name: string) {
    const data = { name };
    this.uiService.presentLoadingWithOptions();

    return new Promise(resolve => {

      this.http.post(`${URL}/user/login`, data)
        .subscribe(async resp => {
          // tslint:disable-next-line: no-string-literal
          if (!resp['ok']) {
            this.token = null;
            this.storage.clear();
            resolve(false);
            return;
          }
          // tslint:disable-next-line: no-string-literal
          await this.saveToken(resp['token']);
          // tslint:disable-next-line: no-string-literal
          this.user = resp['user'];
          resolve(true);
        });
    });
  }

  logup(name: string, avatar: string) {
    const data = { name, avatar };

    return new Promise(resolve => {
      this.http.post(`${URL}/user/create`, data)
        .subscribe(async resp => {
          // tslint:disable-next-line: no-string-literal
          if (!resp['ok']) {
            this.token = null;
            this.storage.clear();
            resolve(false);
            return;
          }

          // tslint:disable-next-line: no-string-literal
          await this.saveToken(resp['token']);
          // tslint:disable-next-line: no-string-literal
          this.user = resp['user'];
          resolve(true);
        });
    });
  }

  updateUser(user: User) {
    const headers = new HttpHeaders({
      'x-token': this.token
    });

    return new Promise(resolve => {
      this.http.post(`${URL}/user/update`, user, { headers })
        .subscribe(resp => {
          // tslint:disable-next-line: no-string-literal
          if (!resp['ok']) {
            resolve(false);
            return;
          }
          // tslint:disable-next-line: no-string-literal
          this.saveToken(resp['token']);
          // tslint:disable-next-line: no-string-literal
          this.user = resp['user'];
          resolve(true);
        });
    });
  }

  logout() {
    this.token = null;
    this.user = null;
    this.storage.clear();
    this.navCtrl.navigateRoot('/login', { animated: true });
  }

  async saveToken(token: string) {
    this.token = token;
    await this.storage.set('token', token);
  }

  getUser() {
    return { ...this.user };
  }
}
