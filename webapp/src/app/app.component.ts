import { Component } from '@angular/core';
import { Service } from './app.services.js';
import { ActivatedRoute, Router } from '@angular/router';
import { element } from '@angular/core/src/render3';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'webapp';

  result ={};
  price: any = [];
  summaryDetail: any = [];

  constructor(
    private bs: Service,
    private router: Router,
  ){}

  ngOnInit() {
    // this.bs
    //   .getApi()
    //   .subscribe((data) => {
    //     console.log(data);
    // });

      let symbol = '0005.HK';
      this.bs.getQuotesBySymbol(symbol).subscribe(res => {
            //console.log(res);
            /*for (var key in res) {
              if (res.hasOwnProperty(key)) {
                  console.log(key + " -> " + res[key]);
                  for (var item in res[key]) {
                    console.log(item + " -> " + res[key][item]);
                  }
              }
          }*/
          Object.entries(res).forEach(
            (element) => {
              console.log(element[1]);
              for (let [key, value] of Object.entries(element[1])) {
                console.log(`${key}: ${value}`);
              }
            }
          );
            //this.result = Object.keys(res).map(i => res[i]);
            console.log( this.result);

            //this.result = JSON.stringify(res);
            //this.result = Object.values(res);


            //console.log(this.result.price.averageDailyVolume3Month);
      });
    
    }
  }

//https://codehandbook.org/looping-nested-object-keys-with-ngfor-in-angular/
