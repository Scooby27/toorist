import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class LoadingService {
    behaviourSubject = new BehaviorSubject<boolean>(false);
    private callCount = 0;

    show(): void {
        if (this.callCount === 0) {
            this.behaviourSubject.next(true);
        }
        this.callCount++;
    }

    hide(): void {
        this.callCount--;
        if (this.callCount === 0) {
            this.behaviourSubject.next(false);
        }
    }
}
