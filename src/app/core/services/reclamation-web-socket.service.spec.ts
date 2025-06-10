import { TestBed } from '@angular/core/testing';

import { ReclamationWebSocketService } from './reclamation-web-socket.service';

describe('ReclamationWebSocketService', () => {
  let service: ReclamationWebSocketService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReclamationWebSocketService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
