import { Injectable } from '@angular/core';
import {
	HttpRequest,
	HttpHandler,
	HttpEvent,
	HttpInterceptor,
	HttpResponse
} from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable()
export class CacheInterceptor implements HttpInterceptor {
	private cache: Map<HttpRequest<any>, HttpResponse<any>> = new Map();
	constructor() {}

	intercept(
		request: HttpRequest<any>,
		next: HttpHandler
	): Observable<HttpEvent<any>> {
		console.log(request.method);

		if (request.method !== 'GET') {
			return next.handle(request);
		}
		console.log('caching working');
		const cachedResponse = this.cache.get(request);

		if (cachedResponse) {
			return of(cachedResponse.clone());
		} else {
			return next.handle(request).pipe((data): any => {
				console.log(JSON.stringify(data));
				// this.cache.set(request, data.clone())
			});
		}
	}
}
