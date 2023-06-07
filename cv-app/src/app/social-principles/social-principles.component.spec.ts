import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SocialPrinciplesComponent } from './social-principles.component';

describe('SocialPrinciplesComponent', () => {
  let component: SocialPrinciplesComponent;
  let fixture: ComponentFixture<SocialPrinciplesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SocialPrinciplesComponent]
    });
    fixture = TestBed.createComponent(SocialPrinciplesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
