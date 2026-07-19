import {Provider} from '@angular/core';
import {ANNOTATION_PROVIDER} from '../annotation-provider.const';
import {AnnotationText2ProviderAdd} from './annotation-text2-provider-add/annotation-text2-provider-add';
import {AnnotationText2ProviderView} from './annotation-text2-provider-view/annotation-text2-provider-view';
import {AnnotationProvider} from '../annotation-provider.model';

export const ANNOTATION_TEXT2_PROVIDER: Provider = {
  provide: ANNOTATION_PROVIDER,
  multi: true,
  useValue: {
    type: 'TEXT2',
    menuText: `Add text annotation`,
    addComponent: AnnotationText2ProviderAdd,
    viewComponent: AnnotationText2ProviderView,
  } as AnnotationProvider
};
