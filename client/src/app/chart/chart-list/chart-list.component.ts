import { Component, OnInit, OnDestroy } from "@angular/core";
import { DatePipe, CurrencyPipe } from "@angular/common";
import { DataService } from "src/app/core";
import { Currency } from "src/app/models";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";

@Component({
	selector: "app-chart-list",
	templateUrl: "./chart-list.component.html",
	styleUrls: ["./chart-list.component.scss"]
})
export class ChartListComponent implements OnInit, OnDestroy {
	currencies: Observable<Currency[]>;
	constructor(private dataService: DataService) {}

	ngOnInit(): void {
		this.currencies = this.dataService.currencies$.pipe(tap());
	}

	ngOnDestroy(): void {}
}
