import { Injectable } from "@angular/core";
import { PortfolioStockDetails } from "../model/portfolio-stock-details"; // StockPortfolio data type interface class
import {
  AngularFireDatabase,
  AngularFireList,
  AngularFireObject
} from "@angular/fire/database"; // Firebase modules for Database, Data list and Single object

@Injectable({
  providedIn: "root"
})
export class PortfolioStockDetailsService {
  portfolioStockDetailsRef: AngularFireList<any>; // Reference to Student data list, its an Observable
  portfolioStockDetailRef: AngularFireObject<any>; // Reference to Student object, its an Observable too

  // Inject AngularFireDatabase Dependency in Constructor
  constructor(private db: AngularFireDatabase) {}

  // Fetch Single PortfolioStockDetail Object
  GetPortfolioStockDetail(id: string) {
    this.portfolioStockDetailRef = this.db.object("portfolio-stock-details/" + id);
    return this.portfolioStockDetailRef;
  }

  // Fetch ortfolioStockDetails List
  GetPortfolioStockDetailsList() {
    this.portfolioStockDetailsRef = this.db.list("portfolio-stock-details");
    console.log(this.portfolioStockDetailsRef);
    return this.portfolioStockDetailsRef;
  }
}
