import {
	Component,
	OnInit,
	ContentChildren,
	QueryList,
	AfterContentInit,
	Input,
	AfterContentChecked,
  ChangeDetectorRef,
  AfterViewChecked
} from '@angular/core';
import { TabItemComponent } from '../tab-item/tab-item.component';
import { Observable, Subscription } from 'rxjs';
import { startWith, map, take, tap, delay } from 'rxjs/operators';

@Component({
	selector: 'app-tabs',
	templateUrl: './tabs.component.html',
	styles: [
		`
			.tabs-header {
				display: flex;
			}
			.active {
				color: red;
			}
			.tab-label {
				padding: 25px;
				margin: 0 10px;
			}
		`
	]
})
export class TabsComponent implements AfterContentInit, AfterContentChecked, 	AfterViewChecked
{
	@ContentChildren(TabItemComponent)
	tabs: QueryList<TabItemComponent>;

	tabItems$: Observable<TabItemComponent[]>;

	activeTab: TabItemComponent;

	constructor(private cdRef: ChangeDetectorRef) {}
  ngAfterViewChecked(): void {
		this.cdRef.detectChanges();
	}

	ngAfterContentInit(): void {
		this.tabItems$ = this.tabs.changes
			.pipe(startWith(''))
			.pipe(delay(0))
			.pipe(map(() => this.tabs.toArray()));
	}

	ngAfterContentChecked() {
		// choose the default tab
		// we need to wait for a next VM turn,
		// because Tab item content, will not be initialized yet
		if (!this.activeTab) {
			Promise.resolve().then(() => {
				this.activeTab = this.tabs.first;
			});
		}
	}

	selectTab(tabItem: TabItemComponent) {
		if (this.activeTab === tabItem) {
			return;
		}

		if (this.activeTab) {
			this.activeTab.isActive = false;
		}

		this.activeTab = tabItem;

		tabItem.isActive = true;
	}
}
