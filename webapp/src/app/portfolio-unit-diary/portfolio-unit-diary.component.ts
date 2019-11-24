import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { ILoadedEventArgs, ChartTheme } from "@syncfusion/ej2-angular-charts";
import { Browser } from "@syncfusion/ej2-base";

import { PortfolioUnitDiaryRecordService } from "../service/portfolio-unit-diary-record.service";
import { PortfolioUnitDiaryRecord } from "../model/portfolio-unit-diary-records";

@Component({
  selector: "app-portfolio-unit-diary",
  templateUrl: "./portfolio-unit-diary.component.html",
  styleUrls: ["./portfolio-unit-diary.component.scss"],
  encapsulation: ViewEncapsulation.None
})
export class PortfolioUnitDiaryComponent implements OnInit {
  preLoader: boolean = true; // Showing Preloader to show user data is coming for you from thre server(A tiny UX Shit)
  noData: boolean = false; // Showing No Student Message, when no student in database.

  constructor(
    private portfolioUnitDiaryRecordService: PortfolioUnitDiaryRecordService
  ) {}
  
  public portfolioUnitDiaryRecordList : Object[] = [];
  public dirayPricePerUnitRecordList: Object[] = [];
  public dirayTotalPriceRecordList: Object[] = [];

  public data: Object[] = [
    { x: new Date(2005, 0, 1), y: 21 },
    { x: new Date(2006, 0, 1), y: 24 },
    { x: new Date(2007, 0, 1), y: 36 },
    { x: new Date(2008, 0, 1), y: 38 },
    { x: new Date(2009, 0, 1), y: 54 },
    { x: new Date(2010, 0, 1), y: 57 },
    { x: new Date(2011, 0, 1), y: 70 }
  ];
  public data1: Object[] = [
    { x: new Date(2005, 0, 1), y: 28 },
    { x: new Date(2006, 0, 1), y: 44 },
    { x: new Date(2007, 0, 1), y: 48 },
    { x: new Date(2008, 0, 1), y: 50 },
    { x: new Date(2009, 0, 1), y: 66 },
    { x: new Date(2010, 0, 1), y: 78 },
    { x: new Date(2011, 0, 1), y: 84 }
  ];
  //Initializing Primary X Axis
  public prciePerUnitPrimaryXAxis: Object = {
    valueType: "Category",
    labelFormat: "y",
    intervalType: "Days",
    edgeLabelPlacement: "Shift",
    majorGridLines: { width: 0 }
  };
  //Initializing Primary Y Axis
  public prciePerUnitPrimaryYAxis: Object = {
    labelFormat: "{value}",
    rangePadding: "None",
    minimum: 0,
    maximum: 5,
    interval: 0.5,
    lineStyle: { width: 0 },
    majorTickLines: { width: 0 },
    minorTickLines: { width: 0 }
  };

  public totalPricePrimaryXAxis: Object = {
    valueType: "Category",
    labelFormat: "y",
    intervalType: "Days",
    edgeLabelPlacement: "Shift",
    majorGridLines: { width: 0 }
  };
  //Initializing Primary Y Axis
  public totalPricePrimaryYAxis: Object = {
    labelFormat: "${value}",
    rangePadding: "None",
    minimum: 1000000,
    maximum: 5000000,
    interval: 250000,
    lineStyle: { width: 0 },
    majorTickLines: { width: 0 },
    minorTickLines: { width: 0 }
  };

  public chartArea: Object = {
    border: {
      width: 0
    }
  };
  public width: string = Browser.isDevice ? "100%" : "60%";
  public marker: Object = {
    visible: true,
    height: 10,
    width: 10
  };
  public tooltip: Object = {
    enable: true
  };
  // custom code start
  public load(args: ILoadedEventArgs): void {
    let selectedTheme: string = location.hash.split("/")[1];
    selectedTheme = selectedTheme ? selectedTheme : "Material";
    args.chart.theme = <ChartTheme>(
      (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(
        /-dark/i,
        "Dark"
      )
    );
  }


  // custom code end
  public dirayPricePerUnitRecordListTitle: string = "Price Per Unit Chart";
  public dirayTotalPriceRecordListTitle: string ="Total Price Chart";

  ngOnInit() {
    this.dataState();
    let s = this.portfolioUnitDiaryRecordService.GetPortfolioUnitDiaryRecordList();
    s.snapshotChanges().subscribe(data => {
      //console.log( data);
      data.forEach( (item ,index)  => {        
        let a = item.payload.toJSON();
        //console.log(a);

        let portfolioUnitDiaryRecord = {
          Date : item.key,
          Value : a,
        }
        this.portfolioUnitDiaryRecordList.push(portfolioUnitDiaryRecord);
        //console.log(this.portfolioUnitDiaryRecordList);
      });

      let dirayPricePerUnitRecords = [];
      let dirayTotalPriceRecords = [];
      this.portfolioUnitDiaryRecordList.forEach(element => {

        console.log(element);
        //console.log( element["Date"]);
        let dete =  element["Date"];
        let dirayPricePerUnit = parseFloat(element["Value"].objectValue.PRICEPERUNIT).toFixed(3);
        let dirayPricePerUnitRecord = {
          x: new Date(dete).toLocaleDateString(),
          y: dirayPricePerUnit,
        }
        dirayPricePerUnitRecords.push(dirayPricePerUnitRecord);
        console.log(dirayPricePerUnitRecords);
        
        let dirayTotalPrice = parseFloat(element["Value"].objectValue.OVERALLTOTALPRICE).toFixed(3);
        let dirayTotalPriceRecord = {
          x: new Date(dete).toLocaleDateString(),
          y: dirayTotalPrice,
        }
        dirayTotalPriceRecords.push(dirayTotalPriceRecord);
        console.log(dirayTotalPriceRecords);

      });
      this.dirayPricePerUnitRecordList = dirayPricePerUnitRecords;
      this.dirayTotalPriceRecordList = dirayTotalPriceRecords;
    });

    
  }

  dataState() {
    this.portfolioUnitDiaryRecordService
      .GetPortfolioUnitDiaryRecordList()
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
