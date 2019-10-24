import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';

import { TotalUnitService } from "./../service/total-unit.service";
import { TotalUnit } from "./../model/total-unit";


import { NzInputDirective } from 'ng-zorro-antd/input';
import { NzModalService, NzModalRef } from 'ng-zorro-antd/modal';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-total-unit',
  templateUrl: './add-total-unit.component.html',
  styleUrls: ['./add-total-unit.component.scss']
})
export class AddTotalUnitComponent implements OnInit {

  constructor(
    private totalUnitSerivce: TotalUnitService,
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
    this.totalUnitSerivce.AddTotalUnit(this.validateForm.value);
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
      MEMBER: [null, [Validators.required]],
      UNIT: [null, [Validators.required]],
    });
} 

}