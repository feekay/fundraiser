import { TestBed, inject } from '@angular/core/testing';

import { BloodCaseService } from './blood-case.service';

describe('BloodCaseService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BloodCaseService]
    });
  });

  it('should ...', inject([BloodCaseService], (service: BloodCaseService) => {
    expect(service).toBeTruthy();
  }));
});
