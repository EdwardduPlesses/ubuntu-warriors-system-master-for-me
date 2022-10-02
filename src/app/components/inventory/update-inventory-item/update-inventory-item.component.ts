import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { InventoryService } from '../../../services/inventory.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-update-inventory-item',
  templateUrl: './update-inventory-item.component.html',
  styleUrls: ['./update-inventory-item.component.css']
})

export class UpdateInventoryItemComponent implements OnInit {

  inventoryData: any = [];
  inventorystatus: any = [];

  updateInventoryItem!: UntypedFormGroup;

  constructor(public dialog: MatDialogRef<UpdateInventoryItemComponent>, private service: InventoryService, public http: HttpClient, public snackbar: SnackbarService) { }

  async confirmEditInventory() {
    await this.service.UpdateInventory(this.updateInventoryItem.value).then(() => { },
      (response: HttpErrorResponse) => {
        if (response.status == 200) {
          this.snackbar.setMessage("Inventory Item Edited Successfully")
        }
        else {
          this.snackbar.setMessage("Failed to Edit Inventory Item")
        }
      })
    this.dialog.close();
  }

  onNoClick() {
    this.snackbar.setMessage('You chose not to update the inventory item')
    this.dialog.close();
  }

  async ngOnInit() {
    this.inventoryData = this.service.retrieveInventoryData();
    this.service.clearData();

    this.updateInventoryItem = new UntypedFormGroup({
      inventoryId: new UntypedFormControl(this.inventoryData[0].inventoryId),
      inventoryStatusId: new UntypedFormControl(`${this.inventoryData[0].inventoryStatusId}`, [Validators.required]),
      inventoryName: new UntypedFormControl(`${this.inventoryData[0].inventoryName}`, [Validators.required]),
      inventoryDescription: new UntypedFormControl(`${this.inventoryData[0].inventoryDescription}`, [Validators.required]),
      inventoryQuantity: new UntypedFormControl(`${this.inventoryData[0].inventoryQuantity}`, [Validators.required]),
      inventoryPrice: new UntypedFormControl(`${this.inventoryData[0].inventoryPrice}`, [Validators.required]),
    });

    await this.getInventoryStatus();
    this.updateInventoryItem.get('inventoryStatusId')?.setValue(this.inventoryData[0].inventoryStatusId)
  }

  async getInventoryStatus() {
    await this.service.getInventoryStatus().then(Response => { this.inventorystatus = Response });
  }
}