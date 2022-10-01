import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { RepairService } from 'src/app/services/repair.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { environment } from 'src/environments/environment';


const API_URL = environment.API_URL + "/Repair";

@Component({
  selector: 'app-delete-repair-dialog',
  templateUrl: './delete-repair-dialog.component.html',
  styleUrls: ['./delete-repair-dialog.component.css']
})
export class DeleteRepairDialogComponent implements OnInit {

  repairData: any = [];

  constructor(public dialogRef: MatDialogRef<DeleteRepairDialogComponent>,public http: HttpClient, public snackBarService: SnackbarService, private repairService: RepairService) { }

  ngOnInit(): void {
    //Getting Data from the PassDataService
    this.repairData = this.repairService.retrieveRepairData();

    //Clearing the dataServiceArray
    this.repairService.clearData();
    console.log(this.repairData)
  }

  async confirmDeleteRepair(repair: any) {
    await this.repairService.deleteRepair(repair.repairId).then(() => {},
    (response: HttpErrorResponse) => {
      if(response.status == 200){
        this.snackBarService.setMessage("The repair was successfully deleted")
      }
      else if(response.status == 500){
        this.snackBarService.setMessage(response.error)
      }
      else{
        this.snackBarService.setMessage("Failed to delete repair")
      }
    })
    this.dialogRef.close();
  }

  onNoClick() {
    this.snackBarService.setMessage('You chose not to delete the repair')
    this.dialogRef.close()
  }
}

