import { Component, OnInit, Input } from '@angular/core';
import { MarketsService } from '../../services/markets.service';
import { UserService } from '../../services/user.service';
import { User } from '../../interfaces/interfaces';

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
    private userService: UserService
  ) { }

  ngOnInit() {
    this.user = this.userService.getUser();
  }

  logout() {
    this.marketsService.pageMarkets = 0;
    this.userService.logout();
  }

}
