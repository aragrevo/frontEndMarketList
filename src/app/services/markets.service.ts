import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { ResponseMarkets, ResponseCategories, User } from '../interfaces/interfaces';
import { UserService } from './user.service';
import { filter } from 'rxjs/operators';


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
    // this.user = this.userService.getUser();
    this.pageMarkets++;
    return this.http.get<ResponseMarkets>(`${URL}/markets/?page=${this.pageMarkets}`);
    // .pipe(
    //   filter((response, index) => {
    //     return response.markets[index].user._id === this.user._id;
    //   })
    // );
  }

  getCategories() {
    return this.http.get<ResponseCategories>(`${URL}/markets/category`);
  }
}
