import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentView } from './document-view';
import {HttpClient} from '@angular/common/http';

describe('DocumentView', () => {
  let component: DocumentView;
  let fixture: ComponentFixture<DocumentView>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DocumentView],
      providers: [HttpClient]
    }).compileComponents();

    fixture = TestBed.createComponent(DocumentView);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
