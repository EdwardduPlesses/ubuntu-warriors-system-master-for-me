import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, HostListener, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { map, Observable, startWith } from 'rxjs';
import { Board } from 'src/app/models/board.model';
import { Column } from 'src/app/models/column.model';
import { RepairService } from 'src/app/services/repair.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { environment } from 'src/environments/environment';
import { AddRepairDialogComponent } from './add-repair-dialog/add-repair-dialog.component';
import { AssingRepairDialogComponent } from './assing-repair-dialog/assing-repair-dialog.component';
import { CompleteRepairDialogComponent } from './complete-repair-dialog/complete-repair-dialog.component';
import { DeleteRepairDialogComponent } from './delete-repair-dialog/delete-repair-dialog.component';
import { EmailConfirmationDialogComponent } from './email-confirmation-dialog/email-confirmation-dialog.component';
import { UpdateRepairDialogComponent } from './update-repair-dialog/update-repair-dialog.component';
import { ViewRepairDialogComponent } from './view-repair-dialog/view-repair-dialog.component';

const API_URL = environment.API_URL;

@Component({
  selector: 'app-repair',
  templateUrl: './repair.component.html',
  styleUrls: ['./repair.component.scss'],
})
export class RepairComponent implements OnInit {
  repairs: any = [];
  newRepairs: any = [];
  busyRepairs: any = [];
  doneRepairs: any = [];
  optionClicked: boolean = false;
  firstLoad: boolean = false;

  public toggleEdit: boolean = true;
  public disablePanel: boolean = false;

  repair_Search = new FormControl('');

  constructor(public dialog: MatDialog, public http: HttpClient, public snackBarService: SnackbarService, public repairService: RepairService) {}

  repairFormControl = new FormGroup({
    repair_Name: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
    ]),
  });

  options: string[] = [];
  filteredOptions!: Observable<string[]>;
  board: Board = new Board('', []);
  emailSent: boolean = false;


  async ngOnInit() {
    this.firstLoad = true
    await this.GetRepairs();

    this.filteredOptions = this.repair_Search.valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(value || ''))
    );

  }


  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter((option) =>
      option.toLowerCase().includes(filterValue)
    );
  }

  deleteRepair(repair: any) {
    this.repairService.Repair(repair);
    this.dialog
      .open(DeleteRepairDialogComponent, { disableClose: true })
      .afterClosed()
      .subscribe(async () => { this.snackBarService.openSnackBar(), await this.GetRepairs() });
  }

  assignRepair(repair: any) {
    this.repairService.Repair(repair);
    this.dialog
      .open(AssingRepairDialogComponent, { disableClose: true })
      .afterClosed()
      .subscribe(async () => { this.snackBarService.openSnackBar(), await this.GetRepairs() });
  }

  addNewRepair() {
    this.dialog
      .open(AddRepairDialogComponent, { disableClose: true })
      .afterClosed()
      .subscribe(async () => { this.snackBarService.openSnackBar(), await this.GetRepairs() });
  }

  viewRepair(repair: any) {
    this.repairService.Repair(repair);
    this.dialog
      .open(ViewRepairDialogComponent, { disableClose: true })
      .afterClosed()
      .subscribe(async () => {await this.GetRepairs() });
  }
  completeRepair(repair: any) {
    this.repairService.Repair(repair);
    this.dialog
      .open(CompleteRepairDialogComponent, { disableClose: true })
      .afterClosed()
      .subscribe(async () => { this.snackBarService.openSnackBar(), await this.GetRepairs() });
  }
  updateRepair(repair: any) {
    this.repairService.Repair(repair);
    this.dialog
      .open(UpdateRepairDialogComponent, { disableClose: true })
      .afterClosed()
      .subscribe(async () => { this.snackBarService.openSnackBar(), await this.GetRepairs() });
  }

  async drop(event: CdkDragDrop<string[]>, repairs: any) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }

    console.log()
    for (let repair of repairs) {
      if (event.container.id == 'cdk-drop-list-1') {
        if (repair.repairStatus.repairStatusId != 2) {
          await this.repairService.updateRepairStatus(repair.repairId, 2).then(() => { },
            async (response: HttpErrorResponse) => {
              if (response.status == 200) {
              }
              else {
                console.log("Error")
              }
            })
        }
      } else if (event.container.id == 'cdk-drop-list-2') {
        if (repair.repairStatus.repairStatusId != 5 && repair.repairStatus.repairStatusId != 3) {
          await this.repairService.updateRepairStatus(repair.repairId, 3).then(() => { },
            async (response: HttpErrorResponse) => {
              if (response.status == 200) {
                await this.confirmUpdateRepair(repair).then(async () => {

                })
              }
              else {
                console.log("Error")
              }
            })
        }
      } else if (event.container.id == 'cdk-drop-list-0') {
        if (repair.repairStatus.repairStatusId != 1) {
          await this.repairService.updateRepairStatus(repair.repairId, 1).then(() => { },
            async (response: HttpErrorResponse) => {
              if (response.status == 200) {
              }
              else {
                console.log("Error")
              }
            })
        }
      }
    }
     //await this.GetRepairs().then()
     this.ngOnInit()
  }


  async sendEmail(repair: any) {

    this.repairService.Repair(repair);
    this.dialog
      .open(EmailConfirmationDialogComponent, { disableClose: true })
      .afterClosed()
      .subscribe(async () => { this.snackBarService.openSnackBar(), await this.GetRepairs() });
  }

  async GetRepairs() {
    this.repairService.dataLoading = true
    await this.repairService.getRepairs().then(async (results) => {
      this.clearArrays()
      this.repairs = results;
      await this.populateAsync(results)
      this.board.columns.push(new Column('New Repair', this.newRepairs));
      this.board.columns.push(new Column('Busy', this.busyRepairs));
      this.board.columns.push(new Column('Done', this.doneRepairs));
    })
    this.repairService.dataLoading = false
    this.firstLoad = false

  }

  async populateAsync(arr: []) {
    return new Promise(async (resolve, reject) => {

      //Filter into different columns
      arr.forEach((repairs: any) => {
        if (repairs.repairStatusId == 1) {
           this.newRepairs.push(repairs);
        } else if (repairs.repairStatusId == 2) {
           this.busyRepairs.push(repairs);
        } else if (repairs.repairStatusId == 3 || repairs.repairStatusId == 5) {
           this.doneRepairs.push(repairs);
        }


        if (repairs.repairStatusId != 4) {
          //Repairs in Autocomplete Search
          this.options.push(repairs.repairName);
        }

      })
      return resolve(arr); //resolve with value
    });
  }

  optionClick(option: any, optionName: any) {

    this.optionClicked = true
    //Get option ID
    for (let repair of this.repairs) {
      if (repair.repairName === option.options.first.value) {
        var repairCard = document.getElementById(repair.repairId)!.style
        repairCard.background = "#696969"
        repairCard.color = "#2af598"

        var repairCardText = document.getElementById(`text${repair.repairId}`)!.style
        repairCardText.color = "#2af598"

        document.getElementById(repair.repairId)!.focus()
        document.getElementById(repair.repairId)!.scrollIntoView()

      }
    }
  }

  focusFunction(state: boolean) {
    this.optionClicked = state;
  }

  @HostListener('document:click')
  clickOffSearch() {

    if (this.optionClicked == false) {

      for (let repair of this.repairs) {
        var repairCard = document.getElementById(repair.repairId)!.style
        repairCard.backgroundColor = "white"
        repairCard.borderRadius = "4px"
        repairCard.borderBottom = "solid 1px #ddd"
        repairCard.color = ""
        repairCard.boxShadow = "0 5px 5px -3px rgba(0, 0, 0, 0.05), 0 3px 14px 2px rgba(0, 0, 0, 0.05)"

        var repairCardText = document.getElementById(`text${repair.repairId}`)!.style
        repairCardText.color = ""
      }
    }
  }

  clearArrays() {
    //this.repairs = []
    this.newRepairs = []
    this.busyRepairs = []
    this.doneRepairs = []
    this.board.columns = []

  }

  public delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async confirmUpdateRepair(repair: any) {
    console.log(repair)
    let apiSendUpdateRepair:any = {
      customerId: repair.customerId,
      repairStatusId: 3, //New Repair Status !! CHange to current ID
      repairName: repair.repairName,
      repairDescription: repair.repairDescription,
      repairDeadlineDate:repair.repairDeadline.repairDeadlineDate,
      repairStartDate: repair.repairStartDate,
      repairCompleteDate: new Date(),
      repairRateId: repair.repairRate.repairRateId,
      repairCost: 0,
      rateHours: repair.repairRate.rateHours,
      repairRateAmount: repair.repairRate.repairRateAmount,
      repairDeadlineId: repair.repairDeadlineId,
    };

    console.log(apiSendUpdateRepair)

      await this.repairService.updateRepair(apiSendUpdateRepair, repair.repairId).then(() => {},
      (response: HttpErrorResponse) => {
        if(response.status == 200){
          console.log("Pielle")
        }
        else{
          console.log("Nie Pielle")
        }
      });
  }


}
