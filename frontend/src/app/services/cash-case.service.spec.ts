import { TestBed, inject } from '@angular/core/testing';

import { CashCaseService } from './cash-case.service';

describe('CashCaseService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CashCaseService]
    });
  });

  it('should ...', inject([CashCaseService], (service: CashCaseService) => {
    expect(service).toBeTruthy();
  }));
});
