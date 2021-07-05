import { Component, OnInit } from "@angular/core";
import { map } from "rxjs/operators";
import { DataService } from "src/app/core";
import { Currency } from "src/app/models";
import { DatePipe, CurrencyPipe } from "@angular/common";
import { NgxChartsModule, LegendPosition } from "@swimlane/ngx-charts";

@Component({
	selector: "top-currency-chart",
	templateUrl: "./top-currency-chart.component.html",
	providers: [DatePipe, CurrencyPipe]
})
export class TopCurrencyChartComponent implements OnInit {
	topCurrencies: Currency[];
	chartData: any[] = [];
	view: any = [600, 600];

	legendTitle = "Top Trendding Currency";
	legendPosition: LegendPosition = LegendPosition.Below;
	legend = true;
	showLabels = true;
	animations = true;
	xAxis = true;
	yAxis = true;
	showYAxisLabel = true;
	showXAxisLabel = false;
	xAxisLabel = "";
	yAxisLabel = "";
	timeline = true;
	roundDomains = false;

	colorScheme = {
		domain: ["#5AA454", "#E44D25", "#CFC0BB", "#7aa3e5", "#a8385d", "#aae3f5"]
	};
	constructor(private dataService: DataService, private datePipe: DatePipe) {
		this.view = [innerWidth / 1.3, 400];
	}
	ngOnInit(): void {
		this.dataService.getTopCurrency().subscribe(data => {
			data.forEach(currency => {
				this.dataService
					.getChartByCoin(currency.api_id.toString(), 1)
					.subscribe(d => {
						let _prices = {};
						const _market_caps = {};
						const _total_volumes = {};
						for (const key of Object.keys(d)) {
							const obj = {
								name: currency.title.toUpperCase(),
								series: [
									{
										name: "",
										value: "",
										vol: "",
										marketCap: "",
										date: ""
									}
								]
							};
							const o = d[key];
							for (let i = 0; i < o.length; i++) {
								const _date =
									this.datePipe.transform(new Date(o[i][0]), "h:mm a") ||
									new Date(o[i][0]).toString();
								const _fulldate =
									this.datePipe.transform(
										new Date(o[i][0]),
										"M/d/yy, h:mm a"
									) || new Date(o[i][0]).toString();
								obj.series.push({
									name: _date,
									value: o[i][1],
									vol: d.total_volumes[i][1],
									marketCap: d.market_caps[i][1],
									date: _fulldate
								});
							}
							obj.series.splice(0, 1);

							if (key === "prices") {
								_prices = obj;
							}
						}
						this.chartData.push(_prices);
						this.chartData = [...this.chartData];
					});
			});
		});
	}
	foo() {}
}
