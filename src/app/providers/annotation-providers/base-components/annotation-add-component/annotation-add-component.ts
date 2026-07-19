import {ChangeDetectionStrategy, Component, ElementRef, inject, Injector, input, signal, Type} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {DocumentService} from '../../../../services/document-service/document-service';
import {ZoomService} from '../../../../services/zoom-service/zoom-service';
import {NgComponentOutlet} from '@angular/common';
import {ANNOTATION_ADD_CALLBACK, ANNOTATION_CLOSE_CALLBACK} from '../../annotation-provider.const';
import {AnnotationType} from '../../../../models/document.model';

@Component({
  selector: 'app-annotation-add-component',
  imports: [
    ReactiveFormsModule,
    FormsModule,
    NgComponentOutlet
  ],
  templateUrl: './annotation-add-component.html',
  styleUrl: './annotation-add-component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnnotationAddComponent {
  public x = input<number>(0);
  public y = input<number>(0);
  public pageNumber = input<number>(0);
  public offsetTop = input<number>(0);
  public annotationType = input<AnnotationType>();
  public addComponent = input<Type<any>>();
  public text = signal<string>('');
  public addComponentInjector: Injector;
  private elementRef = inject(ElementRef);
  private documentService = inject(DocumentService);
  private zoomService = inject(ZoomService);

  constructor() {
    this.addComponentInjector = Injector.create({
      providers: [
        {
          provide: ANNOTATION_ADD_CALLBACK,
          useValue: (data: string) => {
            this.documentService.addAnnotation({
              type: this.annotationType()!,
              data,
              x: (this.x() - this.zoomService.pageState().left) * 100 / this.zoomService.pageState().width,
              y: (this.y() - this.offsetTop()) * 100 / this.zoomService.pageState().height,
            }, this.pageNumber())
            this.close();
          }
        },
        {
          provide: ANNOTATION_CLOSE_CALLBACK,
          useValue: () => {
            this.close();
          }
        }
      ]
    });
  }

  public close(): void {
    this.elementRef.nativeElement.remove();
  }
}
