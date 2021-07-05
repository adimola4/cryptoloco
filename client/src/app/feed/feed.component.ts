import { Component, OnInit, Output, EventEmitter, Input } from "@angular/core";

import { Source } from "../models/source";
import { Article } from "../models/article";
import { DataService } from "../core/data.service";
import { DeviceWidthService } from "../core/device-width.service";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

@Component({
	selector: "app-feed",
	templateUrl: "./feed.component.html"
})
export class FeedComponent implements OnInit {
	// articles: Article[] = [];
	searchTerm: string;
	selectedType: string;
	isMobile: Boolean;
	// shownArticle: Article;

	constructor(private dataService: DataService, private router: Router) {}

	ngOnInit() {}

	searchChange(term: string) {
		this.searchTerm = term;
	}
}
