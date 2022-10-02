import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, Validators, UntypedFormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

const API_URL = environment.API_URL;

@Component({
  selector: 'app-add-stocktake',
  templateUrl: './add-stocktake.component.html',
  styleUrls: ['./add-stocktake.component.css']
})
export class AddStocktakeComponent implements OnInit {
  addStocktake!: UntypedFormGroup;
  inventoryItem: any = []

  constructor(public dialogRef: MatDialogRef<AddStocktakeComponent>, public snackBarService: SnackbarService, public http: HttpClient) { }

  ngOnInit() {
    this.getInventoryItems()

    this.addStocktake = new UntypedFormGroup({
      stockTakeDate: new UntypedFormControl('', [Validators.required]),
      stockTakeDesc: new UntypedFormControl('', [Validators.required]),
      inventoryID: new UntypedFormControl('', [Validators.required])
    })
}

onNoClick(): void {
  this.snackBarService.setMessage('You chose not to add an order')
  this.dialogRef.close()
}

public confirmAdd(): void {
  if(this.addStocktake.valid){
    this.http.post(`${API_URL}/WriteOff/AddWriteOffInventory`, this.addStocktake.value)
    .subscribe()
    this.snackBarService.setMessage('The order was successfully added')
    this.dialogRef.close();
  }
}

getInventoryItems(){
  this.http.get(`${API_URL}/Inventory/GetAllInventoryItems`)
    .subscribe((results) => {
      this.inventoryItem = results
    })
}
}
