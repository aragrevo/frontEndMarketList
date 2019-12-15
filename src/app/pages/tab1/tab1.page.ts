import { Component, OnInit } from '@angular/core';
import { MarketsService } from '../../services/markets.service';
import { Market } from 'src/app/interfaces/interfaces';
import { UserService } from '../../services/user.service';
import { User, ResponseMarkets } from '../../interfaces/interfaces';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  markets: Market[] = [];
  user: User = {};
  enabled = false;
  titulo = 'Pedidos';

  constructor(
    private marketsService: MarketsService,
    private userService: UserService,
    private storage: Storage) { }

  ngOnInit() {
    this.loadData();
    this.user = this.userService.getUser();
  }

  doRefresh(event) {
    this.loadData(event, true);
    this.enabled = true;
    this.markets = [];
  }

  loadData(event?, pull = false) {

    this.marketsService.getMarkets(pull).then(async resp => {
      console.log(resp);

      // this.markets = [...resp];
      await this.storage.get('market').then(x => {
        console.log(x);
        this.markets = [...x];
      });

      console.log(this.markets);

      if (event) {
        event.target.complete();

        // if (resp.length === 0) {
        //   this.enabled = false;
        // }
      }
    });
  }
}
