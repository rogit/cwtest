import {
  ChangeDetectionStrategy,
  Component,
  computed,
  ElementRef,
  HostListener,
  inject,
  input,
  signal,
  Type
} from '@angular/core';
import {Annotation, AnnotationType} from '../../../../models/document.model';
import {DocumentService} from '../../../../services/document-service/document-service';
import {ZoomService} from '../../../../services/zoom-service/zoom-service';
import {AnnotationProvider} from '../../annotation-provider.model';
import {ANNOTATION_PROVIDER} from '../../annotation-provider.const';
import {NgComponentOutlet} from '@angular/common';

@Component({
  selector: 'app-annotation-view-component',
  imports: [
    NgComponentOutlet
  ],
  templateUrl: './annotation-view-component.html',
  styleUrl: './annotation-view-component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnnotationViewComponent {
  @HostListener('mousedown', ['$event']) public onMouseDown(event: MouseEvent) {
    event.stopPropagation();

    this.startX = event.clientX;
    this.startY = event.clientY;

    document.addEventListener('mousemove', this.onMouseMove);
    document.addEventListener('mouseup', this.onMouseUp);

    this.elementRef.style.userSelect = 'none';
  }

  public annotation = input<Annotation>();
  public offsetTop = input<number>(0);

  public dragOffset = signal({ x: 0, y: 0 });
  public elementRef = inject(ElementRef).nativeElement;
  public annotationProviders = inject<AnnotationProvider[]>(ANNOTATION_PROVIDER);

  private startX = 0;
  private startY= 0;
  private documentService = inject(DocumentService);
  private zoomService = inject(ZoomService);

  public top = computed(() => {
    return this.annotation()!.y * this.zoomService.pageState().height / 100 + this.dragOffset().y;
  })

  public left = computed(() => {
    return this.annotation()!.x * this.zoomService.pageState().width / 100 + this.dragOffset().x;
  })

  public delete(): void {
    this.documentService.deleteAnnotation(this.annotation()!.id);
  }

  public annotationViewComponent(type: AnnotationType): Type<any> {
    return this.annotationProviders.find((provider: AnnotationProvider) => type === provider.type)!.viewComponent;
  }

  private onMouseMove = (event: MouseEvent) => {
    const dx = event.clientX - this.startX;
    const dy = event.clientY - this.startY;

    this.dragOffset.set({
      x: dx,
      y: dy,
    });

  };

  private onMouseUp = () => {
    document.removeEventListener('mousemove', this.onMouseMove);
    document.removeEventListener('mouseup', this.onMouseUp);

    let x = (this.left()) * 100 / this.zoomService.pageState().width
    if (x < 0) {
      x = 0;
    }
    if (x > 100) {
      x = 100;
    }

    let y = (this.top()) * 100 / this.zoomService.pageState().height;
    if (y < 0) {
      y = 0;
    }
    if (y > 100) {
      y = 100;
    }

    this.dragOffset.set({x: 0, y: 0});

    this.documentService.moveAnnotation(
      this.annotation()!.id,
      x,
      y,
    );
  };
}
