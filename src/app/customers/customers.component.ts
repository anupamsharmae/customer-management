import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
	selector: 'app-customers',
	templateUrl: './customers.component.html',
	styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {

	isLoading: boolean = false;
	constructor(private router: Router, private currentRoute: ActivatedRoute) { }

	ngOnInit(): void { }

	/**
	 * navigate to form component
	 */
	navigateToAddCustomer(): void {
		this.isLoading = true;
		// for smooth loading animation
		setTimeout(() => {
			// navigate to add customer page
			this.router.navigate(['add'], { relativeTo: this.currentRoute }).then(() => {
				this.isLoading = false;
			})
		}, 250);
	}
	/**
	 *  navigate to customer list component
	 */
	navigateToCustomers(): void {
		this.isLoading = true;
		// navigate to customer list page
		this.router.navigate(['1'], { relativeTo: this.currentRoute }).then(() => {
			this.isLoading = false;
		});
	}
}