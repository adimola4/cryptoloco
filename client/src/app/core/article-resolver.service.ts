import { ActivatedRoute, ActivatedRouteSnapshot, CanActivate, Resolve, Router, RouterStateSnapshot } from "@angular/router"
import { Injectable } from "@angular/core"
import { DataService } from './data.service'
import { Article } from "../models";
import { EMPTY, Observable, of } from "rxjs";
import { catchError, mergeMap, take } from "rxjs/operators";


@Injectable()
export class ArticleResolver implements Resolve<Article> {
  constructor(private dataService:DataService, private router: Router  ) {
  }
  resolve(activatedRoute: ActivatedRouteSnapshot,state: RouterStateSnapshot): any {

    
  return  this.dataService.getArticleByTitle(activatedRoute.params['articleTitle']).pipe(
    take(1),
    mergeMap (article => {
      if ( article ){
          return of(article);
      }else{
        this.router.navigate(['/dashboard']);
        return EMPTY;
      }
    }),
    catchError((err)=> of ("no article found")));
}}