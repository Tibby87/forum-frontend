import { HttpClient } from "@angular/common/http";
import { BASE_URL } from "../../environments/environment";
import { Injectable } from "@angular/core";
import { map } from "rxjs/operators";


@Injectable({providedIn:"root"})
export class RestService {
    constructor(private http: HttpClient) {}
    public get() {
        return this.http.get<restResponse<user>>(BASE_URL + '/users').pipe(map(response =>{
            return response.data
        }))
    }
}

export interface restResponse<T> {
data:Array<T>
}
export interface user {
    name:string;
}