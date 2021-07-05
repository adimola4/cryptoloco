import { Directive, ViewContainerRef } from "@angular/core";

@Directive({
	selector: "[appHolder]"
})
export class HolderDirective {
	constructor(public viewContainerRef: ViewContainerRef) {}
}
