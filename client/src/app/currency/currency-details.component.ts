import {
	animate,
	keyframes,
	style,
	transition,
	trigger
} from "@angular/animations";
import {
	Component,
	OnInit,
	Input,
	ViewChild,
	TemplateRef,
	ComponentFactoryResolver
} from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { NgxChartsModule } from "@swimlane/ngx-charts";
import { DataService } from "../core/data.service";
import { DatePipe } from "@angular/common";

import { ChartCurrencyComponent } from "../chart/chart-currency.component";

import { Currency, ICurrency } from "../models";

@Component({
	selector: "currency-details",
	templateUrl: "./currency-details.component.html",
	styles: [
		`
			.desc a {
				color: #519094;
			}
		`,
		`
			.desc {
				overflow: hidden;
				height: 200px;
				line-height: 25px;
			}

			.desc:before {
				content: "";
				float: left;
				width: 5px;
				height: 200px;
			}

			.desc > *:first-child {
				float: right;
				width: 100%;
				margin-left: -5px;
			}

			.desc:after {
			}
		`,
		`
			.currency-img::after {
				opacity: 0.91;
			}
			.currency-img::before {
				content: "";
			}
		`
	],
	animations: [
		trigger("fadeSlideGrowKeyframe", [
			transition(":enter", [
				style({ opacity: 0, transform: "scale(0.5) translateY(50px)" }),
				animate(
					"500ms",
					keyframes([
						style({ opacity: 1, offset: 0.3 }),
						style({ transform: "translateY(0)", offset: 0.6 }),
						style({ transform: "scale(1)", offset: 1 })
					])
				)
			]),
			transition(":leave", [
				style({ opacity: 1, transform: "scale(1) translateY(0)" }),
				animate(
					"500ms",
					keyframes([
						style({ opacity: 0, offset: 0.3 }),
						style({ transform: "translateY(50px)", offset: 0.6 }),
						style({ transform: "scale(0.5)", offset: 1 })
					])
				)
			])
		])
	],
	providers: [DatePipe]
})
export class CurrencyDetailsComponent implements OnInit, ICurrency {
	@ViewChild("ChartTemplate") ChartTemplate: TemplateRef<any>;

	currency_prec: boolean = true;
	@Input()
	currency: Currency;
	constructor(
		private dataService: DataService,
		private router: Router,
		private activatedRoute: ActivatedRoute,
		private cfr: ComponentFactoryResolver
	) {}
	ngOnInit(): void {
		let currencyFromResolve = this.activatedRoute.snapshot.data["currency"];
		if (currencyFromResolve != null) {
			this.currency = currencyFromResolve;
		}
	}

	getTemplate() {
		return this.ChartTemplate;
	}
}
