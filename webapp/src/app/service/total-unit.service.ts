import { Injectable } from '@angular/core';
import { TotalUnit } from '../model/total-unit';  // StockPortfolio data type interface class
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';  // Firebase modules for Database, Data list and Single object

@Injectable({
  providedIn: 'root'
})

export class TotalUnitService {
    totalUnitsRef: AngularFireList<any>;    // Reference to Student data list, its an Observable
    totalUnitRef: AngularFireObject<any>;   // Reference to Student object, its an Observable too
    
    // Inject AngularFireDatabase Dependency in Constructor
    constructor(private db: AngularFireDatabase) {
    }

    // Create stockPortfolio
    AddTotalUnit( totalUnit: TotalUnit) {
        let date = new Date();
        this.totalUnitsRef.push({
            MEMBER: totalUnit.MEMBER,
            UNIT: totalUnit.UNIT,
            LASTMODIFIEDUSER: 'ADMIM',
            LASTMODIFIEDDATE: date,
        })
    }

    // Fetch Single stockPortfolio Object
    GetTotalUnit(id: string) {
        this.totalUnitRef = this.db.object('totalUnit-list/' + id);
        return this.totalUnitRef;
    }

    // Fetch stockPortfolios List
    GetTotalUnitsList() {
        this.totalUnitsRef = this.db.list('totalUnit-list');
        //console.log( this.totalUnitsRef );
        return this.totalUnitsRef;
    }  

    // Update stockPortfolio Object
    UpdateTotalUnit(totalUnit:TotalUnit) {
        console.log(totalUnit);
        this.GetTotalUnit(totalUnit.$key);
        let date = new Date();
        this.totalUnitRef.update({
            //$key: stockPortfolio.$key,
            MEMBER: totalUnit.MEMBER,
            UNIT: totalUnit.UNIT,
            LASTMODIFIEDUSER: 'ADMIM',
            LASTMODIFIEDDATE: date,
        })
    }  

    // Delete Student Object
    DeleteTotalUnit(id: string) { 
        this.totalUnitRef = this.db.object('totalUnit-list/'+id);
        this.totalUnitRef.remove();
    }
}
