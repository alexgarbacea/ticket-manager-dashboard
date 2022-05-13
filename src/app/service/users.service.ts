import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { throwError, Observable } from "rxjs";
import { Users as UserResponse } from "../interface/usersResponse";
import { tap, catchError } from 'rxjs/operators';


@Injectable({
    providedIn: 'root'
})

export class UserService {
    private readonly apiUrl: string = 'https://jsonplaceholder.typicode.com'

    constructor(private http: HttpClient) { }

    users$ = <Observable<UserResponse[]>>
        this.http.get<UserResponse[]>(`${this.apiUrl}/users`)
            .pipe(
                catchError(this.handleError)
            );

    private handleError(error: HttpErrorResponse): Observable<never> {
        console.log(error)
        return throwError(`Error occured with code ${error.status}`)
    }
}

