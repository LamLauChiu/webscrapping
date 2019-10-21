import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class Service {


  uri = 'http://localhost:8000/api';

  constructor(private http: HttpClient) { }

  getApi() {
    return this
           .http
           .get(`${this.uri}/get`);
  }

  getQuotesBySymbol(symbol) {
    return this
            .http
            .get(`${this.uri}/getQuotesBySymbol/${symbol}`);
    }
  

}