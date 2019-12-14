import { Injectable } from '@angular/core';
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
    private userService: UserService) { }

  getMarkets(pull = false) {
    if (pull) {
      this.pageMarkets = 0;
    }
    this.pageMarkets++;
    return this.http.get<ResponseMarkets>(`${URL}/markets/?page=${this.pageMarkets}`);
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
}
