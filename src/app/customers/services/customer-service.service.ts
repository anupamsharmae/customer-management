import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { map } from "rxjs/operators";

import { Customer } from "../customer.modal";

@Injectable({
    providedIn: "root"
})
export class CustomerService {
    constructor(
        private httpRequest: HttpClient,
        private router: Router,
    ) { }

    // Save Data on server
    storeData(customer: Customer) {
        // Post method to store customer data by setting status as 'active'
        return this.httpRequest.post<Customer>('https://customer-app-service-default-rtdb.firebaseio.com/customers.json',
            {
                ...customer,
                status: 1
            })
    }

    // Fetch Data from server
    fetchData() {
        return this.httpRequest.get<Customer[]>('https://customer-app-service-default-rtdb.firebaseio.com/customers.json')
            .pipe(
                map(data => {
                    const lists = []
                    // console.log(data)
                    for (const key in data) {
                        let row: any = data[key]
                        row["id"] = key
                        // console.log(row)
                        lists.push({ ...row })
                    }
                    return lists
                }),
                // tap(data => console.log(data))
            )
    }

    fetch(currentPage: any, listCount: any) {
        console.log(currentPage, listCount)
        return this.httpRequest.get<Customer[]>('https://customer-app-service-default-rtdb.firebaseio.com/customers.json')
            .pipe(
                map(data => {
                    const lists = []
                    let record = {}
                    for (const key in data) {
                        let row: any = data[key]
                        row["id"] = key
                        lists.push({ ...row })
                    }
                    record = {data: lists.slice(listCount * currentPage - listCount, listCount * currentPage), total_record: lists.length, current_page: currentPage}
                    console.log(record)
                    return record
                })
            )
    }

    // delete customer
    deleteData(id: string) {
        return this.httpRequest.delete('https://customer-app-service-default-rtdb.firebaseio.com/customers/' + id + '.json')
    }

    //update customer
    updateData(id: any, data: Customer) {
        return this.httpRequest.patch('https://customer-app-service-default-rtdb.firebaseio.com/customers/' + id + '.json', data)

    }

    getSingleData(id:any){
       return this.httpRequest.get('https://customer-app-service-default-rtdb.firebaseio.com/customers/' + id + '.json')
    }
}