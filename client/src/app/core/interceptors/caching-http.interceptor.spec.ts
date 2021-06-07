import { TestBed } from '@angular/core/testing';
import { CacheInterceptor } from './caching-http.interceptor';


describe('CachingHttpInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      CacheInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: CacheInterceptor = TestBed.inject(CacheInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
