import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { RepairService } from 'src/app/services/repair.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-complete-repair-dialog',
  templateUrl: './complete-repair-dialog.component.html',
  styleUrls: ['./complete-repair-dialog.component.css']
})
export class CompleteRepairDialogComponent implements OnInit {

  repairData: any = [];

  constructor(public dialogRef: MatDialogRef<CompleteRepairDialogComponent>, public snackBarService: SnackbarService, private repairService: RepairService) { }

  ngOnInit(): void {
    //Getting Data from the PassDataService
    this.repairData = this.repairService.retrieveRepairData();

    //Clearing the dataServiceArray
    this.repairService.clearData();
  }

  async completeRepair(repair: any) {
    await this.repairService.updateRepairStatus(repair.repairId, 4).then(() => {},
    (response: HttpErrorResponse) => {
      if(response.status == 200){
        this.snackBarService.setMessage("The repair was successfully completed")
      }
      else if(response.status == 500){
        this.snackBarService.setMessage(response.error)
      }
      else{
        this.snackBarService.setMessage("Failed to complete repair")
      }
    })
    this.dialogRef.close();
  }

  onNoClick() {
    this.snackBarService.setMessage('You chose not to complete the repair')
    this.dialogRef.close()
  }

}
