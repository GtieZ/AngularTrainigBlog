import { Component, OnInit } from '@angular/core';
import { ArticleService } from 'src/app/services/article.service';
import { Article } from 'src/app/models/article';

@Component({
  selector: 'blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css'],
  providers: [ArticleService]
})


export class BlogComponent implements OnInit {

  public componentName: string;
  public articles!: Article[];

  constructor(
    private _articleService: ArticleService,
  ) {
    this.componentName = "Blog";

  }

  ngOnInit(): void {
    this._articleService.getArticles().subscribe({
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
