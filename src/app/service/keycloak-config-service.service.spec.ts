import { TestBed } from '@angular/core/testing';

import { KeycloakConfigServiceService } from './keycloak-config-service.service';

describe('KeycloakConfigServiceService', () => {
  let service: KeycloakConfigServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KeycloakConfigServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
