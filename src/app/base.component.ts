import { Component, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-base-component',
  standalone: true,
  template: ``,
})
export class BaseComponent implements OnDestroy {
  protected unsubscribe$ = new Subject();

  constructor() {}

  ngOnDestroy() {
    this.unsubscribe$.next(1);
    this.unsubscribe$.complete();
  }
}
