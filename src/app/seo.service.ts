import {Injectable} from '@angular/core';
import {Title, Meta} from '@angular/platform-browser';
import {MovieConfig} from './movie/config/movie.config';

@Injectable({
  providedIn: 'root'
})
export class SeoService {

  private readonly websiteName;
  private readonly breadcrumbsSeparator;
  private readonly defaultDescription;
  private readonly defaultKeywords;

  constructor(private titleService: Title, private metaService: Meta) {
    this.websiteName = MovieConfig.websiteName;
    this.breadcrumbsSeparator = MovieConfig.breadcrumbsSeparator;
    this.defaultDescription = MovieConfig.defaultDescription;
    this.defaultKeywords = MovieConfig.defaultKeywords;
  }

  public setDefaults() {
    this.titleService.setTitle(this.websiteName);
    this.metaService.addTag({name: 'description', content: this.defaultDescription});
    this.metaService.addTag({name: 'keywords', content: this.defaultKeywords.join(', ')});
  }

  public setTitle(title: string) {
    this.titleService.setTitle(title + this.breadcrumbsSeparator + this.websiteName);
  }

  public setDescription(description: string) {
    this.metaService.addTag({name: 'description', content: description});
  }

  public setKeywords(keywords: string[]) {
    this.metaService.addTag({name: 'keywords', content: keywords.join(', ')});
  }

}
