import { Component, OnInit } from '@angular/core';
import { MarketsService } from '../../services/markets.service';
import { Market } from 'src/app/interfaces/interfaces';
import { UserService } from '../../services/user.service';
import { User } from '../../interfaces/interfaces';
import { Storage } from '@ionic/storage';
import { StorageService } from '../../services/storage.service';
import { UiServiceService } from '../../services/ui-service.service';
import { NavController } from '@ionic/angular';

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
    private uiService: UiServiceService,
    private navCtrl: NavController,
    private storage: Storage) { }

  ngOnInit() {
    this.marketsService.getMarkets().then(x => {
      if (!x) {
        return;
      }
      this.loadDataStorage();
      this.uiService.dismissPresentLoading();
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
      console.log(this.markets);
    });

    if (event) {
      console.log(event.target);
      event.target.complete();
    }
  }

  goTab2() {
    // this.navCtrl.navigateForward('/main/tabs/tab2');
    this.navCtrl.navigateRoot('/main/tabs/tab2', { animated: true });
  }
}
