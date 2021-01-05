import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MoveDataService {

  private moveData = new BehaviorSubject<any>(null);
  public moveData$ = this.moveData.asObservable();

  constructor() { 
    this.moveData.next(null);
  }

  sendData(data: any) {
    this.moveData.next(data);
    this.moveData.next(null);
  }
}
