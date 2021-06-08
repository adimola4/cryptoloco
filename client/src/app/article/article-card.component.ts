import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import {
	trigger,
	state,
	style,
	animate,
	transition
} from "@angular/animations";

import { Source } from "../models";
import { Article } from "../models";

@Component({
	selector: "article-card",
	templateUrl: "./article-card.component.html",
	animations: [
		trigger("fadeSlideInOut", [
			transition(":enter", [
				style({ opacity: 0, transform: "translateY(10px)" }),
				animate("500ms", style({ opacity: 1, transform: "translateY(0px)" }))
			]),
			transition(":leave", [
				animate("500ms", style({ opacity: 0, transform: "translateY(10px)" }))
			])
		]),
		trigger("enterExitRight", [
			transition(":enter", [
				style({ opacity: 0, transform: "translateX(200px)" }),
				animate(
					"300ms ease-in",
					style({ opacity: 1, transform: "translateX(0)" })
				)
			]),
			transition(":leave", [
				animate(
					"300ms ease-in",
					style({ opacity: 0, transform: "translateX(200px)" })
				)
			])
		]),
		trigger("enterExitLeft", [
			transition(":enter", [
				style({ opacity: 0, transform: "translateX(-200px)" }),
				animate(
					"300ms ease-in",
					style({ opacity: 1, transform: "translateX(0)" })
				)
			]),
			transition(":leave", [
				animate(
					"300ms ease-in",
					style({ opacity: 0, transform: "translateX(-200px)" })
				)
			])
		])
	]
})
export class ArticleCardComponent implements OnInit {
	@Input() article: Article;
	@Output() articleClick = new EventEmitter<Article>();
	article_type: Boolean;
	constructor(private router: Router, private route: ActivatedRoute) {}
	ngOnInit(): void {
		this.article_type =
			this.article.type_of_content === "Article" ? true : false;
	}
	articleLinkClick() {
		if (window.innerWidth < 450) {
			let currentUrl = this.router.url;
			this.router.navigateByUrl("/article/" + this.article.title);
		} else {
			this.articleClick.emit(this.article);
		}
	}
}
