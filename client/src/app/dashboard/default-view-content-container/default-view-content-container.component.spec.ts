import { ComponentFixture, TestBed } from "@angular/core/testing";

import { DefaultViewContentContainerComponent } from "./default-view-content-container.component";

describe("DefaultViewContentContainerComponent", () => {
	let component: DefaultViewContentContainerComponent;
	let fixture: ComponentFixture<DefaultViewContentContainerComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [DefaultViewContentContainerComponent]
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(DefaultViewContentContainerComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
