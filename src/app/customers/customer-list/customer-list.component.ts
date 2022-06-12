import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { ModalComponent } from 'src/app/utility/modal/modal.component';
import { PlaceholderDirective } from 'src/app/utility/placeholder/placeholder.directive';
import { Customer } from '../customer.modal';
import { CustomerService } from '../services/customer-service.service';
// import { RestApiService } from '../services/restapi.service';


@Component({
	selector: 'app-customer-list',
	templateUrl: './customer-list.component.html',
	styleUrls: ['./customer-list.component.css']
})
export class CustomerListComponent implements OnInit {

	pages: any;
	pageNumbers: any;
	currentPage!: number;
	previousPage!: number;
	listCount: number = 5;
	totalRecord!: any;
	customers!: any;
	isLoading:boolean = false;
	filteredName: any;
	updatedCustomers!: Customer;
	action!: string;
	closeBtnSub !: Subscription;
	customerList: any;

	@ViewChild(PlaceholderDirective) confirmBox!: PlaceholderDirective;

	constructor(private customerService: CustomerService,
		private activatedRoute: ActivatedRoute,
		// private restApi: RestApiService,
		private router: Router,
		private toaster: ToastrService,
		public dialog: MatDialog
	) { }

	ngOnInit(): void {
		// fetch list of customers from firebase
		this.customerService.fetchData().subscribe((res: any) => { this.customerList = res; console.log(this.customerList) });
		// fetching data from realtime firebase using resolver
		this.activatedRoute.data.subscribe(
			(response: any) => {
				this.customers = response[0].data;
				this.currentPage = response[0].current_page;
				this.pageNumbers = Math.ceil(response[0].total_record / this.listCount);
				this.pageNumbers = Array(this.pageNumbers).fill(this.pageNumbers).map((x, i) => i);
			},
			(err: any) => { console.log(err); this.toaster.error(err); }
		);
		/**
		 * fetching data from restApi using resolver
		 */
		// this.activatedRoute.data.subscribe(response=>{
		//   // console.log(response[0].total)
		//   this.totalRecord = response[0].total
		//   this.customers = response[0].dataSet
		//   this.pageNumbers = Math.ceil(this.totalRecord/this.listCount)
		//   this.pageNumbers = Array(this.pageNumbers).fill(this.pageNumbers).map((x, i) => i)
		// })
		/**
		 * fetch data from restApi using services by subscribing to the url change and
		 * passing the current url params (id) for current page and list count=5 
		 */
		// this.activatedRoute.params.subscribe(params => {
		// //   console.log(params['id'])
		//   this.currentPage = params['id']
		//   this.isLoading = true
		//   setTimeout(() => {
		//     this.restApi.fetchRecord(this.currentPage, this.listCount).subscribe(
		//       data => {
		//         console.log(data.dataSet)
		//         this.customers = data.dataSet
		//         // redirect to First list if invalid url i.e. ('id') enter in url 
		//         if (data.dataSet.length !== 0) {
		//           this.totalRecord = data.total
		//           this.pages = Math.ceil(this.totalRecord / this.listCount)
		//           this.pageNumbers = Array(this.pages).fill(this.pages).map((x, i) => i)
		//         }
		//         else {
		//           this.router.navigate([`../1`], { relativeTo: this.activatedRoute })
		//         }
		//       }
		//     )
		//     this.isLoading = false
		//   }, 500)
		// })
	}
	/**
	 * redirect to edit form to update customer details
	 * @param id customer id
	 */
	onEdit(id: string): void {
		this.router.navigate([`customers/${id}/edit`]);
	}
	/**
	 * Delete the customer from firebase
	 */
	onDelete(customer: any): void {
		this.popup(9, customer);
	}
	/**
	 * Toggle Enabling/Disabling the customer
	 * @param customer customer object
	 * @param status disabled or enabled
	 */
	onDisable(customer: any, status: number): void {
		this.popup(status, customer);
	}
	/**
	 * Confirmation Popup Modal
	 * @param action delete : 9, disable: 0 or enable: 1
	 * @param customer object
	 */
	private popup(action: number, customer: any): void {
		let status = (action == 9) ? 'Delete' : (action == 0) ? 'Enable' : 'Disable';
		// console.log(status)
		const dialogRef = this.dialog.open(ModalComponent, { width: '350px', data: { ...customer, action: status } });
		// 	dialog closing functionality
		dialogRef.afterClosed().subscribe((responseId: any) => {
			// console.log(responseId)
			if ((action === 0 || action === 1) && responseId) {
				this.toggleCustomer(responseId, customer);
			}
			else if (action === 9 && responseId) {
				this.deleteCustomer(responseId, customer);
			}
		});
	}

	// method to Disable/Enable the Customer
	private toggleCustomer(id: string, customer: any): void {
		if (customer.status == 0) {
			this.updatedCustomers = { ...customer, status: 1 };
			this.customerService.updateData(id, this.updatedCustomers).subscribe(
				(response: any) => { console.log('toggle', response); },
				(error: any) => { console.log('error', error); },
				() => {
					// toast
					this.toaster.success(`${customer.firstName} ${customer.lastName}`, 'Customer has been Enabled!', { timeOut: 2000 });
					this.updateList();
				}
			);
		}
		else {
			this.updatedCustomers = { ...customer, status: 0 };
			this.customerService.updateData(id, this.updatedCustomers).subscribe(
				(response: any) => { console.log('togle', response); },
				(error: any) => { console.log('error', error); },
				() => {
					// toast
					this.toaster.success(`${customer.firstName} ${customer.lastName}`, 'Customer has been Disabled!', { timeOut: 2000 });
					this.updateList();
				}
			)
		}
	}
	/**
	* Delete particular customer based on id
	*/
	private deleteCustomer(id: string, customer: any):void {
		this.customerService.deleteData(id).subscribe(
			// next observer
			(response: any) => { console.log(response); },
			// error observer
			(error) => { console.log(error); this.toaster.error('Customer could not be deleted!'); },
			// complete observer
			() => {
				this.toaster.success(`${customer.firstName} ${customer.lastName}`, 'Deleted!', { timeOut: 2000 });
				this.updateList();
			}
		)
	}
	/**
	 * method to update the customer lists
	 */
	updateList():void {
		// console.log(this.currentPage)
		this.customerService.fetch(this.currentPage, this.listCount).subscribe((res: any) => {
			this.customers = res.data;
		});
	}
}
