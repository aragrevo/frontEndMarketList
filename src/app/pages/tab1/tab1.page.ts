import { Component, OnInit } from '@angular/core';
import { MarketsService } from '../../services/markets.service';
import { Market } from 'src/app/interfaces/interfaces';
import { UserService } from '../../services/user.service';
import { User } from '../../interfaces/interfaces';

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
    private userService: UserService) { }

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

    this.marketsService.getMarkets(pull).subscribe(resp => {

      this.markets.push(...resp.markets);

      this.markets = this.markets.filter((x, index) => {
        return x.user._id === this.user._id;
      });

      if (event) {
        event.target.complete();

        if (resp.markets.length === 0) {
          this.enabled = false;
        }
      }
    });
  }
}
