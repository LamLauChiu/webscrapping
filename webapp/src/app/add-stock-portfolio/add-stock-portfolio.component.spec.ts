import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddStockPortfolioComponent } from './add-stock-portfolio.component';

describe('AddStockPortfolioComponent', () => {
  let component: AddStockPortfolioComponent;
  let fixture: ComponentFixture<AddStockPortfolioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddStockPortfolioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddStockPortfolioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
