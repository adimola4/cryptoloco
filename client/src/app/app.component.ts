import {
	AfterViewChecked,
	ChangeDetectorRef,
	Component,
	OnInit,
	ViewChild
} from "@angular/core";
import { Meta } from "@angular/platform-browser";
import { NavigationEnd, Router } from "@angular/router";
import { forkJoin, Observable } from "rxjs";
import { take } from "rxjs/operators";
import { SideBarService } from "./core";
import { DataService } from "./core/data.service";
import { DashboardComponent } from "./dashboard";
import { Currency, Source } from "./models";

@Component({
	selector: "app-root",
	templateUrl: "./app.component.html",
	styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnInit, AfterViewChecked {
	sourcesOBS$: Observable<Source[]>;
	allSources: Source[];
	currenciesOBS$: Observable<Currency[]>;
	currencies: Currency[];
	@ViewChild(DashboardComponent, { static: false })
	private dashboardComponent: DashboardComponent;
	routerSubscription: any;
	show = false;

	constructor(
		private metaService: Meta,
		private dataService: DataService,
		private router: Router,
		private sidebarService: SideBarService,
		private cdRef: ChangeDetectorRef
	) {
		this.router.routeReuseStrategy.shouldReuseRoute = () => false;
		this.routerSubscription = this.router.events.subscribe(event => {
			if (event instanceof NavigationEnd) {
				this.router.navigated = false;
			}
		});
	}
	ngAfterViewChecked(): void {
		this.cdRef.detectChanges();
	}

	ngOnInit(): void {
		this.sourcesOBS$ = this.dataService.sources$;
		this.currenciesOBS$ = this.dataService.currencies$;
		//  this.sourcesOBS$.subscribe((data:any)=>{
		//         console.log("from app:",data);
		//  });
		forkJoin([this.sourcesOBS$, this.currenciesOBS$])
			.pipe(take(1))
			.subscribe(result => {
				this.allSources = result[0];

				this.currencies = result[1];
				console.log(this.currencies);
			});
	}
	title = "Cryptoloco";
	setModeTheme = false;

	openSidebar() {
		this.sidebarService.setShowSideBar(true);
	}

	getMode($event: any) {
		this.setModeTheme = $event;
		if (this.setModeTheme) {
			this.metaService.addTags([{ name: "" }]);
		} else {
		}
		console.log("change theme ", this.setModeTheme);
	}

	showCurrency(currency: Currency) {
		if (window.innerWidth < 450) {
			this.router.navigate([`currency/${encodeURIComponent(currency.api_id)}`]);
		}
	}

	filterArticles(term: string) {
		this.dashboardComponent.searchChange(term);
	}
	ngOnDestroy() {
		if (this.routerSubscription) {
			this.routerSubscription.unsubscribe();
		}
	}
}
