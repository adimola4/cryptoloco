import {
	ActivatedRoute,
	ActivatedRouteSnapshot,
	CanActivate,
	Resolve,
	Router,
	RouterStateSnapshot
} from "@angular/router";
import { Injectable } from "@angular/core";
import { DataService } from "./data.service";
import { Currency } from "../models";
import { EMPTY, Observable, of } from "rxjs";
import { catchError, mergeMap, take } from "rxjs/operators";

@Injectable()
export class CurrencyResolver implements Resolve<Currency> {
	constructor(private dataService: DataService, private router: Router) {}
	resolve(
		activatedRoute: ActivatedRouteSnapshot,
		state: RouterStateSnapshot
	): any {
		return this.dataService.getCurrency(activatedRoute.params.currencyId).pipe(
			take(1),
			mergeMap(currency => {
				if (currency) {
					return of(currency);
				} else {
					this.router.navigate(["/dashboard"]);
					return EMPTY;
				}
			}),
			catchError(err => of("no currency found"))
		);
	}
}
