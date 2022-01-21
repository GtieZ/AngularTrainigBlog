import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import Swal from 'sweetalert2';

import { Article } from 'src/app/models/article';
import { ArticleService } from 'src/app/services/article.service';
import Global from 'src/app/services/global';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css'],
  providers: [ArticleService]
})


export class ArticleComponent implements OnInit {

  public article: Article;
  public url: string;
  public componentName: string;

  constructor(
    private _articleService: ArticleService,
    private _route: ActivatedRoute,
    private _router: Router
  ) {
    this.componentName = "Artículos";
    this.article = new Article('', '', '', '', null);
    this.url = Global.url;
  }

  ngOnInit(): void {
    this._route.params.subscribe(params => {
      let id = params['id'];

      this._articleService.getArticle(id).subscribe({
        next: response => {
          if (response.article) {
            this.article = response.article;
          }
        },
        error: error => {
          console.log(error);
        }
      });
    });
  }

  deleteArticle(id: string) {
    this._articleService.deleteArticle(id).subscribe({
      next: response => {
        this._router.navigate(['/blog']);
      },
      error: error => {
        console.log(error);
        this._router.navigate(['/blog']);
      }
    });
  }

  onDelete(articleId: string) {
    Swal.fire({
      title: '¿Está seguro que desea eliminarlo?',
      text: 'El artículo se borrará de forma permanente.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Ok',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.value) {
        this.deleteArticle(articleId);

        Swal.fire(
          'Eliminado!',
          'El artículo ha sido eliminado correctamente.',
          'success'
        );
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelado',
          'Tu artículo está a salvo :)',
          'error'
        );
      }
    });
  }


}
