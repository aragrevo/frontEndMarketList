import { Component, OnInit } from '@angular/core';
import { MarketsService } from '../../services/markets.service';
import { Category } from 'src/app/interfaces/interfaces';
import { UiServiceService } from '../../services/ui-service.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {

  categories: Category[] = [];
  boton: string;

  slideOpts = {
    initialSlide: 2,
    speed: 400
  };



  constructor(
    private marketsService: MarketsService,
    private uiService: UiServiceService
  ) { }

  ngOnInit() {
    this.marketsService.getCategories().subscribe(resp => {
      this.categories.push(...resp.categories);
      console.log(this.categories);
    });

  }

  async buttonClick(event) {
    const product = await this.uiService.presentPicker(event);
    console.log('product :', product);
  }

}
