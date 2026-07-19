import {ChangeDetectionStrategy, Component, inject, signal} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {ANNOTATION_ADD_CALLBACK, ANNOTATION_CLOSE_CALLBACK} from '../../annotation-provider.const';

@Component({
  selector: 'app-annotation-text-provider-add',
  imports: [
    FormsModule
  ],
  templateUrl: './annotation-text-provider-add.html',
  styleUrl: './annotation-text-provider-add.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnnotationTextProviderAdd {
  public text = signal<string>('');
  private addCallback = inject(ANNOTATION_ADD_CALLBACK);
  private closeCallback = inject(ANNOTATION_CLOSE_CALLBACK);

  public add(): void {
    this.addCallback(this.text());
  }

  public close(): void {
    this.closeCallback();
  }
}
