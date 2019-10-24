import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTotalUnitComponent } from './add-total-unit.component';

describe('AddTotalUnitComponent', () => {
  let component: AddTotalUnitComponent;
  let fixture: ComponentFixture<AddTotalUnitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddTotalUnitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTotalUnitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
