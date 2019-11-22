import { Component, ElementRef, HostListener, OnInit, ViewChild, Inject } from '@angular/core';

import { StockPortfolioService } from "../service/stock-portfolio.service";
import { StockPortfolio } from "../model/stock-portfolio";

import { NzInputDirective } from 'ng-zorro-antd/input';
import { NzModalService, NzModalRef } from 'ng-zorro-antd/modal';
import { AddStockPortfolioComponent } from '../add-stock-portfolio/add-stock-portfolio.component';

import { DOCUMENT } from '@angular/common'; 

import { single } from './data';

@Component({
  selector: 'app-stock-portfolio',
  templateUrl: './stock-portfolio.component.html',
  styles: [
    `
      .editable-row-operations a {
        margin-right: 8px;
      }
    `
  ]
  //styleUrls: ['./stock-portfolio.component.scss']
})
export class StockPortfolioComponent implements OnInit {

  preLoader: boolean = true; // Showing Preloader to show user data is coming for you from thre server(A tiny UX Shit)
  noData: boolean = false; // Showing No Student Message, when no student in database.

  p: number = 1;

    constructor(
      @Inject(DOCUMENT) document,
      private stockPortfolioSerivce: StockPortfolioService,
      private modalService: NzModalService,
      ) {
        Object.assign(this, { single })
      }
    i = 0;
    editId: string | null;
    
    listOfData: StockPortfolio[] = [];
    //listOfData: ItemData[] = [];
    editCache: { [key: string]: { edit: boolean; data: StockPortfolio } } = {};
      

    //
    single: any[];
    multi: any[];
  
    view: any[] = [700, 400];
  
    // options
    showXAxis = true;
    showYAxis = true;
    gradient = false;
    showLegend = true;
    showXAxisLabel = true;
    xAxisLabel = 'Country';
    showYAxisLabel = true;
    yAxisLabel = 'Population';
  
    colorScheme = {
      domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
    };
    
    onSelect(event) {
      console.log(event);
    }
    //
    

    @ViewChild(NzInputDirective, { static: false, read: ElementRef }) inputElement: ElementRef;
    

    @HostListener('window:click', ['$event'])
    handleClick(e: MouseEvent): void {
      if (this.editId && this.inputElement && this.inputElement.nativeElement !== e.target) {
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
        nzTitle: 'Add New Stock Portfolio:',
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
      data.forEach(item => {
        //console.log( item );
        let a = item.payload.toJSON();
        
        //console.log(a);
        a["$key"] = item.key;
        if(  a["UNIT"] != null && a["REGULAR_MARKET_PRICE"] != null ){
          a["TOTAL_PRICE"] = a["REGULAR_MARKET_PRICE"]*a["UNIT"];
          oerallTotal = oerallTotal + parseFloat(a["TOTAL_PRICE"]);
        }else if(a["STOCK_NAME"] == 'CASH'){
          a["TOTAL_PRICE"] = a["UNIT"];
          oerallTotal = oerallTotal + parseFloat(a["TOTAL_PRICE"]);
        }
        //console.log(a['$key']);
        this.listOfData.push(a as StockPortfolio);
        //console.log(this.stockPortfolio);
        document.getElementById('OverallTotal').innerHTML = oerallTotal.toString();
        


      });
      console.log(this.listOfData);
      
      console.log(document.getElementById('OverallTotal'));

      
      this.updateEditCache();
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

