import { Component, OnInit, ViewChild, Input, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
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
  loading = false;
  skeleton = ['30%', '60%', '80%', '10%', '100%'];


  @Input() idCategory: string;
  @Output() slideCategory = new EventEmitter<boolean>();
  @ViewChild('slidesSubcategory', { static: true }) slidesSubcategory: IonSlides;

  constructor(private marketsService: MarketsService) { }

  ngOnChanges() {
    this.loading = true;
    this.marketsService.getSubcategories(this.idCategory).subscribe(resp => {
      this.subcategories = [...resp.subcategories] || [];
      this.slidesSubcategory.lockSwipes(true);
      this.loading = false;
    });
  }

  slideSubChanged() {
    this.slidesSubcategory.getActiveIndex().then(index => {
      if (index === 0) {
        this.slidesSubcategory.lockSwipes(true);
        this.slideCategory.emit(false);
      }
    });
  }

  buttonClick(event) {
    this.slideCategory.emit(true);
    this.idSubcategory = event;
    this.slidesSubcategory.lockSwipes(false);
    this.slidesSubcategory.slideTo(1);
  }


}
