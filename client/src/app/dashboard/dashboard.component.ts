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
	ViewContainerRef,
	NgZone
} from "@angular/core";
import { DOCUMENT } from "@angular/common";
import { LocationStrategy, Location } from "@angular/common";

import {
	BehaviorSubject,
	forkJoin,
	Observable,
	of,
	Subscription,
	zip
} from "rxjs";
import { Title } from "@angular/platform-browser";
import {
	trigger,
	state,
	style,
	animate,
	transition,
	keyframes,
	stagger,
	query
} from "@angular/animations";

// import { Source } from "../models/source";
import { HolderDirective } from "../core/holder.directive";
// import { Reader } from "app/models/reader";
import { DataService } from "../core/data.service";
import { Article, Currency, Tweet, ICurrency } from "../models";
import {
	filter,
	map,
	pairwise,
	take,
	tap,
	throttleTime,
	timeout
} from "rxjs/operators";
import { ContentContainerComponent } from "./content-container.component";
import { CurrencyDetailsComponent } from "../currency/currency-details.component";
import { ActivatedRoute, Params, Router, UrlSerializer } from "@angular/router";
import { LoadingService } from "../core/loading.service";
import { CdkVirtualScrollViewport } from "@angular/cdk/scrolling";

@Component({
	selector: "app-dashboard",
	templateUrl: "./dashboard.component.html",
	styles: [],
	animations: [
		trigger("fadeInGrow", [
			transition("* => *", [
				query(
					":enter",
					[
						style({ opacity: 0, transform: "translateX(-200px)" }),
						stagger(500, [
							animate(
								"0.5s ease-in",
								style({ opacity: 1, transform: "translateX(0)" })
							)
						])
					],
					{ optional: true }
				)
			]),
			transition(":leave", [
				query(":leave", [
					style({ opacity: 1 }),
					stagger("50ms", [
						animate(
							"300ms ease-in",
							style({ opacity: 0, transform: "translateX(-200px)" })
						)
					])
				])
			])
		])
	]
})
export class DashboardComponent implements OnInit, OnChanges {
	@ViewChild("currencycontainer", { read: ViewContainerRef })
	entry: ViewContainerRef;
	@Input()
	currencies: Currency[];
	public articles: Article[] = [];
	public tmp_articles: Article[] = [];
	public articles$: Observable<Article[]>;
	isLoadingArticles$: Observable<boolean>;
	feedPage: number = 0;
	@ViewChild("scroller") scroller: CdkVirtualScrollViewport;
	dark: Boolean;
	shownArticle: any;
	currentShown = new BehaviorSubject(null);
	article_title: string;
	searchTerm: string;
	loading: Subscription;
	loadingStatus = false;
	contentType = "Default";
	shownCurrency: any;
	componentRef: any;
	topCurrencies: Currency[];
	get isMobile(): any {
		return window.innerWidth <= 420;
	}

	constructor(
		private dataService: DataService,
		private title: Title,
		@Inject(DOCUMENT) document: any,
		private router: Router,
		private route: ActivatedRoute,
		private resolver: ComponentFactoryResolver,
		private urlSerializer: UrlSerializer,
		private loadingService: LoadingService,
		private locationStrategy: LocationStrategy,
		private ngZone: NgZone
	) {}
	ngOnChanges(changes: SimpleChanges): void {}

	ngOnInit() {
		this.isLoadingArticles$ = of(true);
		if (
			localStorage.theme === "dark" ||
			(!("theme" in localStorage) &&
				window.matchMedia("(prefers-color-scheme: dark)").matches)
		) {
			document.getElementsByTagName("html")[0].classList.add("dark");
			this.dark = true;
		} else {
			document.getElementsByTagName("html")[0].classList.remove("dark");
			this.dark = false;
		}
		this.dataService.currencies$.subscribe(data => {
			this.currencies = data;
		});
		this.articles$ = this.dataService.getFeed(this.feedPage);
		this.articles$.subscribe(data => {
			this.isLoadingArticles$ = of(false);
			this.tmp_articles = data;
		});

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

		this.dataService.getTopCurrency().subscribe(data => {
			this.topCurrencies = data;
		});
	}
	getArticleData() {
		this.feedPage++;
		this.dataService.getFeed(this.feedPage).subscribe((data: Article[]) => {
			zip(of(data), this.articles$)
				.pipe(map(x => [...x[1], ...x[0]]))
				.subscribe(data => {
					this.articles$ = of(data);
					try {
						this.scroller.scrollTo({
							top: parseInt(this.scroller._totalContentHeight)
						});
					} catch (err) {}
				});
		});
	}
	ngAfterViewInit(): void {
		this.loading = this.loadingService.loading$
			.pipe()
			.subscribe((status: boolean) => {
				this.loadingStatus = status;
			});
		this.scroller
			.elementScrolled()
			.pipe(
				map(() => this.scroller.measureScrollOffset("bottom")),
				pairwise(),
				filter(([y1, y2]) => y2 < y1 && y2 < 140),
				throttleTime(200)
			)
			.subscribe(() => {
				this.ngZone.run(() => {
					this.isLoadingArticles$ = of(true);
					this.getArticleData();
					this.scroller.scrollTo({
						top: parseInt(this.scroller._totalContentHeight)
					});
					this.isLoadingArticles$ = of(false);
				});
			});
	}
	
	reload() {
		this.router.navigate([this.route]);
	}
	articleClick(event: any) {
		this.shownArticle = event;
		this.contentType = "Article";
	}
	currencyClick(event: any) {
		this.shownCurrency = event;
		this.contentType = "Currency";
		this.createCurrencyComponent(this.shownCurrency);
	}

	searchChange(term: string) {
		this.searchTerm = term;

		if (term === "News") {
			of(this.tmp_articles)
				.pipe(
					map((data: Article[]) => {
						return data.filter(
							(article: Article) => article.source.type === "News"
						);
					}),
					filter((articles_array: Article[]) => {
						return articles_array && articles_array.length > 0;
					})
				)
				.subscribe(result => (this.articles$ = of(result)));
		} else if (term === "Media") {
			of(this.tmp_articles)
				.pipe(
					map((data: Article[]) =>
						data.filter((article: Article) => article.source.type === "Media")
					),
					filter((articles_array: Article[]) => {
						return articles_array && articles_array.length > 0;
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
				filter((articles_array: Article[]) => {
					return articles_array && articles_array.length > 0;
				})
			)
			.subscribe(result => (this.articles$ = of(result)));
	}
	ngOnDestroy() {
		this.loading.unsubscribe();
	}
	back() {
		this.router.navigate(["../"], { relativeTo: this.route });
	}
	createCurrencyComponent(currency: Currency) {
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
}
