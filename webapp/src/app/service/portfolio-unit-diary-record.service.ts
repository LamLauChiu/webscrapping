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
export class PortfolioUnitDiaryRecordService {
  portfolioUnitDiaryRecordsRef: AngularFireList<any>; // Reference to Student data list, its an Observable
  portfolioUnitDiaryRecordRef: AngularFireObject<any>; // Reference to Student object, its an Observable too

  // Inject AngularFireDatabase Dependency in Constructor
  constructor(private db: AngularFireDatabase) {}

  // Fetch Single GetPortfolioUnitDiaryRecord Object
  GetPortfolioUnitDiaryRecord(id: string) {
    this.portfolioUnitDiaryRecordRef = this.db.object(
      "portfolio-unit-diary-record/" + id
    );
    return this.portfolioUnitDiaryRecordRef;
  }

  // Fetch GetPortfolioUnitDiaryRecords List
  GetPortfolioUnitDiaryRecordList() {
    this.portfolioUnitDiaryRecordsRef = this.db.list(
      "portfolio-unit-diary-record"
    );
    console.log(this.portfolioUnitDiaryRecordsRef);
    return this.portfolioUnitDiaryRecordsRef;
  }
}
