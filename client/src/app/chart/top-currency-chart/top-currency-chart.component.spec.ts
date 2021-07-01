import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopCurrencyChartComponent } from './top-currency-chart.component';

describe('TopCurrencyChartComponent', () => {
	let component: TopCurrencyChartComponent;
	let fixture: ComponentFixture<TopCurrencyChartComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [TopCurrencyChartComponent]
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(TopCurrencyChartComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
