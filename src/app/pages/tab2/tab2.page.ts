import { Component, OnInit, ViewChild } from '@angular/core';
import { MarketsService } from '../../services/markets.service';
import { Category } from 'src/app/interfaces/interfaces';
import { IonSlides } from '@ionic/angular';
import { Storage } from '@ionic/storage';


@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {

  titulo = 'Mercado';
  categories: Category[] = [];
  idCategory = '';
  // activated = false;

  @ViewChild('slidesCategory', { static: true }) slidesCategory: IonSlides;


  constructor(
    private marketsService: MarketsService,
    private storage: Storage
  ) { }

  ngOnInit() {
    this.marketsService.getCategories().subscribe(resp => {
      this.categories.push(...resp.categories);
      this.categoryChanged();
    });
  }

  ionViewWillLeave() {
    this.storage.get('market').then(market => {
      console.log('storage : ', market);
    });
  }

  async categoryChanged() {
    this.idCategory = await this.slidesCategory.getActiveIndex().then(index => this.categories[index]._id);
  }

  slideLock(activated: boolean) {
    this.slidesCategory.lockSwipes(activated);
  }
}
