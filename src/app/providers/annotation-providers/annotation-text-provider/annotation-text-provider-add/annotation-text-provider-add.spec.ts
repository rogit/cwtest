import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnotationTextProviderAdd } from './annotation-text-provider-add';

describe('AnnotationTextProviderAdd', () => {
  let component: AnnotationTextProviderAdd;
  let fixture: ComponentFixture<AnnotationTextProviderAdd>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnnotationTextProviderAdd],
    }).compileComponents();

    fixture = TestBed.createComponent(AnnotationTextProviderAdd);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
