import { HttpClient, HttpEvent, HttpHandler, HttpRequest, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { accessToken } from "../environments/constant";
import { AuthProvider } from "../services/auth-provider";
import { GenericResponse } from "./api-client.generated";
@Injectable()
export class HttpInterceptor {
    constructor(
        private http: HttpClient,
        private authProvider: AuthProvider,
    ) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (typeof localStorage !== 'undefined') {
            const jwtToken = localStorage.getItem(accessToken);
            if (jwtToken) {
                request = request.clone({
                    setHeaders: {
                        Authorization: `Bearer ${jwtToken}`
                    }
                });
            }
        }
        let handle = next.handle(request);
        return handle.pipe(
            map((event: HttpEvent<any>) => {
                if (event instanceof HttpResponse) {
                    if (event.body && event.headers.get('content-type')
                        && event.headers.get('content-type').indexOf('application/json') !== -1) {
                        try {
                            const genericResponse: GenericResponse = event.body;
                            if (genericResponse && !genericResponse.success && !genericResponse.message)
                                genericResponse.message = "Une erreur s'est produite";
                            console.log("🚀 ~ HttpInterceptor ~ &&event.headers.get ~ genericResponse", genericResponse);
                            if (genericResponse.token)
                                this.authProvider.handleLoginResponse(genericResponse);
                        }
                        catch (err) {
                        }
                    }
                }
                return event;
            }),
        )
    }
}