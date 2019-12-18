import { Component, OnInit, Input } from '@angular/core';
import { Market } from '../../interfaces/interfaces';
import { Storage } from '@ionic/storage';
import { UiServiceService } from '../../services/ui-service.service';
import { MarketsService } from '../../services/markets.service';
import { StorageService } from '../../services/storage.service';

@Component({
  selector: 'app-market',
  templateUrl: './market.component.html',
  styleUrls: ['./market.component.scss'],
})
export class MarketComponent implements OnInit {

  @Input() market: Market = {};
  @Input() isRequested: boolean;

  constructor(
    private storage: Storage,
    private storageService: StorageService,
    private uiService: UiServiceService
  ) { }

  ngOnInit() { }

  async deleteProduct(id: string) {
    const marketUser: Market[] = await this.storage.get('market').then(market => {
      const index = market[0].products.findIndex(element => element._id === id);
      this.uiService.presentToast(`${market[0].products[index].product} eliminado`, 'middle');
      market[0].products.splice(index, 1);
      return market;
    });
    this.storageService.saveMarket(marketUser);
  }

}
