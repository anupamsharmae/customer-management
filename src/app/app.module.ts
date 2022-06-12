import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CustomersComponent } from './customers/customers.component';
import { AddEditCustomerComponent } from './customers/add-edit-customer/add-edit-customer.component';
import { CustomerListComponent } from './customers/customer-list/customer-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatDialogModule } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

import { PlaceholderDirective } from './utility/placeholder/placeholder.directive';
import { ModalComponent } from './utility/modal/modal.component';
import { PaginationComponent } from './utility/pagination/pagination.component';
import { LoadingSpinnerComponent } from './utility/loading/loading-spinner.component';
import { FilterPipe } from './utility/pipe/filter.pipe';


@NgModule({
  declarations: [
    AppComponent,
    CustomersComponent,
    AddEditCustomerComponent,
    CustomerListComponent,
    PlaceholderDirective, 
    ModalComponent,
    PaginationComponent,
    LoadingSpinnerComponent,
    FilterPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule, 
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),

    MatDialogModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
