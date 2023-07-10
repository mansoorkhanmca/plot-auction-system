import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { UsersService } from './users.service';
import { Observable } from 'rxjs';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(private userService: UsersService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        
        const isLoggedIn = this.userService.isUserLoggedIn();
        if (isLoggedIn) {
            request = request.clone({
                setHeaders: { Authorization: `Bearer ${this.userService.getToken()}` }
            });
        }

        return next.handle(request);
    }
}