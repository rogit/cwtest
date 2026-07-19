import {
  ChangeDetectionStrategy,
  Component,
  input,
} from '@angular/core';
import {Annotation} from '../../../../models/document.model';

@Component({
  selector: 'app-annotation-text2-provider-view',
  templateUrl: './annotation-text2-provider-view.html',
  styleUrl: './annotation-text2-provider-view.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnnotationText2ProviderView {
  public annotation = input<Annotation>();
}
