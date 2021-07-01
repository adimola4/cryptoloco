import { Component, Input, OnInit } from '@angular/core';
import { NgxChartsModule, LegendPosition } from '@swimlane/ngx-charts';

import { DataService } from '../core';
import { Subject } from 'rxjs';

import { Currency } from '../models';
import { DatePipe, CurrencyPipe } from '@angular/common';

@Component({
	selector: 'app-chart-currency',
	templateUrl: './chart.component.html',
	providers: [DatePipe, CurrencyPipe],
	styles: [``]
})
export class ChartCurrencyComponent implements OnInit {
	view: any = [600, 600];
	chart_h = 400;
	public initialDate = new Date();
	@Input()
	justLine = false;

	chartData: any[] = [];

	chDA: any = {};
	@Input()
	currency: Currency;
	legendTitle = '';
	legendPosition: LegendPosition = LegendPosition.Below;
	legend = true;
	showLabels = true;
	animations = true;
	xAxis = true;
	yAxis = true;
	showYAxisLabel = true;
	showXAxisLabel = false;
	xAxisLabel = '';
	yAxisLabel = '';
	timeline = true;
	roundDomains = false;

	colorScheme = {
		domain: ['#5AA454', '#E44D25', '#CFC0BB', '#7aa3e5', '#a8385d', '#aae3f5']
	};
	constructor(private dataService: DataService, private datePipe: DatePipe) {
		this.view = [innerWidth / 1.3, 400];
	}

	ngOnInit(): void {
		// console.log(this.currency.api_id);
		if (this.justLine) {
			console.log('justline');
			this.showLabels =
				this.showXAxisLabel =
				this.showYAxisLabel =
				this.xAxis =
				this.yAxis =
				this.legend =
					false;
			this.chart_h = 150;
		} else {
			this.legendTitle = `${this.currency.title} Chart`;
		}

		this.dataService
			.getChartByCoin(this.currency.api_id.toString())
			.pipe((d: any) => (this.chDA = d));
		this.chDA.subscribe((a: any) => {
			let _prices = {};
			let _market_caps = {};
			let _total_volumes = {};
			for (const key of Object.keys(a)) {
				console.log(key);
				const obj = {
					name: 'Price per USD',
					series: [
						{
							name: '',
							value: '',
							vol: '',
							marketCap: '',
							date: ''
						}
					]
				};
				const d = a[key];
				for (let i = 0; i < d.length; i++) {
					const _date =
						this.datePipe.transform(new Date(d[i][0]), 'MM/dd') ||
						new Date(d[i][0]).toString();
					const _fulldate =
						this.datePipe.transform(new Date(d[i][0]), 'M/d/yy, h:mm a') ||
						new Date(d[i][0]).toString();
					obj.series.push({
						name: _date,
						value: d[i][1],
						vol: a.total_volumes[i][1],
						marketCap: a.market_caps[i][1],
						date: _fulldate
					});
				}
				console.log(obj.series.splice(0, 1));

				if (key === 'prices') {
					_prices = obj;
				} else if (key === 'market_caps') {
					_market_caps = obj;
				} else if (key === 'total_volumes') {
					_total_volumes = obj;
				}
			}
			this.chartData = [_prices];
			this.chartData = [...this.chartData];
			console.log(this.chartData);
		});
	}

	update(): void {}
	onResize(event: any) {
		// this.view = [event.target.innerWidth / 1.35, 400];
	}

	generateDate(): string[] {
		const dates: string[] = [];
		for (let i = 0; i < 7; i++) {
			const d = new Date()
				.setDate(this.initialDate.getDate() - (7 - i))
				.toString();
			const p = this.datePipe.transform(d, 'yyyy-MM-dd');
			dates.push(p || d);
		}

		return dates;
	}
	ngOnChange() {}
	ngOnDestroy() {}
}
