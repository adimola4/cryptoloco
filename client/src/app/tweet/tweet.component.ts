import { Component, Input, OnInit } from '@angular/core';
import { DataService } from '../core';
import { Tweet } from '../models';

@Component({
	selector: 'tweet',
	templateUrl: './tweet.component.html'
})
export class TweetComponent implements OnInit {
	@Input()
	tweet: Tweet;

	constructor(private dataService: DataService) {}

	ngOnInit(): void {}
}
