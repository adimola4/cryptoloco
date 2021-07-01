import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { DataService } from '../core';

@Component({
	selector: 'app-about',
	templateUrl: './about.component.html',
	styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {
	constructor(private dataService: DataService) {}
	data$: Observable<any>;

	ngOnInit(): void {
		// this.data$ = this.dataService.getChartByCoin("bitcoin")
	}
}
