import {
	HttpEvent,
	HttpHandler,
	HttpRequest,
	HttpInterceptor
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";

@Injectable({
	providedIn: "root"
})
export class ErrorInterceptor implements HttpInterceptor {
	constructor(private router: Router) {}
	intercept(
		request: HttpRequest<any>,
		next: HttpHandler
	): Observable<HttpEvent<any>> {
		return next.handle(request).pipe(
			catchError(err => {
				switch (err.status) {
					case 404:
						return throwError(err);
					case 500:
						return throwError(err);
					default:
						return throwError(err);
				}
			})
		);
	}
}
