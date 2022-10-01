import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { InventoryService } from 'src/app/services/inventory.service';
import { SnackbarService } from 'src/app/services/snackbar.service';

@Component({
  selector: 'app-add-inventory-item',
  templateUrl: './add-inventory-item.component.html',
  styleUrls: ['./add-inventory-item.component.css']
})

export class AddInventoryItemComponent implements OnInit {

  inventorystatus: any = [];

  addInventoryItem = new FormGroup({
    inventoryStatusId: new FormControl(''),
    inventoryName: new FormControl(''),
    inventoryDescription: new FormControl(''),
    inventoryQuantity: new FormControl(''),
    inventoryPrice: new FormControl(''),
  })

  constructor(public dialog: MatDialogRef<AddInventoryItemComponent>, public http: HttpClient, public service: InventoryService, public snackbar: SnackbarService) { }

  async ngOnInit() {
    await this.getInventoryStatus();
  }

  onNoClick() {
    this.snackbar.setMessage('You chose not to add a new inventory item')
    this.dialog.close()
  }

  async confirmAddInventory() {
    let apiAddInventory = {
      inventoryStatusId: this.addInventoryItem.value.inventoryStatusId,
      inventoryName: this.addInventoryItem.value.inventoryName,
      inventoryDescription: this.addInventoryItem.value.inventoryDescription,
      inventoryQuantity: this.addInventoryItem.value.inventoryQuantity,
      inventoryPrice: this.addInventoryItem.value.inventoryPrice,
    }

    await this.service.PostInventory(apiAddInventory).then(() => { },
      (response: HttpErrorResponse) => {
        if (response.status == 200) {
          this.snackbar.setMessage("Inventory Item Added successfully")
        }
        else {
          this.snackbar.setMessage("Failed to Add Inventory Item")
        }
      })
    this.dialog.close();
  }

  async getInventoryStatus() {
    await this.service.getInventoryStatus().then(Response => { this.inventorystatus = Response });
  }
}