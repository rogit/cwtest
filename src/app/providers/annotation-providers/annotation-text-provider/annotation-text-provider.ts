import {Provider} from '@angular/core';
import {ANNOTATION_PROVIDER} from '../annotation-provider.const';
import {AnnotationTextProviderAdd} from './annotation-text-provider-add/annotation-text-provider-add';
import {AnnotationTextProviderView} from './annotation-text-provider-view/annotation-text-provider-view';
import {AnnotationProvider} from '../annotation-provider.model';

export const ANNOTATION_TEXT_PROVIDER: Provider = {
  provide: ANNOTATION_PROVIDER,
  multi: true,
  useValue: {
    type: 'TEXT',
    menuText: `Добавить текстовую аннотацию`,
    addComponent: AnnotationTextProviderAdd,
    viewComponent: AnnotationTextProviderView,
  } as AnnotationProvider
};
