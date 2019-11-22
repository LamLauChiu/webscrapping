import {Injectable} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
 
const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
 
@Injectable()
export class StockUpdateService {
 
    constructor(private http:HttpClient) {}
 
    // Uses http.get() to load data from a single API endpoint
    // triggerStockUpdate() {
    //     return this.http.get('https://us-central1-familyinvestment-f8cf1.cloudfunctions.net/app/updateAll/getQuotesBySymbol')
    //         .map(response => response = response.json());
    // }
    
}