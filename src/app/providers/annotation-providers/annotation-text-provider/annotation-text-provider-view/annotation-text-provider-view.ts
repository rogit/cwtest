import {
  ChangeDetectionStrategy,
  Component,
  input,
} from '@angular/core';
import {Annotation} from '../../../../models/document.model';

@Component({
  selector: 'app-annotation-text-provider-view',
  templateUrl: './annotation-text-provider-view.html',
  styleUrl: './annotation-text-provider-view.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnnotationTextProviderView {
  public annotation = input<Annotation>();
}
