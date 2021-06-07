import { Pipe, PipeTransform } from '@angular/core';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Article } from '../models';

@Pipe({ name: 'SearchFilter' })
export class ArticlesFilterPipe implements PipeTransform {
  /**
   * Transform
   *
   * @param {Observable< Article[]>} articles
   * @param {string} searchText
   * @returns {Observable< Article[]>}
   */
  transform(articles: Observable<Article[]>, searchTerm: string): Observable< Article[]>  {
    // console.log(articles);
    // let Articles = of(articles)
    if (!articles) {
      return of();
    }
    if (!searchTerm) {
      return articles;
    }
    if (searchTerm === "News"){
      
      return articles.pipe(
        tap((data:Article[]) => { 
          
          return  of(data.filter(article => { return article.source.type === "News"}));
        })
        )
      // articles.filter(article => { return article.source.type === "News"})
    }else if(searchTerm === "Media"){
      return articles.pipe(
        tap((data:Article[]) => {           
          return  of(data.filter(article => { return article.source.type === "Media"}));
        })
        )
    }

    
    return articles.pipe(tap((data:Article[]) => {
        let articless=data.filter(article => { 
          if(article.title.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase()))
            return true;
          article.source.keyword.forEach(k=>{
            return k.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase());
          })
          return false;    
        });
      return of(articless);
    }))
    
  }
}