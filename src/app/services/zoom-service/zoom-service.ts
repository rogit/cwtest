import {Service, signal} from '@angular/core';
import {DEFAULT_ZOOM, MAX_ZOOM, MIN_ZOOM} from './zoom-service.const';
import {PageState} from './zoom-service.model';

@Service()
export class ZoomService {
  private _zoomValue = signal<number>(DEFAULT_ZOOM);
  private _pageState = signal<PageState>({
    left: 0,
    width: 0,
    height: 0,
  });
  public zoom = this._zoomValue.asReadonly();
  public pageState = this._pageState.asReadonly();

  public zoomIn(): void {
    if (this._zoomValue() > MIN_ZOOM) {
      this._zoomValue.update((value: number) => value - 10);
    }
  }

  public zoomOut(): void {
    if (this._zoomValue() < MAX_ZOOM) {
      this._zoomValue.update((value: number) => value + 10);
    }
  }

  public setPageState(state: PageState): void {
    this._pageState.set(state);
  }
}
