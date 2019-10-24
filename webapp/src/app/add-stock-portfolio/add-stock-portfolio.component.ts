import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';

import { StockPortfolioService } from "../service/stock-portfolio.service";
import { StockPortfolio } from "../model/stock-portfolio";

import { NzInputDirective } from 'ng-zorro-antd/input';
import { NzModalService, NzModalRef } from 'ng-zorro-antd/modal';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-stock-portfolio',
  templateUrl: './add-stock-portfolio.component.html',
  styleUrls: ['./add-stock-portfolio.component.scss']
})
export class AddStockPortfolioComponent implements OnInit {

  constructor(
    private stockPortfolioSerivce: StockPortfolioService,
    private modal: NzModalRef,
    private fb: FormBuilder
  ) {}

  destroyModal(): void {
    this.modal.destroy();
  }

  validateForm: FormGroup;

  submitForm(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
    console.log(this.validateForm.value);
    this.stockPortfolioSerivce.AddStockPortfolio(this.validateForm.value);
  }

  updateConfirmValidator(): void {
    /** wait for refresh value */
    Promise.resolve().then(() => this.validateForm.controls.checkPassword.updateValueAndValidity());
  }

  confirmationValidator = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { required: true };
    } else if (control.value !== this.validateForm.controls.password.value) {
      return { confirm: true, error: true };
    }
    return {};
  };

  getCaptcha(e: MouseEvent): void {
    e.preventDefault();
  }
 
  ngOnInit(): void {
    this.validateForm = this.fb.group({
      STOCK_NAME: [null, [Validators.required]],
      STOCK_NUM: [null, [Validators.required]],
      COST: [null, [Validators.required]],
      UNIT: [null, [Validators.required]],
      //PRICE_PER_UNIT: [null, [Validators.required]],
      SYMBOL: [null, [Validators.required]],
      //PREVIOUS_CLOSE: string;
      //STATUS: string;
 

      // email: [null, [Validators.email, Validators.required]],
      // password: [null, [Validators.required]],
      // checkPassword: [null, [Validators.required, this.confirmationValidator]],
      // nickname: [null, [Validators.required]],
      // phoneNumberPrefix: ['+86'],
      // phoneNumber: [null, [Validators.required]],
      // website: [null, [Validators.required]],
      // captcha: [null, [Validators.required]],
      // agree: [false]
    });
  }
}
