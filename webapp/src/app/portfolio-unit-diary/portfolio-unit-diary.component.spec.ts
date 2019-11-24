import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PortfolioUnitDiaryComponent } from './portfolio-unit-diary.component';

describe('PortfolioUnitDiaryComponent', () => {
  let component: PortfolioUnitDiaryComponent;
  let fixture: ComponentFixture<PortfolioUnitDiaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PortfolioUnitDiaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PortfolioUnitDiaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
