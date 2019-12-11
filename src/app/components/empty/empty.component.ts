import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSlides } from '@ionic/angular';

@Component({
  selector: 'app-empty',
  templateUrl: './empty.component.html',
  styleUrls: ['./empty.component.scss'],
})
export class EmptyComponent implements OnInit {

  @ViewChild('slidesEmpty', { static: true }) slidesEmpty: IonSlides;

  constructor() { }

  ngOnInit() {
    this.slidesEmpty.lockSwipes(true);
  }

}
