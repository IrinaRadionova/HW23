import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subscription} from "rxjs";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit, OnDestroy {

  popUp: boolean = false;
  private observable: Observable<void>;
  private subscription: Subscription | null = null;

  constructor() {
    this.observable = new Observable((observer) => {
      setTimeout(() => {
        observer.next();
      }, 10000);
    });
  }

  ngOnInit(): void {
    this.subscription = this.observable.subscribe( () => {
      this.popUp = true;
      }
    )
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  close() {
    this.popUp = false;
  }
}
