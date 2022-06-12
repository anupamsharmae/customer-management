import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Customer } from '../customer.modal';
import { CustomerService } from '../services/customer-service.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
	selector: 'app-add-edit-customer',
	templateUrl: './add-edit-customer.component.html',
	styleUrls: ['./add-edit-customer.component.css']
})
export class AddEditCustomerComponent implements OnInit {

	customerForm!: FormGroup;
	customers!: Customer[];
	customerId!: string;
	editMode: boolean = false;
	isLoading: boolean = false;

	constructor(
		private customerService: CustomerService,
		private toaster: ToastrService,
		private router: Router,
		private activatedRoute: ActivatedRoute
	) { }

	ngOnInit(): void {
		this.activatedRoute.params.subscribe((params: Params) => {
			this.customerId = params['id'];
			this.editMode = params['id'] != null;
			console.log(this.customerId, this.editMode);
			// initializing form
			this.initCustomerForm()
			// set customer details for edit
			if (this.editMode) {
				this.isLoading = true;
				this.editCustomerForm();
			}
		});
	}
	/**
	 * INITIALIZING CUSTOMER FORM
	 */
	private initCustomerForm(): void {
		this.customerForm = new FormGroup({
			'firstName': new FormControl('', Validators.required),
			'lastName': new FormControl('', Validators.required),
			'email': new FormControl('', [Validators.email, Validators.required, Validators.pattern("^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$")]),
			'companyName': new FormControl('', Validators.required),
			'gender': new FormControl('', Validators.required),
			'mobile': new FormControl('', [Validators.required, Validators.maxLength(10), Validators.pattern("^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$")])
		});
	}
	/**
	 * EDIT CUSTOMER DETAILS 
	 */
	private editCustomerForm(): void {
		// fetch data based on customer id
		console.log(this.customerForm);
		this.customerService.getSingleData(this.customerId).subscribe((res: any) => {
			console.log(res);
			this.customerForm.patchValue(res);
			this.customerForm.markAllAsTouched();
			this.isLoading = false;
		});
	}
	/**
	 * SUBMIT FORM
	 */
	onSubmitForm(): void {
		this.isLoading = true;
		// define routes based on edit mode
		let route = this.editMode ? ['../../1'] : ['../1'];
		// submit updated customer
		if (this.editMode) {
			this.customerService.updateData(this.customerId, this.customerForm.value).subscribe(
				(response: any) => {
					console.log(response);
				},
				(error: any) => {
					this.isLoading = false;
					console.log(error);
				},
				() => {
					this.redirectPage(route, 'Updated Successfully', 'success');
				}
			);
		}
		// submit new customer
		else {
			//  used to store value in firebase and on successful complete, redirected to customer lists component
			this.customerService.storeData(this.customerForm.value).subscribe(
				(response: any) => {
					console.log(response);
				},
				(error: any) => {
					this.isLoading = false;
					console.log(error);
				},
				() => {
					this.redirectPage(route, 'Added Successfully!', 'success');
				}
			);
		}
	}
	/**
	 * RESET FORM
	 */
	onResetForm(): void {
		this.customerForm.reset();
	}
	/**
	 * CANCEL FORM
	 */
	onCancelForm(): void {
		this.isLoading = true;
		this.onResetForm();
		// define routes based on edit mode
		let route = this.editMode ? ['../../1'] : ['../1'];
		// redirect to another page
		this.redirectPage(route, 'Form cancelled!', 'warning');
	}
	/**
	 * redirect to customer list page and diplay success toast msg
	 * @param route relative url path 
	 */
	redirectPage(route: any, message: string, mode: string): void {
		// toast
		this.router.navigate(route, { relativeTo: this.activatedRoute }).then(() => {
			(mode == 'success') ? this.toaster.success(message, '', { timeOut: 2000 }) : this.toaster.warning(message, 'Reset', { timeOut: 2000 });
			this.isLoading = false;
		});
	}
}
