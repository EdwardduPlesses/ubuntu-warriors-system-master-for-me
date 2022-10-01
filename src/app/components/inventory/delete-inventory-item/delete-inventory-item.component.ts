import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { InventoryService } from '../../../services/inventory.service';

@Component({
  selector: 'app-delete-inventory-item',
  templateUrl: './delete-inventory-item.component.html',
  styleUrls: ['./delete-inventory-item.component.css']
})

export class DeleteInventoryItemComponent implements OnInit {

  inventoryData: any = [];

  constructor(public dialog: MatDialogRef<DeleteInventoryItemComponent>, private service: InventoryService, public http: HttpClient, public snackbar: SnackbarService) { }

  async ngOnInit() {
    this.inventoryData = this.service.retrieveInventoryData();
    this.service.clearData();
  }

  async confirmInventoryDelete() {
    await this.service.DeleteInventory(this.inventoryData[0].inventoryId).then(() => { },
      (response: HttpErrorResponse) => {
        if (response.status == 200) {
          this.snackbar.setMessage("Inventory Item Deleted successfully")
        }
        else {
          this.snackbar.setMessage("Failed to Delete Inventory Item")
        }
      })
    this.dialog.close();
  }

  onNoClick() {
    this.snackbar.setMessage('You chose not to delete the inventory item')
    this.dialog.close()
  }
}