import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, Validators, UntypedFormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

const API_URL = environment.API_URL;

@Component({
  selector: 'app-add-writeoff',
  templateUrl: './add-writeoff.component.html',
  styleUrls: ['./add-writeoff.component.css']
})
export class AddWriteoffComponent implements OnInit {
  addWriteoff!: UntypedFormGroup;
  inventoryItem: any = []


  constructor(public dialogRef: MatDialogRef<AddWriteoffComponent>, public snackBarService: SnackbarService, public http: HttpClient) { }

  ngOnInit() {
    this.getInventoryItems()

    this.addWriteoff = new UntypedFormGroup({
      writeOffDate: new UntypedFormControl('', [Validators.required]),
      writeOffDesc: new UntypedFormControl('', [Validators.required]),
      inventoryID: new UntypedFormControl('', [Validators.required])
    })
  }

  submit() {
    // empty stuff
  }

  onNoClick(): void {
    this.snackBarService.setMessage('You chose not to add an order')
    this.dialogRef.close()
  }

  public confirmAdd(): void {
    if (this.addWriteoff.valid) {
      this.http.post(`${API_URL}/WriteOff/AddWriteOffInventory`, this.addWriteoff.value)
        .subscribe()
      this.snackBarService.setMessage('The order was successfully added')
      this.dialogRef.close();
    }
  }

  getInventoryItems() {
    this.http.get(`${API_URL}/Inventory/GetAllInventoryItems`)
      .subscribe((results) => {
        this.inventoryItem = results
      })
  }
}
