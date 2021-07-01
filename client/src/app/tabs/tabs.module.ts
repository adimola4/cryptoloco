import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabLabelComponent } from './tab-label/tab-label.component';
import { TabsComponent } from './tabs/tabs.component';
import { TabItemComponent } from './tab-item/tab-item.component';
import { TabBodyComponent } from './tab-body/tab-body.component';

@NgModule({
	declarations: [
		TabsComponent,
		TabItemComponent,
		TabLabelComponent,
		TabBodyComponent,
		TabLabelComponent
	],
	imports: [CommonModule],
	exports: [
		TabsComponent,
		TabItemComponent,
		TabBodyComponent,
		TabLabelComponent
	]
})
export class TabsModule {}
