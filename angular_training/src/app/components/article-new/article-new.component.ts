import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import Swal from 'sweetalert2';

import { Article } from 'src/app/models/article';
import { ArticleService } from 'src/app/services/article.service';
import Global from 'src/app/services/global';


@Component({
  selector: 'article-new',
  templateUrl: './article-new.component.html',
  styleUrls: ['./article-new.component.css'],
  providers: [ArticleService]
})

export class ArticleNewComponent implements OnInit {

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
  public page_title: string;
  public is_edit:boolean;
  public url: string;

  constructor(
    private _articleService: ArticleService,
    private _router: Router,
    private _route: ActivatedRoute
  ) {
    this.article = new Article('', '', '', '', null);
    this.page_title = 'Crear artículo';
    this.is_edit = false;
    this.url = Global.url;
  }


  ngOnInit(): void {
  }

  onSubmit() {
    this._articleService.createArticle(this.article).subscribe({
      next: response => {
        if (response.status == 'success') {
          this.status = 'success';
          this.article = response.article;

          Swal.fire({  
            icon: 'success',  
            title: 'Artículo creado!!',  
            text: 'El artículo ha sido creado correctamente',    
          });

          this._router.navigate(['/blog']);
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

  imageUpload(data: any){
    this.article.image = data.body.image;
  }

}
