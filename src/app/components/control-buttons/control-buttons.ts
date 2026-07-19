import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {ZoomService} from '../../services/zoom-service/zoom-service';
import {DocumentService} from '../../services/document-service/document-service';

@Component({
  selector: 'app-control-buttons',
  imports: [],
  templateUrl: './control-buttons.html',
  styleUrl: './control-buttons.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ControlButtons {
  private zoomService = inject(ZoomService);
  private documentService = inject(DocumentService);

  public zoomIn(): void {
    this.zoomService.zoomIn();
  }

  public zoomOut(): void {
    this.zoomService.zoomOut();
  }

  public save(): void {
    this.documentService.save();
  }
}
