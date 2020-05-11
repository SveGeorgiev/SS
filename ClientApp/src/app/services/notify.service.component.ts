import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable()
export class NotifyService {
  public visibility: BehaviorSubject<boolean>;

  constructor() {
    this.visibility = new BehaviorSubject(false);
  }

  showLoading() {
    this.visibility.next(true);
  }

  hideLoading() {
    this.visibility.next(false);
  }
}