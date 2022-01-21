import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import Swal from 'sweetalert2';

import Global from 'src/app/services/global';
import { Article } from 'src/app/models/article';
import { ArticleService } from 'src/app/services/article.service';

@Component({
  selector: 'article-edit',
  templateUrl: '../article-new/article-new.component.html',
  styleUrls: ['./article-edit.component.css'],
  providers: [ArticleService]
})

export class ArticleEditComponent implements OnInit {


  afuConfig = {
    multiple: false,
    formatsAllowed: ".jpg,.png, .gif, .jpeg",
    maxSize: 50,
    uploadAPI: {
      url: Global.url + "upload-image",
    },
    theme: "attachPin",
    hideProgressBar: true,
    hideResetBtn: true,
    hideSelectBtn: false,
    fileNameIndex: true,
    autoUpload: false,
    replaceTexts: {
      selectFileBtn: 'Select Files',
      resetBtn: 'Reset',
      uploadBtn: 'Upload',
      dragNDropBox: 'Drag N Drop',
      attachPinBtn: 'Sube una imagen para el articulo',
      afterUploadMsg_success: 'Successfully Uploaded !',
      afterUploadMsg_error: 'Upload Failed !',
      sizeLimit: 'Size Limit'
    }
  };

  public article: Article;
  public status: string | undefined;
  public is_edit: boolean;
  public page_title: string;
  public url: string;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _articleService: ArticleService
  ) {
    this.article = new Article('', '', '', '', null);
    this.is_edit = true;
    this.page_title = 'Editar';
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

  onSubmit() {
    this._articleService.updateArticle(this.article._id, this.article).subscribe({
      next: response => {
        if (response.status == 'success') {
          this.status = 'success';
          this.article = response.article;

          Swal.fire({  
            icon: 'success',  
            title: 'Artículo editado!!',  
            text: 'El artículo ha sido editado correctamente',    
          });

          this._router.navigate(['/blog/article', this.article._id]);
        } else {
          this.status = 'error';
        }
      },
      error: error => {
        console.log(error);
        this.status = 'error';
      }
    });
  }

  imageUpload(data: any) {
    this.article.image = data.body.image;
  }

}
