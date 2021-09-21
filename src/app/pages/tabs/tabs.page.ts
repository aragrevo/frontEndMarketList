import {Component} from '@angular/core';
import {UserService} from '../../services/user.service';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss'],
})
export class TabsPage {
  constructor(private userService: UserService) {}

  getProfile() {
    const profileUser = this.userService.getUser().profile;
    return profileUser === 'person';
  }
}
