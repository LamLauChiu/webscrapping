import {
  Component,
  ElementRef,
  HostListener,
  OnInit,
  ViewChild,
  Inject,
  ViewEncapsulation
} from "@angular/core";

import { StockPortfolioService } from "../service/stock-portfolio.service";
import { StockPortfolio } from "../model/stock-portfolio";

import { NzInputDirective } from "ng-zorro-antd/input";
import { NzModalService, NzModalRef } from "ng-zorro-antd/modal";
import { AddStockPortfolioComponent } from "../add-stock-portfolio/add-stock-portfolio.component";

import { DOCUMENT } from "@angular/common";

import { single } from "./data";

import {
  AccumulationChart, AccumulationChartComponent, IAccLoadedEventArgs, AccumulationTheme
} from '@syncfusion/ej2-angular-charts';



@Component({
  selector: "app-stock-portfolio",
  templateUrl: "./stock-portfolio.component.html",
  styles: [
    `
      .editable-row-operations a {
        margin-right: 8px;
      }
    `
  ],
  encapsulation: ViewEncapsulation.None
  
  //styleUrls: ['./stock-portfolio.component.scss']
})
export class StockPortfolioComponent implements OnInit {
  preLoader: boolean = true; // Showing Preloader to show user data is coming for you from thre server(A tiny UX Shit)
  noData: boolean = false; // Showing No Student Message, when no student in database.

  p: number = 1;
  public stockPortfolioRecordList: Object[] = [];
 
  //
  public data: Object[] = [
    { x: 'Argentina', y: 999999},
    { x: 'Belgium', y: 100000 },
    { x: 'Cuba', y: 312685 },
    { x: 'Dominican Republic', y: 350000 },
    { x: 'Egypt', y: 301000  },
    { x: 'Kazakhstan', y: 300000   },
    { x: 'Somalia', y: 357022  }
];
  //@ViewChild('pie')
  public pie: AccumulationChartComponent | AccumulationChart;
  //Initializing Legend
  public legendSettings: Object = {
      visible: true,
  };
  //Initializing Datalabel
  public dataLabel: Object = {
      visible: true, position: 'Inside',
      name: 'x'
  };
    // custom code start
  public load(args: IAccLoadedEventArgs): void {
      let selectedTheme: string = location.hash.split('/')[1];
      selectedTheme = selectedTheme ? selectedTheme : 'Material';
      args.accumulation.theme = <AccumulationTheme>(selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, "Dark");
  }
    // custom code end
  public startAngle: number = 0;
  public endAngle: number = 360;
  public radius: string = 'r';
  public enableAnimation: boolean = true;
  public enableSmartLabels: boolean = true;
  public center: Object = {x: '50%', y: '50%'};
  public explode: boolean = true;
  public tooltip: Object = { enable: true, format: '${point.x} : <b>${point.y}%</b>' };
  public title: string = 'Price And Stock Ratio';
 
  constructor(
    @Inject(DOCUMENT) document,
    private stockPortfolioSerivce: StockPortfolioService,
    private modalService: NzModalService
  ) {
    Object.assign(this, { single });
  }
  i = 0;
  editId: string | null;

  listOfData: StockPortfolio[] = [];
  //listOfData: ItemData[] = [];
  editCache: { [key: string]: { edit: boolean; data: StockPortfolio } } = {};

  onSelect(event) {
    console.log(event);
  }
  //

  @ViewChild(NzInputDirective, { static: false, read: ElementRef })
  inputElement: ElementRef;

  @HostListener("window:click", ["$event"])
  handleClick(e: MouseEvent): void {
    if (
      this.editId &&
      this.inputElement &&
      this.inputElement.nativeElement !== e.target
    ) {
      this.editId = null;
    }
  }

  // addRow(): void {
  //   this.listOfData = [
  //     ...this.listOfData,
  //     {
  //       id: `${this.i}`,
  //       name: `Edward King ${this.i}`,
  //       age: '32',
  //       address: `London, Park Lane no. ${this.i}`
  //     }
  //   ];
  //   this.i++;
  //this.stockPortfolioSerivce.AddStockPortfolio($event.newData);
  // }

  deleteRow(id: string): void {
    this.listOfData = this.listOfData.filter(d => d.$key !== id);
    this.stockPortfolioSerivce.DeleteStockPortolio(id);
  }

  startEdit(id: string): void {
    console.log(id);
    this.editCache[id].edit = true;
    console.log(this.editCache[id].data);
  }

  cancelEdit(id: string): void {
    const index = this.listOfData.findIndex(item => item.$key === id);
    this.editCache[id] = {
      data: { ...this.listOfData[index] },
      edit: false
    };
  }

  saveEdit(id: string): void {
    const index = this.listOfData.findIndex(item => item.$key === id);
    Object.assign(this.listOfData[index], this.editCache[id].data);
    this.editCache[id].edit = false;

    this.stockPortfolioSerivce.UpdateStockPortfolio(this.editCache[id].data);
  }

  updateEditCache(): void {
    this.listOfData.forEach(item => {
      this.editCache[item.$key] = {
        edit: false,
        data: { ...item }
      };
    });

    console.log(this.editCache);
  }

  showModal(): void {
    this.modalService.create({
      nzTitle: "Add New Stock Portfolio:",
      nzZIndex: 9999,
      nzContent: AddStockPortfolioComponent
    });
  }

  ngOnInit() {
    //this.addRow();
    //this.addRow();

    this.dataState();
    let s = this.stockPortfolioSerivce.GetStockPortfoliosList();
    s.snapshotChanges().subscribe(data => {
      this.listOfData = [];
      let oerallTotal = 0;
      //console.log( data);
      let stockPortfolioRecords = [];
      data.forEach(item => {
        //console.log( item );
        let a = item.payload.toJSON();
      
        let stockTotalPrice = 0;
        let stockName = a["STOCK_NAME"];
        //console.log(a);
        a["$key"] = item.key;
        if (a["UNIT"] != null && a["REGULAR_MARKET_PRICE"] != null) {
          a["TOTAL_PRICE"] = a["REGULAR_MARKET_PRICE"] * a["UNIT"];
          oerallTotal = oerallTotal + parseFloat(a["TOTAL_PRICE"]);
          stockTotalPrice = a["TOTAL_PRICE"];
        } else if (a["STOCK_NAME"] == "CASH" || a["STOCK_NAME"] == "ReceivableDivided" ) {
          a["TOTAL_PRICE"] = a["UNIT"];
          oerallTotal = oerallTotal + parseFloat(a["TOTAL_PRICE"]);
          stockTotalPrice = a["TOTAL_PRICE"];
        }
        //console.log(a['$key']);
        this.listOfData.push(a as StockPortfolio);
        //console.log(this.stockPortfolio);
        document.getElementById(
          "OverallTotal"
        ).innerHTML = oerallTotal.toString();

        let stockPortfolioRecord = {
          x: stockName,
          y: stockTotalPrice,
        };

        stockPortfolioRecords.push(stockPortfolioRecord);

      });
      console.log(this.listOfData);

      console.log(document.getElementById("OverallTotal"));

      this.updateEditCache();

      this.stockPortfolioRecordList = stockPortfolioRecords;
    });
  }

  dataState() {
    this.stockPortfolioSerivce
      .GetStockPortfoliosList()
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
