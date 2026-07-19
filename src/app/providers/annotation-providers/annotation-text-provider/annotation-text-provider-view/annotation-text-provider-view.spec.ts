import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnotationTextProviderView } from './annotation-text-provider-view';

describe('AnnotationTextProviderView', () => {
  let component: AnnotationTextProviderView;
  let fixture: ComponentFixture<AnnotationTextProviderView>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnnotationTextProviderView],
    }).compileComponents();

    fixture = TestBed.createComponent(AnnotationTextProviderView);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
