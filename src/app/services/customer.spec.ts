import { TestBed } from '@angular/core/testing';

// import { Customer } from './customer';
import { Customer } from '../models/CustomerModel';

describe('Customer', () => {
  let service: Customer;

  beforeEach(() => {
    service = {} as Customer;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
