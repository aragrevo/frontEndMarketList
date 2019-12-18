import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { MarketsService } from '../../services/markets.service';
import { OrderProduct } from '../../interfaces/interfaces';
import { UiServiceService } from '../../services/ui-service.service';
import { Storage } from '@ionic/storage';
import { StorageService } from '../../services/storage.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnChanges, OnInit {

  products: OrderProduct[] = [];
  productsOrder: OrderProduct[] = [];


  @Input() idSubcategory: string;

  constructor(
    private marketsService: MarketsService,
    private uiService: UiServiceService,
    private storageService: StorageService,
    private storage: Storage) { }

  async ngOnInit() {
    await this.storage.get('market').then((market) => {
      this.productsOrder = [...market[0].products] || [];
    });
  }

  ngOnChanges() {
    this.marketsService.getProducts().subscribe(resp => {
      this.products = resp.products.filter((x, index) => {
        return x.subcategory._id === this.idSubcategory;
      }).map(x => {
        return { _id: x._id, product: x.product, quantity: 0 };
      });
    });
  }

  downClick(event) {
    const index = this.products.findIndex(element => {
      return element._id === event;
    });
    this.products[index].quantity--;
  }

  upClick(event) {
    const index = this.products.findIndex(element => {
      return element._id === event;
    });
    this.products[index].quantity++;
  }

  addedClick(product: OrderProduct) {
    let message = 'Agregado';
    const index = this.productsOrder.findIndex(element => element._id === product._id);
    if (index !== -1) {
      this.productsOrder.splice(index, 1);
      message = 'Modificado';
    }
    this.uiService.presentToast(`${product.product}: ${message} ${product.quantity} unidades`, 'middle');
    if (product.quantity !== 0) {
      this.productsOrder.push({ ...product });
    }
    this.addProductStorage(this.productsOrder);
  }

  // Metodo para pintar el badge
  getQuantity(id: string): any {
    const index = this.productsOrder.findIndex(element => element._id === id);
    return index !== -1 ? this.productsOrder[index].quantity : '';
  }

  async addProductStorage(products: any) {
    const marketUser = await this.storage.get('market').then(market => {
      return market;
    });
    if (marketUser.length === 0) {
      this.storageService.saveProduct(products);
      return;
    }
    marketUser[0].products = [...products];
    this.storageService.saveMarket(marketUser);
  }

}
