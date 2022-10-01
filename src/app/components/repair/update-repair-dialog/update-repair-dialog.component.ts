import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { CustomerService } from 'src/app/services/customer.service';
import { RepairService } from 'src/app/services/repair.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { environment } from 'src/environments/environment';
import { AddRepairDialogComponent } from '../add-repair-dialog/add-repair-dialog.component';

const API_URL = environment.API_URL;

@Component({
  selector: 'app-update-repair-dialog',
  templateUrl: './update-repair-dialog.component.html',
  styleUrls: ['./update-repair-dialog.component.css'],
})
export class UpdateRepairDialogComponent implements OnInit {
  repairData: any = [];
  customers: any = [];
  selectedCustomer: any = '';
  updateRepairFormControl!: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<AddRepairDialogComponent>,
    public http: HttpClient,
    public snackBarService: SnackbarService,
    private repairService: RepairService, public customerService: CustomerService
  ) {
    this.GetCustomers();
  }

  ngOnInit(): void {
    //Getting Data from the PassDataService
    this.repairData = this.repairService.retrieveRepairData();
    console.log(this.repairData);

    //Clearing the dataServiceArray
    this.repairService.clearData();

    this.updateRepairFormControl = new FormGroup({
      repair_Name: new FormControl(`${this.repairData[0].name}`, [Validators.required, Validators.minLength(2), Validators.maxLength(40)]),
      repair_Description: new FormControl(`${this.repairData[0].description}`, [Validators.required,Validators.minLength(2), Validators.maxLength(100)]),
      repair_ID: new FormControl(`${this.repairData[0].repairID}`, [Validators.required,]),
      repair_StartDate: new FormControl(`${this.repairData[0].repairStartDate}`,[Validators.required]),
      repair_DeadlineDate: new FormControl(`${this.repairData[0].repairDeadlineDate}`,[Validators.required]),
      repair_Customer: new FormControl(`${this.repairData[0].repairCustomerID}`, [Validators.required]),
      repair_RateAmount: new FormControl(`${this.repairData[0].repairRateAmount}`, [Validators.required]),
      repair_HoursWorked: new FormControl(`${this.repairData[0].repairRateHours}`, [Validators.required]),
    });

    //Default customer name
    var customerDefault = this.repairData[0].repairCustomerID;
    this.updateRepairFormControl.get('repair_Customer')?.setValue(customerDefault);
    //Default Rate
    this.updateRepairFormControl.get('repair_RateAmount')?.setValue(this.repairData[0].repairRateAmount);
    this.updateRepairFormControl.get('repair_HoursWorked')?.setValue(this.repairData[0].repairRateHours);

  }

  onNoClick() {
    this.snackBarService.setMessage('You chose no to update the repair');
    this.dialogRef.close();
  }

  async confirmUpdateRepair() {
    let apiSendUpdateRepair = {
      customerId: this.updateRepairFormControl.value.repair_Customer,
      repairStatusId: this.repairData[0].repairStatusID, //New Repair Status !! CHange to current ID
      repairName: this.updateRepairFormControl.value.repair_Name,
      repairDescription: this.updateRepairFormControl.value.repair_Description,
      repairDeadlineDate:this.updateRepairFormControl.value.repair_DeadlineDate,
      repairStartDate: this.repairData[0].repairStartDate,
      repairCompleteDate: this.updateRepairFormControl.value.repair_DeadlineDate,
      repairRateId: this.repairData[0].repairRateId,
      repairCost: 0,
      rateHours: this.updateRepairFormControl.value.repair_HoursWorked,
      repairRateAmount: this.updateRepairFormControl.value.repair_RateAmount,
      repairDeadlineId: this.repairData[0].repairDeadlineID,
    };

      await this.repairService.updateRepair(apiSendUpdateRepair, this.repairData[0].repairId).then(() => {},
      (response: HttpErrorResponse) => {
        if(response.status == 200){
          this.snackBarService.setMessage("The repair was successfully updated")
        }
        else if(response.status == 500){
          this.snackBarService.setMessage(response.error)
        }
        else{
          this.snackBarService.setMessage("Failed to update repair")
        }
      });
    this.dialogRef.close();
  }

  async GetCustomers() {
    await this.customerService.GetCustomers().then((results) => {
      this.customers = results;
    })
  }

  getErrorMessageName() {
    
    if(this.updateRepairFormControl.controls["repair_Name"].hasError('required')) {
      return "Repair Name required"
    }
    
    if(this.updateRepairFormControl.controls["repair_Name"].hasError('minlength')) {
      return 'Minimum characters is 2'
    }

    if(this.updateRepairFormControl.controls["repair_Name"].hasError('maxlength')) {
      return 'Maximum characters is 40' 
    }

    return null

  }

  getErrorMessageDesc(){
    if(this.updateRepairFormControl.controls["repair_Description"].hasError('required')) {
      return "Repair Description required"
    }
    
    if(this.updateRepairFormControl.controls["repair_Description"].hasError('minlength')) {
      return 'Minimum characters is 2'
    }

    if(this.updateRepairFormControl.controls["repair_Description"].hasError('maxlength')) {
      return 'Maximum characters is 100' 
    }

    return null
  }

  getErrorMessageRate(){
    if(this.updateRepairFormControl.controls["repair_RateAmount"].hasError('required')) {
      return "Repair Rate required"
    }

    if(this.updateRepairFormControl.controls["repair_RateAmount"].hasError('pattern')) {
      return "Numbers only"
    }

    return null
  }

  getErrorMessageDeadline(){
    if(this.updateRepairFormControl.controls["repair_SelectedDate"].hasError('required')) {
      return "Repair DeadlineDate required"
    }

    if(this.updateRepairFormControl.controls["repair_SelectedDate"].hasError('min')) {
      return "Date can't be in the past"
    }

    return null
  }

  getErrorMessageCustomer(){
    if(this.updateRepairFormControl.controls["repair_Customer"].hasError('required')) {
      return "Customer required"
    }

    return null
  }
}
