import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { tap } from 'rxjs/operators';
import { NotifyService } from 'src/app/services/notify.service.component';

@Injectable({
    providedIn: 'root'
})
export class AuthorizeInterceptor implements HttpInterceptor {
    private statusCodeUnauthorized = 401;

    constructor(
        private notifyService: NotifyService,
        private router: Router
    ) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        this.notifyService.showLoading();
        const token = localStorage.getItem('auth');
        return this.processRequestWithToken(token, req, next);
    }

    // Checks if there is an access_token available in the authorize service
    // and adds it to the request in case it's targeted at the same origin as the
    // single page application.
    private processRequestWithToken(token: string, req: HttpRequest<any>, next: HttpHandler) {
        if (!!token && this.isSameOriginUrl(req)) {
            req = req.clone({
                setHeaders: {
                    Authorization: `Bearer ${token}`
                }
            });
        }

        req = req.clone({
            setHeaders: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });

        // req.headers.append('Accept', 'application/json');
        // req.headers.append('Content-Type', 'application/json');

        return next
            .handle(req)
            .pipe(
                tap((event: HttpEvent<any>) => {
                    if (event instanceof HttpResponse) {
                        this.notifyService.hideLoading();
                    }
                }, (error: HttpErrorResponse) => {
                    this.notifyService.hideLoading();
                    // if (error.status === this.statusCodeUnauthorized) { this.router.navigate(["/"]); }
                })
            );
    }

    private isSameOriginUrl(req: any) {
        // It's an absolute url with the same origin.
        if (req.url.startsWith(`${window.location.origin}/`)) {
            return true;
        }

        // It's a protocol relative url with the same origin.
        // For example: //www.example.com/api/Products
        if (req.url.startsWith(`//${window.location.host}/`)) {
            return true;
        }

        // It's a relative url like /api/Products
        if (/^\/[^\/].*/.test(req.url)) {
            return true;
        }

        // It's an absolute or protocol relative url that
        // doesn't have the same origin.
        return false;
    }
}
