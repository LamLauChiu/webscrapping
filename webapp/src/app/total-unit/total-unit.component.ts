import { Component, ElementRef, HostListener, OnInit, ViewChild, Inject } from '@angular/core';

import { TotalUnitService } from "./../service/total-unit.service";
import { TotalUnit } from "./../model/total-unit";
import { StockPortfolioService } from "../service/stock-portfolio.service";
import { StockPortfolio } from "../model/stock-portfolio";


import { NzInputDirective } from 'ng-zorro-antd/input';
import { NzModalService, NzModalRef } from 'ng-zorro-antd/modal';
import { DOCUMENT } from '@angular/common'; 
import { AddTotalUnitComponent } from '../add-total-unit/add-total-unit.component';
import { element } from 'protractor';



@Component({
  selector: 'app-total-unit',
  templateUrl: './total-unit.component.html',
  styleUrls: ['./total-unit.component.scss']
})
export class TotalUnitComponent implements OnInit {
    
  preLoader: boolean = true; // Showing Preloader to show user data is coming for you from thre server(A tiny UX Shit)
  noData: boolean = false; // Showing No Student Message, when no student in database.

  p: number = 1;
  i = 0;
  editId: string | null;
  
  listOfData: TotalUnit[] = [];
  //listOfData: ItemData[] = [];
  editCache: { [key: string]: { edit: boolean; data: TotalUnit } } = {};

  @ViewChild(NzInputDirective, { static: false, read: ElementRef }) inputElement: ElementRef;
  
  constructor(
    @Inject(DOCUMENT) document,
    private stockPortfolioSerivce: StockPortfolioService,
    private totalUnitSerivce: TotalUnitService,
    private modalService: NzModalService,
  ) {}
  
  ngOnInit() {
    this.dataState();
    let oerallTotalUnit = 0;
    let oerallTotalPrice = 0;
    let pricePerUnit = 0;
    let cash = 0;
    let x = this.stockPortfolioSerivce.GetStockPortfoliosList();
    x.snapshotChanges().subscribe(data => {
        data.forEach(item => {
          //console.log( item );
          let a = item.payload.toJSON();
          
          //console.log(a);
          a["$key"] = item.key;
          if(  a["UNIT"] != null && a["REGULAR_MARKET_PRICE"] != null ){
            a["TOTAL_PRICE"] = a["REGULAR_MARKET_PRICE"]*a["UNIT"];
            oerallTotalPrice = oerallTotalPrice + parseFloat(a["TOTAL_PRICE"]);
          }else if(a["STOCK_NAME"] == 'CASH'){
            cash = parseFloat(a["UNIT"]);
            a["TOTAL_PRICE"] = a["UNIT"];
            oerallTotalPrice = oerallTotalPrice + parseFloat(a["TOTAL_PRICE"]);
          }
          console.log();
          document.getElementById('OverallTotalPrice').innerHTML = oerallTotalPrice.toFixed(2).toString();
  
        });

        let s = this.totalUnitSerivce.GetTotalUnitsList();
        s.snapshotChanges().subscribe(data => {
        this.listOfData = [];
        
        //console.log( data);
        data.forEach(item => {
          //console.log( item );
          let a = item.payload.toJSON();
          //console.log(a);
          a["$key"] = item.key;
          //console.log(a['$key']);
          
          if(  a["UNIT"] != null ){
            oerallTotalUnit = oerallTotalUnit + parseFloat(a["UNIT"]);
          }

          document.getElementById('OverallTotalUnit').innerHTML = oerallTotalUnit.toFixed(2).toString();
          console.log("oerallTotalPrice: " + oerallTotalPrice + "oerallTotalUnit: " + oerallTotalUnit );
          pricePerUnit =  oerallTotalPrice/oerallTotalUnit;
          document.getElementById('PricePerUnit').innerHTML = pricePerUnit.toFixed(2).toString();

          document.getElementById('StockRatio').innerHTML =  (( (oerallTotalPrice - cash) /oerallTotalPrice ) * 100 ).toFixed(2).toString();
          document.getElementById('CashRatio').innerHTML = (cash/oerallTotalPrice * 100 ).toFixed(2).toString();

          //a["PRICE"] = 
          //a["PERCENTAGE"] =

          this.listOfData.push(a as TotalUnit);
          //console.log(this.stockPortfolio);
        });

        let totalPriceFromUnit = 0;
        let totalPerCentage = 0;
        this.listOfData.forEach( item =>{
          item.UNIT = parseFloat(item.UNIT).toFixed(2).toString();
          item.PRICE = (parseFloat(item.UNIT) * pricePerUnit).toFixed(2).toString();
          totalPriceFromUnit = totalPriceFromUnit + parseFloat(item.PRICE) ;
          item.PERCENTAGE =((parseFloat(item.UNIT)/oerallTotalUnit) * 100 ).toFixed(2).toString();
          console.log(parseFloat(item.PERCENTAGE));
          totalPerCentage = totalPerCentage + parseFloat(item.PERCENTAGE);
        });

        console.log("totalPriceFromUnit: " + totalPriceFromUnit);
        console.log("totalPerCentage: " + totalPerCentage);

      console.log(this.listOfData);
      this.updateEditCache();
    });
    
    });
    console.log(x);


  }

  deleteRow(id: string): void {
    this.listOfData = this.listOfData.filter(d => d.$key !== id);
    this.totalUnitSerivce.DeleteTotalUnit(id);
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

    this.totalUnitSerivce.UpdateTotalUnit(this.editCache[id].data);
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
      nzTitle: 'Add New Member:',
      nzZIndex: 9999, 
      nzContent: AddTotalUnitComponent
    });
  }


  // onCreateConfirm($event): void {
  //   //console.log($event);
  //   //console.log($event.newData)
  //   this.totalUnitSerivce.AddTotalUnit($event.newData);
  // }


  dataState() {
    this.totalUnitSerivce
      .GetTotalUnitsList()
      .valueChanges()
      .subscribe(data => {
        this.preLoader = false;
        if (data.length <= 0) {
          this.noData = true;
        } else {
          this.noData = false;
        }
      });
  }
}
