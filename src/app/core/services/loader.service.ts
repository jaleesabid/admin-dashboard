import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class LoaderService {
  private loaderState = new BehaviorSubject<boolean>(false);
  loaderState$ = this.loaderState.asObservable();

  show(): void {
    this.loaderState.next(true);
  }

  hide(): void {
    this.loaderState.next(false);
  }
}
