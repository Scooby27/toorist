import { Component } from '@angular/core';

@Component({
    selector: 'app-error',
    templateUrl: './error.component.html'
})

export class ErrorComponent {
    errorCode = 404;
    errorMessage = 'Page not found.';
}

