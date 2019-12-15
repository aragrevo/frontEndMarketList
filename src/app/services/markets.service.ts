import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { ResponseMarkets, ResponseCategories, User, ResponseSubcategories, ResponseProducts } from '../interfaces/interfaces';
import { UserService } from './user.service';


const URL = environment.url;

@Injectable({
  providedIn: 'root'
})
export class MarketsService {

  pageMarkets = 0;
  user: User = {};

  constructor(
    private http: HttpClient,
    private storage: Storage,
    private userService: UserService) { }

  getMarkets(pull = false) {
    if (pull) {
      this.pageMarkets = 0;
    }
    this.pageMarkets++;

    return new Promise(resolve => {

      this.http.get<ResponseMarkets>(`${URL}/markets/?page=${this.pageMarkets}`)
        .subscribe(async resp => {
          // tslint:disable-next-line: no-string-literal
          if (!resp['ok']) {
            resolve(false);
          }
          // this.user = this.userService.getUser().
          const marketsUser = resp.markets.filter((x, index) => {
            return x.user._id === this.userService.getUser()._id;
          });

          // tslint:disable-next-line: no-string-literal
          await this.saveMarket(marketsUser);
          resolve(true);
        });
    });

  }

  getCategories() {
    return this.http.get<ResponseCategories>(`${URL}/products/category`);
  }

  getSubcategories(id: string) {
    return this.http.get<ResponseSubcategories>(`${URL}/products/category/${id}`);
  }

  getProducts() {
    return this.http.get<ResponseProducts>(`${URL}/products/product`);
  }

  async saveMarket(market: any) {
    await this.storage.set('market', market);
  }
}
