import { Routes } from '@angular/router';
import {DocumentView} from './components/document-view/document-view';
import {Home} from './components/home/home';

export const routes: Routes = [
  {
    path: '',
    component: Home,
  },
  {
    path: 'viewer/view/:id',
    component: DocumentView,
  }
];
