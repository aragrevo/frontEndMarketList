import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { ResponseMarkets, ResponseCategories, User, ResponseSubcategories, ResponseProducts, Market } from '../interfaces/interfaces';
import { UserService } from './user.service';
import { StorageService } from './storage.service';
import { Storage } from '@ionic/storage';

import { map } from 'rxjs/operators';


const URL = environment.url;

@Injectable({
  providedIn: 'root'
})
export class MarketsService {

  pageMarkets = 0;
  user: User = {};
  token: string = null;


  constructor(
    private http: HttpClient,
    private storageService: StorageService,
    private userService: UserService,
    private storage: Storage) { }

  getMarkets(pull = false) {
    if (pull) {
      this.pageMarkets = 0;
    }
    this.pageMarkets++;

    return new Promise(resolve => {

      this.http.get<ResponseMarkets>(`${URL}/markets/?page=${this.pageMarkets}`)
        .subscribe(resp => {
          // tslint:disable-next-line: no-string-literal
          if (!resp['ok']) {
            resolve(false);
          }
          // this.user = this.userService.getUser().
          const marketsUser = resp.markets.filter((x, index) => {
            return x.user._id === this.userService.getUser()._id;
          });

          // tslint:disable-next-line: no-string-literal
          this.storageService.saveMarket(marketsUser);
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
    return this.http.get<ResponseProducts>(`${URL}/products/product`).pipe(
      map(resp => {
        return resp.products.sort((a, b) => {
          return (b.product > a.product) ? -1 : 1;
        });
      })
    );
  }

  createMarket(market: Market) {

    return new Promise(async resolve => {

      this.token = await this.storage.get('token').then(token => token);
      const headers = new HttpHeaders({
        'x-token': this.token
      });

      this.http.post(`${URL}/markets/create`, market[0], { headers })
        .subscribe(resp => {
          // tslint:disable-next-line: no-string-literal
          if (!resp['ok']) {
            resolve(false);
            return;
          }
          resolve(true);
        });


    });
  }

  updateMarket(market: Market) {

    return new Promise(resolve => {
      const id = market[0]._id;

      this.http.post(`${URL}/markets/update/${id}`, market[0].products)
        .subscribe(async resp => {
          // tslint:disable-next-line: no-string-literal
          if (!resp['ok']) {
            resolve(false);
            return;
          }
          // tslint:disable-next-line: no-string-literal
          resolve(resp['ok']);
        });
    });
  }

  createProduct(product) {
    return new Promise(resolve => {
      this.http.post(`${URL}/products/product`, product).subscribe(resp => {
        resolve(resp);
      });
    });
  }
}
