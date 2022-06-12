import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddEditCustomerComponent } from './customers/add-edit-customer/add-edit-customer.component';
import { CustomerListComponent } from './customers/customer-list/customer-list.component';
import { CustomersComponent } from './customers/customers.component';
// import { ResolverService } from './customers/services/api-resolver.service';
import { FetchResolverService } from './customers/services/fetch-resolver.service';




const routes: Routes = [
  { path: '', redirectTo: '/customers/1', pathMatch: 'full' },
  { path: '', component: CustomerListComponent },
  {
    path: 'customers', component: CustomersComponent,
    children: [
      { path: 'add', component: AddEditCustomerComponent },
      { path: ':id', component: CustomerListComponent,
       resolve: [FetchResolverService]
      // resolve:[ResolverService]
      },
      { path: ':id/edit', component: AddEditCustomerComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
