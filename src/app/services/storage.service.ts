import { Injectable, EventEmitter } from '@angular/core';
import { Market, OrderProduct } from '../interfaces/interfaces';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  newMarket = new EventEmitter<Market>();
  newItem = new EventEmitter<any>();

  constructor(
    private storage: Storage
  ) { }


  saveMarket(market: Market[]) {
    this.storage.set('market', market).then(markets => {
      this.newMarket.emit(markets);
    });
  }

  saveProduct(products: OrderProduct[]) {
    const market = [{
      _id: null,
      products
    }];
    this.saveMarket(market);
  }

  saveItem(item: any) {
    this.storage.set('items', item).then(items => {
      this.newItem.emit(items);
    });
  }
}
