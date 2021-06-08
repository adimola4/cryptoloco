import { Injectable, OnInit } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
	providedIn: "root"
})
export class SideBarService implements OnInit {
	private showSideBar$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
		false
	);

	constructor() {}

	ngOnInit() {}

	getSideBar() {
		return this.showSideBar$.asObservable();
	}

	setShowSideBar(show: boolean) {
		this.showSideBar$.next(show);
	}

	toggleSideBarState() {
		this.showSideBar$.next(!this.showSideBar$.value);
	}

	isSideBarOpen() {
		return this.showSideBar$.value;
	}
}
