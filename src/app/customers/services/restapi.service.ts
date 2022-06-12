import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map } from "rxjs/operators";


@Injectable({
	providedIn: 'root'
})
export class RestApiService {

	pageNumbers: any;
	constructor(private httpRequest: HttpClient) {
	}

	fetchRecord(currentPage: any, listCount: any) {
		const params = new HttpParams()
			.set('per_page', listCount)
			.set('page', currentPage)

		return this.httpRequest.get('https://reqres.in/api/users', { params: params }).pipe(
			map((data: any) => {
				console.log(data['total'])
				this.pageNumbers = data['total_pages']
				this.pageNumbers = Array(this.pageNumbers).fill(this.pageNumbers).map((x, i) => i)
				return { total: data['total'], dataSet: [...data['data']] }
			})
		)
	}
}