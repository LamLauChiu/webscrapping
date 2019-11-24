import { Component, OnInit, NgModule, ViewEncapsulation, ViewChild } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { single, multi } from './data';

import { PortfolioStockDetailsService } from "../service/portfolio-stock-details.service";
import { PortfolioStockDetails } from "../model/portfolio-stock-details";
import { chartData } from './datasource';
import { IStockChartEventArgs, ChartTheme, ITooltipRenderEventArgs } from '@syncfusion/ej2-angular-charts';
import { DomSanitizer, SafeResourceUrl, SafeUrl} from '@angular/platform-browser';
import { ILoadedEventArgs, IRangeLoadedEventArgs, IChangedEventArgs,
ChartComponent, IAxisLabelRenderEventArgs } from '@syncfusion/ej2-angular-charts';
import { chartDataValue } from './financial-data';
import { Browser } from '@syncfusion/ej2-base';

@Component({
  selector: 'app-charts-demo',
  templateUrl: './charts-demo.component.html',
  styleUrls: ['./charts-demo.component.scss']
})


export class ChartsDemoComponent implements OnInit{

  preLoader: boolean = true; // Showing Preloader to show user data is coming for you from thre server(A tiny UX Shit)
  noData: boolean = false; // Showing No Student Message, when no student in database.
  public serachkey: String = '0700';
 // @ViewChild('chartcontainer')
  public chart: ChartComponent;
  public data1: Object[];
  public chartData: any[] = [];
  //Initializing Primary X Axis
  public primaryXAxis: Object = {
      valueType: 'DateTime',
      crosshairTooltip: { enable: true },
      majorGridLines: { width: 0 }
  };
  //Initializing Primary Y Axis
  public primaryYAxis: Object = {
      title: 'Price',
      labelFormat: 'n0',
      lineStyle: { width: 0 },
      rangePadding: 'None',
      majorTickLines: { width: 0 }
  };

  public tooltip: Object = {
      enable: true,
      shared: true
  };
  public marker: Object = {
      visible: false
  };
  public crosshair: Object = {
      enable: true,
      lineType: 'Vertical', line: {
          width: 0,
      }
  };
  public legendSettings: Object = {
      visible: false
  };
  public axisLabelRender(args: IAxisLabelRenderEventArgs): void {
       if (args.axis.title === 'Price') {
              args.text = '$' + args.text;
          }
  };
  // custom code start
  public load(args: ILoadedEventArgs): void {
      let selectedTheme: string = location.hash.split('/')[1];
      selectedTheme = selectedTheme ? selectedTheme : 'Material';
      args.chart.theme = <ChartTheme>(selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, "Dark");
  };
  // custom code end
  public chartArea: Object = {
      border: {
          width: 0
      }
  };
  public width: string = Browser.isDevice ? '100%' : '80%';

  constructor(
    private portfolioStockDetailsService: PortfolioStockDetailsService,
  ) {
      //code
  };

  ngOnInit() {
      
        this.dataState();
        let s = this.portfolioStockDetailsService.GetPortfolioStockDetailsList();
        s.snapshotChanges().subscribe(data => {
          //console.log( data);
          let storedValue = JSON.parse(localStorage.getItem(this.serachkey.toString()));
          console.log(storedValue);
          
          if(storedValue != null ){
            this.data1 = storedValue;
          }else{
            data.forEach( (item ,index)  => {
              //console.log( index, item );
              let a = item.payload.toJSON();
              //console.log(item.key);
              let listOfDataItemsDetails = {};
              
              if(  item.key == this.serachkey ){
                for (const key in a) {
                  if (a.hasOwnProperty(key)) {
                    const element = a[key];
                    //console.log(element)
                    listOfDataItemsDetails = {
                      x: new Date(  key ),
                      open : a[key].objectValue.open,
                      high : a[key].objectValue.high,
                      low : a[key].objectValue.low,
                      close : a[key].objectValue.close,
                      volume : a[key].objectValue.volume
                    };
                    //console.log(listOfDataItemsDetails);
                    this.chartData.push(listOfDataItemsDetails);
                  }
              } 
            }
      
              //console.log(this.chartData);
              this.data1 = this.chartData;
              localStorage.setItem(this.serachkey.toString(), JSON.stringify(this.chartData));
              //this.listOfData.push(listOfDataItems);
            });
          }
          
        });

      }
    
      dataState() {
        this.portfolioStockDetailsService
          .GetPortfolioStockDetailsList()
          .valueChanges()
          .subscribe(data => {
            this.preLoader = false;
            if (data.length <= 0) {
              //this.hideWhenNoStudent = false;
              this.noData = true;
            } else {
              //this.hideWhenNoStudent = true;
              this.noData = false;
            }
          });
      }


}
// export class ChartsDemoComponent implements OnInit {

//   preLoader: boolean = true; // Showing Preloader to show user data is coming for you from thre server(A tiny UX Shit)
//   noData: boolean = false; // Showing No Student Message, when no student in database.

//   single: any[];
//   multi: any[];

//   listOfData: any[];

//   view: any[] = [700, 400];

//   // options
//   showXAxis = true;
//   showYAxis = true;
//   gradient = false;
//   showLegend = true;
//   showXAxisLabel = true;
//   xAxisLabel = 'Country';
//   showYAxisLabel = true;
//   yAxisLabel = 'Population';
//   // options
  
//   timeline = true;
//   // line, area
//   autoScale = true;
  
//   colorScheme = {
//     domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
//   };

//   public primaryXAxis: Object;
//   public data1: Object[];
//   public title: string;
//   public primaryYAxis: Object;
//   public marker: Object;
//   public tooltip: Object;
//   constructor(
//     private portfolioStockDetailsService: PortfolioStockDetailsService,
//     private sanitizer: DomSanitizer,
//     ) {
//     // Object.assign(this, { multi })
//   }

//   onSelect(event) {
//     console.log(event);
//   }
//   public stockchartData: any[] = [];
//   ngOnInit() {
//     // Title for stock chart
//     //this.data1 = chartData;

//     //this.dataState();
//     //let s = this.portfolioStockDetailsService.GetPortfolioStockDetailsList();
//     //s.snapshotChanges().subscribe(data => {
//       //this.listOfData = [];
//       //console.log( data);

//     //   data.forEach( (item ,index)  => {
//     //     //console.log( index, item );
//     //     let a = item.payload.toJSON();
//     //     //console.log(item.key);
//     //     let listOfDataItemsDetails = {};
        
       
//     //       for (const key in a) {
//     //         if (a.hasOwnProperty(key)) {
//     //           const element = a[key];
//     //           //console.log(element)
//     //           listOfDataItemsDetails = {
//     //             date: new Date(  key ),
//     //             open : a[key].objectValue.open,
//     //             high : a[key].objectValue.high,
//     //             low : a[key].objectValue.low,
//     //             close : a[key].objectValue.close,
//     //             volume : a[key].objectValue.volume
//     //           };
//     //           //console.log(listOfDataItemsDetails);
//     //           this.stockchartData.push(listOfDataItemsDetails);
//     //         }
        
       
          
//     //     } 
         
//     //     // let listOfDataItemsDetails = [];
//     //     // let listOfDataItems = { 
//     //     //   name : item.key,
//     //     //   series: listOfDataItemsDetails,
//     //     // };
//     //     // for (const key in a) {
//     //     //   if (a.hasOwnProperty(key)) {
//     //     //     const element = a[key];
//     //     //     listOfDataItemsDetails.push({
//     //     //       "name": key,
//     //     //       "value": a[key].objectValue.close
//     //     //     });
//     //     //     //console.log(element);
//     //     //   }
//     //     // }       

//     //     //console.log(listOfDataItemsDetails);

//     //     console.log(this.stockchartData);
//     //     this.data1 = this.stockchartData;
//     //     //this.listOfData.push(listOfDataItems);
//     //   });
//     //   //console.log(this.listOfData);
      
//     // });
//     // this.primaryXAxis = {
//     //     valueType: 'DateTime',
//     // };
//     // this.tooltip = { enable: true };
//     // this.marker = { visible: true, width: 10, height: 10 };
//     // this.title = 'Unemployment Rates 1975-2010';

        

//   }

//   dataState() {
//     this.portfolioStockDetailsService
//       .GetPortfolioStockDetailsList()
//       .valueChanges()
//       .subscribe(data => {
//         this.preLoader = false;
//         if (data.length <= 0) {
//           //this.hideWhenNoStudent = false;
//           this.noData = true;
//         } else {
//           //this.hideWhenNoStudent = true;
//           this.noData = false;
//         }
//       });
//   }

// }

// //https://swimlane.github.io/ngx-charts/#/ngx-charts/pie-chart
// //https://swimlane.gitbook.io/ngx-charts/examples/bar-charts/vertical-bar-chart

// //https://ng.ant.design/docs/recommendation/en


// /*

//   export var multi = [
//     {
//       "name": "Germany",
//       "series": [
//         {
//           "name": "2010",
//           "value": 7300000
//         },
//         {
//           "name": "2011",
//           "value": 8940000
//         }
//       ]
//     },
  
//     {
//       "name": "USA",
//       "series": [
//         {
//           "name": "2010",
//           "value": 7870000
//         },
//         {
//           "name": "2011",
//           "value": 8270000
//         }
//       ]
//     },
  
//     {
//       "name": "France",
//       "series": [
//         {
//           "name": "2010",
//           "value": 5000002
//         },
//         {
//           "name": "2011",
//           "value": 5800000
//         }
//       ]
//     }
//   ];
// */