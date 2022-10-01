import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { CustomerService } from 'src/app/services/customer.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { ViewCustomerDialogComponent } from '../view-customer-dialog/view-customer-dialog.component';

@Component({
  selector: 'app-delete-customer-dialog',
  templateUrl: './delete-customer-dialog.component.html',
  styleUrls: ['./delete-customer-dialog.component.css']
})
export class DeleteCustomerDialogComponent implements OnInit {

  customerData: any = [];

  constructor(public dialogRef: MatDialogRef<ViewCustomerDialogComponent>, private customerService: CustomerService, public http: HttpClient, public snackBarService: SnackbarService) { }

  ngOnInit() {
    this.customerData = this.customerService.retrieveCustomerData();
    this.customerService.clearData();
  }

  confirmDeleteCustomer() {
    this.customerService.DeleteCustomer(this.customerData[0].customerId).then(() => {},
    (response: HttpErrorResponse) => {
      if(response.status == 200){
        this.snackBarService.setMessage("Customer Successfully Deleted")
      }
      else if(response.status == 500){
        this.snackBarService.setMessage(response.error)
      }
      else{
        this.snackBarService.setMessage("Failed to delete Customer")
      }
    })
  }

  onNoClick() {
    this.snackBarService.setMessage('You chose not to delete the customer')
    this.dialogRef.close()
  }
}