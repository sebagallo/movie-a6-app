import {Component, OnInit} from '@angular/core';
import {SeoService} from './services/seo.service';
import * as AOS from 'aos';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(private seo: SeoService) {
  }

  ngOnInit() {
    AOS.init();
    this.seo.setDefaults();
  }

}
