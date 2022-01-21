import { ModuleWithProviders } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { HomeComponent } from "./components/home/home.component";
import { BlogComponent } from "./components/blog/blog.component";
import { ArticleComponent } from "./components/article/article.component";
import { NotFoundComponent } from "./components/not-found/not-found.component";
import { SearchComponent } from "./components/search/search.component";
import { ArticleNewComponent } from "./components/article-new/article-new.component";
import { ArticleEditComponent } from "./components/article-edit/article-edit.component";


const appRoutes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'home', component: HomeComponent },
    { path: 'blog', component: BlogComponent },
    { path: 'blog/article/:id', component: ArticleComponent},
    { path: 'blog/create', component: ArticleNewComponent},
    { path: 'blog/edit/:id', component: ArticleEditComponent},
    { path: 'buscar/:search', component: SearchComponent},

    { path: '**', component: NotFoundComponent }
];


export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders<any> = RouterModule.forRoot(appRoutes);