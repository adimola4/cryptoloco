import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartCurrencyComponent } from './chart-currency.component';

describe('ChartCurrencyComponent', () => {
  let component: ChartCurrencyComponent;
  let fixture: ComponentFixture<ChartCurrencyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChartCurrencyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartCurrencyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
