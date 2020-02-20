import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/interfaces/interfaces';
import { UserService } from 'src/app/services/user.service';
import { NgForm } from '@angular/forms';
import { UiServiceService } from '../../services/ui-service.service';
import { MarketsService } from '../../services/markets.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {

  titulo = 'Usuario';
  user: User = {};
  colorUser = '';

  constructor(
    private userService: UserService,
    private uiService: UiServiceService,
    private marketsService: MarketsService) { }

  ngOnInit() {
    this.user = this.userService.getUser();
    if (this.user.profile === 'admin') {
      this.colorUser = 'dark';
    }
  }

  async update(formUpdate: NgForm) {

    if (formUpdate.invalid) { return; }

    const updated = await this.userService.updateUser(this.user);
    const message = updated ? 'Usuario Actualizado' : 'No se actualizó';
    this.uiService.presentToast(message);
  }

}
