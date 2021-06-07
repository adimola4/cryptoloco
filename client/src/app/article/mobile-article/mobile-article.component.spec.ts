import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileArticleComponent } from './mobile-article.component';

describe('MobileArticleComponent', () => {
  let component: MobileArticleComponent;
  let fixture: ComponentFixture<MobileArticleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MobileArticleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MobileArticleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
