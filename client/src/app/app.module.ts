import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { APP_BASE_HREF } from "@angular/common";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { NgxChartsModule } from "@swimlane/ngx-charts";
import { CommonModule } from "@angular/common";
import { ScrollingModule } from "@angular/cdk/scrolling";
import { TabsModule } from "./tabs/tabs.module";

// import * as NgxChartsModule  from '@swimlane/ngx-charts'

import { ArticlesFilterPipe, ReplacePipe, SortByPipe } from "./pipes";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { ArticleResolver } from "./core/article-resolver.service";
import {
	SidebarComponent,
	HeaderComponent,
	SearchInputComponent,
	MobileBottomNavComponent,
	DarkModeButtonComponent,
	SpinnerComponent
} from "./shared";

import { DashboardComponent, ContentContainerComponent } from "./dashboard";
import { AboutComponent } from "./about/about.component";
// import { CoreModule } from './core/';
import {
	ErrorInterceptor,
	HttpHeaderInterceptor,
	CacheInterceptor
} from "./core/interceptors";

import { FormsModule } from "@angular/forms";
import { SourceComponent } from "./source/source.component";
import { ArticleComponent, ArticleCardComponent } from "./article";
import { FeedComponent } from "./feed/feed.component";
import { CurrencyComponent, CurrencyDetailsComponent } from "./currency";
import { DefaultViewContentContainerComponent } from "./dashboard/default-view-content-container/default-view-content-container.component";
import { MobileArticleComponent } from "./article/mobile-article/mobile-article.component";
import { CurrencyResolver, SideBarService } from "./core";
import { TweetComponent } from "./tweet/tweet.component";
import { LoadingInterceptor } from "./core/interceptors/loading.interceptor";
import { ChartCurrencyComponent } from "./chart/chart-currency.component";
import { HolderDirective } from "./core/holder.directive";
import { TopCurrencyChartComponent } from "./chart/top-currency-chart/top-currency-chart.component";
import { ChartListComponent } from "./chart/chart-list/chart-list.component";

@NgModule({
	declarations: [
		AppComponent,
		SidebarComponent,
		HeaderComponent,
		SearchInputComponent,
		MobileBottomNavComponent,
		DarkModeButtonComponent,
		DashboardComponent,
		ContentContainerComponent,
		AboutComponent,
		SourceComponent,
		ArticleComponent,
		ArticleCardComponent,
		FeedComponent,
		CurrencyComponent,
		ArticlesFilterPipe,
		ReplacePipe,
		SortByPipe,
		DefaultViewContentContainerComponent,
		MobileArticleComponent,
		TweetComponent,
		SpinnerComponent,
		ChartCurrencyComponent,
		CurrencyDetailsComponent,
		HolderDirective,
		TopCurrencyChartComponent,
		ChartListComponent
	],
	imports: [
		BrowserModule,
		BrowserAnimationsModule,
		AppRoutingModule,
		CommonModule,
		FormsModule,
		HttpClientModule,
		NgxChartsModule,
		ScrollingModule,
		TabsModule
	],
	providers: [
		{ provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
		// { provide: HTTP_INTERCEPTORS, useClass: CacheInterceptor, multi: true,  },
		{
			provide: HTTP_INTERCEPTORS,
			useClass: HttpHeaderInterceptor,
			multi: true
		},
		{ provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true },
		{ provide: APP_BASE_HREF, useValue: "" },
		ArticleResolver,
		CurrencyResolver
	],
	bootstrap: [AppComponent]
})
export class AppModule {}
