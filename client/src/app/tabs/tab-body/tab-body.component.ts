import { Component, OnInit, TemplateRef, ViewChild } from "@angular/core";

@Component({
	selector: "app-tab-body",
	templateUrl: "./tab-body.component.html"
})
export class TabBodyComponent implements OnInit {
	@ViewChild(TemplateRef)
	bodyContent: TemplateRef<any>;

	constructor() {}

	ngOnInit(): void {}
}
