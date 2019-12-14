import { Component, OnInit, ViewChild, Input, OnChanges, SimpleChanges } from '@angular/core';
import { IonSlides } from '@ionic/angular';
import { Subcategory } from 'src/app/interfaces/interfaces';
import { MarketsService } from '../../services/markets.service';

@Component({
  selector: 'app-subcategories',
  templateUrl: './subcategories.component.html',
  styleUrls: ['./subcategories.component.scss'],
})
export class SubcategoriesComponent implements OnChanges {

  subcategories: Subcategory[] = [];
  idSubcategory = '';
  // skeleton = ['30%', '60%', '80%', '10%', '100%'];


  @Input() idCategory: string;
  @ViewChild('slidesSubcategory', { static: true }) slidesSubcategory: IonSlides;

  constructor(private marketsService: MarketsService) { }

  ngOnChanges() {
    this.marketsService.getSubcategories(this.idCategory).subscribe(resp => {
      this.subcategories = [...resp.subcategories] || [];
      this.slidesSubcategory.lockSwipes(true);
    });
  }

  slideSubChanged() {
    this.slidesSubcategory.getActiveIndex().then(index => {
      if (index === 0) {
        // this.slidesCategory.lockSwipes(false);
        console.log('slidesSubcategory changed');
        this.slidesSubcategory.lockSwipes(true);
      }
    });
  }

  async buttonClick(event) {
    // this.slidesCategory.lockSwipes(true);
    this.idSubcategory = event;
    this.slidesSubcategory.lockSwipes(false);
    this.slidesSubcategory.slideTo(1);
  }


}
