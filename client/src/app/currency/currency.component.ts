import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Currency } from '../models';

@Component({
  selector: 'app-currency',
  templateUrl: './currency.component.html',
  styles:[
         `.scroller-div {  animation: 30s scroll alternate infinite; }
          .scroller-div:first-child{ animation-duration: 35s; }
          .scroller:nth-child(2) {
            animation-duration: 40s;
          }
          
          @keyframes scroll {
          100%{
            transform: translateX(-66.6666%);  
          }
          }
         `
  ,],
  animations: [
    trigger('enterExitRight', [
      transition(':enter', [
          style({ opacity: 0, transform: 'translateX(200px)' }),
          animate(
              '300ms ease-in',
              style({ opacity: 1, transform: 'translateX(0)' })
          ),
      ]),
      transition(':leave', [
          animate(
              '300ms ease-in',
              style({ opacity: 0, transform: 'translateX(200px)' })
        ),
      ]),
  ]),
  ]
})
export class CurrencyComponent implements OnInit {

  currency_prec:boolean = true;
  @Input()
  currency: Currency;
  IsMobile:boolean = (window.innerWidth < 400);
  resizePage(event:any){
    this.IsMobile = (window.innerWidth < 400);
  }

  @Output() shownCurrency = new EventEmitter<Currency>();

  constructor(private router:Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
  }
  ngOnChanges(changes: SimpleChanges) {
    if (changes['currency']) {
        this.currency_prec = this.currency.p1h > 0;
    }
  }
  showCurrency(){
    if(this.IsMobile){
      this.router.navigate([this.router.url])

    }else{
      this.shownCurrency.emit(this.currency)

     }
  }



}
