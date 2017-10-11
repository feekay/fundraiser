import { TestBed, inject } from '@angular/core/testing';

import { VolunteeringCaseService } from './volunteering-case.service';

describe('VolunteeringCaseService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [VolunteeringCaseService]
    });
  });

  it('should ...', inject([VolunteeringCaseService], (service: VolunteeringCaseService) => {
    expect(service).toBeTruthy();
  }));
});
