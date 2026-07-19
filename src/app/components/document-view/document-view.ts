import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  } from '@angular/core';
import {DocumentService} from '../../services/document-service/document-service';
import {PageView} from '../page-view/page-view';
import {ControlButtons} from '../control-buttons/control-buttons';
import {ANNOTATION_PROVIDERS} from '../../providers/annotation-providers/annotation-providers';

@Component({
  selector: 'app-document-view',
  imports: [
    PageView,
    ControlButtons,
  ],
  templateUrl: './document-view.html',
  styleUrl: './document-view.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    ANNOTATION_PROVIDERS,
  ],
})
export class DocumentView {
  public id = input<number>(1);
  private documentService = inject(DocumentService);
  public document = this.documentService.getDocument(this.id);
}
