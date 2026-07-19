import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component, ComponentRef, DestroyRef, ElementRef,
  HostListener,
  inject, Injector,
  input, Type,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import {Page} from '../../models/document.model';
import {ZoomService} from '../../services/zoom-service/zoom-service';
import {AddAnnotationMenuPopup} from '../add-annotation-menu-popup/add-annotation-menu-popup';
import {NgComponentOutlet} from '@angular/common';
import {
  ANNOTATION_CLOSE_CALLBACK,
} from '../../providers/annotation-providers/annotation-provider.const';
import {AnnotationViewComponent} from '../../providers/annotation-providers/base-components/annotation-view-component/annotation-view-component';

@Component({
  selector: 'app-page-view',
  templateUrl: './page-view.html',
  styleUrl: './page-view.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    NgComponentOutlet
  ]
})
export class PageView implements AfterViewInit {
  @ViewChild('container', { read: ViewContainerRef }) viewContainerRef!: ViewContainerRef;
  @HostListener('mousedown', ['$event']) public onMouseDown(event: MouseEvent) {
    if (!this.componentRef) {
     this.showAddAnnotationMenu(event);
    }
  }
  public page = input<Page>();
  public first = input<boolean>();

  public zoomService = inject(ZoomService);
  public elementRef = inject(ElementRef).nativeElement;
  public addComponentInjector: Injector;

  private componentRef?: ComponentRef<any>;
  private destroyRef = inject(DestroyRef);

  constructor(
  ) {
    this.addComponentInjector = Injector.create({
      providers: [
        {
          provide: ANNOTATION_CLOSE_CALLBACK,
          useValue: () => {
            if (this.componentRef) {
              this.componentRef.destroy();
              this.componentRef = undefined;
            }
          }
        }
      ]
    })
  }

  public ngAfterViewInit(): void {
    this.watchPageState();
  }

  private watchPageState(): void {
    if (!this.first()) {
      return;
    }
    this.zoomService.setPageState({
      left: this.elementRef.offsetLeft,
      width: this.elementRef.clientWidth,
      height: this.elementRef.clientHeight
    })
    const resizeObserver = new ResizeObserver(() => {
      this.zoomService.setPageState({
        left: this.elementRef.offsetLeft,
        width: this.elementRef.clientWidth,
        height: this.elementRef.clientHeight
      })
    });

    resizeObserver.observe(this.elementRef);

    this.destroyRef.onDestroy(() => {
      resizeObserver.disconnect();
    });
  }

  private showAddAnnotationMenu(event: MouseEvent): void {
    if (this.componentRef) this.componentRef.destroy();

    this.componentRef = this.viewContainerRef.createComponent(AddAnnotationMenuPopup);
    this.componentRef.setInput('x', event.pageX);
    this.componentRef.setInput('y', event.pageY);
    this.componentRef.setInput('pageNumber', this.page()!.number);
    this.componentRef.setInput('offsetTop', this.elementRef.offsetTop);

    const el = this.componentRef.location.nativeElement;
    el.style.position = 'absolute';
    el.style.left = `${event.pageX}px`;
    el.style.top = `${event.pageY}px`;

    this.componentRef.instance.destroy.subscribe(() => {
      if (this.componentRef) {
        this.componentRef.destroy();
        this.componentRef = undefined;
      }
    });
  }

  public get annotationViewComponent(): Type<any> {
    return AnnotationViewComponent;
  }
}
