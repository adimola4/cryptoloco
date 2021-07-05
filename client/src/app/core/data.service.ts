import { Injectable } from "@angular/core";
import {
	HttpClient,
	HttpErrorResponse,
	HttpHeaders,
	HttpParams
} from "@angular/common/http";
import { Observable, throwError, BehaviorSubject, of } from "rxjs";
import { map, catchError, tap, shareReplay, switchMap } from "rxjs/operators";

import { CacheInterceptor } from "./interceptors";

import { Article } from "../models/article";
import { Source } from "../models/source";
import { Currency } from "../models/currency";
import { Category } from "../models/category";
import { TrackerErrorMessage } from "../models/trackerErrorMessage";
import { Tweet } from "../models";
import { environment } from "src/environments/environment";

@Injectable({
	providedIn: "root"
})
export class DataService {
	constructor(private http: HttpClient) {}

	get sources$(): Observable<Source[]> {
		if (!this.sourcesRequest$) {
			this.sourcesRequest$ = this.http
				.get<Source[]>(this.API_URL + "sources", this.httpOptions)
				.pipe(shareReplay(1), catchError(this.handleError));
		}

		return this.sourcesRequest$;
	}
	get currencies$(): Observable<Currency[]> {
		if (!this.currenciesRequest$) {
			this.currenciesRequest$ = this.http
				.get<Currency[]>(this.API_URL + "currencies", this.httpOptions)
				.pipe(shareReplay(1), catchError(this.handleError));
		}

		return this.currenciesRequest$;
	}

	API_URL = environment.production
		? "https://cryptoloco.herokuapp.com/api/v1/"
		: "http://localhost:3000/api/v1/";
	TOP_CURRENCIES_API_URL = "https://api.coingecko.com/api/v3/search/trending";

	httpOptions = {
		headers: new HttpHeaders({
			"Content-Type": "application/json",
			Accept: "*/*"
		})
	};

	private sourcesRequest$: Observable<Source[]>;
	private currenciesRequest$: Observable<Currency[]>;
	private feedRequest$: Observable<Article[]>;

	API_CHART_90d = (a: string) => {
		return `https://api.coingecko.com/api/v3/coins/${a}/market_chart?vs_currency=usd&days=90&interval=daily`;
	};
	API_CHART_1d = (a: string) => {
		return `https://api.coingecko.com/api/v3/coins/${a}/market_chart?vs_currency=usd&days=1`;
	};

	getFeed(page: number): Observable<Article[]> {
		return this.http
			.get<Article[]>(this.API_URL + `feed/${page}`, this.httpOptions)
			.pipe(
				tap()
				// shareReplay({ bufferSize: 1, refCount: true }),
				// tap()
			);
	}

	handleError(err: any): Observable<never> {
		let errorMessage: string;
		if (err.error instanceof ErrorEvent) {
			errorMessage = `An error occurred: ${err.error.message}`;
		} else if (err instanceof HttpErrorResponse) {
			errorMessage = `'${err.status} ${err.statusText}' when accessing '${err.url}'`;
		} else {
			errorMessage = err;
		}
		return throwError(errorMessage);
	}

	private handleHttpError(
		error: HttpErrorResponse
	): Observable<TrackerErrorMessage> {
		const dataError = new TrackerErrorMessage();
		dataError.errorNumber = 100;
		dataError.errorMessage = error.statusText;
		dataError.messageView = "Houston, we have a problem?!";
		return throwError(dataError);
	}

	getSourceById(id: number): Observable<Source> {
		return this.http.get<Source>(this.API_URL + `sources/${id}`);
	}

	addSource(newSource: Source): Observable<Source> {
		return this.http.post<Source>(this.API_URL + "sources", newSource);
	}

	getArticleByTitle(title: string): Observable<Article> {
		return this.http.get<Article>(this.API_URL + `articles/${title}`).pipe(
			catchError(this.handleError),
			map((article: Article) => article)
		);
	}
	getCurrency(id: string): Observable<Currency> {
		return this.http.get<Currency>(this.API_URL + `currencies/${id}`).pipe(
			catchError(this.handleError),
			map((currency: Currency) => currency)
		);
	}

	getCurrencies(): Observable<Currency[]> {
		return this.http
			.get<Currency[]>(this.API_URL + "currencies", this.httpOptions)
			.pipe(tap(), shareReplay(1), tap());
	}

	getTopCurrency(): Observable<Currency[]> {
		return this.http
			.get<Currency>(this.API_URL + "currencies_trending", this.httpOptions)
			.pipe(tap(console.log), shareReplay(1), tap());
	}

	getTweets(): Observable<Tweet[]> {
		return this.http
			.get<Tweet[]>(this.API_URL + "tweets", this.httpOptions)
			.pipe(tap(), shareReplay({ bufferSize: 1, refCount: true }), tap());
	}

	newTwitterAccount(twitter_user_name: string): Observable<Tweet[]> {
		return this.http
			.get<Tweet[]>(
				this.API_URL + `tweets/${twitter_user_name}`,
				this.httpOptions
			)
			.pipe(tap(), shareReplay({ bufferSize: 1, refCount: true }), tap());
	}

	getChartByCoin(coinid: string, day?: number): Observable<any> {
		if (day === 1) {
			return this.http
				.get<any>(this.API_CHART_1d(coinid), this.httpOptions)
				.pipe(tap(), shareReplay({ bufferSize: 1, refCount: true }), tap());
		} else {
			return this.http
				.get<any>(this.API_CHART_90d(coinid), this.httpOptions)
				.pipe(tap(), shareReplay({ bufferSize: 1, refCount: true }), tap());
		}
	}
}
