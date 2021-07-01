import {
	Component,
	OnInit,
	Input,
	Inject,
	HostListener,
	ViewChild,
	ComponentFactoryResolver,
	OnChanges,
	ChangeDetectionStrategy,
	SimpleChanges,
	ViewContainerRef
} from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { LocationStrategy, Location } from '@angular/common';

import { BehaviorSubject, forkJoin, Observable, of, Subscription } from 'rxjs';
import { Title } from '@angular/platform-browser';
import {
	trigger,
	state,
	style,
	animate,
	transition,
	keyframes,
	stagger,
	query
} from '@angular/animations';

// import { Source } from "../models/source";
import { HolderDirective } from '../core/holder.directive';
// import { Reader } from "app/models/reader";
import { DataService } from '../core/data.service';
import { Article, Currency, Tweet, ICurrency } from '../models';
import { filter, map, take, tap } from 'rxjs/operators';
import { ContentContainerComponent } from './content-container.component';
import { CurrencyDetailsComponent } from '../currency/currency-details.component';
import { ActivatedRoute, Params, Router, UrlSerializer } from '@angular/router';
import { LoadingService } from '../core/loading.service';

@Component({
	selector: 'app-dashboard',
	templateUrl: './dashboard.component.html',
	styles: [],
	animations: [
		trigger('fadeInGrow', [
			transition('* => *', [
				query(
					':enter',
					[
						style({ opacity: 0, transform: 'translateX(-200px)' }),
						stagger(500, [
							animate(
								'0.5s ease-in',
								style({ opacity: 1, transform: 'translateX(0)' })
							)
						])
					],
					{ optional: true }
				)
			]),
			transition(':leave', [
				query(':leave', [
					style({ opacity: 1 }),
					stagger('50ms', [
						animate(
							'300ms ease-in',
							style({ opacity: 0, transform: 'translateX(-200px)' })
						)
					])
				])
			])
		])
	]
})
export class DashboardComponent implements OnInit, OnChanges {
	@ViewChild('currencycontainer', { read: ViewContainerRef })
	entry: ViewContainerRef;
	// @ViewChild(ContentContainerComponent, { static: false }) contentContainer: ContentContainerComponent;
	@Input()
	currencies: Currency[];
	public articles: Article[] = [];
	public tmp_articles: Article[] = [];
	public articles$: Observable<Article[]>;
	dark: Boolean;
	shownArticle: any;
	currentShown = new BehaviorSubject(null);
	userDeviceWidth: Number;
	article_title: string;
	searchTerm: string;
	loading: Subscription;
	loadingStatus = false;
	loading_articles = true;
	contentType = 'Default';
	shownCurrency: any;
	componentRef: any;
	topCurrencies: Currency[];
	get isMobile(): any {
		return window.innerWidth <= 420;
	}

	// allReaders: Reader[];
	// mostPopularBook: Book;
	constructor(
		private dataService: DataService,
		private title: Title,
		@Inject(DOCUMENT) document: any,
		private router: Router,
		private route: ActivatedRoute,
		private resolver: ComponentFactoryResolver,
		private urlSerializer: UrlSerializer,
		private loadingService: LoadingService,
		private locationStrategy: LocationStrategy
	) {}
	ngOnChanges(changes: SimpleChanges): void {}

	ngOnInit() {
		// console.log(document.getElementsByTagName('html')[0].className)
		if (
			localStorage.theme === 'dark' ||
			(!('theme' in localStorage) &&
				window.matchMedia('(prefers-color-scheme: dark)').matches)
		) {
			document.getElementsByTagName('html')[0].classList.add('dark');
			this.dark = true;
		} else {
			console.log(document.documentElement);
			document.getElementsByTagName('html')[0].classList.remove('dark');
			this.dark = false;
		}
		this.dataService.currencies$.subscribe(data => {
			this.currencies = data;
		});
		this.articles$ = this.dataService.getFeed();
		this.articles$.subscribe(data => {
			this.loading_articles = false;
			this.tmp_articles = data;
		});
		this.dataService.getFeed().subscribe(
			(data: Article[]) => {
				data.map(a => {
					this.articles.push(a);
				});
			},
			(err: any) => console.log(err),
			() => console.log('getting all articles.')
		);
		this.route.params.subscribe((params: Params) => {
			this.article_title = params.articleTitle;
			this.articles$
				.pipe(
					map((data: Article[]) => {
						return data.filter(
							(article: Article) => article.title === this.article_title
						);
					}),
					take(1)
				)
				.subscribe(result => (this.shownArticle = result));
		});
		// this.curreancies= this.route.snapshot.data['currencies'];
		//  console.log("adadadada:",JSON.stringify(currenciesFromResolvar.length));
		// = currenciesFromResolvar;
		this.dataService.getTopCurrency().subscribe(data => {
			console.log('top top top');
			console.log(data);
			this.topCurrencies = data;
		});

		this.userDeviceWidth = window.innerWidth;
		// console.log(this.currencies);
	}
	ngAfterViewInit(): void {
		this.loading = this.loadingService.loading$
			.pipe()
			.subscribe((status: boolean) => {
				this.loadingStatus = status;
			});
	}
	reload() {
		this.router.navigate([this.route]);
	}
	articleClick(event: any) {
		console.log(event);

		this.shownArticle = event;
		this.contentType = 'Article';
	}
	currencyClick(event: any) {
		this.shownCurrency = event;
		this.contentType = 'Currency';
		this.createCurrencyComponent(this.shownCurrency);
	}
	listFake(i: number): Array<number> {
		const a = [];
		for (let index = 0; index < i; index++) {
			a.push(i);
		}
		return a;
	}
	searchChange(term: string) {
		// console.log("aaaa", term);
		this.searchTerm = term;

		if (term === 'News') {
			of(this.tmp_articles)
				.pipe(
					map((data: Article[]) => {
						return data.filter(
							(article: Article) => article.source.type === 'News'
						);
					}),
					filter((articless: Article[]) => {
						return articless && articless.length > 0;
					})
				)
				.subscribe(result => (this.articles$ = of(result)));
		} else if (term === 'Media') {
			of(this.tmp_articles)
				.pipe(
					map((data: Article[]) =>
						data.filter((article: Article) => article.source.type === 'Media')
					),
					filter((articless: Article[]) => {
						return articless && articless.length > 0;
					})
				)
				.subscribe(result => (this.articles$ = of(result)));
		}

		of(this.tmp_articles)
			.pipe(
				map((data: Article[]) => {
					return data.filter((article: Article) => {
						if (
							article.title
								.toLocaleLowerCase()
								.includes(term.toLocaleLowerCase())
						) {
							return true;
						}
						article.source.keyword.forEach(k => {
							return k.toLocaleLowerCase().includes(term.toLocaleLowerCase());
						});
						return false;
					});
				}),
				filter((articless: Article[]) => {
					console.log(articless);
					return articless && articless.length > 0;
				})
			)
			.subscribe(result => (this.articles$ = of(result)));
	}
	ngOnDestroy() {
		this.loading.unsubscribe();
	}
	back() {
		this.router.navigate(['../'], { relativeTo: this.route });
	}
	createCurrencyComponent(currency: Currency) {
		console.log('currency', this.entry);
		if (this.entry !== undefined) {
			this.entry.clear();
			const factory = this.resolver.resolveComponentFactory(
				CurrencyDetailsComponent
			);
			this.componentRef = this.entry.createComponent(factory);
			this.componentRef.instance.currency = currency;
		}
	}
	destroyComponent() {
		this.componentRef.destroy();
	}
	// deleteBook(bookID: number): void {
	//   this.dataService.deleteBook(bookID)
	//     .subscribe(
	//       (data: void) => {
	//         let index: number = this.allBooks.findIndex(book => book.bookID === bookID);
	//         this.allBooks.splice(index, 1);
	//       },
	//       (err: any) => console.log(err)
	//     );
	// }

	// deleteReader(readerID: number): void {
	//   console.warn(`Delete reader not yet implemented (readerID: ${readerID}).`);
	// }
}
