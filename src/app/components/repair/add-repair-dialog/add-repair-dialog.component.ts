import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CustomerService } from 'src/app/services/customer.service';
import { RepairService } from 'src/app/services/repair.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { environment } from 'src/environments/environment';
import { AddCustomerDialogComponent } from '../../customer/add-customer-dialog/add-customer-dialog.component';

const API_URL = environment.API_URL;

@Component({
  selector: 'app-add-repair-dialog',
  templateUrl: './add-repair-dialog.component.html',
  styleUrls: ['./add-repair-dialog.component.css']
})
export class AddRepairDialogComponent implements OnInit {

  customers: any = [];
  minDate: any = []

  constructor(public dialog: MatDialog, public dialogRef: MatDialogRef<AddRepairDialogComponent>, public http: HttpClient, public snackBarService: SnackbarService, public repairService: RepairService, public customerService: CustomerService) {     }

    addRepairFormControl = new UntypedFormGroup({
      repair_Name: new UntypedFormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(40)]),
      repair_Description: new UntypedFormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]),
      repair_Customer: new UntypedFormControl('', [Validators.required]),
      repair_SelectedDate: new UntypedFormControl('', [Validators.required]),
      repair_RateAmount: new UntypedFormControl('', [Validators.required, Validators.pattern("^[0-9]*$")]),
    });

  async ngOnInit() {
    await this.GetCustomers()
  }


  onNoClick() {
    this.snackBarService.setMessage('You chose not to add the repair');
    this.dialogRef.close();
  }

  async confirmAddRepair(){
    console.log(this.addRepairFormControl.value)

    let apiRepairSend = {
      customerId: this.addRepairFormControl.value.repair_Customer,
      repairStatusId: 1, //New Repair Status
      repairName: this.addRepairFormControl.value.repair_Name,
      repairDescription: this.addRepairFormControl.value.repair_Description,
      repairDeadlineDate: this.addRepairFormControl.value.repair_SelectedDate,
      repairStartDate: new Date().toLocaleString(),
      repairCompleteDate: this.addRepairFormControl.value.repair_SelectedDate,
      repairCost: 0, // COst still undetermined
      repairDeadlineId: 0,
      rateHours: 0, // No hours work when new repair added
      repairRateAmount: this.addRepairFormControl.value.repair_RateAmount
    }

      await this.repairService.addRepair(apiRepairSend).then(() => {},
      (response: HttpErrorResponse) => {
        if(response.status == 200){
          this.snackBarService.setMessage("The repair was successfully added")
        }
        else{
          this.snackBarService.setMessage("Failed to add repair")
        }
      })
      this.dialogRef.close(); 
  }

  async GetCustomers(){
    await this.customerService.GetCustomers().then(results => {
      this.customers = results; 
    })
  }

  addNewCustomer() {
    this.dialog
      .open(AddCustomerDialogComponent, { disableClose: true })
      .afterClosed()
      .subscribe(async () => {
         this.snackBarService.openSnackBar(), await this.GetCustomers();
      });
  }

  getErrorMessageName() {
    
    if(this.addRepairFormControl.controls["repair_Name"].hasError('required')) {
      return "Repair Name required"
    }
    
    if(this.addRepairFormControl.controls["repair_Name"].hasError('minlength')) {
      return 'Minimum characters is 2'
    }

    if(this.addRepairFormControl.controls["repair_Name"].hasError('maxlength')) {
      return 'Maximum characters is 40' 
    }

    return null

  }

  getErrorMessageDesc(){
    if(this.addRepairFormControl.controls["repair_Description"].hasError('required')) {
      return "Repair Description required"
    }
    
    if(this.addRepairFormControl.controls["repair_Description"].hasError('minlength')) {
      return 'Minimum characters is 2'
    }

    if(this.addRepairFormControl.controls["repair_Description"].hasError('maxlength')) {
      return 'Maximum characters is 100' 
    }

    return null
  }

  getErrorMessageRate(){
    if(this.addRepairFormControl.controls["repair_RateAmount"].hasError('required')) {
      return "Repair Rate required"
    }

    if(this.addRepairFormControl.controls["repair_RateAmount"].hasError('pattern')) {
      return "Numbers only"
    }

    return null
  }

  getErrorMessageDeadline(){
    if(this.addRepairFormControl.controls["repair_SelectedDate"].hasError('required')) {
      return "Repair DeadlineDate required"
    }

    if(this.addRepairFormControl.controls["repair_SelectedDate"].hasError('min')) {
      return "Date can't be in the past"
    }

    return null
  }

  getErrorMessageCustomer(){
    if(this.addRepairFormControl.controls["repair_Customer"].hasError('required')) {
      return "Customer required"
    }

    return null
  }
}
