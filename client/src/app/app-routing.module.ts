import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

 import { ArticleResolver, CurrencyResolver } from './core'
import { DashboardComponent, DefaultViewContentContainerComponent  } from './dashboard/';
import { AboutComponent } from './about/about.component';
import { ArticleComponent } from './article/article.component';
import { MobileArticleComponent } from './article/mobile-article/mobile-article.component'
import { from } from 'rxjs';
import { CurrencyDetailsComponent } from './currency/currency-details.component';



const routes: Routes = [
  { path: 'article/:articleTitle', component: MobileArticleComponent,
                                resolve: { article: ArticleResolver }},
  { path: 'currency/:currencyId', component: CurrencyDetailsComponent,                              
                                  resolve: { currency: CurrencyResolver}},
  { path: 'dashboard', component: DashboardComponent,
                        children: [
                          {
                            path: '',
                            children: [                              
                              {path: ':articleTitle', component: ArticleComponent,
                                                      resolve: { article:ArticleResolver
                                                       }},
                              {path: 'currency/:currencyId', component: CurrencyDetailsComponent,
                                                      resolve: { currency:CurrencyResolver
                                                       }},
                              {path: '', component: DefaultViewContentContainerComponent},
                              { path:'', redirectTo:'', pathMatch: 'full'},
                              
                            ]
                          }
                                                ]
                      //  resolve: { currencies:CurrenciesResolver} 
                    },
  { path: 'about', component: AboutComponent },
  // { path: 'charts', component:}
  { path: '', redirectTo: 'dashboard', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    useHash:true
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
