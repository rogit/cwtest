import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAnnotationMenuPopup } from './add-annotation-menu-popup';

describe('AddAnnotationMenuPopup', () => {
  let component: AddAnnotationMenuPopup;
  let fixture: ComponentFixture<AddAnnotationMenuPopup>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddAnnotationMenuPopup],
    }).compileComponents();

    fixture = TestBed.createComponent(AddAnnotationMenuPopup);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
