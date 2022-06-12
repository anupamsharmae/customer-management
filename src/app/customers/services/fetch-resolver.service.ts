import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";

import { Customer } from "../customer.modal";
import { CustomerService } from "./customer-service.service";


@Injectable({
    providedIn: 'root'
})
export class FetchResolverService implements Resolve<Customer[]>{
    listCount = 5
    constructor(private customerService: CustomerService) { }
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Customer[] | Observable<Customer[]> | Promise<Customer[]> |any  {
        // return this.customerService.fetchData()
        return this.customerService.fetch(route.params['id'], this.listCount)
    }
}