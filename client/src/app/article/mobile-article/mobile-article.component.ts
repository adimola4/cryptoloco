import {
	ChangeDetectorRef,
	Component,
	Input,
	NgZone,
	OnInit,
	SimpleChange
} from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { DataService } from "src/app/core/data.service";
import { Article } from "src/app/models";

@Component({
	selector: "app-mobile-article",
	templateUrl: "./mobile-article.component.html"
})
export class MobileArticleComponent implements OnInit {
	public article: Article;
	constructor(
		private dataService: DataService,
		private activatedRoute: ActivatedRoute,
		private zone: NgZone,
		private cdr: ChangeDetectorRef
	) {}

	ngOnInit(): void {
		this.article = this.activatedRoute.snapshot.data["article"];
	}
	ngOnChanges(changes: SimpleChange) {}

	articleget() {}
}
