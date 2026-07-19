import {
  ApplicationRef, ChangeDetectionStrategy,
  Component,
  ComponentRef,
  createComponent,
  ElementRef, EnvironmentInjector,
  inject,
  input, OnInit, output,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import {AnnotationProvider} from '../../providers/annotation-providers/annotation-provider.model';
import {
  ANNOTATION_PROVIDER
} from '../../providers/annotation-providers/annotation-provider.const';
import {
  AnnotationAddComponent
} from '../../providers/annotation-providers/base-components/annotation-add-component/annotation-add-component';

@Component({
  selector: 'app-add-annotation-menu-popup',
  imports: [],
  templateUrl: './add-annotation-menu-popup.html',
  styleUrl: './add-annotation-menu-popup.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddAnnotationMenuPopup implements OnInit {
  @ViewChild('container', { read: ViewContainerRef }) viewContainerRef!: ViewContainerRef;

  public x = input<number>();
  public y = input<number>();
  public pageNumber = input<number>();
  public offsetTop = input<number>();

  public destroy = output<void>();

  private elementRef = inject(ElementRef);
  public annotationProviders = inject<AnnotationProvider[]>(ANNOTATION_PROVIDER);
  private applicationRef = inject(ApplicationRef);
  private environmentInjector = inject(EnvironmentInjector);

  public ngOnInit(): void {
    if (this.annotationProviders.length === 1) {
      this.showAddAnnotationComponent(null, this.annotationProviders[0]);
    }
  }

  public showAddAnnotationComponent(event: MouseEvent | null, annotationProvider: AnnotationProvider): void {
    if (event) {
      event.stopPropagation();
    }

    const componentRef: ComponentRef<any> = createComponent(AnnotationAddComponent, {
      environmentInjector: this.environmentInjector,
    });
    componentRef.setInput('x', this.x());
    componentRef.setInput('y', this.y());
    componentRef.setInput('pageNumber', this.pageNumber());
    componentRef.setInput('offsetTop', this.offsetTop());
    componentRef.setInput('addComponent', annotationProvider.addComponent);
    componentRef.setInput('annotationType', annotationProvider.type);

    const el = componentRef.location.nativeElement as HTMLElement;
    el.style.position = 'absolute';
    el.style.left = `${this.x()}px`;
    el.style.top = `${this.y()}px`;

    document.body.appendChild(el);

    this.applicationRef.attachView(componentRef.hostView);

    this.elementRef.nativeElement.remove();
    this.close(event);
  }

  public close(event: MouseEvent | null): void {
    if (event) {
      event.stopPropagation();
    }
    this.destroy.emit();
  }
}
