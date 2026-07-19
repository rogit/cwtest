import {InjectionToken} from '@angular/core';

export const ANNOTATION_PROVIDER = new InjectionToken('ANNOTATION_PROVIDER');
export const ANNOTATION_ADD_CALLBACK = new InjectionToken<Function>('ANNOTATION_ADD_CALLBACK');
export const ANNOTATION_CLOSE_CALLBACK = new InjectionToken<Function>('ANNOTATION_CLOSE_CALLBACK');
