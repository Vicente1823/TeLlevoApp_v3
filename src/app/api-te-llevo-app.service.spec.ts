import { TestBed } from '@angular/core/testing';

import { ApiTeLlevoAppService } from './api-te-llevo-app.service';

describe('ApiTeLlevoAppService', () => {
  let service: ApiTeLlevoAppService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiTeLlevoAppService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
