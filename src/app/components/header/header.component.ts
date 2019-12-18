import { Component, OnInit, Input } from '@angular/core';
import { MarketsService } from '../../services/markets.service';
import { UserService } from '../../services/user.service';
import { User } from '../../interfaces/interfaces';
import { Storage } from '@ionic/storage';
import { UiServiceService } from '../../services/ui-service.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {

  @Input() titulo: string;
  user: User = {};

  constructor(
    private marketsService: MarketsService,
    private userService: UserService,
    private storage: Storage,
    private uiService: UiServiceService
  ) { }

  ngOnInit() {
    this.user = this.userService.getUser();
  }

  logout() {
    this.marketsService.pageMarkets = 0;
    this.userService.logout();
  }

  updateMarket() {
    this.storage.get('market').then(market => {
      if (market.length === 0) {
        this.uiService.presentAlert('No hay nada para agregar');
        return;
      }
      if (!market[0]._id) {
        this.marketsService.createMarket(market).then(resp => {
          if (!resp) { return; }
          this.marketsService.getMarkets(true).then(res => {
            this.uiService.presentAlert('Productos almacenados en el Servidor');
          });
        });
        return;
      }
      this.marketsService.updateMarket(market).then(resp => {
        if (!resp) { return; }
        this.uiService.presentAlert('Productos almacenados en el Servidor');
      });
    });
  }

}
