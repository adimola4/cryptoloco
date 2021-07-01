import { DatePipe } from '@angular/common';
import {
	Component,
	Input,
	ViewChild,
	ComponentFactoryResolver,
	ViewContainerRef,
	ComponentFactory,
	OnChanges,
	OnInit,
	SimpleChanges,
	ChangeDetectorRef
} from '@angular/core';
import { Observable } from 'rxjs';

import { ArticleComponent } from '../article/article.component';
import { DataService } from '../core';
import { CurrencyComponent } from '../currency/currency.component';
import { Article, Currency } from '../models';
import { DefaultViewContentContainerComponent } from './default-view-content-container/default-view-content-container.component';

@Component({
	selector: 'content-container',
	templateUrl: './content-container.component.html',
	providers: [DatePipe]
})
export class ContentContainerComponent implements OnInit {
	topCurrencies: Currency[] = [];
	chartData: any[] = [];

	openTab = 1;
	toggleTabs($tabNumber: number) {
		this.openTab = $tabNumber;
	}

	constructor(
		private componentFactoryResolver: ComponentFactoryResolver,
		private dataService: DataService,
		private datePipe: DatePipe,
		public cd: ChangeDetectorRef
	) {}
	ngOnInit(): void {
		this.dataService.getTopCurrency().subscribe(data => {
			data.forEach(currency => {
				this.topCurrencies.push(currency);
				this.topCurrencies = [...this.topCurrencies];
				this.dataService
					.getChartByCoin(currency.api_id.toString(), 1)
					.subscribe(d => {
						console.log('get chart from top:::: ', d);
						// console.log(d);
						let _prices = {};
						const _market_caps = {};
						const _total_volumes = {};
						for (const key of Object.keys(d)) {
							console.log(key);
							const obj = {
								name: currency.title.toUpperCase(),
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
							const o = d[key];
							for (let i = 0; i < o.length; i++) {
								const _date =
									this.datePipe.transform(new Date(o[i][0]), 'h:mm a') ||
									new Date(o[i][0]).toString();
								const _fulldate =
									this.datePipe.transform(
										new Date(o[i][0]),
										'M/d/yy, h:mm a'
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

							if (key === 'prices') {
								_prices = obj;
							}
						}
						this.chartData.push(_prices);
						this.chartData = [...this.chartData];
					});
			});

			console.log('ggggg', this.topCurrencies);
		});

		console.log('charttttt', this.chartData);
	}
}
