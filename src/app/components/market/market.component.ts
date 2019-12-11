import { Component, OnInit, Input } from '@angular/core';
import { Market } from '../../interfaces/interfaces';

@Component({
  selector: 'app-market',
  templateUrl: './market.component.html',
  styleUrls: ['./market.component.scss'],
})
export class MarketComponent implements OnInit {

  @Input() market: Market = {};

  constructor() { }

  ngOnInit() {
  }

}
