import { Component, OnInit } from '@angular/core';
import { UiServiceService } from '../../services/ui-service.service';

@Component({
  selector: 'app-tab4',
  templateUrl: 'tab4.page.html',
  styleUrls: ['tab4.page.scss']
})
export class Tab4Page implements OnInit {

  titulo = 'Productos';

  constructor(private uiService: UiServiceService) { }

  ngOnInit() {
    this.uiService.dismissPresentLoading();
  }

}
