import { Component, OnInit, Input } from '@angular/core';
import { Market } from '../../interfaces/interfaces';

@Component({
  selector: 'app-markets',
  templateUrl: './markets.component.html',
  styleUrls: ['./markets.component.scss'],
})
export class MarketsComponent implements OnInit {

  @Input() markets: Market[] = [];
  @Input() isRequest: boolean;

  constructor() { }

  ngOnInit() { }

}
