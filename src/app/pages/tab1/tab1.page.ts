import { Component, OnInit } from '@angular/core';
import { MarketsService } from '../../services/markets.service';
import { Market } from 'src/app/interfaces/interfaces';
import { UserService } from '../../services/user.service';
import { User } from '../../interfaces/interfaces';
import { Storage } from '@ionic/storage';
import { StorageService } from '../../services/storage.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  markets: Market[] = [];
  user: User = {};
  isRequest = false;
  titulo = 'Pedidos';

  constructor(
    private marketsService: MarketsService,
    private userService: UserService,
    private storageService: StorageService,
    private storage: Storage) { }

  ngOnInit() {
    this.marketsService.getMarkets().then(x => {
      if (!x) {
        return;
      }
      this.loadDataStorage();
      this.user = this.userService.getUser();
    });

    this.storageService.newMarket.subscribe(market => {
      this.markets = [...market];
      this.isRequest = true;
    });
  }

  doRefresh(event) {
    this.loadDataStorage(event);
    this.markets = [];
  }

  async loadDataStorage(event?) {
    await this.storage.get('market').then(market => {
      this.markets = [...market];
    });

    if (event) {
      event.target.complete();
    }
  }
}
