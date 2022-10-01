import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { SupplierService } from '../../../services/supplier.service';

@Component({
  selector: 'app-delete-supplier-dialog',
  templateUrl: './delete-supplier-dialog.component.html',
  styleUrls: ['./delete-supplier-dialog.component.css']
})
export class DeleteSupplierDialogComponent implements OnInit {

  supplierData: any = [];

  constructor(public dialog: MatDialogRef<DeleteSupplierDialogComponent>, public http: HttpClient, public service: SupplierService, public snackbar: SnackbarService) { }

  async ngOnInit() {
    this.supplierData = this.service.retrieveSupplierData();
    this.service.clearData();
  }

  async confirmSupplierDelete() {
    await this.service.DeleteSupplier(this.supplierData[0].supplierId).then(() => { },
      (response: HttpErrorResponse) => {
        if (response.status == 200) {
          this.snackbar.setMessage("Supplier Deleted successfully")
        }
        else {
          this.snackbar.setMessage("Failed to Delete Supplier")
        }
      })
    this.dialog.close();
  }

  onNoClick() {
    this.snackbar.setMessage('You chose not to delete the supplier')
    this.dialog.close()
  }
}