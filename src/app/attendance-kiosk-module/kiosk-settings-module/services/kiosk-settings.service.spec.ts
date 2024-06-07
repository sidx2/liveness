import { TestBed } from '@angular/core/testing';

import { KioskSettingsService } from './kiosk-settings.service';

describe('KioskSettingsService', () => {
  let service: KioskSettingsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KioskSettingsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
