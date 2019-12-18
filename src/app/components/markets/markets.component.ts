import { Component, OnInit, Input } from '@angular/core';
import { Market } from '../../interfaces/interfaces';
import { Route } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-markets',
  templateUrl: './markets.component.html',
  styleUrls: ['./markets.component.scss'],
})
export class MarketsComponent implements OnInit {

  @Input() markets: Market[] = [];
  @Input() isRequest: boolean;

  constructor(private navCtrl: NavController) { }

  ngOnInit() { }

  goTab2() {
    this.navCtrl.navigateForward('/main/tabs/tab2');
  }

}
