import { Injectable } from "@angular/core";
import { StockPortfolio } from "../model/stock-portfolio"; // StockPortfolio data type interface class
import {
  AngularFireDatabase,
  AngularFireList,
  AngularFireObject
} from "@angular/fire/database"; // Firebase modules for Database, Data list and Single object

@Injectable({
  providedIn: "root"
})
export class StockPortfolioService {
  stockPortfoliosRef: AngularFireList<any>; // Reference to Student data list, its an Observable
  stockPortfolioRef: AngularFireObject<any>; // Reference to Student object, its an Observable too

  // Inject AngularFireDatabase Dependency in Constructor
  constructor(private db: AngularFireDatabase) {}

  // Create stockPortfolio
  AddStockPortfolio(stockPortfolio: StockPortfolio) {
    this.stockPortfoliosRef.push({
      STOCK_NAME: stockPortfolio.STOCK_NAME,
      STOCK_NUM: stockPortfolio.STOCK_NUM,
      COST: stockPortfolio.COST,
      UNIT: stockPortfolio.UNIT,
      SYMBOL: stockPortfolio.SYMBOL,
      STATUS: "active",
      //PRICE_PER_UNIT: stockPortfolio.PRICE_PER_UNIT,
      //PREVIOUS_CLOSE: stockPortfolio.PREVIOUS_CLOSE
    });
  }

  // Fetch Single stockPortfolio Object
  GetStockPortfolio(id: string) {
    this.stockPortfolioRef = this.db.object("portfolio-list/" + id);
    return this.stockPortfolioRef;
  }

  // Fetch stockPortfolios List
  GetStockPortfoliosList() {
    this.stockPortfoliosRef = this.db.list("portfolio-list");
    console.log(this.stockPortfoliosRef);
    return this.stockPortfoliosRef;
  }

  // Update stockPortfolio Object
  UpdateStockPortfolio(stockPortfolio: StockPortfolio) {
    console.log(stockPortfolio);
    this.GetStockPortfolio(stockPortfolio.$key);
    if(stockPortfolio.STOCK_NAME != 'CASH'){
      this.stockPortfolioRef.update({
        //$key: stockPortfolio.$key,
        STOCK_NAME: stockPortfolio.STOCK_NAME,
        STOCK_NUM: stockPortfolio.STOCK_NUM,
        COST: stockPortfolio.COST,
        UNIT: stockPortfolio.UNIT,
        //PRICE_PER_UNIT: stockPortfolio.PRICE_PER_UNIT
      });
    }else{
      this.stockPortfolioRef.update({
        UNIT: stockPortfolio.UNIT,
      });
    }
  }

  // Delete Student Object
  DeleteStockPortolio(id: string) {
    this.stockPortfolioRef = this.db.object("portfolio-list/" + id);
    this.stockPortfolioRef.remove();
  }
}
