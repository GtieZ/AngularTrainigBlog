import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";

import { Article } from "../models/article";
import Global from "./global";


@Injectable()
export class ArticleService {

    public url: string;

    constructor(
        private _http: HttpClient
    ) {
        this.url = Global.url;
    }


    getArticles(last: any = null): Observable<any> {
        let query = "articles";
        if (last != null) {
            query += "/true";
        }

        let endpoint = this.url + query;
        return this._http.get(endpoint);
    }

    getArticle(articleId: string): Observable<any> {
        let endpoint = this.url + 'article/' + articleId;
        return this._http.get(endpoint);
    }

    search(query: string): Observable<any> {
        let endpoint = this.url + 'search/' + query;
        return this._http.get(endpoint);
    }

    createArticle(article: Article): Observable<any> {
        let body = JSON.stringify(article);
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        let endpoint = this.url + "save";

        return this._http.post(endpoint, body, { headers: headers });
    }

    updateArticle(id: string, article: Article): Observable<any> {
        let body = JSON.stringify(article);
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        let endpoint = this.url + 'article/' + id;

        return this._http.put(endpoint, body, { headers: headers });
    }

    deleteArticle(id: string): Observable<any> {
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        let endpoint = this.url + 'article/' + id;
        return this._http.delete(endpoint, {headers: headers});
    }


}

