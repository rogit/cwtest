import {AnnotationType} from '../../models/document.model';
import {Type} from '@angular/core';

export interface AnnotationProvider {
  type: AnnotationType;
  menuText: string;
  addComponent: Type<any>;
  viewComponent: Type<any>;
}
