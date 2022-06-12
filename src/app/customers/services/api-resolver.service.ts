import { Injectable } from "@angular/core";

import { Resolve, ActivatedRouteSnapshot, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { RestApiService } from "./restapi.service";

@Injectable({
    providedIn:'root'
})
export class ResolverService implements Resolve<any>{
    listCount = 5
    currentPage = 1
    constructor(private activatedRoutes:ActivatedRoute, private api: RestApiService){}
    
       resolve(route: ActivatedRouteSnapshot): Observable<any> | Promise<any> | any {
            return this.api.fetchRecord(this.currentPage,this.listCount);
        }
}