import { Component, OnInit } from '@angular/core';

import { ArticleService } from 'src/app/services/article.service';
import { Article } from '../../models/article';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [ArticleService]
})
export class HomeComponent implements OnInit {

  public componentName: string;
  public articles!: Article[];

  constructor(
    private _articleService: ArticleService
  ) {
    this.componentName = "Inicio";
  }

  ngOnInit(): void {
    this._articleService.getArticles(true).subscribe({
      next: response => {
        if (response.articles) {
          this.articles = response.articles;
        }
      },
      error: error => {
        console.log(error);
      }
    });
  }

}
