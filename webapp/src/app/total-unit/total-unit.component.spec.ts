import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalUnitComponent } from './total-unit.component';

describe('TotalUnitComponent', () => {
  let component: TotalUnitComponent;
  let fixture: ComponentFixture<TotalUnitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TotalUnitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TotalUnitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
