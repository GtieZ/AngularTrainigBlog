import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { Article } from 'src/app/models/article';
import { ArticleService } from 'src/app/services/article.service';

@Component({
  selector: 'search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
  providers: [ArticleService]
})


export class SearchComponent implements OnInit {

  public componentName: string;
  public articles!: Article[];

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _articleService: ArticleService
  ) {
    this.componentName = 'Búsqueda';
  }


  ngOnInit(): void {
    this._route.params.subscribe(params => {
      let query = params['search'];
      this._articleService.search(query).subscribe({
        next: response => {
          if(response.articles){
            this.articles = response.articles;
          }
        },
        error: error => {
          console.log(error);
          this.articles = [];
        }
      });
    });
  }



}
