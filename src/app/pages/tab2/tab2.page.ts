import { Component, OnInit, ViewChild } from '@angular/core';
import { MarketsService } from '../../services/markets.service';
import { Category } from 'src/app/interfaces/interfaces';
import { IonSlides, IonSearchbar, ModalController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { Subcategory } from '../../interfaces/interfaces';
import { ModalProductPage } from '../modal-product/modal-product.page';


@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {

  titulo = 'Productos';
  categories: Category[] = [];
  subcategories: Subcategory[] = [];
  idCategory = '';

  @ViewChild('slidesCategory', { static: true }) slidesCategory: IonSlides;
  @ViewChild('searchbar', { static: true }) searchbar: IonSearchbar;


  constructor(
    private marketsService: MarketsService,
    private storage: Storage,
    private modalCtrl: ModalController
  ) { }

  ngOnInit() {
    this.marketsService.getCategories().subscribe(resp => {
      this.categories.push(...resp.categories);
      this.categoryChanged();
    });
  }

  async categoryChanged() {

    this.idCategory = await this.slidesCategory.getActiveIndex().then(index => this.categories[index]._id);
  }

  slideLock(activated: boolean) {
    this.slidesCategory.lockSwipes(activated);
  }

  async searchInput(event) {
    const text = await this.searchbar.getInputElement().then(x => {
      return x.value;
    });
    console.log(text);
  }

  async addProduct() {
    const modal = await this.modalCtrl.create({
      component: ModalProductPage,
      componentProps: {
        categories: this.categories
      }
    });
    console.log('Add Product');
    return await modal.present();
  }
}
