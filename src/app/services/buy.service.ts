import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';


const URL = environment.url;


@Injectable({
  providedIn: 'root'
})
export class BuyService {

  constructor(
    private http: HttpClient
  ) { }

  saveBuy(buy) {
    return new Promise(resolve => {

      this.http.post(`${URL}/buys/buy`, buy)
        .subscribe(resp => {
          resolve(resp);
        });
    });
  }

  getItem(id: string) {
    return this.http.get(`${URL}/buys/item/${id}`);
  }
}

