import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { MarketsService } from '../../services/markets.service';
import { Product, OrderProduct } from '../../interfaces/interfaces';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnChanges {

  products: Product[] = [];
  productsOrder: OrderProduct[] = [];

  @Input() idSubcategory: string;

  constructor(private marketsService: MarketsService) { }

  ngOnChanges() {
    this.marketsService.getProducts().subscribe(resp => {
      this.products = [...resp.products.filter((x, index) => {
        if (x.subcategory._id === this.idSubcategory) {
          this.productsOrder.push({ _id: x._id, product: x.product, quantity: 0 });
          return resp.products;
        }
      }
      )];
      console.log(this.productsOrder);
    });
  }

  downClick(event) {
    const index = this.productsOrder.findIndex(element => {
      return element._id === event;
    });
    this.productsOrder[index].quantity--;
  }
  upClick(event) {
    const index = this.productsOrder.findIndex(element => {
      return element._id === event;
    });
    this.productsOrder[index].quantity++;
  }

  addedClick() {
    console.log('addedClick()');
  }

}
