import { TestBed } from '@angular/core/testing';

import { Plugins.ServiceService } from './plugins.service.service';

describe('Plugins.ServiceService', () => {
  let service: Plugins.ServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Plugins.ServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
