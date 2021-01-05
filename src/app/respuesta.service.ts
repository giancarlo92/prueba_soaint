import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs';

import { respuesta } from './respuesta';

@Injectable()
export class RespuestaService {

    private urlEndPoint: string = "";
    private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

    constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string) { 
        this.urlEndPoint = baseUrl + 'apidata/catalog/distribution';
    }

    obtener(): Observable<any> {
        return this.http.get<any>(this.urlEndPoint);
    }
}