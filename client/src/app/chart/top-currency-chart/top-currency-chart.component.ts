import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { DataService } from 'src/app/core';
import { Currency } from 'src/app/models';
import { DatePipe } from '@angular/common';
import { NgxChartsModule, LegendPosition } from '@swimlane/ngx-charts';

@Component({
  selector: 'top-currency-chart',
  templateUrl: './top-currency-chart.component.html',
  providers: [DatePipe],
})
export class TopCurrencyChartComponent implements OnInit {

  topCurrencies:Currency[];
  chartData:any[]= [];
  view:any =[600, 600];


  legendTitle: string = 'Top Trendding Currency';
  legendPosition: LegendPosition = LegendPosition.Below;
  legend: boolean = true;
  showLabels: boolean = true;
  animations: boolean = true;
  xAxis: boolean = true;
  yAxis: boolean = true;
  showYAxisLabel: boolean = true;
  showXAxisLabel: boolean = false;
  xAxisLabel: string = '';
  yAxisLabel: string = '';
  timeline: boolean = true;
  roundDomains:boolean = false;
  
  colorScheme = {
    domain: ['#5AA454', '#E44D25', '#CFC0BB', '#7aa3e5', '#a8385d', '#aae3f5']
  };
  constructor(private dataService:DataService, private datePipe: DatePipe) {
    this.view = [innerWidth / 1.3, 400];
  }
  ngOnInit(): void {
    this.dataService.getTopCurrency().subscribe((data)=>{
        data.forEach(currency => {

          this.dataService.getChartByCoin(currency.api_id.toString(),1).subscribe(d=>{
            console.log("get chart from top:::: ",currency.title);
            console.log(d);
            let _prices = {}; let _market_caps = {}; let _total_volumes = {};
            for (let key of Object.keys(d)) {
              console.log(key);
              let obj = { 
                "name": currency.title.toUpperCase(),
                "series": [
                  {
                    "name": "",
                    "value": "",
                    "vol":"",
                    "marketCap":"",
                    "date":""
                  },
                ]        
              }
              let o = d[key];
            for (let i = 0; i < o.length; i++) {
            let _date = this.datePipe.transform(new Date(o[i][0]), 'h:mm a') || new Date(o[i][0]).toString();
            let _fulldate = this.datePipe.transform(new Date(o[i][0]), 'M/d/yy, h:mm a') || new Date(o[i][0]).toString();            
                obj.series.push({name:_date , value:o[i][1],vol:d["total_volumes"][i][1],marketCap:d["market_caps"][i][1],date:_fulldate});
            }
            obj.series.splice(0,1)
            
            if(key === "prices"){
             _prices = obj;
          }

          }
          this.chartData.push(_prices);
          this.chartData=[...this.chartData]


          })






        });
    }
      
      
    )

    console.log("charttttt" , this.chartData);
    
    // (data=> this.topCurrencies = data,
    //     ()=>{
        
    //     })
  }
  foo(){
    console.log("charttttt" , this.chartData);

  }

}
