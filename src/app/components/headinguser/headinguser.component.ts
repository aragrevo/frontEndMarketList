import { Component, OnInit, Input } from '@angular/core';
import { User } from 'src/app/interfaces/interfaces';

@Component({
  selector: 'app-headinguser',
  templateUrl: './headinguser.component.html',
  styleUrls: ['./headinguser.component.scss'],
})
export class HeadinguserComponent implements OnInit {

  @Input() user: User = {};

  constructor() { }

  ngOnInit() { }

}
