import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoiceReportComponent } from './invoice-report';

describe('InvoiceReport', () => {
  let component: InvoiceReportComponent;
  let fixture: ComponentFixture<InvoiceReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InvoiceReportComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(InvoiceReportComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
