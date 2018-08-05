import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from '../../../node_modules/rxjs/internal/Observable';
import 'rxjs/add/operator/do';

import { LoadingService } from '../shared/loading.service';


@Injectable()
export class ApiService {
    loggedIn = false;
    coreUrl = '/api/';

    private httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json'
        })
    };

    constructor(private http: HttpClient, private loadingService: LoadingService) {
    }

    post<T>(url: string, data: string): Observable<T> {
        this.loadingService.show();
        return this.http.post<T>(this.coreUrl + url, JSON.parse(data), this.httpOptions).do(() => this.loadingService.hide());
    }

    put<T>(url: string, data: string): Observable<T> {
        this.loadingService.show();
        return this.http.put<T>(this.coreUrl + url, JSON.parse(data), this.httpOptions).do(() => this.loadingService.hide());
    }

    get<T>(url: string): Observable<T> {
        this.loadingService.show();
        return this.http.get<T>(this.coreUrl + url, this.httpOptions).do(() => this.loadingService.hide());
    }

    delete<T>(url: string): Observable<T> {
        this.loadingService.show();
        return this.http.delete<T>(this.coreUrl + url, this.httpOptions).do(() => this.loadingService.hide());
    }
}
