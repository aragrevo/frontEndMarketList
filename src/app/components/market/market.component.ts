import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { Market, ResponseCategories } from '../../interfaces/interfaces';
import { Storage } from '@ionic/storage';
import { UiServiceService } from '../../services/ui-service.service';
import { MarketsService } from '../../services/markets.service';
import { StorageService } from '../../services/storage.service';

@Component({
  selector: 'app-market',
  templateUrl: './market.component.html',
  styleUrls: ['./market.component.scss'],
})
export class MarketComponent implements OnChanges {

  @Input() market: Market = {};
  @Input() isRequested: boolean;
  byCategory = {};
  allProducts = [];
  categories = [];

  constructor(
    private storage: Storage,
    private storageService: StorageService,
    private uiService: UiServiceService,
    private marketsService: MarketsService
  ) { }

  ngOnChanges() {
    // this.marketsService.getCategories().subscribe(res => {
    //   this.categories = res.categories.map(x => {
    //     return { category: x.category, categoryId: x._id };
    //   });

    //   this.marketsService.getProducts().subscribe(resp => {
    //     this.allProducts = [...resp.products];

    //     const newArray = this.market.products.map(prod => {
    //       this.allProducts.forEach(allPro => {
    //         if (allPro._id === prod._id) {
    //           this.categories.forEach(cat => {
    //             if (allPro.subcategory.category === cat.categoryId) {
    //               prod.category = cat.category;
    //             }
    //           });
    //         }
    //       });
    //       return prod;
    //     });
    //     this.byCategory = [...newArray];
    //   });
    // });
    // console.log(this.byCategory);
  }

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
