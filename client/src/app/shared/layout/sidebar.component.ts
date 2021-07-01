import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';
import { SideBarService } from 'src/app/core/';
import { Observable } from 'rxjs';
import { SideBarDirection } from './sidebar-direction';

@Component({
	selector: 'app-sidebar',
	templateUrl: './sidebar.component.html',
	styles: [
		`
			.side-nav-bar-overlay-collapsed {
				background: transparent !important;
			}
			.side-nav-bar-collapsed {
				visibility: collapse !important;
			}
		`
	],
	encapsulation: ViewEncapsulation.None
})
export class SidebarComponent {
	showSideBar: Observable<boolean>;

	@Input() sidebarTemplateRef: any;
	@Input() duration = 0.25;
	@Input() sidebarWidth: number = window.innerWidth;
	@Input() direction: string = SideBarDirection.Left.toString();

	constructor(private sidebarService: SideBarService) {}

	ngOnInit(): void {
		this.showSideBar = this.sidebarService.getSideBar();
	}

	onSidebarClose() {
		this.sidebarService.setShowSideBar(false);
	}

	getSideBarStyle(showSidebar: Observable<boolean>) {
		const sideBarStyle: any = {};

		sideBarStyle.transition =
			this.direction +
			' ' +
			this.duration +
			's, visibility ' +
			this.duration +
			's';
		sideBarStyle.width = this.sidebarWidth + 'px';
		sideBarStyle[this.direction] =
			(showSidebar ? 0 : this.sidebarWidth * -1) + 'px';

		return sideBarStyle;
	}
}
