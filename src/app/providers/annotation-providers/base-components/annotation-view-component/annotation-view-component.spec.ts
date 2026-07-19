import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnotationViewComponent } from './annotation-view-component';

describe('AnnotationViewComponent', () => {
  let component: AnnotationViewComponent;
  let fixture: ComponentFixture<AnnotationViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnnotationViewComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AnnotationViewComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
