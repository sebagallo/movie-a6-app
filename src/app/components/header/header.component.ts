import { Component, OnInit } from '@angular/core';
import {MovieConfig} from '../../config/movie.config';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public title: string = MovieConfig.websiteName;

  constructor() { }

  ngOnInit() {
  }

}
