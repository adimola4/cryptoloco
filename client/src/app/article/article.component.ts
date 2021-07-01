import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import {
	trigger,
	state,
	style,
	animate,
	transition,
	keyframes
} from '@angular/animations';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../core/data.service';

import { Article } from '../models';

@Component({
	selector: 'app-article',
	templateUrl: './article.component.html',
	styles: [
		'.video-div{ position: relative; padding-bottom: 56.25%; height:0;} .video-div iframe{ position: absolute; top:0; left:0; width:100%; height: 100%; }',
		`
			@keyframes 'fadeSlideGrowKeyframe' {
				30% {
					transform: opacity(1) ’;
				}
				60% {
					transform: ‘translateY(0) ’;
				}
				100% {
					transform: ‘scale(1) ’;
				}
			}
		`
	],
	animations: [
		trigger('fadeSlideGrowKeyframe', [
			transition(':enter', [
				style({ opacity: 0, transform: 'scale(0.5) translateY(50px)' }),
				animate(
					'500ms',
					keyframes([
						style({ opacity: 1, offset: 0.3 }),
						style({ transform: 'translateY(0)', offset: 0.6 }),
						style({ transform: 'scale(1)', offset: 1 })
					])
				)
			])
		])
	]
})
export class ArticleComponent implements OnInit {
	@Input() article: Article;
	public type: Number;
	safeUrl: any;
	constructor(
		private dataService: DataService,
		private sanitizer: DomSanitizer,
		private router: Router,
		private activatedRoute: ActivatedRoute
	) {}

	ngOnInit(): void {
		if (this.article.type_of_content === 'Video') {
			this.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
				this.article.content
			);
		}
	}

	ngOnChanges(changes: SimpleChanges) {
		this.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
			this.article.content
		);
	}

	getSanitizedURL() {
		return this.sanitizer.bypassSecurityTrustUrl(this.article.content);
	}
}
